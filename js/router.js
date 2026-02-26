/**
 * router.js
 * URL-parameter-based routing for the blog.
 * Reads the `posts` array from posts.js (must be loaded first).
 *
 * Pages:
 *  post.html?slug=<folder>  → renderPostPage()
 *  archives.html     → renderArchivesPage()
 *  categories.html   → renderCategoriesPage()
 *  tags.html         → renderTagsPage()
 */

/* ── Utility ──────────────────────────────────── */

/** Get URL query param by name */
function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

/** Escape HTML special chars */
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Category → emoji mapping */
const CAT_ICONS = {
  "随笔": "✍️",
  "教程": "📖",
  "技术": "💻",
};
function catIcon(cat) { return CAT_ICONS[cat] || "📌"; }

/* ── Post Page ────────────────────────────────── */

/**
 * Load and render a single post by slug (folder name) or legacy numeric id.
 * Content is fetched from posts/<folder>/content.html.
 * Called when post.html is open.
 */
async function loadPost(slug) {
  const post = posts.find(p => p.folder === slug) || posts.find(p => p.id === Number(slug));
  const contentEl = document.getElementById("post-content");

  if (!post || !contentEl) {
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">😕</div>
          <p class="empty-state-text">文章不存在，<a href="index.html">返回首页</a></p>
        </div>`;
    }
    return;
  }

  // Page title
  document.title = `${post.title} - EternityBlog`;

  // Build last-modified display
  const modifiedHtml = post.lastModified && post.lastModified !== post.date
    ? `<span>✏️ 最后修改：${esc(post.lastModified)}</span>`
    : "";

  // Post header
  const header = document.getElementById("post-header");
  if (header) {
    header.innerHTML = `
      <span class="post-category">${esc(post.category)}</span>
      <h1>${esc(post.title)}</h1>
      <div class="post-meta">
        <span>📅 发表于 ${esc(post.date)}</span>
        ${modifiedHtml}
        <span>⏱️ 约 ${post.readTime} 分钟阅读</span>
      </div>
      <div class="post-tags">
        ${post.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}
      </div>`;
  }

  // Fetch article content from the post's own folder
  try {
    const res = await fetch(`posts/${post.folder}/content.html`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    contentEl.innerHTML = await res.text();
  } catch {
    contentEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">😕</div>
        <p class="empty-state-text">文章内容加载失败，<a href="index.html">返回首页</a></p>
      </div>`;
    return;
  }

  // Syntax highlighting (if highlight.js is loaded)
  if (window.hljs) {
    contentEl.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
  }

  // Build TOC
  buildTOC(contentEl);

  // Prev / Next navigation
  buildPostNav(post);
}

/** Build Table of Contents from h2/h3 headings in the article */
function buildTOC(contentEl) {
  const tocList = document.getElementById("toc-list");
  if (!tocList) return;

  const headings = contentEl.querySelectorAll("h2, h3");
  if (!headings.length) { tocList.closest(".toc-card")?.remove(); return; }

  const fragment = document.createDocumentFragment();

  headings.forEach((h, i) => {
    // Give heading an id so we can anchor to it
    const slug = `heading-${i}`;
    h.id = slug;

    const a = document.createElement("a");
    a.href = `#${slug}`;
    a.className = `toc-item ${h.tagName === "H3" ? "toc-h3" : ""}`;
    a.textContent = h.textContent;
    fragment.appendChild(a);
  });

  tocList.appendChild(fragment);

  // Highlight active TOC item on scroll
  const items = tocList.querySelectorAll(".toc-item");
  const headingList = Array.from(headings);

  const tocObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          items.forEach(i => i.classList.remove("active"));
          const idx = headingList.indexOf(e.target);
          if (idx >= 0) items[idx]?.classList.add("active");
        }
      });
    },
    { rootMargin: "-80px 0px -70% 0px" }
  );

  headingList.forEach(h => tocObserver.observe(h));
}

/** Render prev/next post navigation */
function buildPostNav(post) {
  const navEl = document.getElementById("post-nav");
  if (!navEl) return;

  const idx = posts.indexOf(post);
  const prev = posts[idx - 1] || null;
  const next = posts[idx + 1] || null;

  navEl.innerHTML = `
    ${prev ? `
      <a class="post-nav-item prev" href="post.html?slug=${prev.folder}">
        <div class="post-nav-label">← 上一篇</div>
        <div class="post-nav-title">${esc(prev.title)}</div>
      </a>` : `<div></div>`}
    ${next ? `
      <a class="post-nav-item next" href="post.html?slug=${next.folder}">
        <div class="post-nav-label">下一篇 →</div>
        <div class="post-nav-title">${esc(next.title)}</div>
      </a>` : `<div></div>`}
  `;
}

/** Entry point for post.html */
function renderPostPage() {
  const slug = getParam("slug") || getParam("id");
  if (slug) loadPost(slug);
}

/* ── Archives Page ────────────────────────────── */

function renderArchivesPage() {
  const container = document.getElementById("archives-container");
  if (!container) return;

  // Total count
  const countEl = document.getElementById("archives-count");
  if (countEl) countEl.textContent = `共 ${posts.length} 篇文章`;

  // Group by year
  const byYear = {};
  posts.forEach(p => {
    const year = p.date.slice(0, 4);
    (byYear[year] = byYear[year] || []).push(p);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);

  container.innerHTML = years.map(year => `
    <div class="timeline-year fade-in">
      <div class="timeline-year-label">${year} 年</div>
      <div class="timeline-posts">
        ${byYear[year]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map(p => `
            <div class="timeline-post">
              <span class="timeline-date">${p.date.slice(5)}</span>
              <a href="post.html?slug=${p.folder}">${esc(p.title)}</a>
              <span class="timeline-post-cat">${esc(p.category)}</span>
            </div>
          `).join("")}
      </div>
    </div>
  `).join("");

  // Trigger fade animations after render
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach(el => el.classList.add("visible"));
  }, 50);
}

/* ── Categories Page ──────────────────────────── */

function renderCategoriesPage() {
  const grid = document.getElementById("categories-grid");
  const postsSection = document.getElementById("category-posts-section");
  if (!grid) return;

  // Build category → posts map
  const catMap = {};
  posts.forEach(p => {
    (catMap[p.category] = catMap[p.category] || []).push(p);
  });

  const cats = Object.keys(catMap);

  // Render category cards
  grid.innerHTML = cats.map(cat => `
    <div class="category-card fade-in" data-cat="${esc(cat)}">
      <span class="category-icon">${catIcon(cat)}</span>
      <div class="category-name">${esc(cat)}</div>
      <div class="category-count">${catMap[cat].length} 篇文章</div>
    </div>
  `).join("");

  // Trigger fade animations
  setTimeout(() => {
    grid.querySelectorAll(".fade-in").forEach(el => el.classList.add("visible"));
  }, 50);

  // Click handler
  grid.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.cat;

      // Toggle active state
      grid.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      // Show posts
      if (postsSection) {
        const catPosts = catMap[cat] || [];
        postsSection.innerHTML = `
          <div class="category-posts-title">${catIcon(cat)} ${esc(cat)} · ${catPosts.length} 篇文章</div>
          <div class="category-post-list">
            ${catPosts.sort((a, b) => b.date.localeCompare(a.date)).map(p => `
              <div class="category-post-item">
                <a href="post.html?slug=${p.folder}">${esc(p.title)}</a>
                <time>${p.date}</time>
              </div>
            `).join("")}
          </div>`;
        postsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  // Auto-select first category
  grid.querySelector(".category-card")?.click();
}

/* ── Tags Page ────────────────────────────────── */

function renderTagsPage() {
  const cloud = document.getElementById("tag-cloud");
  const postsSection = document.getElementById("tag-posts-section");
  if (!cloud) return;

  // Build tag → posts map
  const tagMap = {};
  posts.forEach(p => {
    p.tags.forEach(t => {
      (tagMap[t] = tagMap[t] || []).push(p);
    });
  });

  const tagCounts = Object.entries(tagMap).map(([t, ps]) => ({ tag: t, count: ps.length }));
  const maxCount = Math.max(...tagCounts.map(x => x.count));

  // Font-size range: 0.85rem → 1.45rem
  function tagSize(count) {
    const ratio = maxCount > 1 ? (count - 1) / (maxCount - 1) : 0;
    return (0.85 + ratio * 0.6).toFixed(2);
  }

  cloud.innerHTML = tagCounts
    .sort((a, b) => b.count - a.count)
    .map(({ tag, count }) => `
      <span class="cloud-tag" data-tag="${esc(tag)}"
            style="font-size:${tagSize(count)}rem">
        ${esc(tag)} <sup>${count}</sup>
      </span>
    `).join("");

  // Click handler
  cloud.querySelectorAll(".cloud-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;

      cloud.querySelectorAll(".cloud-tag").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (postsSection) {
        const tagPosts = tagMap[tag] || [];
        postsSection.innerHTML = `
          <div class="category-posts-title">🏷️ ${esc(tag)} · ${tagPosts.length} 篇文章</div>
          <div class="category-post-list">
            ${tagPosts.sort((a, b) => b.date.localeCompare(a.date)).map(p => `
              <div class="category-post-item">
                <a href="post.html?slug=${p.folder}">${esc(p.title)}</a>
                <time>${p.date}</time>
              </div>
            `).join("")}
          </div>`;
        postsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  // Auto-select most-used tag
  cloud.querySelector(".cloud-tag")?.click();
}

/* ── Boot ──────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop() || "index.html";

  if (page === "post.html")       renderPostPage();
  if (page === "archives.html")   renderArchivesPage();
  if (page === "categories.html") renderCategoriesPage();
  if (page === "tags.html")       renderTagsPage();
});
