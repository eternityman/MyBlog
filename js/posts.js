/**
 * posts.js
 * Blog post data store — global variable consumed by main.js and router.js
 *
 * Each post's content lives in its own folder: posts/<folder>/content.html
 * Content is loaded asynchronously by router.js when viewing a post.
 */

const posts = [
  {
    id: 1,
    title: "Hello World - 我的第一篇博客",
    date: "2026-01-15",
    lastModified: "2026-01-15",
    folder: "hello-world",
    category: "随笔",
    tags: ["博客", "Hello World"],
    excerpt: "欢迎来到我的技术博客！这里将记录我的学习历程、技术分享和生活感悟。",
    readTime: 3
  },
  {
    id: 2,
    title: "如何使用 GitHub Pages 部署个人博客",
    date: "2026-01-22",
    lastModified: "2026-01-25",
    folder: "github-pages",
    category: "教程",
    tags: ["GitHub", "GitHub Pages", "部署"],
    excerpt: "GitHub Pages 是一个免费的静态网站托管服务，本文将详细介绍如何使用它来部署你的个人博客。",
    readTime: 8
  },
  {
    id: 3,
    title: "JavaScript 异步编程详解",
    date: "2026-02-05",
    lastModified: "2026-02-10",
    folder: "javascript-async",
    category: "技术",
    tags: ["JavaScript", "异步", "Promise", "async/await"],
    excerpt: "深入理解 JavaScript 中的异步编程模式，从回调函数到 Promise，再到 async/await 的演进历程。",
    readTime: 12
  },
  {
    id: 4,
    title: "2026 年前端技术趋势展望",
    date: "2026-02-20",
    lastModified: "2026-02-22",
    folder: "frontend-trends-2026",
    category: "技术",
    tags: ["前端", "技术趋势", "2026"],
    excerpt: "回顾过去一年前端领域的重大变化，展望 2026 年可能的技术趋势和发展方向。",
    readTime: 10
  }
];
