import { Result } from "@/model";
import { staticArticles, staticResponse, staticTags, type StaticPromise } from "@/data/static";
import { ArticleConditionList, ArticleQuery } from "../article/types";
import { Tag } from "./types";

/**
 * 查看文章标签
 * @returns 文章标签
 */
export function getTagList(): StaticPromise<Tag[]> {
  return staticResponse(staticTags);
}

/**
 * 查看标签文章
 * @returns 文章分类
 */
export function getTagArticleList(
  params: ArticleQuery
): StaticPromise<ArticleConditionList> {
  const tag = staticTags.find((item) => item.id === params.tagId);
  return staticResponse({
    articleConditionVOList: staticArticles.filter((article) => article.tagVOList.some((item) => item.id === params.tagId)),
    name: tag?.tagName ?? "标签",
  });
}
