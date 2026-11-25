# Brian Markowitz · Engineering Portfolio

A static GitHub Pages portfolio. The home page leads with three featured software case studies and links to an accessible, searchable project index. Each project has its own shareable HTML URL; all writing and links remain available when JavaScript is disabled.

## Maintenance

- Edit `scripts/editorial.cjs` to change project descriptions, role, technology, ordering, featured work, approved public destinations, or visual provenance. `projects.js` retains the original inventory. A new project should not link out unless its destination is deliberately included in the public allowlist.
- Place vetted assets in `static/portfolio/`. Label actual App Store, current product, and archival screenshots distinctly. Diagrams and generated images should be labeled as illustrations. Do not add protected dashboards or private data. Add a vetted hero visual to `media[id]` and optional detail images to `overrides[id].gallery`. Use an accurate type and alt text plus actual width and height. The build accepts only labeled illustrations on entries without an approved public destination.
- `node scripts/build-portfolio.cjs` regenerates `index.html`, `work/*/index.html`, and the Markdown inventory. Commit the generated pages alongside source edits. GitHub Pages serves the checked-in files without a build step.
- `styles.css` defines the responsive design and reduced-motion/print alternatives. `portfolio.js` progressively enhances only the index search, filters, and results count.
- Preview: `python3 -m http.server 8000 --bind 127.0.0.1`. Open the home page, a case-study deep link, and the project index at narrow and wide sizes.

## Visual sources

- Couples Alarm: [official App Store listing](https://apps.apple.com/us/app/couples-alarm/id6792771975), developer listing screenshot, checked 2026-11-25.
- Forever Paws: [public home](https://foreverpaws.love/) and [Bailey’s public memorial](https://foreverpaws.love/bailey-0s6r38), screenshots captured 2026-11-25.
- FluGlobe: [public demo](https://fluglobe.vercel.app/), captured 2026-11-25; the interface displays sample data.
- ClawdMarks: [public field-report directory](https://www.clawdmarks.com/), captured 2026-11-25 at 03:12 UTC. The image is the anonymous directory, not an admin panel.
- Aerospace Orbital Command: [public visualization demo](https://isstracker-nine.vercel.app/), captured 2026-11-25 at 03:08 UTC. Cropped to the map and telemetry, without the third-party camera embed.
- Guarded Environment Refresh, Vibe Coding Journey, Neo4j Natural Language UI, and MySQL Natural Language Query System: labeled concept or architecture illustrations, not product interfaces. The two query projects have distinct artwork.
- Other images explicitly identified as archive visuals come from the original public portfolio. The diagram in the masthead is an original illustrative software stack. The layer assembly and signal run only once. Case-study entrances do not hide content before activation. A slow telemetry signal repeats only when the hero is visible and the tab is active. Visitors can pause it with the labeled control, which remembers their choice on the device. Both page and embedded SVG motion are disabled when the visitor prefers reduced motion.

Every project has one deliberately selected visual. The supplemental original vector art in `static/portfolio/editorial/` is editorial illustration, not project UI. The Pages deployment excludes legacy unlinked screenshots listed in `_config.yml`; this does not change the repository or its Git history.
