import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const ArticleBody = ({ article }: Props) => {
  const paragraphs = (article.content.trim() || article.summary.trim())
    .split("\n")
    .filter(Boolean);

  return (
    <section className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-base leading-8 text-slate-700 md:text-lg"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default ArticleBody;