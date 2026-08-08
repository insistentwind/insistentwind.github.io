import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	readFileSync,
	renameSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { basename, dirname, extname, parse, resolve } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
if (args[0] === "--") args.shift();
const [requestedSource, requestedSlug] = args;

if (!requestedSource || !requestedSlug) {
	console.error('用法: pnpm import-post -- "C:\\资料\\文章.md" article-slug');
	process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedSlug)) {
	console.error("slug 只能包含英文小写字母、数字和连字符。");
	process.exit(1);
}

const sourcePath = resolve(requestedSource);
const sourceDir = dirname(sourcePath);
const outputPath = resolve("src", "content", "posts", `${requestedSlug}.md`);
const assetDir = resolve("public", "assets", "posts", requestedSlug);
const tempAssetDir = resolve(
	"public",
	"assets",
	"posts",
	`.import-${requestedSlug}-${Date.now()}`,
);

if (!existsSync(sourcePath) || extname(sourcePath).toLowerCase() !== ".md") {
	console.error(`找不到 Markdown 文件: ${sourcePath}`);
	process.exit(1);
}
if (existsSync(outputPath)) {
	console.error(`文章已存在: ${outputPath}`);
	process.exit(1);
}
if (existsSync(assetDir)) {
	console.error(`图片目录已存在: ${assetDir}`);
	process.exit(1);
}

const sourceMarkdown = readFileSync(sourcePath, "utf8");
const imagePattern = /!\[([^\]]*)\]\(([^)\r\n]+)\)/g;
const imagePlans = new Map();
const outputOwners = new Map();

function resolveLocalImage(rawPath) {
	const cleaned = rawPath.trim().replace(/^<|>$/g, "");
	if (/^(?:https?:|data:)/i.test(cleaned) || cleaned.startsWith("/")) {
		return null;
	}
	return resolve(sourceDir, cleaned.replaceAll("/", "\\"));
}

for (const match of sourceMarkdown.matchAll(imagePattern)) {
	const sourceImage = resolveLocalImage(match[2]);
	if (!sourceImage) continue;
	if (!existsSync(sourceImage)) {
		throw new Error(`文章引用的图片不存在: ${sourceImage}`);
	}

	const sourceKey = sourceImage.toLowerCase();
	if (imagePlans.has(sourceKey)) continue;

	const stem = parse(sourceImage).name;
	let outputName = `${stem}.webp`;
	const owner = outputOwners.get(outputName.toLowerCase());
	if (owner && owner !== sourceKey) {
		const suffix = createHash("sha256")
			.update(sourceKey)
			.digest("hex")
			.slice(0, 8);
		outputName = `${stem}-${suffix}.webp`;
	}

	outputOwners.set(outputName.toLowerCase(), sourceKey);
	imagePlans.set(sourceKey, { sourceImage, outputName });
}

mkdirSync(tempAssetDir, { recursive: true });

let nextImage = 0;
let sourceBytes = 0;
let outputBytes = 0;
const plans = [...imagePlans.values()];

async function convertNext() {
	while (nextImage < plans.length) {
		const current = nextImage++;
		const { sourceImage, outputName } = plans[current];
		const outputImage = resolve(tempAssetDir, outputName);
		sourceBytes += statSync(sourceImage).size;
		await sharp(sourceImage)
			.rotate()
			.resize({
				width: 1920,
				height: 1920,
				fit: "inside",
				withoutEnlargement: true,
			})
			.webp({ quality: 86, effort: 4, smartSubsample: true })
			.toFile(outputImage);
		outputBytes += statSync(outputImage).size;
		if ((current + 1) % 25 === 0 || current + 1 === plans.length) {
			console.log(`正在处理图片: ${current + 1}/${plans.length}`);
		}
	}
}

try {
	await Promise.all(
		Array.from({ length: Math.min(6, plans.length) }, convertNext),
	);

	const body = sourceMarkdown
		.replace(/^\uFEFF?#[ \t]+[^\r\n]+\r?\n+/, "")
		.replaceAll("\r\n", "\n")
		.replace(imagePattern, (fullMatch, alt, rawPath) => {
			const sourceImage = resolveLocalImage(rawPath);
			if (!sourceImage) return fullMatch;
			const plan = imagePlans.get(sourceImage.toLowerCase());
			const cleanAlt = /^\s*(?:image-\d+)?\s*$/.test(alt) ? "" : alt.trim();
			return `![${cleanAlt}](/assets/posts/${requestedSlug}/${plan.outputName})`;
		});

	const title = basename(sourcePath, extname(sourcePath));
	const today = new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date());
	const frontmatter = `---\ntitle: "${title.replaceAll('"', '\\"')}"\npublished: ${today}\ndescription: "请填写文章摘要"\nimage: "/assets/images/wallpaper/sakura-garden.webp"\ntags: []\ncategory: "随笔"\ndraft: true\n---\n\n`;

	renameSync(tempAssetDir, assetDir);
	writeFileSync(outputPath, `${frontmatter}${body.trim()}\n`, "utf8");

	const savedPercent = sourceBytes
		? Math.round((1 - outputBytes / sourceBytes) * 100)
		: 0;
	console.log(`已导入文章: ${outputPath}`);
	console.log(`已导入 ${plans.length} 张图片，体积减少约 ${savedPercent}%`);
} catch (error) {
	rmSync(tempAssetDir, { recursive: true, force: true });
	throw error;
}
