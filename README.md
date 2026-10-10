# Brian Markowitz Portfolio

A static, responsive portfolio of 26 projects across data architecture, AI products, and applied interfaces.

## Files

- `index.html` — page structure and accessible project dialog
- `styles.css` — ivory, charcoal, and orange visual design with mobile and reduced-motion support
- `projects.js` — original project inventory, ordering, links, and screenshot galleries
- `portfolio.js` — combined category/search filtering, project details, and screenshot selection
- `static/` — real project previews and generated hero sculpture
- `Demo Projects Portfolio.md` — readable project inventory

## Local preview

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. No build step or package installation is required.

## Updating projects

Edit `rawProjects` in `projects.js`. Each entry includes its original status, access evidence, URLs, summary, architecture, outcome, stack, tags, and local screenshot. Update `impressivenessOrder` for display order and `galleryExtrasById` for additional screenshots. Search matches titles, summaries, technologies, categories, status, and tags. Search and discipline filters work together.

Only ClawdMarks, FluGlobe Visualization, Vibe Coding Journey, Brian Resume, ResumeDB, Aerospace Orbital Command, and Vanessa Markowitz link out. Their project links open in a separate tab. All other cards and detail dialogs offer a project-specific email request to bmarko@gmail.com. The allowlist in `portfolio.js` defaults new projects to access by request; do not add other application, source, or backup URLs to the published inventory. The portfolio describes the stored project inventory; it does not perform live service health checks.

## Deployment

Deploy these files to any static web host. Google Fonts is optional; local sans-serif and monospace fallbacks are provided. No deployment is performed by the local preview command.
