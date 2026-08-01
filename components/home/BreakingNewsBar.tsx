"use client";

import Link from "next/link";
import { ChevronRight, Radio } from "lucide-react";

import { breakingNews } from "@/data/breakingNews";

const BreakingNewsBar = () => {
  const article = breakingNews[0];

  return (
    <section className="rounded-xl border border-red-200 bg-red-50">
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <Radio className="h-3.5 w-3.5" />

            LIVE
          </div>

          <span className="hidden text-sm font-semibold text-red-700 sm:block">
            BREAKING NEWS
          </span>
        </div>

        <Link
          href={`/article/${article.slug}`}
          className="group flex flex-1 items-center justify-between gap-4"
        >
          <div>
            <h3 className="line-clamp-1 font-semibold text-gray-900">
              {article.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {article.publishedAt}
            </p>
          </div>

          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default BreakingNewsBar;