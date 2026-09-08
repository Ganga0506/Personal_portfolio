# Portfolio

Personal portfolio site. Plain HTML/CSS/JS, no build step, no framework.

## Structure

```
index.html
css/
  reset.css       browser default reset
  variables.css   color tokens (light + dark), type, spacing
  main.css        base styles, nav, layout
js/
  theme.js        dark/light toggle
  main.js         mobile nav + active-section highlighting
assets/
  images/         photos
  icons/          tech stack icons
  resume/         resume PDF
.github/workflows/deploy.yml   GitHub Pages deployment
```

## Local preview

No build step needed — but browsers restrict some things (like fetch)
on `file://` pages, so serve it locally instead of double-clicking it:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

This repo deploys automatically via GitHub Actions on every push to `main`.

**One-time setup** (already done if Pages is enabled): in the repo's
**Settings → Pages**, set **Source** to **GitHub Actions**.

After that, every push to `main` triggers `.github/workflows/deploy.yml`,
which publishes the site to:

```
https://ganga0506.github.io/portfolio/
```

All asset paths in `index.html` are relative (`css/...`, `js/...`,
`assets/...`), so the site works correctly under the `/portfolio/` subpath
without any extra config.

## Status

Skeleton stage — nav, theming, and layout shell are in place. Each section
(About, Experience, Skills, Tech Stack, Contact) still has placeholder
content, to be filled in section by section.

