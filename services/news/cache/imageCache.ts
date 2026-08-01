const imageCache = new Map<
  string,
  {
    image: string;
    timestamp: number;
  }
>();

const CACHE_TIME = 1000 * 60 * 60; // 1 hour

export function getCachedImage(url: string) {
  const cached = imageCache.get(url);

  if (!cached) {
    return null;
  }

  if (Date.now() - cached.timestamp > CACHE_TIME) {
    imageCache.delete(url);
    return null;
  }

  return cached.image;
}

export function saveImage(url: string, image: string) {
  imageCache.set(url, {
    image,
    timestamp: Date.now(),
  });
}