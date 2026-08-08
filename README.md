# 我的静态博客

这个目录现在包含一个可直接发布到 GitHub Pages 的静态博客，以及仍留在本机的原项目源码。

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
│  ├─ scripts/new-post.mjs      # 新建文章工具
│  └─ src/
│     ├─ content/posts/         # Markdown 文章
│     ├─ pages/                 # 页面
│     ├─ styles/                # 全站样式
│     └─ config.ts              # 个人资料与导航配置
├─ .github/workflows/           # GitHub Pages 自动发布
├─ blog-vue/                    # 原 Vue 前台与管理端（仅本机保留）
├─ blog-springboot/             # 原 Spring Boot 后端（仅本机保留）
├─ deploy/                      # 原服务器部署配置（仅本机保留）
└─ blog.sql                     # 原数据库备份（仅本机保留）
```

## 检查与构建

```bash
cd site
npm run check
npm run build
npm run preview
```

生成结果位于 `site/dist/`，该目录不会提交到 Git。

## 原项目说明

原项目来自 [ttkican/Blog](https://github.com/ttkican/Blog)，采用 Vue 3 + Spring Boot + MySQL 等技术。原代码仍留在本机，但因为包含旧部署配置且静态博客不需要它，已通过根目录 `.gitignore` 排除，不会上传到新的 GitHub 博客仓库。新的 `site/` 完全不依赖它运行。
