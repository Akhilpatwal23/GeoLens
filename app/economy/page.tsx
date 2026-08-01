import CategoryPage from "@/components/category/CategoryPage";
import { getEconomyPageNews } from "@/services/news/news.service";

export default async function EconomyPage() {
  const articles = await getEconomyPageNews();

  return (
    <CategoryPage
      title="Economy"
      articles={articles}
    />
  );
}