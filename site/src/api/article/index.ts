import { PageQuery, PageResult, Result } from "@/model";
import { getStaticArticle, paginate, staticArticles, staticResponse, type StaticPromise } from "@/data/static";
import { Article, ArticleInfo, ArticleRecommend, ArticleSearch } from "./types";

/**
 * 查看文章列表
 * @param params 查询条件
 * @returns 文章列表
 */
export function getArticleList(params: PageQuery): StaticPromise<PageResult<Article[]>> {
  return staticResponse({
    recordList: paginate(staticArticles, params.current, params.size),
    count: staticArticles.length,
  });
}

/**
 * 查看文章
 * @param articleId 文章id
 */
export function getArticle(articleId: number): StaticPromise<ArticleInfo> {
  return staticResponse(getStaticArticle(articleId)!);
}

/**
 * 查看推荐文章
 * @returns 推荐文章
 */
export function getArticleRecommend(): StaticPromise<ArticleRecommend[]> {
  const featured = staticArticles.filter((article) => article.featured);
  const articles = (featured.length ? featured : staticArticles).slice(0, 5);
  return staticResponse(articles);
}

/**
 * 搜索文章
 * @returns 文章列表
 */
export function searchArticle(keyword: string): StaticPromise<ArticleSearch[]> {
  const normalized = keyword.trim().toLocaleLowerCase();
  const articles = staticArticles
    .filter((article) => `${article.articleTitle}\n${article.articleContent}`.toLocaleLowerCase().includes(normalized))
    .map(({ id, articleTitle, articleContent }) => ({ id, articleTitle, articleContent }));
  return staticResponse(articles);
}

/**
 * 点赞文章
 * @param articleId 文章id
 */
export function likeArticle(articleId: number): StaticPromise<null> {
  void articleId;
  return staticResponse(null);
}
