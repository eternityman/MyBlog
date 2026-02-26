/**
 * main.js
 * Core blog functionality:
 *  - Theme toggle (light / dark)
 *  - Mobile hamburger menu
 *  - Search overlay
 *  - Back-to-top button
 *  - Scroll animations via IntersectionObserver
 *  - Reading progress bar (post.html)
 *  - Stats calculation
 */

/* ── Helpers ───────────────────────────────── */

/**
 * Returns a formatted "YYYY-MM-DD" string.
 * @param {Date} d
 */
function fmtDate(d) {
  return d.toISOString().split("T")[0];
}

/**
 * Calculate how many full days the blog has been running.
 * Start date is taken from the oldest post.
 */
function calcRunDays() {
  if (typeof posts === "undefined" || !posts.length) return 0;
  const start = new Date(
    posts.reduce((min, p) => (p.date < min ? p.date : min), posts[0].date)
  );
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}

/* ── Theme ─────────────────────────────────── */

function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme, false);

  const btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", toggleTheme);
}

function applyTheme(theme, save = true) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  if (save) localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

/* ── Mobile Menu ────────────────────────────── */

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    })
  );
}

/* ── Search ─────────────────────────────────── */

function initSearch() {
  const searchBtn = document.getElementById("search-toggle");
  const searchWrapper = document.querySelector(".search-wrapper");
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results-container");

  if (!searchBtn || !searchWrapper) return;

  searchBtn.addEventListener("click", () => {
    searchWrapper.classList.toggle("open");
    if (searchWrapper.classList.contains("open") && searchInput) {
      setTimeout(() => searchInput.focus(), 350);
    } else {
      clearSearch();
    }
  });

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { clearSearch(); return; }

    const matched = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.excerpt.toLowerCase().includes(q)
    );
    renderSearchResults(matched, resultsContainer);
  });

  // Close search on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && searchWrapper.classList.contains("open")) {
      searchWrapper.classList.remove("open");
      clearSearch();
    }
  });
}

function renderSearchResults(results, container) {
  if (!container) return;
  if (!results.length) {
    container.innerHTML = `<div class="search-results-list"><div class="search-result-item"><span class="result-title">没有找到相关文章</span></div></div>`;
    return;
  }
  const html = results.map(p => `
    <a class="search-result-item" href="post.html?id=${p.id}">
      <div class="result-title">${p.title}</div>
      <div class="result-meta">${p.date} · ${p.category} · ${p.tags.join(", ")}</div>
    </a>
  `).join("");
  container.innerHTML = `<div class="search-results-list">${html}</div>`;
}

function clearSearch() {
  const input = document.getElementById("search-input");
  const container = document.getElementById("search-results-container");
  if (input) input.value = "";
  if (container) container.innerHTML = "";
}

/* ── Back to Top ─────────────────────────────── */

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── Scroll Animations ──────────────────────── */

function initScrollAnimations() {
  const targets = document.querySelectorAll(".fade-in");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

/* ── Reading Progress Bar ──────────────────── */

function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  function update() {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docH > 0 ? (window.scrollY / docH * 100) + "%" : "0%";
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ── Stats ──────────────────────────────────── */

function initStats() {
  if (typeof posts === "undefined") return;

  const totalPosts = posts.length;
  const categories = [...new Set(posts.map(p => p.category))];
  const tags = [...new Set(posts.flatMap(p => p.tags))];
  const runDays = calcRunDays();

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set("stat-posts", totalPosts);
  set("stat-categories", categories.length);
  set("stat-tags", tags.length);
  set("stat-days", runDays);
}

/* ── Active Nav Link ────────────────────────── */

function markActiveNavLink() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

/* ── Avatar Interaction ─────────────────────── */

function initAvatarInteraction() {
  const avatar = document.querySelector(".hero-avatar");
  if (!avatar) return;

  avatar.style.cursor = "pointer";

  avatar.addEventListener("click", (e) => {
    // Spin animation
    avatar.classList.add("avatar-spin");
    setTimeout(() => avatar.classList.remove("avatar-spin"), 800);

    // Create floating particles
    const rect = avatar.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ["✨", "🎉", "💫", "⭐", "🌟", "🚀", "❤️", "🎈"];

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("span");
      particle.className = "avatar-particle";
      particle.textContent = emojis[i % emojis.length];
      particle.style.left = cx + "px";
      particle.style.top = cy + "px";
      const angle = (Math.PI * 2 / 8) * i;
      particle.style.setProperty("--dx", Math.cos(angle) * 80 + "px");
      particle.style.setProperty("--dy", Math.sin(angle) * 80 + "px");
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 900);
    }
  });
}

/* ── Init ──────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initSearch();
  initBackToTop();
  initScrollAnimations();
  initProgressBar();
  initStats();
  markActiveNavLink();
  initAvatarInteraction();
});
