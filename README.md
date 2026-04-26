# Demo Projects Portfolio

Static portfolio page for 18 demo projects across data architecture, AI products, and applied interface work. The site is implemented as a single `index.html` page with local assets in `static/`.

## Contents

- `index.html` - Main static portfolio page and project data
- `static/` - Project preview images and supporting assets
- `Demo Projects Portfolio.md` - Concise project inventory
- `.gitignore` - Local ignore rules

## Current Portfolio

- 18 projects
- Static HTML, CSS, and JavaScript
- Local project images in `static/`
- Responsive project stream, filters, preview media, and dossier modal
- Mix of public live demos, live sites, protected demos, source links, and internal-only entries

## Local Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Updating Projects

Project metadata lives in the `rawProjects` array inside `index.html`. Add or update local preview media in `static/`, then update the matching project entry with title, summary, stack, proof, links, tags, and image path.

## Deployment

This is a static site and can be hosted on GitHub Pages, S3 static website hosting, Netlify, Vercel, CloudFront, or any basic static web host.
