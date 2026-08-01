import Image from "next/image";

import { Clock } from "lucide-react";

import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const NewsCard = ({ article }: Props) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {article.category}
        </span>

        <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-gray-900">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {article.summary}
        </p>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-sm font-medium text-gray-700">
            {article.source}
          </span>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={15} />
            {article.publishedAt}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;