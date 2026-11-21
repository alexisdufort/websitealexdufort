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


/* ---------- Media wins ---------- */
const WIN_TYPES = { affiliate: "Affiliate", editorial: "Earned media", sponsored: "Sponsored campaign", partner: "Partner post" };
const WINS_LIMIT = 9;
let winsFilter = "All";
let winsExpanded = false;

/* Outlet icon: images/logos/<domain>.png, or a "logo" path set in content.js. */
function winLogo(w) {
  let host = "";
  try { host = new URL(w.url).hostname.replace(/^www\./, ""); } catch { /* no URL */ }
  const fallback = () => h("span", { class: "win-logo win-logo-fallback", "aria-hidden": "true", text: (w.outlet || "?").charAt(0) });
  if (!w.logo && !host) return fallback();
  const img = h("img", { class: "win-logo", src: w.logo || `images/logos/${host}.png`, alt: "", width: "36", height: "36", loading: "lazy" });
  img.addEventListener("error", () => img.replaceWith(fallback()), { once: true });
  return img;
}

function renderWins(focusFilter = false) {
  const section = $("#wins");
  const items = typeof WINS !== "undefined" ? WINS : [];
  section.hidden = items.length === 0;
  if (!items.length) return;


  const categories = ["All", ...new Set(items.map((w) => w.category))];
  $("#wins-filters").replaceChildren(...categories.map((cat) => {
    const btn = h("button", { class: "filter", type: "button", "aria-pressed": String(cat === winsFilter), text: cat });
    btn.addEventListener("click", () => { winsFilter = cat; winsExpanded = false; renderWins(true); });
    return btn;
  }));
  if (focusFilter) $('#wins-filters [aria-pressed="true"]').focus();

  const filtered = items
    .filter((w) => winsFilter === "All" || w.category === winsFilter)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const shown = winsExpanded ? filtered : filtered.slice(0, WINS_LIMIT);

  $("#wins-list").replaceChildren(...shown.map((w) => h("li", { class: "win" },
    h("div", { class: "win-top" },
      h("span", { class: "win-outlet" }, winLogo(w), h("span", { text: w.outlet })),
      w.date ? h("span", { class: "win-date", text: w.date }) : null),
    h("a", { class: "win-title", href: w.url, target: "_blank", rel: "noopener", text: w.title }),
    h("div", { class: "win-tags" },
      w.placement ? h("span", { class: "tag tag-blue", text: w.placement }) : null,
      WIN_TYPES[w.type] ? h("span", { class: "tag", text: WIN_TYPES[w.type] }) : null))));

  const more = $("#wins-more");
  more.hidden = filtered.length <= WINS_LIMIT;
  more.textContent = winsExpanded ? "Show less" : "Show all";
  more.setAttribute("aria-expanded", String(winsExpanded));
}

/* "Featured in" bar: icon + outlet name for every win marked featured. */
function renderFeatured() {
  const section = $("#featured");
  const items = (typeof WINS !== "undefined" ? WINS : []).filter((w) => w.featured);
  section.hidden = items.length === 0;
  $("#featured-list").replaceChildren(...items.map((w) =>
    h("a", { class: "featured-item", href: w.url, target: "_blank", rel: "noopener" }, winLogo(w), h("span", { text: w.outlet }))));
}

function initWins() {
  $("#wins-more").addEventListener("click", () => { winsExpanded = !winsExpanded; renderWins(); });
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
    if (window.scrollY < 120) setActive("");
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

  $("#appearances-empty").hidden = appearances.length > 0;
  $("#speaking-grid").classList.toggle("no-photos", photoList.length === 0);
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

/* ---------- Contact form ---------- */
const CONTACT_EMAIL = "a@alexdufort.com";

function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;
  const status = $("#form-status");
  const field = (name) => form.elements.namedItem(name);
  const submit = form.querySelector('button[type="submit"]');
  // Service pages pre-select their own service.
  if (form.dataset.defaultNeed) field("need").value = form.dataset.defaultNeed;

  const setError = (input, message) => {
    const wrap = input.closest(".field");
    let err = wrap.querySelector(".field-error");
    if (!err) { err = h("span", { class: "field-error", id: `${input.name}-error` }); wrap.append(err); }
    err.textContent = message || "";
    wrap.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (message) input.setAttribute("aria-describedby", err.id); else input.removeAttribute("aria-describedby");
  };
  const clearError = (e) => { if (e.target.closest(".field")) setError(e.target, ""); };
  form.addEventListener("input", clearError);
  form.addEventListener("change", clearError);

  const showStatus = (kind, text) => { status.className = `form-status ${kind}`; status.textContent = text; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const values = {
      name: field("name").value.trim(),
      email: field("email").value.trim(),
      company: field("company").value.trim(),
      need: field("need").value,
      message: field("message").value.trim(),
    };
    const checks = [
      ["name", values.name ? "" : "Enter your name."],
      ["email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "" : "Enter a valid email address."],
      ["need", values.need ? "" : "Choose what you need."],
      ["message", values.message ? "" : "Add a short message."],
    ];
    let firstInvalid = null;
    checks.forEach(([name, message]) => {
      setError(field(name), message);
      if (message && !firstInvalid) firstInvalid = field(name);
    });
    if (firstInvalid) { status.textContent = ""; firstInvalid.focus(); return; }

    // Spam bots fill the hidden field; pretend it worked and send nothing.
    if (field("_gotcha").value) { form.reset(); showStatus("ok", "Thanks, your message is on its way."); return; }

    const endpoint = (SITE.formEndpoint || "").trim();
    if (!endpoint) {
      // No form service yet: open the visitor's email app with everything filled in.
      const subject = `Website inquiry: ${values.need} (${values.name})`;
      const lines = [`Name: ${values.name}`, `Email: ${values.email}`];
      if (values.company) lines.push(`Company: ${values.company}`);
      lines.push(`Need: ${values.need}`, "", values.message);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      showStatus("ok", "Your email app should open with your message ready to send.");
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      showStatus("ok", "Thanks, your message is on its way. I'll get back to you soon.");
    } catch {
      showStatus("err", `Something went wrong. Please email me directly at ${CONTACT_EMAIL}.`);
    } finally {
      submit.disabled = false;
      submit.textContent = "Send message";
    }
  });

  // "Discuss an audit" and the other Work with me buttons pre-select the need.
  $$("[data-need]").forEach((link) => {
    link.addEventListener("click", () => {
      const select = field("need");
      select.value = link.dataset.need;
      setError(select, "");
    });
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
// Shared by every page; the service pages don't have the home-only sections.
applySiteConfig();
initHeader();
initCopy();
initContactForm();
if ($("#lightbox")) initLightbox();
if ($("#featured")) renderFeatured();
if ($("#wins-list")) { initWins(); renderWins(); }
if ($("#appearances-list")) renderMedia();
$("#year").textContent = new Date().getFullYear();
