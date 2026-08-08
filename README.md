# InsistentWind 的静态博客

网站使用原项目 `blog-vue/shoka-blog` 的 Vue 前端界面，文章由 Markdown 管理并通过 GitHub Pages 自动发布。站点不需要 Java、MySQL、Redis 或其他后端服务。

## 日常使用

```bash
cd site
npm install
npm run dev
```

浏览器打开 `http://localhost:1314/`。

### 新建文章

```bash
cd site
npm run new -- "文章标题" article-slug
```

新草稿会创建在 `site/src/content/posts/`。完成后将文件头部的 `draft: true` 改为 `draft: false`。

封面图片统一放在 `site/public/images/`，文章配置中写 `images/文件名.jpg`。emoji 位于 `site/public/emoji/`，正文中使用：

```markdown
![吃瓜](/emoji/chigua.png)
```

### 发布更新

```bash
git add .
git commit -m "content: update notes"
git push
```

推送到 `main` 后，`.github/workflows/deploy-pages.yml` 会构建并发布到 `https://insistentwind.github.io/`。

## 目录

```text
.
├─ site/
│  ├─ public/images/          # 封面与头像
│  ├─ public/emoji/           # emoji 图片
│  ├─ scripts/new-post.mjs    # 新建草稿脚本
│  └─ src/
│     ├─ content/posts/       # Markdown 文章
│     ├─ data/static.ts       # Markdown 到原版页面的数据适配
│     ├─ views/               # 原版 Shoka 页面
│     └─ components/          # 原版组件与动画
└─ .github/workflows/         # GitHub Pages 自动发布
```

## 检查

```bash
cd site
npm run typecheck
npm run build
```
