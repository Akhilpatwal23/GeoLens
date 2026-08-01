import { NewsArticle } from "@/types/news";

import { scoreArticle } from "./scorer";

export function getTopStory(
  articles: NewsArticle[]
) {

  const scored =
    articles.map(article => ({

      ...article,

      score:
        scoreArticle(article)

    }));


  scored.sort(
    (a, b) =>
      (b.score ?? 0) -
      (a.score ?? 0)
  );

  return scored[0];

}