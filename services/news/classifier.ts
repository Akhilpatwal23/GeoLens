import { NewsArticle } from "@/types/news";

import { NEWS_TAGS } from "./tags";

export function classifyArticles(
  articles: NewsArticle[]
): NewsArticle[] {

  return articles.map(article => {

    const text =
      `${article.title} ${article.summary}`.toLowerCase();

    const tags: string[] = [];

    Object.entries(NEWS_TAGS).forEach(
      ([tag, keywords]) => {

        if (
          keywords.some(keyword =>
            text.includes(keyword)
          )
        ) {
          tags.push(tag);
        }

      }
    );

   
    return {

      ...article,

      tags,

      primaryCategory:
        tags[0] ?? "General",

      category:
        tags[0] ?? "General"

    };

  });

}