import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { App } from "vue";


/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
export function setupStore(app: App) {
	const store = createPinia();
	store.use(piniaPluginPersistedstate);
	app.use(store);
}

export * from "./modules";
