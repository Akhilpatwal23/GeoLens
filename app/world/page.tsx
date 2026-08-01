import CategoryPage from "@/components/category/CategoryPage";
import { getWorldPageNews } from "@/services/news/news.service";

export default async function WorldPage() {
  const articles = await getWorldPageNews();

  return (
    <CategoryPage
      title="World"
      articles={articles}
    />
  );
}