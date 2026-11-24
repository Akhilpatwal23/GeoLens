import Image from "next/image";
import { Clock } from "lucide-react";

import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const ArticleHero = ({ article }: Props) => {
  return (
    <header className="mb-6">
      {/* Category */}

     <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
  {article.feed}
</span>

      {/* Title */}

      <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
        {article.title}
      </h1>

      {/* Summary */}

      <div className="mt-5 max-w-3xl border-l-2 border-blue-600 pl-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-700">
          Article overview
        </p>
        <p className="text-xl leading-8 text-slate-700">
          {article.summary}
        </p>
      </div>

      {/* Meta */}

      <div className="mt-8 flex flex-wrap items-center gap-6 border-y py-5 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">
          {article.source}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={16} />
          {article.publishedAt}
        </span>

        <span>5 min read</span>
      </div>

      {/* Hero Image */}

      <div className="relative mt-6 h-[240px] overflow-hidden rounded-2xl md:h-[380px] lg:h-[460px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

    </header>
  );
};

export default ArticleHero;