import CategoryPage from "@/components/category/CategoryPage";
import { getGeopoliticsPageNews } from "@/services/news/news.service";

export default async function GeopoliticsPage() {
  const articles = await getGeopoliticsPageNews();

  return (
    <CategoryPage
      title="Geopolitics"
      articles={articles}
    />
  );
}