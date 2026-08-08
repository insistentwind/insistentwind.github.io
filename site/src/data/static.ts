import type { Article, ArticleInfo } from "@/api/article/types";
import type { BlogInfo } from "@/api/blogInfo/types";
import type { Carousel } from "@/api/carousel/types";
import type { Category } from "@/api/category/types";
import type { Result } from "@/model";
import type { Tag } from "@/api/tag/types";

interface PostMeta {
	title: string;
	description: string;
	publishedAt: string;
	category: string;
	tags: string[];
	cover: string;
	draft?: boolean;
	featured?: boolean;
}

export interface StaticArticle extends Article {
	articleContent: string;
	updateTime: string;
	viewCount: number;
	likeCount: number;
	featured: boolean;
}

const markdownFiles = import.meta.glob<string>("../content/posts/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
});

const stableId = (value: string) => {
	let hash = 2166136261;
	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
};

const parseValue = (value: string): unknown => {
	const trimmed = value.trim();
	if (trimmed === "true") return true;
	if (trimmed === "false") return false;
	if (trimmed.startsWith("[") || trimmed.startsWith('"')) {
		try {
			return JSON.parse(trimmed);
		} catch {
			return trimmed.replace(/^['"]|['"]$/g, "");
		}
	}
	return trimmed;
};

const parsePost = (path: string, raw: string) => {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
	if (!match) throw new Error(`文章缺少 frontmatter: ${path}`);

	const meta = Object.fromEntries(
		match[1]
			.split(/\r?\n/)
			.filter(Boolean)
			.map((line) => {
				const separator = line.indexOf(":");
				return [line.slice(0, separator).trim(), parseValue(line.slice(separator + 1))];
			}),
	) as unknown as PostMeta;
	const slug = path.split("/").pop()!.replace(/\.md$/, "");
	const content = raw
		.slice(match[0].length)
		.replace(/\]\(\.\.\/\.\.\/emoji\//g, "](/emoji/")
		.trim();

	return { meta, slug, content };
};

const parsedPosts = Object.entries(markdownFiles)
	.map(([path, raw]) => parsePost(path, raw))
	.filter(({ meta }) => !meta.draft)
	.sort((left, right) => right.meta.publishedAt.localeCompare(left.meta.publishedAt));

const categoryNames = [...new Set(parsedPosts.map(({ meta }) => meta.category))];
const tagNames = [...new Set(parsedPosts.flatMap(({ meta }) => meta.tags))];

export const staticCategories: Category[] = categoryNames.map((categoryName) => ({
	id: stableId(`category:${categoryName}`),
	categoryName,
	articleCount: parsedPosts.filter(({ meta }) => meta.category === categoryName).length,
}));

export const staticTags: Tag[] = tagNames.map((tagName) => ({
	id: stableId(`tag:${tagName}`),
	tagName,
	articleCount: parsedPosts.filter(({ meta }) => meta.tags.includes(tagName)).length,
}));

export const staticArticles: StaticArticle[] = parsedPosts.map(({ meta, slug, content }, index) => ({
	id: stableId(`article:${slug}`),
	articleCover: meta.cover.startsWith("/") ? meta.cover : `/${meta.cover}`,
	articleTitle: meta.title,
	articleDesc: meta.description,
	articleContent: content,
	category: staticCategories.find((category) => category.categoryName === meta.category)!,
	tagVOList: staticTags.filter((tag) => meta.tags.includes(tag.tagName)),
	isTop: meta.featured ? 1 : 0,
	createTime: meta.publishedAt,
	updateTime: meta.publishedAt,
	viewCount: 128 + index * 17,
	likeCount: 0,
	featured: Boolean(meta.featured),
}));

export const staticBlogInfo: BlogInfo = {
	articleCount: staticArticles.length,
	categoryCount: staticCategories.length,
	tagCount: staticTags.length,
	viewCount: staticArticles.reduce((total, article) => total + article.viewCount, 0),
	siteConfig: {
		siteName: "InsistentWind",
		siteAddress: "https://insistentwind.github.io/",
		siteIntro: "关于学习、代码与生活的长期记录。",
		siteNotice: "把复杂的问题想清楚，把值得记住的过程写下来。",
		createSiteTime: "2026-08-08",
		recordNumber: "",
		authorAvatar: "/images/avatar.png",
		siteAuthor: "InsistentWind",
		aboutMe: "## 关于我\n\n这里记录学习、代码与生活中的长期思考。内容会随着项目和学习进度持续补充。\n\n- GitHub：[insistentwind](https://github.com/insistentwind)\n- 方向：几何处理、结构优化、数学建模与算法",
		github: "https://github.com/insistentwind",
		gitee: "",
		bilibili: "",
		qq: "",
		socialList: "github",
	},
};

export const staticCarousel: Carousel[] = [
	{ id: 1, imgUrl: "/images/hero-desk.jpg" },
	{ id: 2, imgUrl: "/images/about-workspace.jpg" },
	{ id: 3, imgUrl: "/images/cover-code.jpg" },
	{ id: 4, imgUrl: "/images/hero-desk.jpg" },
	{ id: 5, imgUrl: "/images/about-workspace.jpg" },
	{ id: 6, imgUrl: "/images/cover-notes.jpg" },
];

export const getStaticArticle = (id: number): ArticleInfo | undefined => {
	const index = staticArticles.findIndex((article) => article.id === id);
	if (index === -1) return undefined;
	const article = staticArticles[index];
	const pagination = (item?: StaticArticle) => item && ({
		id: item.id,
		articleCover: item.articleCover,
		articleTitle: item.articleTitle,
	});
	return {
		...article,
		articleType: 1,
		lastArticle: pagination(staticArticles[index - 1]),
		nextArticle: pagination(staticArticles[index + 1]),
	} as ArticleInfo;
};

export const paginate = <T>(items: T[], current = 1, size = 10) => {
	const start = Math.max(0, (current - 1) * size);
	return items.slice(start, start + size);
};

export type StaticPromise<T> = Promise<{ data: Result<T> }>;

export const staticResponse = <T>(data: T): StaticPromise<T> => Promise.resolve({
	data: { flag: true, code: 200, msg: "success", data },
});
