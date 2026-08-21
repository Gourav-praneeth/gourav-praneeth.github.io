/* ======================================================================
   main.js — all the small interactive behaviours.
   Kept dependency-free (plain vanilla JS) so there's no build step.
   ====================================================================== */

/* Render all Lucide icons that use <i data-lucide="..."> */
lucide.createIcons();

/* ---- Current year in the footer ---- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Mobile menu toggle ---- */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn.addEventListener("click", () => mobileNav.classList.toggle("hidden"));
mobileNav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => mobileNav.classList.add("hidden")));

/* ---- Ability Scores: tab switching ---- */
const statTabs = document.querySelectorAll(".stat-tab");
const statPanels = document.querySelectorAll(".stat-panel");

function setActiveTab(activeBtn) {
  statTabs.forEach((t) => {
    const on = t === activeBtn;
    t.classList.toggle("bg-gold", on);
    t.classList.toggle("text-table", on);
    t.classList.toggle("bg-felt", !on);
    t.classList.toggle("text-parchment/80", !on);
  });
}

statTabs.forEach((btn) =>
  btn.addEventListener("click", () => {
    setActiveTab(btn);
    const tab = btn.dataset.tab;
    statPanels.forEach((p) => p.classList.toggle("hidden", p.dataset.panel !== tab));
    animateBars(); // fill the bars in the newly-shown panel
  })
);

/* ---- Stat bars: animate width for whichever panel is visible ---- */
function animateBars() {
  document.querySelectorAll(".stat-panel:not(.hidden) .stat-fill").forEach((bar) => {
    bar.style.width = bar.dataset.val + "%";
  });
}

/* ---- Project cards: flip on "Inspect" / "Flip back" ---- */
document.querySelectorAll(".project-card").forEach((card) => {
  card.querySelectorAll(".inspect-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("is-flipped");
    });
  });
});

/* ---- Project cards: filter mechanic ---- */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      const on = b === btn;
      b.classList.toggle("bg-gold", on);
      b.classList.toggle("text-table", on);
      b.classList.toggle("bg-felt", !on);
      b.classList.toggle("text-parchment/80", !on);
    });
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
      card.classList.remove("is-flipped"); // reset flipped state on filter
    });
  })
);

/* ---- Reveal-on-scroll (IntersectionObserver) ---- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        if (entry.target.querySelector && entry.target.querySelector(".stat-fill")) {
          animateBars();
        }
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* Fill bars on load too, in case the stats section is already in view */
window.addEventListener("load", animateBars);

/* ---- Contact form ----
   - If the <form> has an action (Formspree endpoint set in data.py), we let it
     submit for real but show a "sending" note via fetch for a nicer UX.
   - If there's no action, we just show a friendly demo message. */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    const msg = document.getElementById("formMsg");
    const hasEndpoint = contactForm.hasAttribute("action");

    if (!hasEndpoint) {
      // Demo mode — no backend configured yet.
      e.preventDefault();
      msg.textContent =
        "✦ Turn ended! Set your Formspree endpoint in content/data.py to actually receive messages.";
      msg.classList.remove("hidden");
      contactForm.reset();
      return;
    }

    // Real submission via fetch so the page doesn't navigate away.
    e.preventDefault();
    msg.textContent = "Sending your raven…";
    msg.classList.remove("hidden");
    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        msg.textContent = "✦ Victory! Your message has been sent.";
        contactForm.reset();
      } else {
        msg.textContent = "⚔ The raven got lost. Please try again or email me directly.";
      }
    } catch (err) {
      msg.textContent = "⚔ The raven got lost. Please try again or email me directly.";
    }
  });
}
