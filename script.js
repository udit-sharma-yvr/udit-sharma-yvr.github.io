/* ═══════════════════════════════════════════════════════════
   Udit Sharma — portfolio JS
   ═══════════════════════════════════════════════════════════ */

/* ── Footer year ── */
document.getElementById("yr").textContent = new Date().getFullYear();

/* ── Mobile nav ── */
const burger = document.querySelector(".burger");
const drawer = document.querySelector(".mobile-drawer");

burger.addEventListener("click", () => {
  const open = burger.classList.toggle("open");
  drawer.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  drawer.setAttribute("aria-hidden", String(!open));
});

// Close on link click
drawer.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    drawer.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
  });
});

/* ── Active nav highlight on scroll ── */
const navLinks   = document.querySelectorAll(".site-header nav a");
const sections   = document.querySelectorAll("section[id], .contact-section[id]");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      const match = document.querySelector(`.site-header nav a[href="#${e.target.id}"]`);
      if (match) match.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => sectionObserver.observe(s));

/* ── Scroll-reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("revealed");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -48px 0px" });

document.querySelectorAll("[data-reveal]").forEach(el => revealObserver.observe(el));

/* ── Experience accordion ── */
const expItems = document.querySelectorAll(".exp-item");

expItems.forEach(item => {
  const header = item.querySelector(".exp-header");
  const body   = item.querySelector(".exp-body");
  const toggle = item.querySelector(".exp-toggle");

  // Wrap body children in an inner div for the CSS grid trick
  const inner = document.createElement("div");
  inner.className = "exp-body-inner";
  while (body.firstChild) inner.appendChild(body.firstChild);
  body.appendChild(inner);

  header.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));

    // Close siblings
    expItems.forEach(other => {
      if (other !== item && other.classList.contains("open")) {
        other.classList.remove("open");
        other.querySelector(".exp-toggle").setAttribute("aria-expanded", "false");
      }
    });
  });

  // Open first item by default
  if (item === expItems[0]) {
    item.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }
});

/* ── Hero headline letter animation on load ── */
(function heroReveal() {
  const headline = document.querySelector(".hero-headline");
  if (!headline) return;

  headline.querySelectorAll(".line").forEach((line, i) => {
    line.style.opacity = "0";
    line.style.transform = "translateY(40px)";
    line.style.transition = `opacity .8s cubic-bezier(.16,1,.3,1) ${i * 0.14 + 0.1}s,
                              transform .8s cubic-bezier(.16,1,.3,1) ${i * 0.14 + 0.1}s`;

    // Trigger after paint
    requestAnimationFrame(() => requestAnimationFrame(() => {
      line.style.opacity = "1";
      line.style.transform = "none";
    }));
  });

  // Animate other hero children
  const heroKids = document.querySelectorAll(
    ".hero-top, .hero-sub-row, .hero-stats, .hero-cta-row, .current-badge"
  );
  heroKids.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity .7s cubic-bezier(.16,1,.3,1) ${i * 0.1 + 0.5}s,
                            transform .7s cubic-bezier(.16,1,.3,1) ${i * 0.1 + 0.5}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
    }));
  });
})();

/* ── Add data-reveal to section content (excluding hero) ── */
(function addReveal() {
  const targets = [
    ".about-grid",
    ".exp-list .exp-item",
    ".bento-card",
    ".edu-card",
    ".contact-inner",
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute("data-reveal", "");
      if (i > 0 && i <= 4) el.setAttribute("data-reveal-delay", String(i));
      revealObserver.observe(el);
    });
  });
})();
