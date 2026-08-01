
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

        <NewsGrid articles={articles} />

      </section>
    </Container>
  );
}