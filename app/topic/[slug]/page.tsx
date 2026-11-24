import CategoryPage from "@/components/category/CategoryPage";
import { getTopicPageNews } from "@/services/news/news.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const articles = await getTopicPageNews(slug);

  const title = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return <CategoryPage title={`#${title}`} articles={articles} />;
}