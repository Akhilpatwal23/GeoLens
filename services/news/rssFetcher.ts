import Parser from "rss-parser";

const parser = new Parser();

export async function fetchRSS(url: string) {
  try {
    const feed = await parser.parseURL(url);

    console.log("==================================");
    console.log("RSS URL:", url);
    console.log(feed.items[0]);
    console.log("==================================");

    return feed;
  } catch (error) {
    console.error(error);
    return null;
  }
}