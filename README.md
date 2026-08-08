# InsistentWind 的 Astro 博客

这是一个无需后端的静态博客。网站以 Astro + Firefly 为主体，并借鉴原 Vue Shoka 博客的波浪页头、交错文章卡片和轻量侧栏。

线上地址：<https://insistentwind.github.io/>

## 日常写作

```bash
cd site
corepack pnpm install
corepack pnpm new -- "文章标题" article-slug
corepack pnpm dev
```

草稿会生成在 `site/src/content/posts/`。写完后把文章头部的 `draft: true` 改为 `draft: false`。

文章图片可以放在 `site/public/images/`；emoji 位于 `site/public/emoji/`，正文中直接使用：

```markdown
![吃瓜](/emoji/chigua.png)
```

## 目录

```text
.
├─ site/
│  ├─ public/emoji/                 # emoji 图片
│  ├─ scripts/new-post.mjs          # 新建草稿脚本
│  └─ src/
│     ├─ assets/images/             # 壁纸、头像等主题图片
│     ├─ config/                    # 站点、导航、侧栏和主题配置
│     ├─ content/posts/             # Markdown 文章
│     ├─ content/spec/about.md      # 关于页
│     ├─ components/                # Astro/Svelte 组件
│     └─ styles/                    # 全站与 Shoka 融合样式
└─ .github/workflows/               # GitHub Pages 自动发布
```

## 检查与发布

```bash
cd site
corepack pnpm check
corepack pnpm type-check
corepack pnpm build
```

提交并推送到 `main` 后，GitHub Actions 会自动构建并发布 `site/dist/`。

## 开源说明

界面基于 [Firefly](https://github.com/CuteLeaf/Firefly) 和 [Fuwari](https://github.com/saicaca/fuwari) 调整，遵循各自开源许可证。
