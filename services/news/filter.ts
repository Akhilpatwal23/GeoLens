import { NewsArticle } from "@/types/news";

export function byFeed(
  articles: NewsArticle[],
  feed: string
) {
  return articles.filter(
    article => article.feed === feed
  );
}