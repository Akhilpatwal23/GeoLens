import Link from "next/link";
import { ArrowRight } from "lucide-react";

import FeaturedNewsCard from "@/components/news/FeaturedNewsCard";
import MediumNewsCard from "@/components/news/MediumNewsCard";

import { NewsArticle } from "@/types/news";

type Props = {
  title: string;
  href: string;
  articles: NewsArticle[];
};

const NewsSection = ({
  title,
  href,
  articles,
}: Props) => {
  if (articles.length === 0) return null;

  const [featured, ...others] = articles;

  return (
    <section className="py-14">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {title}
        </h2>

        <Link
          href={href}
          className="group flex items-center gap-2 font-semibold text-blue-700"
        >
          View All

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left */}
        <FeaturedNewsCard article={featured} />

        {/* Right */}
        <div className="space-y-6">
          {others.slice(0, 3).map((article) => (
            <MediumNewsCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;