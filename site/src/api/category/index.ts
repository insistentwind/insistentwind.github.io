import { Result } from "@/model";
import { staticArticles, staticCategories, staticResponse, type StaticPromise } from "@/data/static";
import { ArticleConditionList, ArticleQuery } from "../article/types";
import { Category } from "./types";

/**
 * 查看文章分类
 * @returns 文章分类
 */
export function getCategoryList(): StaticPromise<Category[]> {
  return staticResponse(staticCategories);
}

/**
 * 查看分类文章
 * @returns 文章分类
 */
export function getCategoryArticleList(
  params: ArticleQuery
): StaticPromise<ArticleConditionList> {
  const category = staticCategories.find((item) => item.id === params.categoryId);
  return staticResponse({
    articleConditionVOList: staticArticles.filter((article) => article.category.id === params.categoryId),
    name: category?.categoryName ?? "分类",
  });
}
