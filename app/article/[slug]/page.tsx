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
import { simplifyNews } from "@/services/ai/explain";
import ArticleInsight from "@/components/article/ArticleInsight";
import ArticleAskBox from "@/components/article/ArticleAskBox";

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
  const insight = await simplifyNews(article);

  return (
    <ArticleLayout>
      <ArticleHero article={article} />

      <ArticleReadingLayout
        content={
          <div className="space-y-8">
            <ArticleBody article={article} />
            <ArticleInsight insight={insight} />
            <ArticleAskBox articleSlug={article.slug} />
          </div>
        }
        sidebar={
          <AISidebar insight={insight} />
        }
      />

      <RelatedArticles articles={relatedArticles} />
    </ArticleLayout>
  );
}