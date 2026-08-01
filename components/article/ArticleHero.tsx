import Image from "next/image";
import { Clock } from "lucide-react";

import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const ArticleHero = ({ article }: Props) => {
  return (
    <header className="mb-12">
      {/* Category */}

     <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
  {article.feed}
</span>

      {/* Title */}

      <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
        {article.title}
      </h1>

      {/* Summary */}

      <p className="mt-6 max-w-4xl text-xl leading-9 text-slate-600">
        {article.summary}
      </p>

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

      <div className="relative mt-10 h-[260px] overflow-hidden rounded-3xl md:h-[420px] lg:h-[550px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
      </div>
    </header>
  );
};

export default ArticleHero;