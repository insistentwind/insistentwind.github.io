import type { SidebarLayoutConfig } from "../types/sidebarConfig";

export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: true,
	position: "left",
	tabletSidebar: "left",
	hideSidebarOnPostPage: false,
	showBothSidebarsOnPostPage: true,
	leftComponents: [
		{
			type: "profile",
			enable: true,
			position: "top",
			showOnPostPage: true,
		},
		{
			type: "announcement",
			enable: true,
			position: "top",
			showOnPostPage: false,
		},
		{
			type: "categories",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 6 },
		},
		{
			type: "tags",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 12 },
		},
	],
	rightComponents: [
		{
			type: "sidebarToc",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			hideOnNonPostPage: true,
		},
	],
	mobileBottomComponents: [
		{
			type: "profile",
			enable: true,
			showOnPostPage: false,
		},
		{
			type: "announcement",
			enable: true,
			showOnPostPage: false,
		},
		{
			type: "categories",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 6 },
		},
		{
			type: "tags",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 12 },
		},
	],
};
