import dayjs from "dayjs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { setupVitePlugins } from "./build";
export default defineConfig(() => {
	const buildTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

	return {
		base: "/",
		resolve: {
			alias: {
				"~": fileURLToPath(new URL("./", import.meta.url)),
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			BUILD_TIME: JSON.stringify(buildTime),
		},
		plugins: setupVitePlugins(),
		server: {
			host: "0.0.0.0",
			port: 1314,
			open: true,
		},
		build: {
			reportCompressedSize: false,
			sourcemap: false,
			outDir: "dist",
			commonjsOptions: {
				ignoreTryCatch: false,
			},
		},
	};
});
