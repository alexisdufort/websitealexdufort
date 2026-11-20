/* Site behaviour. All editable content lives in content.js */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* Tiny helper to build DOM safely (text is never parsed as HTML). */
function h(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value === true ? "" : value);
  }
  kids.flat().forEach((kid) => kid && node.append(kid));
  return node;
}

/* ---------- Site config (Calendly, LinkedIn) ---------- */
function applySiteConfig() {
  // No Calendly link yet → hide the booking buttons and lead with email instead.
  const calendly = (SITE.calendly || "").trim();
  const hasCalendly = calendly !== "" && !/YOUR-CALENDLY-LINK/i.test(calendly);
  $$("[data-calendly]").forEach((a) => { if (hasCalendly) a.href = calendly; });
  $$("[data-if-calendly]").forEach((el) => { el.hidden = !hasCalendly; });
  $$("[data-if-no-calendly]").forEach((el) => { el.hidden = hasCalendly; });
  document.body.classList.toggle("no-calendly", !hasCalendly);

  const linkedin = (SITE.linkedin || "").trim();
  if (linkedin) {
    $$("[data-linkedin]").forEach((a) => { a.href = linkedin; a.hidden = false; });
  }
}

/* ---------- Logo strip ---------- */
function renderLogos() {
  const section = $("#logos");
  const list = $("#logos-list");
  const items = typeof LOGOS !== "undefined" ? LOGOS : [];
  list.replaceChildren();
  section.hidden = items.length === 0;

  items.forEach((item) => {
    const inner = item.logo
      ? h("img", { src: item.logo, alt: item.name, height: "26", loading: "lazy" })
      : h("span", { class: "logo-text", text: item.name });
    list.append(item.url
      ? h("a", { class: "logo", href: item.url, target: "_blank", rel: "noopener" }, inner)
      : h("span", { class: "logo" }, inner));
  });
}

/* ---------- Header: scroll state, mobile menu, active link ---------- */
function initHeader() {
  const header = $(".site-header");
  const links = $$(".site-nav a");
  const setActive = (id) => links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
    // The contact section is short, so highlight it once the page hits bottom.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) setActive("contact");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-35% 0px -60% 0px" });
    $$("main > section").forEach((section) => observer.observe(section));
  }
}

/* ---------- Media: tabs ---------- */
function selectTab(tab, focus = false) {
  $$(".tab").forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    $("#" + t.getAttribute("aria-controls")).hidden = !on;
  });
  if (focus) tab.focus();
}

function initTabs() {
  const tabs = $$(".tab");
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); selectTab(tabs[next], true); }
    });
  });
}

/* ---------- Media: rendering ---------- */
function formatDate(value) {
  if (!value) return "";
  const parts = String(value).split("-").map(Number);
  const [year, month = 1, day = 1] = parts;
  if (!year) return String(value);
  const options =
    parts.length === 1 ? { year: "numeric" }
    : parts.length === 2 ? { month: "short", year: "numeric" }
    : { month: "short", day: "numeric", year: "numeric" };
  return new Date(year, month - 1, day).toLocaleDateString("en-US", options);
}

let photoList = [];
let photoIndex = 0;

function renderMedia() {
  const appearances = [...(MEDIA.appearances || [])]
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  photoList = MEDIA.photos || [];

  const list = $("#appearances-list");
  const grid = $("#photos-grid");
  list.replaceChildren();
  grid.replaceChildren();

  appearances.forEach((item) => {
    const meta = h("div", { class: "appearance-meta" },
      item.date ? h("time", { text: formatDate(item.date) }) : null,
      item.type ? h("span", { class: "tag", text: item.type }) : null);

    const link = item.link
      ? h("a", { class: "more", href: item.link, target: "_blank", rel: "noopener", text: item.linkLabel || "View" })
      : null;

    list.append(h("article", { class: "appearance" },
      meta,
      h("h3", { text: item.title || "Untitled" }),
      item.event ? h("p", { class: "event", text: item.event }) : null,
      item.description ? h("p", { class: "desc", text: item.description }) : null,
      link));
  });

  photoList.forEach((photo, i) => {
    const img = h("img", { src: photo.src, alt: photo.alt || photo.caption || "", loading: "lazy" });
    const button = h("button", { class: "photo", type: "button", "aria-label": "Open photo: " + (photo.caption || photo.alt || "photo " + (i + 1)) }, img);
    button.addEventListener("click", () => openPhoto(i));
    grid.append(button);
  });

  $("#count-appearances").textContent = appearances.length || "";
  $("#count-photos").textContent = photoList.length || "";
  $("#appearances-empty").hidden = appearances.length > 0;
  $("#photos-empty").hidden = photoList.length > 0;

  // Land on whichever tab actually has content.
  selectTab(appearances.length || !photoList.length ? $("#tab-appearances") : $("#tab-photos"));
}

/* ---------- Media: photo viewer ---------- */
function showPhoto(i) {
  photoIndex = (i + photoList.length) % photoList.length;
  const photo = photoList[photoIndex];
  const img = $("#lightbox-img");
  img.src = photo.src;
  img.alt = photo.alt || photo.caption || "";
  $("#lightbox-caption").textContent = photo.caption || "";
  const many = photoList.length > 1;
  $("#lb-prev").hidden = !many;
  $("#lb-next").hidden = !many;
}

function openPhoto(i) {
  showPhoto(i);
  const box = $("#lightbox");
  if (!box.open) box.showModal();
}

function initLightbox() {
  const box = $("#lightbox");
  $("#lb-close").addEventListener("click", () => box.close());
  $("#lb-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
  $("#lb-next").addEventListener("click", () => showPhoto(photoIndex + 1));
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showPhoto(photoIndex - 1);
    if (e.key === "ArrowRight") showPhoto(photoIndex + 1);
  });
}

/* ---------- Copy email ---------- */
function initCopy() {
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = "Copied!";
      } catch {
        window.prompt("Copy this email address:", btn.dataset.copy);
        return;
      }
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  });
}

/* ---------- Boot ---------- */
applySiteConfig();
initHeader();
initTabs();
initLightbox();
initCopy();
renderLogos();
renderMedia();
$("#year").textContent = new Date().getFullYear();
