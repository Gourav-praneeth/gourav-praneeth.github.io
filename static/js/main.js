/* Small, dependency-free interactions for the portfolio. */

if (window.lucide) {
  window.lucide.createIcons();
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* Mobile navigation: keep visible state and accessibility state synchronized. */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

function setMenuOpen(open) {
  if (!menuBtn || !mobileNav) return;
  mobileNav.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}

/* Reveal content progressively. Content remains visible if JavaScript is unavailable. */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );
  revealItems.forEach((item) => observer.observe(item));
}

/* Contact form enhancement. Normal form submission remains the fallback. */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    const message = document.getElementById("formMsg");
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
    }
  });
}
