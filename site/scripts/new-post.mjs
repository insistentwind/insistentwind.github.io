import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
if (args[0] === "--") args.shift();
const [title, requestedSlug] = args;

if (!title) {
	console.error('用法: pnpm new -- "文章标题" article-slug');
	process.exit(1);
}

const slug = (requestedSlug || title)
	.trim()
	.toLowerCase()
	.replace(/\s+/g, "-")
	.replace(/[^a-z0-9\-\u4e00-\u9fff]/g, "")
	.replace(/-+/g, "-")
	.replace(/^-+|-+$/g, "");

if (!slug) {
	console.error("无法生成文件名，请在标题后提供英文 slug。");
	process.exit(1);
}

const filePath = resolve("src", "content", "posts", `${slug}.md`);
const assetDir = resolve("public", "assets", "posts", slug);
if (existsSync(filePath)) {
	console.error(`文件已存在: ${filePath}`);
	process.exit(1);
}

const today = new Intl.DateTimeFormat("en-CA", {
	timeZone: "Asia/Shanghai",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
}).format(new Date());
const content = `---
title: "${title.replaceAll('"', '\\"')}"
published: ${today}
description: "请填写文章摘要"
image: "/assets/images/wallpaper/sakura-garden.webp"
tags: []
category: "随笔"
draft: true
---

从这里开始写正文。
`;

mkdirSync(assetDir, { recursive: true });
writeFileSync(filePath, content, "utf8");
console.log(`已创建草稿: ${filePath}`);
console.log(`文章图片目录: ${assetDir}`);
