---
slug: 第一篇博客
title: 第一篇博客
authors: [陈浩]
---

这是我的第一篇博客，记录一下我的学习和生活。

本网站基于Docusaurus构建，使用了Markdown语法。

Docusaurus 是一款基于 React 的静态网站生成工具，专注于快速构建文档、博客等内容驱动型网站。以下是其核心使用方法和实践要点：

---

### 一、快速入门
1. **安装与初始化**  
   使用 Node.js 的 `npx` 命令创建项目：  
   ```bash
   npx create-docusaurus@latest my-website classic
   ```
   该命令会生成经典模板项目，支持文档、博客和自定义页面。

2. **启动开发服务器**  
   ```bash
   cd my-website
   npm start
   ```
   访问 `http://localhost:3000` 即可预览本地站点，支持实时热更新。

3. **目录结构**  
   项目主要目录包括：
   - `docs/`：存放文档（Markdown/MDX 文件）
   - `blog/`：存放博客文章
   - `src/`：自定义 React 组件和页面
   - `static/`：静态资源（如图片、CSS）

---

### 二、核心功能
1. **文档与博客管理**  
   - **文档编写**：在 `docs/` 下创建 `.md` 或 `.mdx` 文件，通过 `sidebar_position` 控制侧边栏排序。
   - **博客发布**：在 `blog/` 下按日期命名文件（如 `2025-03-30-intro.md`），支持标签、作者和摘要截断（通过 `<!-- truncate -->`）。

2. **支持 MDX**  
   可在 Markdown 中嵌入 React 组件，例如插入代码块、交互式示例或自定义 UI 元素：
   ```mdx
   import MyComponent from '@site/src/components/MyComponent';
   <MyComponent />
   ```
   这一特性适用于技术文档的复杂演示场景。

3. **版本控制与多语言**  
   - **版本管理**：通过命令 `npm run docusaurus docs:version 1.0.0` 生成文档历史版本。
   - **多语言**：配置文件支持本地化，可结合 Crowdin 等工具实现文档翻译。

---

### 三、自定义配置
1. **导航栏与侧边栏**  
   修改 `docusaurus.config.js` 定义导航栏项目，例如添加文档、博客和外部链接：
   ```javascript
   navbar: {
     items: [
       { type: 'doc', docId: 'intro', label: '文档' },
       { to: '/blog', label: '博客' },
       { href: 'https://github.com', label: 'GitHub', position: 'right' }
     ]
   }
   ```
   侧边栏逻辑通过 `sidebars.js` 配置，支持多级目录嵌套。

2. **主题与样式**  
   - 覆盖默认 CSS：在 `src/css/custom.css` 中修改样式。
   - 使用 React 组件自定义布局，例如首页的 Feature 模块（参考网页3的代码示例）。

3. **SEO 优化**  
   在 Markdown 文件头添加元数据，提升搜索引擎收录效果：
   ```markdown
   ---
   title: 优化标题
   description: 页面描述
   keywords: [关键词1, 关键词2]
   ---
   ```
   同时支持全局 SEO 配置。

---

### 四、部署与托管
1. **构建静态文件**  
   运行 `npm run build` 生成 `build/` 目录，内含可直接部署的 HTML、CSS 和 JS 文件。

2. **托管平台推荐**  
   - **GitHub Pages**：免费且集成 Git 版本控制。
   - **Vercel**：支持自动部署和 CDN 加速。

3. **离线搜索（可选）**  
   安装插件 `@cmfcmf/docusaurus-search-local`，实现本地全文搜索功能。

---

### 五、最佳实践
1. **目录结构优化**  
   按功能或主题组织文档，例如：
   ```
   docs/
   ├── getting-started/
   ├── advanced/
   └── api-reference/
   ```
   通过 `_category_.json` 文件定义分类元数据。

2. **版本迭代策略**  
   对重大更新保留旧版文档路径（如 `/docs/v1/`），避免用户访问 404。

3. **数据备份**  
   使用云盘（如坚果云）同步 `docs/` 和 `blog/` 目录，确保内容安全。

---

