import Parser from "rss-parser";

const parser = new Parser();

export async function fetchRSS(url: string) {
  try {
    const feed = await parser.parseURL(url);


    return feed;
  } catch (error) {
    return null;
  }
}