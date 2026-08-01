import CategoryPage from "@/components/category/CategoryPage";
import { getMilitaryPageNews } from "@/services/news/news.service";

export default async function MilitaryPage() {
  const articles = await getMilitaryPageNews();

  return (
    <CategoryPage
      title="Military"
      articles={articles}
    />
  );
}