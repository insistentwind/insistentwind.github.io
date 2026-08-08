import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@/views/Home/index.vue"),
		meta: { title: "首页" },
	},
	{
		path: "/archive",
		component: () => import("@/views/Archive/index.vue"),
		meta: { title: "归档" },
	},
	{
		path: "/category",
		component: () => import("@/views/Category/index.vue"),
		meta: { title: "分类" },
	},
	{
		path: "/category/:categoryId",
		component: () => import("@/views/Category/ArticleList.vue"),
		meta: { title: "分类" },
	},
	{
		path: "/tag",
		component: () => import("@/views/Tag/index.vue"),
		meta: { title: "标签" },
	},
	{
		path: "/tag/:tagId",
		component: () => import("@/views/Tag/ArticleList.vue"),
		meta: { title: "标签" },
	},
	{
		name: "article",
		path: "/article/:id",
		component: () => import("@/views/Article/Article.vue"),
		meta: { title: "文章" },
	},
	{
		path: "/about",
		component: () => import("@/views/About/index.vue"),
		meta: { title: "关于" },
	},
	{
		path: "/404",
		component: () => import("@/views/404/index.vue"),
		meta: { title: "404" },
	},
	{ path: "/:catchAll(.*)", redirect: "/404" },
];
