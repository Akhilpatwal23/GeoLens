import { RSS_FEEDS } from "@/constants/rssFeeds";
import { NewsArticle } from "@/types/news";

import { fetchRSS } from "./rssFetcher";
import { normalizeArticle } from "./normalizer";

export async function aggregateNews(): Promise<NewsArticle[]> {
  const feeds = await Promise.all([
    fetchRSS(RSS_FEEDS.THE_HINDU.INDIA),
    fetchRSS(RSS_FEEDS.THE_HINDU.WORLD),
    fetchRSS(RSS_FEEDS.HINDUSTAN_TIMES.INDIA),
    fetchRSS(RSS_FEEDS.HINDUSTAN_TIMES.WORLD),
  ]);

  const articles: NewsArticle[] = [];

  // The Hindu - India
  if (feeds[0]) {
    for (const item of feeds[0].items) {
      articles.push(
        await normalizeArticle(item, "The Hindu", "India")
      );
    }
  }

  // The Hindu - World
  if (feeds[1]) {
    for (const item of feeds[1].items) {
      articles.push(
        await normalizeArticle(item, "The Hindu", "World")
      );
    }
  }

  // Hindustan Times - India
  if (feeds[2]) {
    for (const item of feeds[2].items) {
      articles.push(
        await normalizeArticle(item, "Hindustan Times", "India")
      );
    }
  }

  // Hindustan Times - World
  if (feeds[3]) {
    for (const item of feeds[3].items) {
      articles.push(
        await normalizeArticle(item, "Hindustan Times", "World")
      );
    }
  }

  return articles;
}