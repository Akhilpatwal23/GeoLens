import { NewsArticle } from "@/types/news";
import { getArticleImage } from "./media/imageExtractor";

export async function normalizeArticle(
  item: any,
  source: string,
  category: string
): Promise<NewsArticle> {

  const image = await getArticleImage(item.link);

  return {
    id: item.guid ?? item.link ?? crypto.randomUUID(),

    title: item.title ?? "",

    summary:
      item.contentSnippet ??
      item.content ??
      "",

    content:
      item.content ??
      item.contentSnippet ??
      "",

    image: image ?? "/images/news-placeholder.jpg",

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