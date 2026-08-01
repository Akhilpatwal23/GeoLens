import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const FeaturedNewsCard = ({ article }: Props) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-80 overflow-hidden lg:h-[460px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          {article.feed}
        </span>

        <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
          {article.title}
        </h2>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          {article.summary}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">
              {article.source}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={16} />
              {article.publishedAt}
            </span>
          </div>

          <Link
            href={`/article/${article.slug}`}
            className="group/link inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Read Story

            <ArrowRight
              size={18}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedNewsCard;