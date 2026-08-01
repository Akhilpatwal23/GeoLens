import Container from "@/components/layout/Container";

import BreakingNewsBar from "@/components/home/BreakingNewsBar";
import Hero from "@/components/home/Hero";
import NewsSection from "@/components/home/NewsSection";

import { getHomepageNews } from "@/services/news/news.service";

const HomepageLayout = async () => {
  const homepage = await getHomepageNews();
  return (
    <Container>
      <div className="space-y-12 py-8">

        <BreakingNewsBar />

  <Hero article={homepage.hero} />

<NewsSection
  title="India"
  href="/india"
  articles={homepage.india}
/>

<NewsSection
  title="World"
  href="/world"
  articles={homepage.world}
/>

      </div>
    </Container>
  );
};

export default HomepageLayout;