import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [, , title, requestedSlug] = process.argv;

if (!title) {
  console.error('用法: npm run new -- "文章标题" article-slug');
  process.exit(1);
}

const slug = (requestedSlug || title)
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9\-\u4e00-\u9fff]/g, "")
  .replace(/-+/g, "-");

if (!slug) {
  console.error("无法生成文件名，请在标题后提供英文 slug。");
  process.exit(1);
}

const filePath = resolve("src", "content", "posts", `${slug}.md`);
if (existsSync(filePath)) {
  console.error(`文件已存在: ${filePath}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const content = `---
title: "${title.replaceAll('"', '\\"')}"
description: "请填写文章摘要"
publishedAt: ${today}
category: "随笔"
tags: []
cover: "images/cover-notes.jpg"
coverAlt: "请描述封面图片"
draft: true
---

从这里开始写正文。
`;

writeFileSync(filePath, content, "utf8");
console.log(`已创建草稿: ${filePath}`);
