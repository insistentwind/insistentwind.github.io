# InsistentWind 的 Astro 博客

这是部署在 <https://insistentwind.github.io/> 的静态博客。`site/` 是唯一需要构建和提交的站点源码，推送到 `main` 后由 GitHub Actions 自动发布。

## 快速开始

第一次使用先安装依赖：

```powershell
cd site
corepack pnpm install
```

以后新建和预览文章只需要：

```powershell
cd site
corepack pnpm new -- "文章标题" article-slug
corepack pnpm dev
```

脚本会同时创建：

```text
site/src/content/posts/article-slug.md       # 文章草稿
site/public/assets/posts/article-slug/       # 这篇文章的图片
```

完整的写作、图片引用、检查和发布步骤见 [BLOG_WORKFLOW.md](BLOG_WORKFLOW.md)。

## 目录职责

```text
.
├─ site/                              # 博客源码，提交到 GitHub
│  ├─ public/assets/posts/<slug>/     # 每篇文章自己的图片
│  ├─ public/emoji/                   # 正文 emoji
│  ├─ scripts/new-post.mjs            # 草稿生成器
│  └─ src/
│     ├─ content/posts/               # Markdown / MDX 文章
│     ├─ assets/images/               # 壁纸等主题素材
│     ├─ config/                      # 站点和主题配置
│     ├─ components/                  # 页面组件
│     └─ styles/                      # 全站样式
├─ _local/references/                 # 本地参考工程，不提交
└─ .github/workflows/                 # GitHub Pages 自动发布
```

`_local/` 已被 Git 忽略，当前 Mizuki 参考工程归档在 `_local/references/Mizuki/`，不会混入博客提交。

## 开源说明

界面基于 [Firefly](https://github.com/CuteLeaf/Firefly) 和 [Fuwari](https://github.com/saicaca/fuwari) 调整，遵循各自开源许可证。
