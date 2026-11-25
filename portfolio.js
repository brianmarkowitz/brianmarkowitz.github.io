(() => {
  "use strict";
  const rows = [...document.querySelectorAll("#index-list > li")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  const search = document.getElementById("search");
  const more = document.getElementById("more");
  const normalLimit = 7;
  let selection = "all",
    limit = normalLimit;
  const norm = (text) =>
    text
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "");
  function render() {
    const words = norm(search.value.trim()).split(/\s+/).filter(Boolean);
    const matches = rows.filter(
      (row) =>
        (selection === "all" || row.dataset.group === selection) &&
        words.every((word) => norm(row.dataset.search).includes(word)),
    );
    const show = new Set(matches.slice(0, limit));
    rows.forEach((row) => {
      row.hidden = !show.has(row);
    });
    const msg = !matches.length
      ? "0 matching projects"
      : show.size === matches.length
        ? `${matches.length} project${matches.length === 1 ? "" : "s"}`
        : `Showing ${show.size} of ${matches.length} projects`;
    document.getElementById("count").textContent = msg;
    document.getElementById("index-empty").hidden = !!matches.length;
    more.hidden = matches.length <= limit;
    more.textContent = `Show ${matches.length - show.size} more project${matches.length - show.size === 1 ? "" : "s"} ↓`;
    filters.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === selection),
      ),
    );
  }
  document.getElementById("controls").hidden = false;
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      selection = button.dataset.filter;
      limit = normalLimit;
      render();
    }),
  );
  search.addEventListener("input", () => {
    limit = normalLimit;
    render();
  });
  more.addEventListener("click", () => {
    const wasVisible = new Set(rows.filter((row) => !row.hidden));
    limit = Infinity;
    render();
    const firstNew = rows.find((row) => !row.hidden && !wasVisible.has(row));
    firstNew?.querySelector("a")?.focus({ preventScroll: true });
  });
  document.getElementById("reset").addEventListener("click", () => {
    search.value = "";
    selection = "all";
    limit = normalLimit;
    render();
    search.focus();
  });
  render();
})();

// Progressive motion: never hide or disable a case while waiting for the observer.
(() => {
  "use strict";
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || !("IntersectionObserver" in window)) return;
  const cases = [...document.querySelectorAll(".case")];
  const observer = new IntersectionObserver(
    (entries) => {
      if (preference.matches) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (
          document.documentElement.dataset.motion !== "paused" &&
          !entry.target.matches(":focus-within")
        ) {
          entry.target.classList.add("enters-view");
        }
      }
    },
    { threshold: 0.16 },
  );
  for (const card of cases) {
    observer.observe(card);
    card.addEventListener("animationend", (event) => {
      if (event.animationName === "case-enter")
        card.classList.remove("enters-view");
    });
    card.addEventListener("focusin", () =>
      card.classList.remove("enters-view"),
    );
  }
  preference.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    for (const card of cases) card.classList.remove("enters-view");
  });
})();

// Ambient telemetry is enhanced only when we can reliably stop it offscreen.
(() => {
  "use strict";
  const button = document.getElementById("motion-control");
  const board = document.getElementById("portfolio-board");
  if (!button || !board || !("IntersectionObserver" in window)) return;

  const root = document.documentElement;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const label = button.querySelector(".motion-label");
  const storageKey = "portfolio.motion";
  let paused = root.dataset.motion === "paused";
  let boardVisible = false;

  function update() {
    root.toggleAttribute("data-motion-ready", !preference.matches);
    root.dataset.motion = paused ? "paused" : "playing";
    label.textContent = paused ? "Resume motion" : "Pause motion";
    board.toggleAttribute(
      "data-ambient-active",
      !preference.matches && !paused && boardVisible && !document.hidden,
    );
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      boardVisible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      update();
    },
    { threshold: [0, 0.15] },
  );
  observer.observe(board);
  button.addEventListener("click", () => {
    paused = !paused;
    if (paused)
      document
        .querySelectorAll(".enters-view")
        .forEach((element) => element.classList.remove("enters-view"));
    try {
      if (paused) localStorage.setItem(storageKey, "paused");
      else localStorage.removeItem(storageKey);
    } catch {
      // Manual control still works for this page.
    }
    update();
  });
  preference.addEventListener("change", update);
  document.addEventListener("visibilitychange", update);
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    paused = event.newValue === "paused";
    update();
  });
  update();
})();
