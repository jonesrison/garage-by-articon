# Connecting GARAGE to a live Google Sheet

GARAGE works out of the box with zero backend — it reads project/update data
from `src/data/*.js` and just logs applications to the console. This guide
wires it up to a real Google Sheet so:

- Project leads can edit a project's **status** (and optional `rolesOpen`
  count) in a spreadsheet and see it reflected on the site immediately (no
  code, no redeploy).
- Applications submitted through `/apply` land as rows in a sheet you can
  filter/sort for allocation.

This is a ~15 minute one-time setup, done by whoever owns the ARTICON Google
account.

## 1. Create the sheet

Make a new Google Sheet with three tabs, named **exactly** this (case
matters):

**`Projects`** — row 1 (headers), then one row per project:

```
slug	status	rolesOpen
local-first	RECRUITING	5
wikilynx	RECRUITING	
eclipse	IN_PROGRESS	
```

- `slug` must match the `slug` in `src/data/projects.js` (e.g. `local-first`,
  `wikilynx`, `eclipse`, `activity-hours`, `build-series`, `second-brain`,
  `mall-hackathon`, `joy-run`).
- `status` must be one of the exact keys the site knows about: `RECRUITING`,
  `IN_PROGRESS`, `SHIPPED`, `PAUSED`. Anything else falls back to whatever
  is already in the code.
- `rolesOpen` is optional, free text/number, not used by the UI yet —
  leave it blank if you don't need it.
- The site only takes **status** (and `rolesOpen` if set) from this tab and
  overlays it onto the full project copy already in the code — the rest
  (description, roles, timeline) keeps coming from `src/data/projects.js`.
  That's on purpose: role lists are too structured to comfortably manage as
  spreadsheet cells, and this tab rarely needs more than a status flip.

**`Updates`** — row 1 headers, then one row per update (newest can go
anywhere, order doesn't matter):

```
date	tag	title	body
2026-08-20	GARAGE	Second Brain kicks off	Curation squad has its first working session this week.
```

This tab is the *full* source for the Updates page — add a row, it shows up.

**`Applications`** — row 1 headers exactly matching the Apply form fields
(this is where submissions land, you don't type into it):

```
submittedAt	name	email	committee	firstChoice	roles	secondChoice	why	contribute	learn	experience	availability	ownership
```

## 2. Add the Apps Script

In the Sheet: `Extensions → Apps Script`, delete the placeholder code, and
paste in the contents of [`apps-script/Code.gs`](./apps-script/Code.gs)
from this repo.

## 3. Deploy as a Web App

`Deploy → New deployment → type: Web app`

- Execute as: **Me**
- Who has access: **Anyone**

Copy the deployment URL (ends in `/exec`).

## 4. Point GARAGE at it

In `src/data/config.js`:

```javascript
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXX/exec'
```

Commit, push — the Actions workflow rebuilds and deploys automatically.
`src/lib/api.js` will start fetching live data and posting real
applications; if the endpoint ever goes down or a request fails, it quietly
falls back to the bundled static data instead of breaking the page.

## Notes

- Never put a Google **service-account key** in the frontend. The Apps
  Script web app URL is safe to ship in client code — it has its own access
  control set at deploy time.
- Keep the Sheet itself **not public** — only the Apps Script endpoint is
  exposed, and it only returns the fields you choose to output.
