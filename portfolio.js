'use strict';
const categories = { 'core-data': 'Data systems', 'intelligent-products': 'AI products', 'interface-labs': 'Interfaces' };
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeURL = value => /^https?:\/\//i.test(value || '') ? escapeHTML(value) : '';
// Only these projects may link out. New projects default to requesting access.
const publicProjectIds = new Set([9, 10, 11, 13, 16, 17, 18]);
function accessFor(project) {
  if (!publicProjectIds.has(project.id)) return { key: 'request', label: 'Access by request' };
  if (project.demoUrl) return /login|protected/i.test(project.proof) ? { key: 'login', label: 'Login required' } : { key: 'live', label: 'Public access' };
  return project.codeUrl ? { key: 'source', label: 'Source only' } : { key: 'local', label: 'Internal / preview' };
}
const projects = rawProjects.map(project => ({ ...project, access: accessFor(project) })).sort((a, b) => rankById[a.id] - rankById[b.id]);
const grid = document.getElementById('project-grid');
const search = document.getElementById('project-search');
const dialog = document.getElementById('project-dialog');
let activeFilter = 'all';
let opener = null;
function externalLink(url, label, className = 'text-action') {
  const href = safeURL(url);
  return href ? `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>` : '';
}
function projectLinks(project, detailed = false) {
  const className = detailed ? 'button' : 'text-action';
  if (!publicProjectIds.has(project.id)) {
    const subject = encodeURIComponent(`Access request: ${project.title}`);
    return `<a class="${className}" href="mailto:bmarko@gmail.com?subject=${subject}">Request access <span aria-hidden="true">↗</span></a>`;
  }
  const primary = project.demoUrl
    ? externalLink(project.demoUrl, project.access.key === 'login' ? 'Open · login required' : 'Open experience', className)
    : externalLink(project.codeUrl, 'View source', className);
  return primary + (detailed ? [
    project.demoUrl ? externalLink(project.codeUrl, 'View source', 'button secondary') : '',
    externalLink(project.backupUrl, project.backupLabel || 'Open backup', 'button secondary')
  ].join('') : '');
}
function renderProjects() {
  const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const visible = projects.filter(project => {
    const haystack = [project.title, project.summary, project.stack, project.systemLabel, project.status, ...project.tags].join(' ').toLowerCase();
    return (activeFilter === 'all' || project.systemId === activeFilter) && words.every(word => haystack.includes(word));
  });
  grid.innerHTML = visible.map(project => `
    <article class="project-card">
      <button class="project-visual" type="button" data-project="${project.id}" aria-label="View ${escapeHTML(project.title)} details"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} screenshot" loading="lazy" decoding="async"><span class="visual-arrow" aria-hidden="true">↗</span></button>
      <div class="card-meta"><span>${escapeHTML(categories[project.systemId])} / ${escapeHTML(project.year)}</span><span class="access-label ${project.access.key}">${project.access.label}</span></div>
      <h3><button type="button" data-project="${project.id}">${escapeHTML(project.title)}</button></h3>
      <p class="card-summary">${escapeHTML(project.summary)}</p>
      <div class="card-actions"><button class="text-action" type="button" data-project="${project.id}">View project <span aria-hidden="true">→</span></button>${projectLinks(project)}</div>
    </article>`).join('');
  document.getElementById('results-summary').textContent = `${String(visible.length).padStart(2, '0')} / ${projects.length} projects${activeFilter === 'all' ? ' — All disciplines' : ` — ${categories[activeFilter]}`}`;
  document.getElementById('empty-state').hidden = visible.length !== 0;
}
function selectFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  renderProjects();
}
document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (button) selectFilter(button.dataset.filter);
});
search.addEventListener('input', renderProjects);
document.getElementById('reset-filters').addEventListener('click', () => { search.value = ''; selectFilter('all'); search.focus(); });
grid.addEventListener('click', event => {
  const trigger = event.target.closest('[data-project]');
  if (trigger) openProject(Number(trigger.dataset.project), trigger);
});
function openProject(id, trigger) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  opener = trigger;
  document.getElementById('detail-category').textContent = `${categories[project.systemId]} / Project ${String(id).padStart(2, '0')}`;
  document.getElementById('detail-meta').textContent = `${project.year} · ${project.status} · ${project.access.label}`;
  document.getElementById('detail-title').textContent = project.title;
  document.getElementById('detail-summary').textContent = project.summary;
  document.getElementById('detail-actions').innerHTML = projectLinks(project, true);
  const sourceFrames = [project.image, ...(galleryExtrasById[id] || [])];
  const frames = [...new Set(sourceFrames)].map((src, index) => ({ src, label: project.galleryLabels?.[sourceFrames.indexOf(src)] || (index === 0 ? 'Overview' : `View ${index + 1}`) }));
  const preview = document.getElementById('detail-image');
  preview.src = frames[0].src;
  preview.alt = `${project.title} — ${frames[0].label}`;
  const thumbnails = document.getElementById('detail-thumbnails');
  thumbnails.innerHTML = frames.length > 1 ? frames.map((frame, index) => `<button class="thumbnail" type="button" data-frame="${index}" aria-pressed="${index === 0}" aria-label="Show ${escapeHTML(frame.label)}"><img src="${escapeHTML(frame.src)}" alt="" loading="lazy"><span>${escapeHTML(frame.label)}</span></button>`).join('') : '';
  thumbnails.hidden = frames.length < 2;
  thumbnails.onclick = event => {
    const button = event.target.closest('[data-frame]');
    if (!button) return;
    const frame = frames[Number(button.dataset.frame)];
    preview.src = frame.src;
    preview.alt = `${project.title} — ${frame.label}`;
    thumbnails.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  };
  const accessNote = project.access.key === 'request' ? 'Email bmarko@gmail.com to request access to this project.' : project.access.key === 'login' ? 'Sign-in is required to explore this project.' : project.access.key === 'local' ? 'Local or internal preview only. No public URL is available.' : project.access.key === 'source' ? 'Source is available; there is no public deployment.' : 'Public project link available. Opens in a new tab.';
  document.getElementById('detail-notes').innerHTML = [
    ['Architecture', project.architecture], ['Outcome', project.impact], ['Stack', project.stack], ['Status & access', `${project.proof} ${accessNote}`]
  ].map(([heading, copy]) => `<section><h3>${heading}</h3><p>${escapeHTML(copy)}</p>${heading === 'Stack' ? `<div class="detail-tags">${project.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>` : ''}</section>`).join('');
  dialog.showModal();
  dialog.scrollTop = 0;
  document.getElementById('close-dialog').focus({ preventScroll: true });
}
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
// Close only when both pointer down and up occur on the backdrop, not when dragging out of the dialog.
let backdropPointerDown = false;
const outsideDialog = event => { const rect = dialog.getBoundingClientRect(); return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom; };
dialog.addEventListener('pointerdown', event => { backdropPointerDown = event.target === dialog && outsideDialog(event); });
dialog.addEventListener('click', event => { if (backdropPointerDown && event.target === dialog && outsideDialog(event)) dialog.close(); backdropPointerDown = false; });
dialog.addEventListener('close', () => { if (opener?.isConnected) opener.focus({ preventScroll: true }); });
document.getElementById('project-total').textContent = projects.length;
document.querySelector('.nav-count').textContent = projects.length;
document.querySelector('[data-filter="all"] span').textContent = projects.length;
renderProjects();
