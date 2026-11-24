import * as cheerio from "cheerio";

type MediaElement = {
  url?: string;
  $?: { url?: string };
};

type FeedItem = {
  enclosure?: MediaElement;
  "media:content"?: MediaElement | MediaElement[];
  "media:thumbnail"?: MediaElement | MediaElement[];
  "content:encoded"?: string;
  content?: string;
};

export function extractImage(item: FeedItem): string {
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }

  const mediaContent = Array.isArray(item["media:content"])
    ? item["media:content"]
    : [item["media:content"]];
  const mediaThumbnail = Array.isArray(item["media:thumbnail"])
    ? item["media:thumbnail"]
    : [item["media:thumbnail"]];

  for (const media of [...mediaContent, ...mediaThumbnail]) {
    const url = media?.url ?? media?.$?.url;
    if (url) return url;
  }

  const html = item["content:encoded"] || item.content || "";
  const image = cheerio.load(html)("img").first().attr("src");
  if (image) return image;

  return "/images/news-placeholder.svg";
}