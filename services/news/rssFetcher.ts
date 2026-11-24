import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media:content", { keepArray: true }],
      ["media:thumbnail", "media:thumbnail", { keepArray: true }],
      ["content:encoded", "content:encoded"],
    ],
  },
});

export async function fetchRSS(url: string) {
  try {
    const feed = await parser.parseURL(url);

    return feed;
  } catch {
    return null;
  }
}