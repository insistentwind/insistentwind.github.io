import unocss from "@unocss/vite";
import vue from "@vitejs/plugin-vue";
import type { PluginOption } from "vite";
import unplugin from "./unplugin";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(): (PluginOption | PluginOption[])[] {
	const plugins = [
		vue(),
		...unplugin(),
		unocss(),
	];
	return plugins;
}
