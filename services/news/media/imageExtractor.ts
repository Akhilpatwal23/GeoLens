import * as cheerio from "cheerio";
import { getCachedImage, saveImage } from "../cache/imageCache";

export async function getArticleImage(
  url: string
): Promise<string | null> {
     const cachedImage = getCachedImage(url);

  if (cachedImage) {
    return cachedImage;
  }
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    const $ = cheerio.load(html);

   const image =
  $('meta[property="og:image"]').attr("content") ||
  $('meta[name="twitter:image"]').attr("content") ||
  null;

if (image) {
  saveImage(url, image);
}

return image;
  } catch {
    return null;
  }
}