import { defineConfig } from "astro/config";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repository.endsWith(".github.io");

export default defineConfig({
  output: "static",
  base: repository && !isUserSite ? `/${repository}` : "/",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
