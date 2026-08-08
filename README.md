# 我的静态博客

这个目录只保留可直接发布到 GitHub Pages 的静态博客源码。

## 日常使用

所有日常操作都在 `site/` 中完成：

```bash
cd site
npm install
npm run dev
```

打开终端显示的本地地址即可预览。

### 新建文章

```bash
cd site
npm run new -- "文章标题" article-slug
```

新草稿会出现在 `site/src/content/posts/`。完成后把文章头部的 `draft: true` 改为 `draft: false`，或删除该行。

也可以直接复制现有 `.md` 文件。封面图片统一放在 `site/public/images/`，文章配置中的路径只写 `images/文件名.jpg`。

表情图片位于 `site/public/emoji/`，在 Markdown 文章中可以这样使用：

```markdown
![吃瓜](../../emoji/chigua.png)
```

### 修改个人信息

编辑 `site/src/config.ts`，集中修改：

- 博客名称和作者名
- 简介和首页文案
- 邮箱与 GitHub 地址
- 顶部导航

### 发布文章

```bash
git add .
git commit -m "写作：新增文章标题"
git push
```

推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并发布。

## 首次连接 GitHub

1. 个人主页仓库使用 `insistentwind/insistentwind.github.io`（当前远程仓库已存在）。
2. 在仓库 `Settings > Pages > Build and deployment` 中把 Source 设为 `GitHub Actions`。
3. 在本地仓库添加远程地址并推送：

```bash
git remote add origin https://github.com/insistentwind/insistentwind.github.io.git
git branch -M main
git push -u origin main
```

发布完成后访问 `https://insistentwind.github.io/`。

如果使用普通仓库名（例如 `blog`），构建配置也会自动适配，地址将是 `https://你的用户名.github.io/blog/`。

## 目录说明

```text
.
├─ site/                         # 当前静态博客，日常只维护这里
│  ├─ public/images/            # 图片素材
│  ├─ public/emoji/             # 表情图片
│  ├─ scripts/new-post.mjs      # 新建文章工具
│  └─ src/
│     ├─ content/posts/         # Markdown 文章
│     ├─ pages/                 # 页面
│     ├─ styles/                # 全站样式
│     └─ config.ts              # 个人资料与导航配置
└─ .github/workflows/           # GitHub Pages 自动发布
```

## 检查与构建

```bash
cd site
npm run check
npm run build
npm run preview
```

生成结果位于 `site/dist/`，该目录不会提交到 Git。

## 项目来源

当前静态站点已经不依赖原来的 Vue + Spring Boot 博客系统。原项目代码已从工作目录清理，删除内容暂存在 Windows 回收站中。
