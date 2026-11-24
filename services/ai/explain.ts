import { ArticleInsight as Insight } from "@/types/articleInsight";
import { NewsArticle } from "@/types/news";
import { articlePrompt } from "./prompts";
import { GROQ_CHAT_COMPLETIONS_URL, GROQ_MODEL } from "./groq";

const INSIGHT_CACHE_TTL_MS = 30 * 60 * 1000;
const insightCache = new Map<string, { expiresAt: number; promise: Promise<Insight> }>();

function buildFallbackInsight(article: NewsArticle): Insight {
  const topic = article.tags[0] ?? article.feed ?? "this issue";

  return {
    simpleExplanation: `This article explains ${article.title.toLowerCase()} in plain language. The main idea is that ${article.summary.toLowerCase()}`,
    background: `The story is connected to ${article.feed} and matters because it can influence public discussion, policy, and regional developments.`,
    whyItMatters: `It matters because it may shape how people, businesses, and governments respond to ${topic.toLowerCase()}.`,
    timeline: [
      "The story is developing in real time.",
      "Readers should follow future updates for the latest developments.",
    ],
    countries: article.tags.filter((tag) => tag.length <= 20).slice(0, 3),
    people: [],
    organizations: [article.source],
    topics: article.tags.slice(0, 5),
    learnMore: [article.source, `/article/${article.slug}`],
  };
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start >= 0 && end > start) {
    return candidate.slice(start, end + 1);
  }

  return candidate.trim();
}

function normalizeInsight(raw: Partial<Insight> | undefined, fallback: Insight): Insight {
  return {
    simpleExplanation: raw?.simpleExplanation?.trim() || fallback.simpleExplanation,
    background: raw?.background?.trim() || fallback.background,
    whyItMatters: raw?.whyItMatters?.trim() || fallback.whyItMatters,
    timeline: Array.isArray(raw?.timeline)
      ? raw.timeline.filter(
          (item): item is string => typeof item === "string" && item.trim().length > 0
        )
      : fallback.timeline,
    countries: Array.isArray(raw?.countries)
      ? raw.countries.filter(
          (item): item is string => typeof item === "string" && item.trim().length > 0
        )
      : fallback.countries,
    people: Array.isArray(raw?.people)
      ? raw.people.filter(
          (item): item is string => typeof item === "string" && item.trim().length > 0
        )
      : fallback.people,
    organizations: Array.isArray(raw?.organizations)
      ? raw.organizations.filter(
          (item): item is string => typeof item === "string" && item.trim().length > 0
        )
      : fallback.organizations,
    topics: Array.isArray(raw?.topics)
      ? raw.topics.filter(
          (item): item is string => typeof item === "string" && item.trim().length > 0
        )
      : fallback.topics,
    learnMore: Array.isArray(raw?.learnMore)
      ? raw.learnMore.filter(
          (item): item is string => typeof item === "string" && item.trim().length > 0
        )
      : fallback.learnMore,
  };
}

export async function simplifyNews(article: NewsArticle): Promise<Insight> {
  const cacheKey = article.slug || article.title;
  const existing = insightCache.get(cacheKey);

  if (existing && existing.expiresAt > Date.now()) {
    return existing.promise;
  }

  if (existing) {
    insightCache.delete(cacheKey);
  }

  const fallback = buildFallbackInsight(article);
  const apiKey = process.env.API_KEY;

  const promise = (async (): Promise<Insight> => {
    if (!apiKey) {
      return fallback;
    }

    try {
      const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: "You are a helpful news analyst. Return only valid JSON.",
            },
            {
              role: "user",
              content: articlePrompt(
                `${article.title}\n\n${article.summary}\n\n${article.content.slice(0, 12000)}`
              ),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("AI simplification request failed");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(extractJson(content));

      return normalizeInsight(parsed, fallback);
    } catch {
      return fallback;
    }
  })();

  insightCache.set(cacheKey, {
    expiresAt: Date.now() + INSIGHT_CACHE_TTL_MS,
    promise,
  });

  return promise;
}
