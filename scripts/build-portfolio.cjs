"use strict";
// Build once with Node; GitHub Pages serves plain HTML. No runtime dependencies or client-side data fetching.
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm");
const root = path.resolve(__dirname, ".."),
  content = require("./editorial.cjs");
const rawProjects = vm.runInNewContext(
  fs.readFileSync(path.join(root, "projects.js"), "utf8") + ";rawProjects",
);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const couple = {
  id: 27,
  title: "Couples Alarm",
  systemId: "mobile",
  year: "",
  tags: [],
  stack: "",
  proof: "",
  demoUrl: "",
};
const allowed = new Set(content.publicIds);
const illustrationTypes = new Set([
  "Architecture illustration",
  "Concept illustration",
  "Conceptual illustration",
]);
const screenshotTypes = new Set([
  "App Store screenshot",
  "Product screenshot",
  "Archived screenshot",
  "Public screenshot",
  "Demo screenshot",
]);
function checkVisual(visual, project, publicProject) {
  if (
    !illustrationTypes.has(visual.type) &&
    (!publicProject || !screenshotTypes.has(visual.type))
  ) {
    throw Error("Invalid visual or private screenshot: " + project);
  }
  if (typeof visual.alt !== "string" || !visual.alt.trim()) {
    throw Error("Missing media alt text: " + project);
  }
  if (
    !/^static\/[a-zA-Z0-9_./-]+$/.test(visual.src) ||
    visual.src.split("/").includes("..") ||
    !fs.existsSync(path.join(root, visual.src))
  ) {
    throw Error("Missing or unsafe media path: " + project + " " + visual.src);
  }
  if (visual.width != null || visual.height != null) {
    if (
      !Number.isInteger(visual.width) ||
      !Number.isInteger(visual.height) ||
      visual.width < 1 ||
      visual.height < 1
    )
      throw Error("Invalid media dimensions: " + project);
  }
}
const paws = {
  id: 28,
  title: "Forever Paws",
  year: "",
  systemId: "interface-labs",
  tags: [],
  stack: "",
  proof: "",
  demoUrl: "",
};
const all = [...rawProjects, couple, paws]
  .filter((p) => !(content.omit || []).includes(p.id))
  .map((p) => {
    const c = content.overrides[p.id] || {},
      m = content.media[p.id],
      pub = allowed.has(p.id);
    const url = pub ? c.url || p.demoUrl || p.codeUrl || "" : "";
    const x = {
      ...p,
      name: c.name || p.title,
      slug: c.slug || slug(p.title),
      discipline: c.discipline || content.categories[p.systemId],
      role: c.role || null,
      brief: c.brief || p.summary,
      contribution: c.contribution || p.architecture,
      outcome: c.outcome || p.impact,
      tech:
        c.tech ||
        p.stack
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      url: /^https:\/\//i.test(url) ? url : "",
      linkLabel:
        c.linkLabel ||
        (p.demoUrl && /login|protected/i.test(p.proof)
          ? "Visit site (sign-in required)"
          : p.demoUrl
            ? "Visit project"
            : "View source"),
      access:
        c.access ||
        (!pub
          ? "Project overview"
          : p.demoUrl && /login|protected/i.test(p.proof)
            ? "Sign-in required"
            : p.demoUrl
              ? "Public project"
              : "Source"),
      visual: m || null,
      gallery: c.gallery || [],
      subtitle: c.subtitle || content.categories[p.systemId],
      shortTitle: c.shortTitle || c.name || p.title,
    };
    const visuals = [x.visual, ...x.gallery].filter(Boolean);
    for (const visual of visuals) checkVisual(visual, x.name, pub);
    return x;
  })
  .sort((a, b) => content.order.indexOf(a.id) - content.order.indexOf(b.id));
const byId = Object.fromEntries(all.map((p) => [p.id, p])),
  featured = content.featured.map((id) => byId[id]);
const href = (p) => "work/" + p.slug + "/",
  two = (n) => String(n).padStart(2, "0");
const urlBase = "https://brianmarkowitz.github.io/",
  cssVersion = "20261125-portfolio3";
const arrows = {
  right: '<span class="arrow" aria-hidden="true">→</span>',
  ext: '<span class="arrow" aria-hidden="true">↗</span>',
  down: '<span class="arrow" aria-hidden="true">↓</span>',
};
const mail = "mailto:bmarko@gmail.com",
  linkedin = "https://www.linkedin.com/in/brian-markowitz-126709/",
  github = "https://github.com/brianmarkowitz";
const link = (url, label, c = "inline-link", arrow = "ext") =>
  `<a href="${esc(url)}" class="${c}">${esc(label)} ${arrows[arrow] || ""}</a>`;
const motionBoot = `<script>try{if(localStorage.getItem("portfolio.motion")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}</script>`;
const head = (title, description, prefix, page, image) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="theme-color" content="#12191b">${page === "" ? motionBoot : ""}<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${urlBase + page}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${urlBase + page}">${image ? `<meta property="og:image" content="${urlBase + esc(image)}">` : ""}<link rel="icon" href="${prefix}static/portfolio/monogram.svg" type="image/svg+xml"><link rel="stylesheet" href="${prefix}styles.css?v=${cssVersion}"></head>`;
const nav = (base) =>
  `<a class="skip" tabindex="0" href="#main">Skip to content</a><header class="mast"><div class="wrap mast-inner"><a class="brand" href="${base || "#top"}" aria-label="Brian Markowitz portfolio home"><img src="${base}static/portfolio/monogram.svg" alt="" width="36" height="36"><span>Brian Markowitz</span></a><nav aria-label="Main navigation"><a class="nav-link" href="${base}#work"><span class="nav-full">Case studies</span><span class="nav-short">Work</span></a><a class="nav-link" href="${base}#index"><span class="nav-full">Project index</span><span class="nav-short">Index</span></a>${link(base + "#about", "About", "nav-link", "")}<a class="contact-link" href="${mail}">Contact ${arrows.ext}</a></nav></div></header>`;
const footer = (base) =>
  `<footer class="site-foot"><div class="wrap foot-inner"><span>Brian Markowitz <b>/</b> Engineering portfolio</span>${link("#top", "Back to top", "foot-link", "")}</div></footer>`;
const label = (n, s) =>
  `<p class="kicker"><span>${n}</span><i aria-hidden="true"></i>${s}</p>`;
const tags = (xs) =>
  `<ul class="tags" aria-label="Technologies and methods">${xs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const img = (p, base, large = false) => {
  const m = p.visual;
  if (!m) return "";
  return `<figure class="plate plate-${p.id} ${esc(m.fit || "")}" data-media-kind="${esc(m.type)}"><div class="plate-content"><img src="${base + esc(m.src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async"${m.width && m.height ? ` width="${m.width}" height="${m.height}"` : ""}></div><figcaption><span>${esc(m.type)}</span>${m.caption ? `<span>${esc(m.caption)}</span>` : ""}${large ? `<a class="full-image" href="${base + esc(m.src)}">View full image ↗</a>` : ""}</figcaption></figure>`;
};
const projectButton = (p) =>
  link(href(p), "Read case study", "read-link", "right");
const featuredCard = (p, i) =>
  `<article class="case ${i === 0 ? "lead-case" : "small-case"} case-${p.id}"><div class="case-art">${img(p, "") || `<div class="empty-art">${esc(p.subtitle)}</div>`}</div><div class="case-info"><div class="case-meta"><span>CASE ${two(i + 1)}</span><i></i>${esc(p.discipline)}</div><h3><a href="${href(p)}">${esc(p.name)}</a></h3><p>${esc(p.brief)}</p>${tags(p.tech.slice(0, 3))}${projectButton(p)}</div></article>`;
// Keep the board inline so reduced-motion follows the page, even in browsers
// that handle the preference differently inside an image document.
const board = fs
  .readFileSync(path.join(root, "static/portfolio/software-stack.svg"), "utf8")
  .trim();
const intro = `<section class="hero"><div class="wrap hero-inner"><div class="hero-type"><p class="hero-label"><i aria-hidden="true"></i> Software engineering portfolio</p><h1>Brian<br>Markowitz<span>.</span></h1><p class="hero-role">Software developer <span>&amp;</span> data architect.</p><p class="hero-blurb">I design data pipelines, build web applications, and ship mobile software. Here’s the work, from a database refresh workflow to an iPhone alarm for two.</p><div class="hero-actions">${link("#work", "Explore case studies", "action", "down")}${link("#index", "Browse project index", "hero-text-link", "right")}</div></div><figure class="system-figure">${board}<figcaption><span class="board-caption"><span>Fig. 01</span><i aria-hidden="true"></i> Anatomy of a software system</span><button id="motion-control" class="motion-control" type="button" aria-controls="portfolio-board"><span class="motion-icon" aria-hidden="true"></span><span class="motion-label">Pause motion</span></button></figcaption></figure></div><div class="focus-band"><div class="wrap band-inner"><span class="band-id">Practice areas</span><span><b>01</b> Product development</span><span><b>02</b> Data systems</span><span><b>03</b> Applied AI</span></div></div></section>`;
const work = `<section class="section selected wrap" id="work" aria-labelledby="work-title">${label("01", "Selected work")}<div class="section-heading"><h2 id="work-title">Case studies<span>.</span></h2><p>Three projects, from the problem I set out to solve to what I built.</p></div><div class="cases">${featured.map(featuredCard).join("")}</div></section>`;
const filters = ["all", ...Object.keys(content.categories)]
  .map(
    (key, i) =>
      `<button type="button" data-filter="${key}" aria-pressed="${i === 0}">${i === 0 ? "All disciplines" : esc(content.categories[key])}</button>`,
  )
  .join("");
const index = `<section class="index-section section" id="index" aria-labelledby="index-title"><div class="wrap">${label("02", "Project archive")}<div class="section-heading"><h2 id="index-title">Project index<span>.</span></h2><p>Browse the wider body of work. Each entry describes my approach, the technology and what the project does.</p></div><div id="controls" hidden><div class="index-tools"><div role="group" aria-label="Filter by discipline" class="filters">${filters}</div><label class="search"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m15 15 6 6" stroke="currentColor" stroke-width="1.7"/></svg><span class="sr">Search projects</span><input type="search" id="search" placeholder="Search projects" autocomplete="off"></label></div></div><div class="index-meta"><span id="count" role="status">${all.length} projects</span><span>Project / discipline</span></div><ol class="index-list" id="index-list">${all.map((p, i) => `<li data-group="${esc(p.systemId)}" data-search="${esc([p.title, p.name, p.brief, p.contribution, p.tech.join(" "), p.tags.join(" ")].join(" ").toLowerCase())}"><a href="${href(p)}"><span class="index-num">${two(i + 1)}</span><span class="index-title"><strong>${esc(p.name)}</strong><span>${esc(p.brief)}</span></span><span class="index-discipline">${esc(content.categories[p.systemId])}</span><span class="index-arrow" aria-hidden="true">↗</span></a></li>`).join("")}</ol><div class="index-empty" id="index-empty" hidden><h3>No matching projects</h3><p>Try another term or clear the filters.</p><button id="reset" class="plain-button">Clear filters</button></div><button id="more" class="more" type="button" hidden></button></div></section>`;
const about = `<section class="about section" id="about" aria-labelledby="about-title"><div class="wrap about-grid"><div>${label("03", "About & contact")}<h2 id="about-title">Behind<br>the work<span>.</span></h2></div><div class="about-copy"><p class="standfirst">I’m Brian, a software developer and principal data architect.</p><p>My work moves between two questions: how should the data fit together, and what does someone need to do with it? That’s the thread connecting the pipelines, search tools and apps in this portfolio.</p><div class="contacts">${link(mail, "Email Brian", "action", "right")}${link(linkedin, "LinkedIn", "hero-text-link")}${link(github, "GitHub", "hero-text-link")}</div></div></div></section>`;
fs.writeFileSync(
  path.join(root, "index.html"),
  head(
    "Brian Markowitz | Software Development & Data Architecture",
    "Engineering portfolio of Brian Markowitz. Explore case studies in iOS development, data architecture, and web applications, plus an index of selected projects.",
    "",
    "",
    "static/portfolio/portfolio-share.png",
  ) +
    `<body id="top">${nav("")}<main id="main">${intro}${work}${index}${about}</main>${footer("")}<script defer src="portfolio.js?v=${cssVersion}"></script></body></html>\n`,
);
for (const p of all) {
  const base = "../../",
    ix = featured.indexOf(p),
    next = ix < 0 ? null : featured[(ix + 1) % featured.length],
    primary = p.url
      ? link(p.url, p.linkLabel, "action")
      : link(
          mail + "?subject=" + encodeURIComponent("Portfolio: " + p.name),
          "Discuss this work",
          "action",
          "right",
        );
  const meta = [
    ["Discipline", p.discipline],
    ...(p.role ? [["My role", p.role]] : []),
    ["Access", p.access],
  ];
  const notes = (n, title, text) =>
    `<section class="note"><div>${label(n, title)}</div><p>${esc(text)}</p></section>`;
  const gallery = (p.gallery || [])
    .map((m, i) => img({ ...p, visual: m }, base, true))
    .join("");
  const details = `<main id="main"><section class="detail-hero"><div class="wrap"><a class="back" href="../../#${ix < 0 ? "index" : "work"}">← ${ix < 0 ? "Project index" : "Case studies"}</a>${label(ix < 0 ? "Project" : "Case " + two(ix + 1), esc(p.discipline))}<h1>${esc(p.name)}<span>.</span></h1><p class="detail-deck">${esc(p.brief)}</p><div class="detail-meta">${meta.map(([k, v]) => `<div><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join("")}</div></div></section><div class="wrap article-grid"><div class="article-body">${img(p, base, true)}${notes("01", "What I built", p.contribution)}${notes("02", "What it enables", p.outcome)}<section class="note tech-note">${label("03", "Tools & methods")}${tags(p.tech)}</section>${gallery}</div><aside class="article-aside"><span class="aside-label">Project links</span>${primary}<p>${p.url ? "This project has a public link." : "This entry describes the work. The underlying system is not linked publicly."}</p>${link("../../#index", "Full project index", "inline-link", "right")}</aside></div>${next ? `<section class="next-case"><div class="wrap"><p>Next case study</p>${link("../../" + href(next), next.name, "next-link", "right")}</div></section>` : ""}</main>`;
  const dir = path.join(root, href(p));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    head(p.name + " | Brian Markowitz", p.brief, base, href(p), p.visual?.src) +
      `<body id="top">${nav(base)}${details}${footer(base)}</body></html>\n`,
  );
}
fs.writeFileSync(
  path.join(root, "Demo Projects Portfolio.md"),
  "# Brian Markowitz: project index\n\nPublic portfolio overviews; a project being listed here does not grant access to the underlying system.\n\n" +
    all
      .map(
        (p) =>
          "- [" +
          p.name +
          "](" +
          href(p) +
          ") · " +
          p.discipline +
          " · " +
          p.brief,
      )
      .join("\n") +
    "\n",
);
console.log("Built " + all.length + " static project pages and home.");
