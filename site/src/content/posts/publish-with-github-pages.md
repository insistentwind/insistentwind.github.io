---
title: "用 GitHub Pages 发布博客"
description: "从本地写作到自动上线：这套博客最短的日常发布流程。"
publishedAt: 2026-08-07
category: "工具"
tags: ["GitHub", "部署", "工作流"]
cover: "images/cover-code.jpg"
coverAlt: "显示代码编辑器的笔记本电脑"
---

这套站点使用 GitHub Pages 托管，发布过程由 GitHub Actions 自动完成。日常更新不需要手动上传构建产物。

## 新建一篇文章

在 `site/src/content/posts/` 中复制任意一篇文章，修改文件名和顶部信息：

```yaml
---
title: "文章标题"
description: "用于首页和搜索结果的简短摘要"
publishedAt: 2026-08-08
category: "分类"
tags: ["标签一", "标签二"]
cover: "images/cover-notes.jpg"
coverAlt: "准确描述封面内容"
draft: false
---
```

在第二个 `---` 后使用普通 Markdown 写正文即可。

需要使用表情时，可以引用 `site/public/emoji/` 中的图片：

```markdown
![吃瓜](../../emoji/chigua.png)
```

## 本地预览

进入 `site` 目录后运行：

```bash
npm run dev
```

浏览器会打开本地预览地址。确认无误后提交并推送：

```bash
git add .
git commit -m "写作：新增文章标题"
git push
```

## 草稿与发布

把文章头部的 `draft` 设为 `true`，构建时就不会生成这篇文章。准备好以后改成 `false` 或删除这一行即可发布。
