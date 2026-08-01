export interface NewsArticle {
  id: string;

  title: string;

  summary: string;

  content: string;

  image: string;

  source: string;

  publishedAt: string;

  slug: string;

  feed: string;          // India, World, Business...

  tags: string[];

  score?: number;

  readingTime?: number;
}