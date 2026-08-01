import { createNewsArticle } from "./newsFactory";

export const heroNews = createNewsArticle({
  id: "hero-1",
  title: "India strengthens strategic partnerships across the Indo-Pacific",
  category: "Geopolitics",
  slug: "india-indo-pacific",
});

export const worldNews = [
  heroNews,

  createNewsArticle({
    id: "world-1",
    title: "China expands naval exercises near Taiwan",
    category: "World",
  }),

  createNewsArticle({
    id: "world-2",
    title: "Oil prices rise after Middle East tensions",
    category: "Economy",
  }),

  createNewsArticle({
    id: "world-3",
    title: "BRICS leaders prepare for annual summit",
    category: "Geopolitics",
  }),
];

export const indiaNews = [
  createNewsArticle({
    id: "india-1",
    title: "India launches Digital Infrastructure Mission",
    category: "India",
  }),

  createNewsArticle({
    id: "india-2",
    title: "Parliament debates new education reforms",
    category: "Politics",
  }),

  createNewsArticle({
    id: "india-3",
    title: "Indian Navy completes joint maritime exercise",
    category: "Defense",
  }),

  createNewsArticle({
    id: "india-4",
    title: "ISRO announces next lunar mission milestone",
    category: "Science",
  }),
];

export const geopoliticsNews = [
  createNewsArticle({
    id: "geo-1",
    title: "NATO leaders discuss European security",
    category: "Geopolitics",
  }),

  createNewsArticle({
    id: "geo-2",
    title: "South China Sea tensions continue to rise",
    category: "Geopolitics",
  }),

  createNewsArticle({
    id: "geo-3",
    title: "Iran nuclear negotiations resume",
    category: "World",
  }),

  createNewsArticle({
    id: "geo-4",
    title: "Global trade routes face new challenges",
    category: "Economy",
  }),
];