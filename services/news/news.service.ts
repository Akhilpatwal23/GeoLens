import { buildNewsPipeline } from "./pipeline";

import { byFeed } from "./filter";

import { getTopStory } from "./topStory";

export async function getHomepageNews() {

    const news =
        await buildNewsPipeline();

    return {

        hero:
            getTopStory(news),

    latest:
      [...news].sort((a, b) => {
        const dateA = Date.parse(a.publishedAt) || 0;
        const dateB = Date.parse(b.publishedAt) || 0;
        return dateB - dateA;
      })[0],

        india:
            byFeed(news, "India"),

        world:
            byFeed(news, "World"),
    };

}


export async function getIndiaPageNews() {
  const homepage = await getHomepageNews();
  return homepage.india;
}

export async function getWorldPageNews() {
  const homepage = await getHomepageNews();
  return homepage.world;
}

export async function getGeopoliticsPageNews() {
  const news = await buildNewsPipeline();
  return news.filter(article =>
    article.title.toLowerCase().includes("china") ||
    article.title.toLowerCase().includes("india") ||
    article.title.toLowerCase().includes("pakistan") ||
    article.title.toLowerCase().includes("israel") ||
    article.title.toLowerCase().includes("russia") ||
    article.title.toLowerCase().includes("ukraine") ||
    article.title.toLowerCase().includes("taiwan")
  );
}

export async function getEconomyPageNews() {
  const news = await buildNewsPipeline();
  return news.filter(article =>
    article.title.toLowerCase().includes("economy") ||
    article.title.toLowerCase().includes("trade") ||
    article.title.toLowerCase().includes("market") ||
    article.title.toLowerCase().includes("gdp")
  );
}

export async function getMilitaryPageNews() {
  const news = await buildNewsPipeline();
  return news.filter(article =>
    article.title.toLowerCase().includes("military") ||
    article.title.toLowerCase().includes("army") ||
    article.title.toLowerCase().includes("navy") ||
    article.title.toLowerCase().includes("air force") ||
    article.title.toLowerCase().includes("missile")
  );
}

export async function getTopicPageNews(topicSlug: string) {
  const topic = decodeURIComponent(topicSlug)
    .replace(/-/g, " ")
    .trim()
    .toLowerCase();
  const normalizedTopic = topic.replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ");
  const articles = await buildNewsPipeline();

  return articles.filter((article) => {
    const searchableText = [
      article.title,
      article.summary,
      article.content,
      ...article.tags,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ");

    return searchableText.includes(normalizedTopic);
  });
}