import {
  worldNews,
  indiaNews,
  geopoliticsNews,
} from "@/data/mockNews";

const allArticles = [
  ...worldNews,
  ...indiaNews,
  ...geopoliticsNews,
];

export function getArticleBySlug(slug: string) {
  return allArticles.find(
    (article) => article.slug === slug
  );
}

export function getRelatedArticles(
  category: string,
  currentSlug: string
) {
  return allArticles.filter(
    (article) =>
      article.category === category &&
      article.slug !== currentSlug
  );
}