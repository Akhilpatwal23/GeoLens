import CategoryPage from "@/components/category/CategoryPage";

import { getHomepageNews } from "@/services/news/news.service";

export default async function IndiaPage() {

  const homepage =
    await getHomepageNews();

  return (

    <CategoryPage
      title="India"
      articles={homepage.india}
    />

  );

}