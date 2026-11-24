
import Container from "@/components/layout/Container";
import NewsGrid from "@/components/news/NewsGrid";
import { NewsArticle } from "@/types/news";

type Props = {
  title: string;
  articles: NewsArticle[];
};

export default function CategoryPage({
  title,
  articles,
}: Props) {
  return (
    <Container>
      <section className="py-10">

        <h1 className="mb-8 text-4xl font-bold">
          {title}
        </h1>

        {articles.length > 0 ? (
          <NewsGrid articles={articles} />
        ) : (
          <p className="border-t border-gray-200 py-6 text-gray-600">
            No current stories match this topic. Check back after the next news refresh.
          </p>
        )}

      </section>
    </Container>
  );
}