import { NewsArticle } from "@/types/news";
import MediumNewsCard from "./MediumNewsCard";

type Props = {
  articles: NewsArticle[];
};

export default function NewsGrid({
  articles,
}: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {articles.map((article) => (
        <MediumNewsCard
          key={article.id}
          article={article}
        />
      ))}

    </div>
  );
}