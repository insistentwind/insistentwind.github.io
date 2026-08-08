# 博客写作与发布流程

日常只需要编辑 `site/src/content/posts/` 和 `site/public/assets/posts/`。不要编辑 `site/dist/`，它是构建产物，也不需要手动上传。

## 1. 新建草稿

在仓库根目录打开 PowerShell：

```powershell
cd site
corepack pnpm new -- "文章标题" article-slug
```

`article-slug` 建议使用简短的英文小写单词和连字符，例如 `topology-reconstruction-notes`。它会成为文章文件名、网址和图片目录名。

命令会生成一份 `draft: true` 的 Markdown 草稿，并创建同名图片目录：

```text
site/src/content/posts/article-slug.md
site/public/assets/posts/article-slug/
```

已有的 Typora 文档可以连同本地图片一起导入：

```powershell
corepack pnpm import-post -- "C:\资料\文章.md" article-slug
```

导入器会复制 Markdown、重写 Typora 本地图片路径，并把实际引用的图片压缩成 WebP。导入结果默认仍是草稿，发布前需要检查标题层级、摘要、分类和图片排版。

## 2. 填写文章信息

每篇文章顶部的 `---` 区域是 Frontmatter：

```yaml
---
title: "文章标题"
published: 2026-08-08
updated: 2026-08-08
description: "显示在首页和搜索结果中的简短摘要"
image: "/assets/images/wallpaper/sakura-garden.webp"
tags: ["标签一", "标签二"]
category: "分类"
draft: true
---
```

- `published` 是首次发布日期；修改旧文时可以增加或更新 `updated`。
- `image` 是文章封面，可以继续使用现有壁纸，也可以指向文章目录中的图片。
- `draft: true` 只在本地显示，线上不会发布；完成后改为 `false`。
- `description`、`tags` 和 `category` 会影响首页展示、归档和搜索，建议认真填写。

## 3. 添加图片和 emoji

把某篇文章的图片放进它自己的目录：

```text
site/public/assets/posts/article-slug/
├─ cover.webp
├─ figure-01.webp
└─ figure-02.webp
```

在 Frontmatter 中设置封面：

```yaml
image: "/assets/posts/article-slug/cover.webp"
```

在正文中插图：

```markdown
![图片说明](/assets/posts/article-slug/figure-01.webp)
```

emoji 已保存在 `site/public/emoji/`，正文引用方式如下：

```markdown
![吃瓜](/emoji/chigua.png)
```

图片优先使用 WebP，文件名使用英文小写和连字符。不要把单篇文章图片放进 `src/assets/images/`，那里只存全站共用的主题素材。

## 4. 本地预览

在 `site` 目录运行：

```powershell
corepack pnpm dev
```

浏览器打开 <http://localhost:4321/>。开发环境会显示草稿，方便检查排版；线上构建会自动排除 `draft: true` 的文章。

## 5. 发布前检查

把准备发布的文章改为 `draft: false`，然后运行：

```powershell
corepack pnpm check
corepack pnpm type-check
corepack pnpm build
```

全部通过后回到仓库根目录，先确认本次提交内容：

```powershell
cd ..
git status --short
git diff --check
```

## 6. 提交和上线

只添加这次修改的文章和图片，例如：

```powershell
git add site/src/content/posts/article-slug.md site/public/assets/posts/article-slug
git commit -m "post: add article title"
git push origin main
```

推送后 GitHub Actions 会自动构建并发布。可以在仓库的 Actions 页面查看进度，完成后访问 <https://insistentwind.github.io/>。

## 常用位置

| 内容 | 位置 |
| --- | --- |
| 文章正文 | `site/src/content/posts/` |
| 单篇文章图片 | `site/public/assets/posts/<slug>/` |
| emoji | `site/public/emoji/` |
| 关于页 | `site/src/content/spec/about.md` |
| 网站配置 | `site/src/config/` |
| 主题壁纸 | `site/src/assets/images/` |
| 本地参考工程 | `_local/references/` |
