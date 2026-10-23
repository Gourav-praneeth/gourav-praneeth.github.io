/* Lightweight, dependency-free interaction system for the portfolio. */

if (window.lucide) {
  window.lucide.createIcons();
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

/* Mobile navigation: synchronize visibility, focus, and accessibility state. */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

function setMenuOpen(open, { moveFocus = false } = {}) {
  if (!menuBtn || !mobileNav) return;
  mobileNav.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");

  if (open && moveFocus) {
    mobileNav.querySelector("a")?.focus();
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
    if (event.key !== "Escape" || menuBtn.getAttribute("aria-expanded") !== "true") return;
    setMenuOpen(false);
    menuBtn.focus();
  });

  document.addEventListener("click", (event) => {
    if (menuBtn.getAttribute("aria-expanded") !== "true") return;
    if (mobileNav.contains(event.target) || menuBtn.contains(event.target)) return;
    setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMenuOpen(false);
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
