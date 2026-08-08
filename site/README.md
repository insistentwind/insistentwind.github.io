# Shoka 静态博客前端

这里保留原项目 `blog-vue/shoka-blog` 的 Vue 3 前端界面，并使用本地 Markdown 数据替代原 Spring Boot API。

## 本地预览

```bash
npm install
npm run dev
```

开发地址默认为 `http://localhost:1314/`。

## 新建文章

```bash
npm run new -- "文章标题" article-slug
```

草稿位于 `src/content/posts/`。写完后将文章头部的 `draft: true` 改为 `draft: false`，文章会自动出现在首页、归档、分类、标签和搜索结果中。

图片放在 `public/images/`，emoji 放在 `public/emoji/`。Markdown 中使用 emoji 的示例：

```markdown
![吃瓜](/emoji/chigua.png)
```

## 检查

```bash
npm run typecheck
npm run build
```

构建产物位于 `dist/`，GitHub Actions 会自动发布该目录。
