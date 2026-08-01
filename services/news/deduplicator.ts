import { NewsArticle } from "@/types/news";

export function removeDuplicates(
  articles: NewsArticle[]
): NewsArticle[] {

  const seen = new Set<string>();

  return articles.filter((article) => {

    const title = article.title
      .toLowerCase()
      .trim();

    if (seen.has(title))
      return false;

    seen.add(title);

    return true;
  });
}