import Link from "next/link";
import MediumNewsCard from "@/components/news/MediumNewsCard";
import { NewsArticle } from "@/types/news";

type Props = {
  articles: NewsArticle[];
};

const RelatedArticles = ({ articles }: Props) => {
  if (!articles.length) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold">
        Related Articles
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <MediumNewsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;