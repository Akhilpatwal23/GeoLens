import FeaturedNewsCard from "@/components/news/FeaturedNewsCard";
import CompactNewsCard from "@/components/news/CompactNewsCard";

import TrendingTopics from "./TrendingTopics";

import { NewsArticle } from "@/types/news";

type HeroProps = {
  article: NewsArticle;
};

const Hero = ({ article }: HeroProps) => {
  return (
    <section className="space-y-8">
      {/* Featured Story */}
      <FeaturedNewsCard article={article} />

      {/* Bottom Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <h2 className="mb-5 text-2xl font-bold">
            Latest News
          </h2>

          <div className="space-y-4">
            <CompactNewsCard article={article} />
          </div>
        </div>

        {/* Trending */}
        <TrendingTopics />
      </div>
    </section>
  );
};

export default Hero;