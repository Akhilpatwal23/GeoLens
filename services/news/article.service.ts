import { buildNewsPipeline } from "./pipeline";
import { NewsArticle } from "@/types/news";

export async function getArticleBySlug(
  slug: string
): Promise<NewsArticle | undefined> {
  const articles = await buildNewsPipeline();

  return articles.find((article) => article.slug === slug);
}

export async function getRelatedArticles(
  feed: string,
  currentSlug: string
): Promise<NewsArticle[]> {
  const articles = await buildNewsPipeline();

  return articles
    .filter(
      (article) =>
        article.feed === feed &&
        article.slug !== currentSlug
    )
    .slice(0, 4);
}