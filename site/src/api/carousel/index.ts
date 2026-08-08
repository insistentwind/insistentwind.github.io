import { Result } from "@/model";
import { staticCarousel, staticResponse, type StaticPromise } from "@/data/static";
import { Carousel } from "./types";

/**
 * 获取轮播图列表
 * @returns 轮播图列表
 */
export function getCarouselList(): StaticPromise<Carousel[]> {
  return staticResponse(staticCarousel);
}
