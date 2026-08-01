import { NewsArticle } from "@/types/news";

type CreateNewsArticleParams = {
  id: string;
  title: string;
  category: string;
  slug?: string;
  summary?: string;
  image?: string;
  source?: string;
  publishedAt?: string;
  content?: string;
};

export const createNewsArticle = ({
  id,
  title,
  category,
  slug,
  summary,
  image,
  source,
  publishedAt,
  content,
}: CreateNewsArticleParams): NewsArticle => {
  return {
    id,
    title,
    category,
    slug: slug ?? id,

    summary:
      summary ??
      "Stay informed with in-depth reporting, expert analysis, and AI-powered explanations that help you understand not just what happened, but why it matters.",

    image:
      image ??
      `https://picsum.photos/seed/${id}/1200/800`,

    source: source ?? "GeoScope",

    publishedAt: publishedAt ?? "2 hours ago",
    content: content ??
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
   Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.

   India has continued strengthening regional partnerships while focusing
   on maritime security and economic cooperation.
   The initiative is expected to improve strategic relations across the
   Indo-Pacific region while encouraging trade and stability.`,
  };
};