// ==========================================================================
// Theme toggle
// ==========================================================================
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  root.setAttribute("data-theme", "light");
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ==========================================================================
// Mobile nav toggle
// ==========================================================================
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ==========================================================================
// Navbar scroll state + active section highlighting
// ==========================================================================
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const onScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);

  let current = sections[0]?.id;
  const offset = window.innerHeight * 0.35;

  sections.forEach((section) => {
    if (window.scrollY + offset >= section.offsetTop) {
      current = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ==========================================================================
// Scroll reveal animations
// ==========================================================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ==========================================================================
// Experience "show more" toggles
// ==========================================================================
document.querySelectorAll(".toggle-more").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    const isOpen = target.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.querySelector(".label").textContent = isOpen ? "Show less" : "Show more";
  });
});

// ==========================================================================
// Footer year
// ==========================================================================
document.getElementById("year").textContent = new Date().getFullYear();
