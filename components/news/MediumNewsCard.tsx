import Image from "next/image";
import Link from "next/link";

import { NewsArticle } from "@/types/news";

type Props = {
  article: NewsArticle;
};

const MediumNewsCard = ({ article }: Props) => {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg"
    >
      <div className="relative h-52 w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <span className="text-sm font-semibold text-blue-600">
          {article.feed}
        </span>

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {article.title}
        </h3>

        <p className="mt-3 text-slate-600 line-clamp-3">
          {article.summary}
        </p>
      </div>
    </Link>
  );
};

export default MediumNewsCard;