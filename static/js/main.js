const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* A rectangular cursor replaces the native pointer only when the enhancement is active. */
const cursorAura = document.getElementById("cursorAura");

if (cursorAura && finePointer.matches && !reduceMotion.matches) {
  document.documentElement.classList.add("custom-cursor-ready");
  let cursorFrame = null;
  let cursorX = -32;
  let cursorY = -32;

  document.addEventListener("pointermove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursorAura.classList.add("is-visible");
    cursorAura.classList.toggle("is-interactive", Boolean(event.target.closest("a, button, input, textarea, [role='tab']")));
    cursorAura.classList.toggle("is-on-dark", Boolean(event.target.closest(".hero-section, .contact-section, .site-footer")));

    if (cursorFrame !== null) return;
    cursorFrame = window.requestAnimationFrame(() => {
      cursorAura.style.setProperty("--cursor-x", `${cursorX}px`);
      cursorAura.style.setProperty("--cursor-y", `${cursorY}px`);
      cursorFrame = null;
    });
  });

  document.addEventListener("pointerdown", () => cursorAura.classList.add("is-pressed"));
  document.addEventListener("pointerup", () => cursorAura.classList.remove("is-pressed"));
  document.documentElement.addEventListener("mouseleave", () => cursorAura.classList.remove("is-visible"));
}

/* Compact mobile navigation with predictable focus and Escape behavior. */
const menuButton = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

function setMenu(open) {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Close" : "Menu";
  mobileNav.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  if (open) mobileNav.querySelector("a")?.focus();
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024 && menuButton?.getAttribute("aria-expanded") === "true") setMenu(false);
});

/* Reading progress and active section state. */
const scrollProgress = document.getElementById("scrollProgress");
let scrollFrame = null;

function updateScrollEffects() {
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollMax > 0 ? Math.min(window.scrollY / scrollMax, 1) : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;

  scrollFrame = null;
}

function requestScrollUpdate() {
  if (scrollFrame !== null) return;
  scrollFrame = window.requestAnimationFrame(updateScrollEffects);
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollEffects();

/* Fine-pointer parallax gives the real work a quiet, tactile response. */
if (finePointer.matches && !reduceMotion.matches) {
  document.querySelectorAll("[data-pointer-shift]").forEach((element) => {
    const strength = Number(element.dataset.pointerShift || 4);
    let pointerFrame = null;

    element.addEventListener("pointermove", (event) => {
      if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength;
        element.style.setProperty("--pointer-x", `${x}px`);
        element.style.setProperty("--pointer-y", `${y}px`);
        pointerFrame = null;
      });
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--pointer-x", "0px");
      element.style.setProperty("--pointer-y", "0px");
    });
  });
}

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = ["work", "experience", "capabilities", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        if (link.hash === `#${visible.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-22% 0px -66% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

/* Section entrances are enabled only after JavaScript is confirmed available. */
const revealItems = [...document.querySelectorAll(".reveal")];
if (!reduceMotion.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

/* Keyboard-operable project evidence explorers. */
document.querySelectorAll("[data-evidence-explorer]").forEach((explorer) => {
  const tabs = [...explorer.querySelectorAll("[data-evidence-tab]")];
  const panels = [...explorer.querySelectorAll("[data-evidence-panel]")];

  function selectTab(index, moveFocus = false) {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
    });
    if (!reduceMotion.matches) {
      const activePanel = panels[index];
      activePanel.classList.remove("is-entering");
      window.requestAnimationFrame(() => activePanel.classList.add("is-entering"));
      activePanel.addEventListener("animationend", () => activePanel.classList.remove("is-entering"), { once: true });
    }
    if (moveFocus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(next, true);
    });
  });
});

/* Formspree enhancement; native form submission remains the fallback. */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMsg");

contactForm?.addEventListener("submit", async (event) => {
  if (!contactForm.action) return;
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalLabel = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  if (formMessage) formMessage.textContent = "";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Form submission failed");
    contactForm.reset();
    if (formMessage) formMessage.textContent = "Thanks—your message is on its way.";
  } catch {
    if (formMessage) {
      formMessage.innerHTML = `Something went wrong. Email <a href="mailto:gouravprb610@gmail.com">gouravprb610@gmail.com</a> instead.`;
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
});
