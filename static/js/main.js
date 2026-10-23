/* Lightweight, dependency-free interaction system for the portfolio. */

if (window.lucide) {
  window.lucide.createIcons();
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

/* Roll the hero name once while keeping the original text as the no-JS fallback. */
function initializeTextRoll() {
  if (reduceMotionQuery.matches) return;

  document.querySelectorAll("[data-text-roll]").forEach((element) => {
    const label = element.textContent.trim();
    if (!label) return;
    element.textContent = "";
    const accessibleLabel = document.createElement("span");
    accessibleLabel.className = "sr-only";
    accessibleLabel.textContent = label;
    element.append(accessibleLabel);
    let characterIndex = 0;

    label.split(/\s+/).forEach((word) => {
      const wordElement = document.createElement("span");
      wordElement.className = "text-roll-word";
      wordElement.setAttribute("aria-hidden", "true");

      [...word].forEach((character) => {
        const letter = document.createElement("span");
        letter.className = "text-roll-letter";
        letter.style.setProperty("--roll-delay", `${characterIndex * 32}ms`);
        letter.innerHTML = `<span class="text-roll-reserve" data-character="${character}"></span><span class="text-roll-face text-roll-outgoing" data-character="${character}"></span><span class="text-roll-face text-roll-incoming" data-character="${character}"></span>`;
        wordElement.append(letter);
        characterIndex += 1;
      });

      element.append(wordElement);
    });
  });
}

/* Split menu labels into two faces so hover travels through each word like a ripple. */
function initializeKineticNavLabels() {
  if (reduceMotionQuery.matches) return;

  document.querySelectorAll("[data-kinetic-label]").forEach((element) => {
    const label = element.textContent.trim();
    element.setAttribute("aria-label", label);
    element.textContent = "";

    [...label].forEach((character, index) => {
      const letter = document.createElement("span");
      letter.className = "kinetic-char";
      letter.style.setProperty("--kinetic-index", index);
      letter.setAttribute("aria-hidden", "true");
      letter.innerHTML = `<span class="kinetic-char-reserve">${character}</span><span class="kinetic-char-face kinetic-char-current">${character}</span><span class="kinetic-char-face kinetic-char-next">${character}</span>`;
      element.append(letter);
    });
  });
}

initializeTextRoll();
initializeKineticNavLabels();

/* Full-screen navigation: synchronize reveal, focus, and page inertness. */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const mainContent = document.getElementById("main-content");
const siteFooter = document.querySelector("footer");
let menuCloseTimer = null;

function setMenuOpen(open, { moveFocus = false } = {}) {
  if (!menuBtn || !mobileNav) return;
  window.clearTimeout(menuCloseTimer);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.querySelector(".kinetic-menu-word").textContent = open ? "Close" : "Menu";
  mobileNav.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("nav-open", open);
  if (mainContent) mainContent.inert = open;
  if (siteFooter) siteFooter.inert = open;

  if (open) {
    mobileNav.hidden = false;
    window.requestAnimationFrame(() => {
      mobileNav.classList.add("is-open");
      if (moveFocus) mobileNav.querySelector("a")?.focus();
    });
  } else {
    mobileNav.classList.remove("is-open");
    menuCloseTimer = window.setTimeout(() => {
      mobileNav.hidden = true;
    }, reduceMotionQuery.matches ? 0 : 720);
  }
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true", { moveFocus: true });
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (menuBtn.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") {
      setMenuOpen(false);
      menuBtn.focus();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [...mobileNav.querySelectorAll("a[href]")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

/* Reading progress and a slightly more defined header after the first scroll. */
const siteHeader = document.getElementById("siteHeader");
const scrollProgress = document.getElementById("scrollProgress");
let scrollFrame = null;

function updateScrollChrome() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
  if (siteHeader) siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  scrollFrame = null;
}

function requestScrollChromeUpdate() {
  if (scrollFrame !== null) return;
  scrollFrame = window.requestAnimationFrame(updateScrollChrome);
}

window.addEventListener("scroll", requestScrollChromeUpdate, { passive: true });
window.addEventListener("resize", requestScrollChromeUpdate);
updateScrollChrome();

/* Reveal content progressively. Content remains visible when JavaScript is unavailable. */
const revealItems = document.querySelectorAll(".reveal");

function showAllRevealItems() {
  revealItems.forEach((item) => item.classList.add("in"));
}

if (reduceMotionQuery.matches || !("IntersectionObserver" in window)) {
  showAllRevealItems();
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

/* Keep both desktop and mobile navigation aware of the section in view. */
const navLinks = [...document.querySelectorAll(".nav-link")];
const navSectionIds = [...new Set(navLinks.map((link) => link.hash.slice(1)))];
const navSections = navSectionIds.map((id) => document.getElementById(id)).filter(Boolean);

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if ("IntersectionObserver" in window && navSections.length) {
  const visibleSections = new Map();
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.boundingClientRect.top);
        else visibleSections.delete(entry.target.id);
      });

      if (!visibleSections.size) return;
      const activeId = [...visibleSections.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0][0];
      setActiveSection(activeId);
    },
    { rootMargin: "-24% 0px -62% 0px", threshold: 0 }
  );

  navSections.forEach((section) => sectionObserver.observe(section));
}

/* Subtle pointer depth is enabled only for precise pointing devices. */
function initializeTilt() {
  if (!finePointerQuery.matches || reduceMotionQuery.matches) return;

  document.querySelectorAll("[data-tilt]").forEach((element) => {
    const strength = Number(element.dataset.tiltStrength || 3);
    let tiltFrame = null;

    element.addEventListener("pointermove", (event) => {
      if (tiltFrame !== null) window.cancelAnimationFrame(tiltFrame);
      tiltFrame = window.requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty("--tilt-x", `${-y * strength}deg`);
        element.style.setProperty("--tilt-y", `${x * strength}deg`);
        tiltFrame = null;
      });
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    });
  });

  document.querySelectorAll("[data-pointer-glow]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      element.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    });
  });
}

initializeTilt();

/* Contact form enhancement. Normal form submission remains the fallback. */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    const message = document.getElementById("formMsg");
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const hasEndpoint = contactForm.hasAttribute("action");

    if (!hasEndpoint) {
      event.preventDefault();
      message.textContent = "The contact form is not connected yet. Please email me directly.";
      message.classList.remove("hidden");
      return;
    }

    event.preventDefault();
    message.textContent = "Sending…";
    message.classList.remove("hidden");
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      message.textContent = "Thanks—your message has been sent.";
      contactForm.reset();
    } catch (error) {
      message.textContent = "Something went wrong. Please try again or email me directly.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
