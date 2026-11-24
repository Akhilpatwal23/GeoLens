import { aggregateNews } from "./aggregator";
import { removeDuplicates } from "./deduplicator";
import { NewsArticle } from "@/types/news";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { connection } from "next/server";

const NEWS_CACHE_TTL_MS = 5 * 60 * 1000;
let cachedArticles: NewsArticle[] | null = null;
let cachedArticlesPromise: Promise<NewsArticle[]> | null = null;
let cachedArticlesAt = 0;
let cachedArticlesDate = "";

function currentSnapshotDate() {
  return new Date().toISOString().slice(0, 10);
}

async function readSnapshot(requireToday: boolean): Promise<NewsArticle[] | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const snapshotDate = currentSnapshotDate(); // Get today's date
  let snapshotQuery = supabase
    .from("news_snapshots")
    .select("snapshot_date, refreshed_at, status");

  if (requireToday) {
    snapshotQuery = snapshotQuery.eq("snapshot_date", snapshotDate);
  } else {
    snapshotQuery = snapshotQuery.order("refreshed_at", { ascending: false }).limit(1);
  }

  const { data: snapshot, error: snapshotError } = await snapshotQuery.maybeSingle();

  if (snapshotError || !snapshot || snapshot.status !== "success") {
    return null;
  }

  const { data, error } = await supabase
    .from("news_articles")
    .select("external_id, title, summary, content, image_url, source, published_at, slug, feed, tags, score")
    .eq("snapshot_date", snapshot.snapshot_date)
    .order("published_at", { ascending: false });

  if (error || !data) {
    return null;
  }

  return data.map((article) => ({
    id: article.external_id,
    title: article.title,
    summary: article.summary,
    content: article.content,
    image: article.image_url ?? "/images/news-placeholder.svg",
    source: article.source,
    publishedAt: article.published_at ?? "",
    slug: article.slug,
    feed: article.feed,
    tags: article.tags ?? [],
    score: article.score,
  }));
}

async function writeSnapshot(articles: NewsArticle[]) {
  const supabase = getSupabaseServerClient();
  if (!supabase || articles.length === 0) return;

  const snapshotDate = currentSnapshotDate();
  const now = new Date().toISOString();
  const articleRows = articles.map((article) => {
    const publishedAt = article.publishedAt ? new Date(article.publishedAt) : null;

    return {
      external_id: article.id,
      title: article.title,
      summary: article.summary,
      content: article.content,
      image_url: article.image,
      source: article.source,
      published_at: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt.toISOString() : null,
      feed: article.feed,
      slug: article.slug,
      score: article.score ?? 0,
      tags: article.tags,
      snapshot_date: snapshotDate,
      updated_at: now,
    };
  });

  const { error: articleError } = await supabase
    .from("news_articles")
    .upsert(articleRows, { onConflict: "external_id" });

  if (articleError) throw articleError;

  const { error: snapshotError } = await supabase
    .from("news_snapshots")
    .upsert({
      snapshot_date: snapshotDate,
      status: "success",
      article_count: articles.length,
      refreshed_at: now,
      error: null,
    });

  if (snapshotError) throw snapshotError;
}

export async function buildNewsPipeline(): Promise<NewsArticle[]> {
  await connection();

  const now = Date.now();

  if (
    cachedArticles &&
    cachedArticlesDate === currentSnapshotDate() &&
    now - cachedArticlesAt < NEWS_CACHE_TTL_MS
  ) {
    return cachedArticles;
  }

  if (!cachedArticlesPromise) {
    cachedArticlesPromise = (async () => {
      try {
        const snapshot = await readSnapshot(true);
        if (snapshot) return snapshot;
      } catch (error) {
        console.warn("Unable to read today's Supabase news snapshot.", error);
      }

      try {
        const latestSnapshot = await readSnapshot(false);
        if (latestSnapshot?.length) return latestSnapshot;
      } catch (error) {
        console.warn("Unable to read the latest Supabase news snapshot.", error);
      }

      const raw = await aggregateNews();
      const articles = removeDuplicates(raw);

      try {
        await writeSnapshot(articles);
      } catch (error) {
        console.warn("Unable to write the Supabase news snapshot.", error);
      }

      cachedArticles = articles;
      cachedArticlesAt = Date.now();
      cachedArticlesDate = currentSnapshotDate();
      return articles;
    })();
  }

  try {
    return await cachedArticlesPromise;
  } finally {
    cachedArticlesPromise = null;
  }
}

export async function refreshNewsSnapshot(): Promise<NewsArticle[]> {
  if (!getSupabaseServerClient()) {
    throw new Error("Supabase is not configured for scheduled news refresh.");
  }

  const raw = await aggregateNews();
  const articles = removeDuplicates(raw);

  if (articles.length === 0) {
    throw new Error("RSS refresh returned no articles; existing snapshot was kept.");
  }

  await writeSnapshot(articles);
  cachedArticles = articles;
  cachedArticlesAt = Date.now();
  cachedArticlesDate = currentSnapshotDate();
  return articles;
}