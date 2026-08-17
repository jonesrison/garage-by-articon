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
    const res = await fetch(`${APPS_SCRIPT_URL}?resource=projects`)
    if (!res.ok) throw new Error('bad response')
    const data = await res.json()
    return Array.isArray(data) && data.length ? overlayProjects(staticProjects, data) : staticProjects
  } catch (err) {
    console.warn('GARAGE: could not reach live sheet, using static project data.', err)
    return staticProjects
  }
}

export async function fetchUpdates() {
  if (!isLive()) return staticUpdates
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?resource=updates`)
    if (!res.ok) throw new Error('bad response')
    const data = await res.json()
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
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ resource: 'applications', ...record }),
    })
    // Apps Script web apps often respond via redirect / opaque response when
    // called from a static site — we treat "no network error" as success
    // rather than parsing the body.
    return { ok: true, mode: 'live' }
  } catch (err) {
    console.error('GARAGE: application submit failed.', err)
    return { ok: false, mode: 'live', error: err }
  }
}
