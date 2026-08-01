import { NewsArticle } from "@/types/news";

export function scoreArticle(article: NewsArticle) {

    let score = 0;

    if (article.feed === "World")
        score += 40;

    if (article.feed === "India")
        score += 20;

    const title =
        article.title.toLowerCase();

    if (title.includes("breaking"))
        score += 25;

    if (title.includes("war"))
        score += 15;

    if (title.includes("china"))
        score += 15;

    if (title.includes("india"))
        score += 10;

    return score;
}