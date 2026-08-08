
import { createApp } from "vue";
import App from "./App.vue";
import { setupDirectives } from "./directives";
import { setupAssets, setupLazy, setupMdPreview, setupViewer } from "./plugins";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { useBlogStore } from "./store";
import { staticBlogInfo } from "./data/static";

async function setupApp() {
	setupAssets();

	const app = createApp(App);

	setupStore(app);
	useBlogStore().setBlogInfo(staticBlogInfo);

  setupDirectives(app);

	setupLazy(app);

	setupMdPreview(app);

	setupViewer(app);

	await setupRouter(app);

	app.mount("#app");
}

setupApp();
