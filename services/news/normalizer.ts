import { NewsArticle } from "@/types/news";
import { extractImage } from "./imageExtractor";

type FeedItem = {
  link?: string;
  guid?: string;
  title?: string;
  contentSnippet?: string;
  content?: string;
  "content:encoded"?: string;
  pubDate?: string;
  enclosure?: { url?: string };
  "media:content"?: { url?: string; $?: { url?: string } } | { url?: string; $?: { url?: string } }[];
  "media:thumbnail"?: { url?: string; $?: { url?: string } } | { url?: string; $?: { url?: string } }[];
};

export async function normalizeArticle(
  item: FeedItem,
  source: string,
  category: string
): Promise<NewsArticle> {
  const image = extractImage(item);

  return {
    id: item.guid ?? item.link ?? crypto.randomUUID(),

    title: item.title ?? "",

    summary: item.contentSnippet ?? item.content ?? "",

    content: item.content ?? item.contentSnippet ?? "",

    image,
    source,
    publishedAt: item.pubDate ?? "",
    feed: category,
    tags: [],
    slug: encodeURIComponent(
      (item.title ?? "")
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    ),
  };
}