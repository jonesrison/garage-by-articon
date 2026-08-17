/**
 * GARAGE backend — paste this whole file into Extensions > Apps Script
 * (as Code.gs) in the Google Sheet, then Deploy > New deployment > Web app.
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the resulting /exec URL into src/data/config.js as APPS_SCRIPT_URL.
 */

const SHEET_PROJECTS = 'Projects'
const SHEET_UPDATES = 'Updates'
const SHEET_APPLICATIONS = 'Applications'

function doGet(e) {
  const resource = (e.parameter.resource || '').toLowerCase()
  const sheetName = resource === 'updates' ? SHEET_UPDATES : SHEET_PROJECTS
  const data = readSheetAsObjects_(sheetName)
  return jsonOutput_(data)
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    const sheet = getSheet_(SHEET_APPLICATIONS)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const row = headers.map((h) => {
      const v = body[h]
      if (Array.isArray(v)) return v.join(', ')
      return v ?? ''
    })
    sheet.appendRow(row)
    return jsonOutput_({ ok: true })
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) })
  }
}

// --- helpers ---------------------------------------------------------

function getSheet_(name) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name)
  if (!sheet) throw new Error(`Sheet tab "${name}" not found`)
  return sheet
}

function readSheetAsObjects_(name) {
  const sheet = getSheet_(name)
  const rows = sheet.getDataRange().getValues()
  if (rows.length < 2) return []
  const headers = rows.shift()
  return rows
    .filter((row) => row.some((cell) => cell !== '')) // skip blank rows
    .map((row) => {
      const obj = {}
      headers.forEach((h, i) => {
        const v = row[i]
        obj[h] = typeof v === 'string' ? v.trim() : v
      })
      return obj
    })
}

function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
