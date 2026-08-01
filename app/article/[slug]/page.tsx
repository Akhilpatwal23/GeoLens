import { notFound } from "next/navigation";

import ArticleLayout from "@/components/article/ArticleLayout";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleBody from "@/components/article/ArticleBody";
import ArticleReadingLayout from "@/components/article/ArticleReadingLayout";
import AISidebar from "@/components/article/AISidebar";
import RelatedArticles from "@/components/article/RelatedArticles";

import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/services/news/article.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.feed,
    article.slug
  );

  return (
    <ArticleLayout>
      <ArticleHero article={article} />

      <ArticleReadingLayout
        content={<ArticleBody article={article} />}
        sidebar={<AISidebar />}
      />

      <RelatedArticles articles={relatedArticles} />
    </ArticleLayout>
  );
}