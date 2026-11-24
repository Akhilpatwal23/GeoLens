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

  const articleGroups = [
    { feed: feeds[0], source: "The Hindu", category: "India" },
    { feed: feeds[1], source: "The Hindu", category: "World" },
    { feed: feeds[2], source: "Hindustan Times", category: "India" },
    { feed: feeds[3], source: "Hindustan Times", category: "World" },
  ];

  const articles = (
    await Promise.all(
      articleGroups.flatMap(({ feed, source, category }) =>
        feed ? feed.items.map((item) => normalizeArticle(item, source, category)) : []
      )
    )
  ).flat();

  return articles;
}