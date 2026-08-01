import { createNewsArticle } from "./newsFactory";

export const heroNews = createNewsArticle({
  id: "hero-1",
  title: "India strengthens strategic partnerships across the Indo-Pacific",
  feed: "Geopolitics",
  slug: "india-indo-pacific",
});

export const worldNews = [
  heroNews,

  createNewsArticle({
    id: "world-1",
    title: "China expands naval exercises near Taiwan",
    feed: "World",
  }),

  createNewsArticle({
    id: "world-2",
    title: "Oil prices rise after Middle East tensions",
    feed: "Economy",
  }),

  createNewsArticle({
    id: "world-3",
    title: "BRICS leaders prepare for annual summit",
    feed: "Geopolitics",
  }),
];

export const indiaNews = [
  createNewsArticle({
    id: "india-1",
    title: "India launches Digital Infrastructure Mission",
    feed: "India",
  }),

  createNewsArticle({
    id: "india-2",
    title: "Parliament debates new education reforms",
    feed: "Politics",
  }),

  createNewsArticle({
    id: "india-3",
    title: "Indian Navy completes joint maritime exercise",
    feed: "Defense",
  }),

  createNewsArticle({
    id: "india-4",
    title: "ISRO announces next lunar mission milestone",
    feed: "Science",
  }),
];

export const geopoliticsNews = [
  createNewsArticle({
    id: "geo-1",
    title: "NATO leaders discuss European security",
    feed: "Geopolitics",
  }),

  createNewsArticle({
    id: "geo-2",
    title: "South China Sea tensions continue to rise",
    feed: "Geopolitics",
  }),

  createNewsArticle({
    id: "geo-3",
    title: "Iran nuclear negotiations resume",
    feed: "World",
  }),

  createNewsArticle({
    id: "geo-4",
    title: "Global trade routes face new challenges",
    feed: "Economy",
  }),
];