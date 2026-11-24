import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const CompactNewsCard = ({ article }: Props) => {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex gap-4">
        {/* Thumbnail */}

        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 96px, 96px"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col">
          <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
            {article.feed}
          </span>

          <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900">
            {article.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {article.summary}
          </p>

          <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-gray-500">
            <Clock size={14} />

            <span>{article.publishedAt}</span>

            <span>•</span>

            <span>{article.source}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompactNewsCard;