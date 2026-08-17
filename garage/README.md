# GARAGE by ARTICON

Where ARTICON things get built, altered, tested, repaired and shipped.

A single hub for ExecOM members to see every active project, what roles are
open on each, and apply — instead of the current mess of scattered
WhatsApp messages and one-off Google Forms.

Built with React + Vite + Tailwind CSS v4. Ships as a fully static site,
deployable straight to GitHub Pages, no server required.

## What's here

- **Home** — live status board + what's currently recruiting + shipping log.
- **Projects** — all 8 initiatives (LOCAL//FIRST, WIKILYNX 2.0, ECLIPSE,
  ACTIVITY HOURS, BUILD SERIES, SECOND BRAIN, plus Mall Hackathon and Joy
  Run shown as on-hold), filterable by type.
- **Project detail** — description, why it matters, timeline/milestones, and
  every open role with responsibilities + useful skills, each with a direct
  Apply link.
- **Apply** — one unified form for every project: pick a project, pick
  role(s), say what you bring and want to learn, submit. No prior experience
  required for most roles, and it's stated up front so the same six
  confident people don't apply for everything.
- **Updates** — a shipping log, kept deliberately separate from
  "announcements."

## Run it locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs to `dist/`.

## Deploy to GitHub Pages

The easiest path is already set up: `.github/workflows/deploy.yml` builds
and deploys automatically on every push to `main`.

1. Push this repo to GitHub.
2. Repo → **Settings → Pages → Source → GitHub Actions**.
3. Push to `main`. The site will be live at
   `https://<username>.github.io/<repo-name>/` a minute later.

No `base` path configuration needed — `vite.config.js` uses a relative
base (`./`) and the router uses `HashRouter`, so it works from any repo
name or subpath without edits.

### Alternative: manual deploy

```bash
npm run deploy
```

(Uses the `gh-pages` package to push `dist/` to a `gh-pages` branch — only
needed if you're not using the Actions workflow.)

## Connecting real data

Out of the box, GARAGE runs entirely on the data in `src/data/` — nothing
breaks, applications just log to the console instead of being saved
anywhere durable. When you're ready for project leads to update
status/roles from a spreadsheet and for applications to land somewhere
real, follow **[BACKEND.md](./BACKEND.md)** — about 15 minutes with a
Google account.

## Project structure

```
src/
  data/          content: projects.js, updates.js, config.js
  lib/api.js     fetch layer — live sheet with static fallback
  components/    Nav, Footer, WorkOrderCard, StatusBadge, StatusBoard...
  pages/         Home, Projects, ProjectDetail, Apply, Updates, NotFound
```

Project + role copy in `src/data/projects.js` is sourced directly from the
ARTICON 2026–27 planning discussion — edit it there (or eventually in the
connected sheet) as things change.
