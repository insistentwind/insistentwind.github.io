---
title: "用 GitHub Pages 发布博客"
description: "从本地写作到自动上线：这套博客最短的日常发布流程。"
published: 2026-08-07
category: "工具"
tags: ["GitHub", "部署", "工作流"]
image: "/assets/images/wallpaper/lantern-path.webp"
---

这套站点使用 GitHub Pages 托管，发布过程由 GitHub Actions 自动完成。日常更新不需要手动上传构建产物。

## 新建一篇文章

可以直接运行下面的命令创建一篇草稿：

```bash
corepack pnpm new -- "文章标题" article-slug
```

脚本会在 `site/src/content/posts/` 生成草稿，并在 `site/public/assets/posts/article-slug/` 创建这篇文章专用的图片目录。也可以复制任意一篇文章，再修改文件名和顶部信息：

```yaml
---
title: "文章标题"
description: "用于首页和搜索结果的简短摘要"
published: 2026-08-08
category: "分类"
tags: ["标签一", "标签二"]
image: "/assets/images/wallpaper/sakura-garden.webp"
draft: false
---
```

在第二个 `---` 后使用普通 Markdown 写正文即可。

文章图片统一放在与文章 slug 同名的目录中，例如：

```markdown
![图片说明](/assets/posts/article-slug/figure-01.webp)
```

需要使用表情时，可以引用 `site/public/emoji/` 中的图片：

```markdown
![吃瓜](/emoji/chigua.png)
```

## 本地预览

进入 `site` 目录后运行：

```bash
corepack pnpm dev
```

默认预览地址是 `http://localhost:4321/`。确认无误后提交并推送：

```bash
git add .
git commit -m "写作：新增文章标题"
git push
```

## 草稿与发布

把文章头部的 `draft` 设为 `true`，构建时就不会生成这篇文章。准备好以后改成 `false` 或删除这一行即可发布。
