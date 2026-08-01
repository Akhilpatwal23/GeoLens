import { createNewsArticle } from "./newsFactory";

export const breakingNews = [
  createNewsArticle({
    id: "breaking-1",
    title: "India strengthens maritime cooperation across the Indo-Pacific",
    category: "Breaking",
    publishedAt: "2m ago",
    slug: "india-maritime",
  }),

  createNewsArticle({
    id: "breaking-2",
    title: "Oil prices surge following Middle East tensions",
    category: "Breaking",
    publishedAt: "12m ago",
    slug: "oil-prices",
  }),

  createNewsArticle({
    id: "breaking-3",
    title: "BRICS leaders prepare for annual summit",
    category: "Breaking",
    publishedAt: "20m ago",
    slug: "brics-summit",
  }),

  createNewsArticle({
    id: "breaking-4",
    title: "China begins new naval drills near Taiwan",
    category: "Breaking",
    publishedAt: "35m ago",
    slug: "taiwan-drills",
  }),
];