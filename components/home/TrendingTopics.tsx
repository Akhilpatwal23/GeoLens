import Link from "next/link";

import { trendingTopics } from "@/data/trendingTopics";

const TrendingTopics = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900">
        Trending Topics
      </h3>

      <div className="mt-5 flex flex-wrap gap-3">
        {trendingTopics.map((topic) => (
          <Link
            key={topic}
            href={`/topic/${topic.toLowerCase()}`}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-700 hover:text-white"
          >
            #{topic}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;