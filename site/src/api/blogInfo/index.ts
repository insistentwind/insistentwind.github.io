import { staticBlogInfo, staticResponse, type StaticPromise } from "@/data/static";
import { Result } from "@/model";
import { BlogInfo } from "./types";

/**
 * 获取博客信息
 * @returns 博客信息
 */
export function getBlogInfo(): StaticPromise<BlogInfo> {
  return staticResponse(staticBlogInfo);
}

/**
 * 上传访客信息
 */
export function report(): StaticPromise<null> {
  return staticResponse(null);
}
