/**
 * posts.js
 * Blog post data store — global variable consumed by main.js and router.js
 */

const posts = [
  {
    id: 1,
    title: "Hello World - 我的第一篇博客",
    date: "2026-01-15",
    category: "随笔",
    tags: ["博客", "Hello World"],
    excerpt: "欢迎来到我的技术博客！这里将记录我的学习历程、技术分享和生活感悟。",
    readTime: 3,
    content: `
      <h2>你好，世界！</h2>
      <p>欢迎来到 <strong>EternityBlog</strong>！这是我的第一篇博客文章，也是这个技术博客的开篇之作。在这里，我将分享我的技术学习心得、项目经验以及对行业趋势的一些思考。</p>

      <h2>为什么要写博客？</h2>
      <p>很多人问我：在这个信息爆炸的时代，还有必要写博客吗？我的答案是——非常有必要。写博客对我来说至少有以下几点意义：</p>
      <ul>
        <li><strong>整理思路</strong>：写作是最好的思维整理方式，把模糊的想法变成清晰的文字，本身就是一种深度学习。</li>
        <li><strong>知识沉淀</strong>：技术更新迭代很快，记录下来的知识不会随着时间消逝，反而会成为未来的财富。</li>
        <li><strong>分享与交流</strong>：如果我的文章能帮助到一个遇到同样困惑的人，那就很有价值了。</li>
        <li><strong>个人品牌</strong>：持续输出高质量内容，能让更多人了解你、信任你。</li>
      </ul>

      <h2>博客的内容规划</h2>
      <p>这个博客将主要包含以下几类内容：</p>
      <ul>
        <li>🛠️ <strong>技术教程</strong>：前端开发、JavaScript、Vue.js、React 等相关技术的深度解析。</li>
        <li>💡 <strong>学习笔记</strong>：读书笔记、课程总结、知识梳理。</li>
        <li>🚀 <strong>项目分享</strong>：个人项目的开发过程、遇到的坑和解决方案。</li>
        <li>✍️ <strong>随笔感悟</strong>：生活中的所思所想，不局限于技术。</li>
      </ul>

      <h2>关于我</h2>
      <p>我是 Eternity，一名热爱技术的前端开发者。平时喜欢折腾各种新技术，研究开源项目，也喜欢写作和分享。如果你有任何问题或建议，欢迎通过文章底部的联系方式与我交流。</p>

      <blockquote>
        "纸上得来终觉浅，绝知此事要躬行。" —— 陆游
      </blockquote>

      <p>希望这个博客能成为我们共同成长的地方。让我们一起出发吧！🎉</p>
    `
  },
  {
    id: 2,
    title: "如何使用 GitHub Pages 部署个人博客",
    date: "2026-01-22",
    category: "教程",
    tags: ["GitHub", "GitHub Pages", "部署"],
    excerpt: "GitHub Pages 是一个免费的静态网站托管服务，本文将详细介绍如何使用它来部署你的个人博客。",
    readTime: 8,
    content: `
      <h2>什么是 GitHub Pages？</h2>
      <p>GitHub Pages 是 GitHub 提供的一项静态网站托管服务，允许你直接从 GitHub 仓库发布网站。它完全免费，支持自定义域名，并且自动提供 HTTPS 加密。对于个人博客、项目文档或作品集来说，是非常理想的选择。</p>

      <h2>前期准备</h2>
      <p>在开始之前，你需要准备以下内容：</p>
      <ul>
        <li>一个 GitHub 账号（免费注册即可）</li>
        <li>Git 工具（<a href="https://git-scm.com/" target="_blank">下载地址</a>）</li>
        <li>你的博客静态文件（HTML、CSS、JavaScript）</li>
      </ul>

      <h2>部署步骤</h2>

      <h3>第一步：创建仓库</h3>
      <p>登录 GitHub，点击右上角的 <code>+</code> 按钮，选择 <strong>New repository</strong>。</p>
      <ul>
        <li>仓库名称建议使用 <code>username.github.io</code> 格式（username 替换为你的 GitHub 用户名），这样你的博客地址就是 <code>https://username.github.io</code>。</li>
        <li>或者使用任意名称，博客地址则为 <code>https://username.github.io/repo-name</code>。</li>
        <li>将仓库设为 Public（公开）。</li>
      </ul>

      <h3>第二步：推送代码</h3>
      <p>将博客文件推送到仓库的 <code>main</code> 分支：</p>
      <pre><code class="language-bash"># 初始化本地仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Add blog files"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/username/repo-name.git

# 推送到 main 分支
git push -u origin main</code></pre>

      <h3>第三步：配置 GitHub Pages</h3>
      <p>进入仓库的 <strong>Settings</strong> → <strong>Pages</strong>，在 Source 部分选择：</p>
      <ul>
        <li>Branch: <code>main</code></li>
        <li>Folder: <code>/ (root)</code></li>
      </ul>
      <p>点击 Save，稍等片刻，你的博客就上线了！</p>

      <h3>第四步（可选）：使用 GitHub Actions 自动部署</h3>
      <p>在仓库根目录创建 <code>.github/workflows/deploy.yml</code> 文件，实现每次推送代码后自动部署：</p>
      <pre><code class="language-yaml">name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4</code></pre>

      <h2>自定义域名</h2>
      <p>如果你有自己的域名，可以在 Pages 设置中绑定。在仓库根目录创建名为 <code>CNAME</code> 的文件，内容为你的域名（如 <code>blog.example.com</code>），然后在 DNS 服务商处添加 CNAME 记录指向 <code>username.github.io</code> 即可。</p>

      <h2>小结</h2>
      <p>GitHub Pages 是部署静态博客最简单、最经济的方式之一。配合 GitHub Actions，可以实现全自动的 CI/CD 工作流。希望这篇文章能帮你顺利上线自己的博客！</p>
    `
  },
  {
    id: 3,
    title: "JavaScript 异步编程详解",
    date: "2026-02-05",
    category: "技术",
    tags: ["JavaScript", "异步", "Promise", "async/await"],
    excerpt: "深入理解 JavaScript 中的异步编程模式，从回调函数到 Promise，再到 async/await 的演进历程。",
    readTime: 12,
    content: `
      <h2>为什么需要异步编程？</h2>
      <p>JavaScript 是单线程语言，一次只能执行一个任务。如果某个操作（如网络请求、读取文件）需要很长时间，会阻塞整个线程，导致页面卡死。<strong>异步编程</strong>允许我们在等待耗时操作的同时继续执行其他代码，极大地提升了程序的响应性和效率。</p>

      <h2>阶段一：回调函数 (Callback)</h2>
      <p>最原始的异步处理方式就是回调函数——将函数作为参数传入，在操作完成后调用它。</p>
      <pre><code class="language-javascript">function fetchData(url, callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Eternity" };
    callback(null, data);
  }, 1000);
}

fetchData("/api/user", function(err, data) {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Got data:", data);
});</code></pre>

      <p>回调函数的问题在于，当多个异步操作依次执行时，会产生臭名昭著的<strong>回调地狱 (Callback Hell)</strong>：</p>
      <pre><code class="language-javascript">// 回调地狱：难以阅读和维护
fetchUser(id, function(err, user) {
  fetchOrders(user.id, function(err, orders) {
    fetchOrderDetail(orders[0].id, function(err, detail) {
      // 越来越深...
      console.log(detail);
    });
  });
});</code></pre>

      <h2>阶段二：Promise</h2>
      <p>ES6 引入的 <code>Promise</code> 是对异步操作的封装，代表一个最终会完成（或失败）的异步操作。Promise 有三种状态：<code>pending</code>（进行中）、<code>fulfilled</code>（已成功）、<code>rejected</code>（已失败）。</p>
      <pre><code class="language-javascript">function fetchUser(id) {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      if (id &gt; 0) {
        resolve({ id, name: "Eternity" });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

// 链式调用，解决了回调地狱
fetchUser(1)
  .then(user =&gt; fetchOrders(user.id))
  .then(orders =&gt; fetchOrderDetail(orders[0].id))
  .then(detail =&gt; console.log(detail))
  .catch(err =&gt; console.error("Error:", err))
  .finally(() =&gt; console.log("Done!"));</code></pre>

      <h3>Promise 的常用静态方法</h3>
      <ul>
        <li><code>Promise.all()</code>：并发执行多个 Promise，全部成功才 resolve，任一失败即 reject。</li>
        <li><code>Promise.allSettled()</code>：等待所有 Promise 结束，无论成功或失败，返回每个结果的状态。</li>
        <li><code>Promise.race()</code>：哪个 Promise 最先有结果（成功或失败），就以那个结果为准。</li>
        <li><code>Promise.any()</code>：任意一个成功即 resolve；全部失败才 reject。</li>
      </ul>
      <pre><code class="language-javascript">// 并发请求，节省时间
const [user, config] = await Promise.all([
  fetchUser(1),
  fetchConfig()
]);</code></pre>

      <h2>阶段三：async / await</h2>
      <p>ES2017 引入的 <code>async/await</code> 是基于 Promise 的语法糖，让异步代码看起来像同步代码，极大地提升了可读性。</p>
      <pre><code class="language-javascript">async function loadUserData(id) {
  try {
    // await 暂停执行，等待 Promise resolve
    const user = await fetchUser(id);
    const orders = await fetchOrders(user.id);
    const detail = await fetchOrderDetail(orders[0].id);
    return detail;
  } catch (err) {
    // 统一的错误处理
    console.error("Failed to load:", err.message);
    throw err;
  }
}

// 调用 async 函数
loadUserData(1).then(data =&gt; console.log(data));</code></pre>

      <h3>常见陷阱：在循环中使用 await</h3>
      <p>在 <code>for</code> 循环中使用 <code>await</code> 会串行执行，而不是并行，可能造成性能问题：</p>
      <pre><code class="language-javascript">// ❌ 串行执行，慢（总时间 = 各请求时间之和）
for (const id of ids) {
  const data = await fetchData(id);
  results.push(data);
}

// ✅ 并行执行，快（总时间 ≈ 最慢那个请求的时间）
const results = await Promise.all(ids.map(id =&gt; fetchData(id)));</code></pre>

      <h2>Event Loop 机制</h2>
      <p>理解异步编程的底层原理，需要了解 JavaScript 的<strong>事件循环 (Event Loop)</strong>。JS 引擎维护着一个调用栈和一个任务队列（宏任务队列 + 微任务队列）。</p>
      <ul>
        <li><strong>宏任务 (Macrotask)</strong>：setTimeout、setInterval、I/O 回调等。</li>
        <li><strong>微任务 (Microtask)</strong>：Promise.then/catch/finally 回调、queueMicrotask 等。</li>
      </ul>
      <p>每次宏任务执行完毕后，JS 引擎会清空所有微任务队列，再执行下一个宏任务。这就是 Promise 回调总比 setTimeout 优先执行的原因。</p>

      <h2>总结</h2>
      <p>JavaScript 异步编程的演进路径：<strong>Callback → Promise → async/await</strong>，每一步都是对前一步痛点的解决。在现代开发中，推荐优先使用 <code>async/await</code>，配合 <code>Promise.all</code> 处理并发场景，让代码既简洁又高效。</p>
    `
  },
  {
    id: 4,
    title: "2026 年前端技术趋势展望",
    date: "2026-02-20",
    category: "技术",
    tags: ["前端", "技术趋势", "2026"],
    excerpt: "回顾过去一年前端领域的重大变化，展望 2026 年可能的技术趋势和发展方向。",
    readTime: 10,
    content: `
      <h2>前言</h2>
      <p>前端技术的演进从未停歇。2025 年我们目睹了 AI 辅助开发的全面爆发、WebAssembly 生态的进一步成熟、以及各大框架在性能和开发体验上的持续竞争。站在 2026 年的起点，让我们一起回顾与展望。</p>

      <h2>趋势一：AI 辅助编程成为标配</h2>
      <p>2025 年，AI 编程助手（如 GitHub Copilot、Cursor 等）已经从"尝鲜工具"变成了大多数开发者的日常工具。进入 2026 年，这一趋势将继续深化：</p>
      <ul>
        <li><strong>代码生成</strong>：从补全单行代码到生成完整组件、页面，AI 的能力持续提升。</li>
        <li><strong>代码审查</strong>：AI 可以自动检测潜在的 bug、安全漏洞和性能问题。</li>
        <li><strong>文档自动生成</strong>：根据代码自动生成 README、API 文档，大幅降低文档编写成本。</li>
        <li><strong>测试用例生成</strong>：AI 可以根据函数签名和注释，自动生成单元测试。</li>
      </ul>
      <blockquote>
        AI 不会取代程序员，但会让优秀的程序员产出倍增，同时拉大与普通程序员的差距。
      </blockquote>

      <h2>趋势二：框架竞争白热化</h2>
      <p>前端三大框架（React、Vue、Angular）的竞争格局在 2026 年将出现新的变化：</p>

      <h3>React 与 Server Components</h3>
      <p>React 19 正式发布后，React Server Components (RSC) 和 Server Actions 的范式已经被 Next.js 广泛采用。越来越多的团队开始探索如何在全栈场景下利用 React 实现更好的性能与 SEO。</p>

      <h3>Vue 3 的持续生态建设</h3>
      <p>Vue 3 经过几年的迭代，生态已相当完善。Nuxt 3 的成熟让 Vue 在全栈领域也有了有力的竞争者。Vapor Mode（编译时响应式优化）有望在 2026 年正式推出，性能将大幅提升。</p>

      <h3>新兴框架的崛起</h3>
      <p>Solid.js、Svelte、Qwik 等框架凭借极致的运行时性能和创新的编译思路，持续吸引关注。尤其在对性能敏感的场景下，它们正在获得越来越多的生产应用。</p>

      <h2>趋势三：WebAssembly 走向主流</h2>
      <p>WebAssembly (Wasm) 正在突破浏览器的边界，扩展到服务端（WASI）和边缘计算场景。2026 年值得关注的进展包括：</p>
      <ul>
        <li><strong>组件模型 (Component Model)</strong>：让不同语言编写的 Wasm 模块可以互相调用，推动 Wasm 生态标准化。</li>
        <li><strong>GC 支持</strong>：Wasm GC 提案让 Java、Kotlin、Dart 等带 GC 的语言可以更高效地编译到 Wasm。</li>
        <li><strong>图形与计算</strong>：WebGPU + Wasm 的组合，让浏览器端的 AI 推理和图形计算成为可能。</li>
      </ul>

      <h2>趋势四：TypeScript 全面统治</h2>
      <p>TypeScript 的采用率持续走高，2026 年预计大多数新项目都会默认使用 TypeScript。值得关注的是，TC39 正在讨论将<strong>类型注解作为注释</strong>的提案（Type Annotations Proposal），未来原生 JavaScript 可能支持类型语法（仅作为注释，运行时忽略），这将进一步模糊 TS 与 JS 的边界。</p>

      <h2>趋势五：构建工具持续演进</h2>
      <p>Vite 已经确立了开发服务器领域的标准地位。2026 年，基于 Rust 实现的工具链（Rolldown、Oxc、Biome）将持续成熟，有望将前端工具链的性能提升一个数量级：</p>
      <ul>
        <li><strong>Rolldown</strong>：Vite 的下一代打包器，用 Rust 重写，兼容 Rollup 插件生态。</li>
        <li><strong>Oxc</strong>：超快速的 JavaScript 解析、转换、代码检查工具集。</li>
        <li><strong>Biome</strong>：取代 ESLint + Prettier 的全能工具，速度快数十倍。</li>
      </ul>

      <h2>趋势六：边缘计算与全栈框架</h2>
      <p>Cloudflare Workers、Vercel Edge Functions、Deno Deploy 等边缘运行时持续发展，让"边缘全栈"成为可能。Next.js、Nuxt、Remix、SvelteKit 等全栈框架都在加强对边缘运行时的支持，推动开发模式从"前后端分离"向"全栈一体化"演进。</p>

      <h2>总结</h2>
      <p>2026 年的前端开发者，需要拥抱 AI 工具、深入理解全栈开发模式、关注性能工程，同时保持对新兴框架和技术的好奇心。技术变化越快，<strong>学习能力</strong>本身就越发成为核心竞争力。</p>
      <p>无论技术如何演变，<em>写出可读性好、可维护的代码，解决真实的用户问题</em>，始终是我们的核心目标。共勉！🚀</p>
    `
  }
];
