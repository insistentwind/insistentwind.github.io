import { PageQuery, PageResult, Result } from "@/model";
import { paginate, staticArticles, staticResponse, type StaticPromise } from "@/data/static";
import { Archives } from "./types";

/**
 * 查看文章归档
 * @param params 查询条件
 * @returns 文章归档
 */
export function getArchivesList(params: PageQuery): StaticPromise<PageResult<Archives[]>> {
  return staticResponse({
    recordList: paginate(staticArticles, params.current, params.size),
    count: staticArticles.length,
  });
}
