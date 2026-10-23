const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* The work index is the page's live thing: choose a problem and its evidence replaces in place. */
const projectTabs = [...document.querySelectorAll("[data-project-tab]")];
const projectPanels = [...document.querySelectorAll("[role='tabpanel']")];

function selectProject(tab, { moveFocus = false } = {}) {
  projectTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });

  projectPanels.forEach((panel) => {
    const active = panel.id === tab.getAttribute("aria-controls");
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });

  if (moveFocus) tab.focus();
}

projectTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProject(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (index + 1) % projectTabs.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (index - 1 + projectTabs.length) % projectTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projectTabs.length - 1;
    selectProject(projectTabs[nextIndex], { moveFocus: true });
  });
});

if (projectTabs.length) selectProject(projectTabs.find((tab) => tab.classList.contains("is-active")) || projectTabs[0]);

/* Choreographed section entrances fire once and stay readable without JavaScript. */
const revealItems = [...document.querySelectorAll("[data-reveal]")];

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-in"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

/* A few proof figures roll into place once. Their actual values remain in the document. */
const rollingFigures = [...document.querySelectorAll("[data-roll]")];

rollingFigures.forEach((element) => {
  const value = element.textContent.trim();
  const spoken = document.createElement("span");
  spoken.className = "sr-only";
  spoken.textContent = value;
  const shown = document.createElement("span");
  shown.className = "roll__digits";
  shown.setAttribute("aria-hidden", "true");
  let digitIndex = 0;

  for (const character of value) {
    if (!/\d/.test(character)) {
      shown.append(character);
      continue;
    }
    const column = document.createElement("span");
    column.className = "roll__col";
    const strip = document.createElement("span");
    strip.className = "roll__strip";
    strip.style.setProperty("--d", character);
    strip.style.setProperty("--i", digitIndex);
    digitIndex += 1;
    for (let number = 0; number < 10; number += 1) {
      const digit = document.createElement("span");
      digit.textContent = number;
      strip.append(digit);
    }
    column.append(strip);
    shown.append(column);
  }

  element.classList.add("roll");
  element.replaceChildren(spoken, shown);
});

if (rollingFigures.length) {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    rollingFigures.forEach((element) => element.classList.add("is-in"));
  } else {
    const figureObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        figureObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -15% 0px" });
    rollingFigures.forEach((element) => figureObserver.observe(element));
  }
}

/* Submit asynchronously while preserving the normal form action as a fallback. */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    const message = document.getElementById("formMsg");
    const submitButton = contactForm.querySelector("button[type='submit']");
    if (!contactForm.hasAttribute("action")) {
      event.preventDefault();
      message.textContent = "The form is not connected yet. Please email me directly.";
      return;
    }

    event.preventDefault();
    message.textContent = "Sending…";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      message.textContent = "Thanks. Your message has been sent.";
      contactForm.reset();
    } catch (error) {
      message.textContent = "Something went wrong. Please try again or email me directly.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
