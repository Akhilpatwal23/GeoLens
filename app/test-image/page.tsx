import { getArticleImage } from "@/services/news/media/imageExtractor";

export default async function TestImagePage() {
  const image = await getArticleImage(
    "https://www.thehindu.com/news/international/amid-row-with-philippines-china-issues-new-rules-to-assert-control-over-south-china-sea-shoal/article71295672.ece"
  );

  return (
    <div className="p-10">
      <h1>Image Test</h1>

      <p>{image}</p>

      {image && (
        <img
          src={image}
          alt="News"
          width={600}
        />
      )}
    </div>
  );
}