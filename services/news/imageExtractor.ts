type FeedItem = {
  enclosure?: { url?: string };
  "media:content"?: { $?: { url?: string } };
  "media:thumbnail"?: { $?: { url?: string } };
  "content:encoded"?: string;
  content?: string;
};

export function extractImage(item: FeedItem): string {
  // RSS enclosure
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }

  // media:content
  if (item["media:content"]?.$?.url) {
    return item["media:content"].$.url;
  }

  // media:thumbnail
  if (item["media:thumbnail"]?.$?.url) {
    return item["media:thumbnail"].$.url;
  }

  // Look for an image inside the HTML content
  const html = item["content:encoded"] || item.content || "";

  const match = html.match(/<img[^>]+src="([^"]+)"/i);

  if (match) {
    return match[1];
  }

  // Fallback image
  return "/images/news-placeholder.jpg";
}