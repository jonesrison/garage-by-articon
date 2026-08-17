import { APPS_SCRIPT_URL } from '../data/config'
import { projects as staticProjects } from '../data/projects'
import { updates as staticUpdates } from '../data/updates'

// GARAGE is designed to run two ways:
//
// 1. No backend wired up yet (APPS_SCRIPT_URL is empty): everything reads
//    from the bundled data files in src/data. The site is fully usable,
//    applications just aren't recorded anywhere durable.
//
// 2. Apps Script connected: projects/updates are fetched live from a Google
//    Sheet on load, and the Apply form POSTs new rows straight into it. Any
//    lead can then update status/roles by editing the sheet — no redeploy.
//
// See /BACKEND.md for the Apps Script code to paste in and deploy.

const isLive = () => Boolean(APPS_SCRIPT_URL)

// Apps Script's doGet CORS headers are unreliable for fetch() calls from a
// static site's origin, so GET reads go through JSONP (a <script> tag load)
// instead — browsers never apply CORS to script tags, so this sidesteps
// the problem regardless of what headers Google decides to send back.
let jsonpCounter = 0
function jsonp(url, { timeoutMs = 8000 } = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `garage_jsonp_${Date.now()}_${jsonpCounter++}`
    const script = document.createElement('script')
    let settled = false

    const cleanup = () => {
      settled = true
      delete window[callbackName]
      script.remove()
      clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      if (settled) return
      cleanup()
      reject(new Error('JSONP request timed out'))
    }, timeoutMs)

    window[callbackName] = (data) => {
      if (settled) return
      cleanup()
      resolve(data)
    }
    script.onerror = () => {
      if (settled) return
      cleanup()
      reject(new Error('JSONP script failed to load'))
    }

    const separator = url.includes('?') ? '&' : '?'
    script.src = `${url}${separator}callback=${callbackName}`
    document.body.appendChild(script)
  })
}

// The Projects tab in the Sheet only needs `slug` + `status` (+ optionally
// `rolesOpen`) — everything else (copy, roles, timeline) stays in code and
// rarely changes. We overlay just those fields onto the static project so a
// lead can flip RECRUITING -> IN_PROGRESS from the spreadsheet without the
// site losing role descriptions, which a full row-replace would do.
function overlayProjects(staticList, sheetRows) {
  const bySlug = new Map(
    sheetRows.filter((r) => r.slug).map((r) => [String(r.slug).trim(), r]),
  )
  return staticList.map((p) => {
    const row = bySlug.get(p.slug)
    if (!row) return p
    return {
      ...p,
      status: row.status && String(row.status).trim() ? row.status : p.status,
      ...(row.rolesOpen !== undefined && row.rolesOpen !== '' ? { rolesOpen: row.rolesOpen } : {}),
    }
  })
}

export async function fetchProjects() {
  if (!isLive()) return staticProjects
  try {
    const data = await jsonp(`${APPS_SCRIPT_URL}?resource=projects`)
    return Array.isArray(data) && data.length ? overlayProjects(staticProjects, data) : staticProjects
  } catch (err) {
    console.warn('GARAGE: could not reach live sheet, using static project data.', err)
    return staticProjects
  }
}

export async function fetchUpdates() {
  if (!isLive()) return staticUpdates
  try {
    const data = await jsonp(`${APPS_SCRIPT_URL}?resource=updates`)
    return Array.isArray(data) && data.length ? data : staticUpdates
  } catch (err) {
    console.warn('GARAGE: could not reach live sheet, using static updates.', err)
    return staticUpdates
  }
}

export async function submitApplication(payload) {
  const record = { ...payload, submittedAt: new Date().toISOString() }

  if (!isLive()) {
    console.info('GARAGE application (no backend connected yet):', record)
    return { ok: true, mode: 'local' }
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ resource: 'applications', ...record }),
    })
    // no-cors gives an opaque response we can't inspect (status is always 0
    // and the body unreadable) — that's expected, not an error. Apps Script
    // POST responses are unreliable about CORS headers even with text/plain,
    // so this is the one reliable way to submit without the browser
    // blocking on a response we were never going to read anyway.
    return { ok: true, mode: 'live' }
  } catch (err) {
    console.error('GARAGE: application submit failed.', err)
    return { ok: false, mode: 'live', error: err }
  }
}
