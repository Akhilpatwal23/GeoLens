import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const ArticleBody = ({ article }: Props) => {
  const paragraphs = article.content
    .split("\n")
    .filter(Boolean);

  return (
    <section className="space-y-6">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg leading-9 text-slate-700"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default ArticleBody;