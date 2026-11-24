# GeoLens / GeoScope

GeoLens (package name: `geoscope`) is a Next.js news application for reading and understanding global affairs. It aggregates India and world news RSS feeds, ranks a top story, and generates article-level context through Groq when an API key is configured.

Supabase PostgreSQL stores the shared news snapshot and reserved AI insight records. There is no authentication system, API route, or server action in the current implementation.

## Table of contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Data flow](#data-flow)
- [News pipeline](#news-pipeline)
- [AI explanation flow](#ai-explanation-flow)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
- [Development guide](#development-guide)
- [Caching and runtime state](#caching-and-runtime-state)
- [Current limitations](#current-limitations)
- [Contributing](#contributing)

## Features

- Live India and World news aggregated from The Hindu and Hindustan Times RSS feeds
- Homepage with a scored hero/top story and category sections
- Topic-style pages for Geopolitics, Economy, and Military news
- Article detail pages with summary, related stories, and AI-style insight cards
- Groq-generated explanations and article Q&A with a local fallback when no key or API call is available
- RSS article image extraction and an article-image test page
- Responsive layout built with Tailwind CSS utilities
- Static mock data retained for breaking news and UI demonstrations

## Technology stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| RSS parsing | `rss-parser` |
| Database/cache | Supabase PostgreSQL |
| HTML parsing | `cheerio` |
| AI | Groq Chat Completions API (OpenAI-compatible) |
| Package manager | npm, with `package-lock.json` |
| Font | Geist through `next/font/google` |

There is no authentication system, API route, or server action in the current implementation.

## Architecture

The application follows a small service-oriented structure inside a Next.js App Router project.

```text
RSS feeds
  |
  v
rssFetcher.ts
  |
  v
aggregator.ts
  |
  v
normalizer.ts
  |
  v
deduplicator.ts
  |
  v
  in-memory cache + Supabase snapshot cache
  |
  +--> homepage/category/news services
  |       |
  |       v
  |     page components
  |
  +--> article service
          |
          v
      AI explain service
          |
          v
      article/insight components
```

Next.js server components call async service functions directly. There is no REST or GraphQL intermediary.

## Routes

| Route | Purpose | Data source |
|---|---|---|
| `/` | Homepage, top story, India and World sections | RSS pipeline |
| `/india` | India news grid | RSS pipeline |
| `/world` | World news grid | RSS pipeline |
| `/geopolitics` | Title-based geopolitics filter | RSS pipeline |
| `/economy` | Title-based economy filter | RSS pipeline |
| `/military` | Title-based military filter | RSS pipeline |
| `/explained` | Placeholder for future explainers | Static |
| `/article/[slug]` | Article details, insight, and related articles | RSS pipeline + AI service |
| `/test-image` | Image-extraction development test | Cheerio extraction |

`app/search` exists in the workspace but has no `page.tsx`, so `/search` is not an implemented route.

## Project structure

```text
app/                       App Router pages and global layout
  article/[slug]/          Dynamic article detail route
  economy/                 Economy news page
  explained/               Placeholder explained page
  geopolitics/             Geopolitics news page
  india/                   India news page
  military/                Military news page
  test-image/              Image extraction test page
  world/                   World news page
  globals.css              Global Tailwind styles
  layout.tsx               Root layout, navbar, footer, metadata
  page.tsx                 Homepage entry point

components/
  article/                 Article hero, body, insight, metadata, timeline, and related UI
  category/                Shared category-page shell
  home/                    Homepage hero and news sections
  layout/                  Container, navbar, footer, and section layout
  news/                    Reusable article cards and grids
  ui/                      Small reusable UI components

constants/
  rssFeeds.ts              RSS source URLs

services/news/
  aggregator.ts            Fetches all configured feeds
  article.service.ts       Finds articles and related articles
  categorizer.ts           Reserved categorization module
  classifier.ts            Reserved classification module
  deduplicator.ts          Removes duplicate articles
  filter.ts                Filters articles by feed/category
  imageExtractor.ts        News image extraction implementation
  news.service.ts          Homepage and topic-page selectors
  normalizer.ts            Converts RSS items to NewsArticle
  pipeline.ts              Cache and pipeline orchestration
  rssFetcher.ts            RSS network fetch wrapper
  scorer.ts                Scores articles for top-story selection
  tags.ts                  Reserved tagging module
  topStory.ts              Selects the highest-scoring article
  cache/                   Cache-related modules
  media/                   Media/image extraction modules

services/ai/
  explain.ts               Groq integration and fallback insight cache
  prompts.ts               Prompt construction
  context.ts               Reserved context module
  glossary.ts              Reserved glossary module
  summary.ts               Reserved summary module
  timeline.ts              Reserved timeline module

data/                     Static/mock article and news collections
lib/                      Legacy/shared article helpers and RSS utilities
config/                   Reserved application configuration
providers/                Reserved provider area
types/                    Shared TypeScript interfaces
```

The `@/*` import alias maps to the project root. For example, `@/services/news/news.service` resolves from the repository root.

## Data flow

### 1. RSS collection

`constants/rssFeeds.ts` declares four feeds:

- The Hindu: India
- The Hindu: World
- Hindustan Times: India
- Hindustan Times: World

`aggregator.ts` requests all feeds concurrently through `Promise.all`.

### 2. RSS parsing

`rssFetcher.ts` uses `rss-parser` to parse feed XML. A failed feed is skipped and does not prevent successful feeds from loading.

### 3. Normalization

`normalizer.ts` converts RSS items into `NewsArticle` objects:

- `id`: GUID, link, or generated UUID
- `title`: RSS title
- `summary`: snippet or content
- `content`: RSS content or snippet
- `image`: feed enclosure/media/image when present, otherwise `/images/news-placeholder.svg`
- `source`: publication name
- `publishedAt`: RSS publication date
- `feed`: `India` or `World`
- `tags`: initialized as an empty array
- `slug`: encoded, lowercase, hyphenated title

### 4. Deduplication and caching

`deduplicator.ts` removes duplicate normalized titles. `pipeline.ts` stores the resulting array for five minutes in process memory.

### 5. Page selection

`news.service.ts` exposes selectors used by pages:

- Homepage: top story plus India and World arrays
- India: articles assigned to the India feed
- World: articles assigned to the World feed
- Geopolitics: title keyword matching
- Economy: title keyword matching
- Military: title keyword matching

`topStory.ts` and `scorer.ts` score articles based on feed and title keywords. The current rule set awards World articles 40 points, India articles 20 points, and bonus points for terms such as `breaking`, `war`, `China`, and `India`.

### 6. Article lookup

`article.service.ts` searches the pipeline for an exact slug and finds related articles from the same feed. It returns at most four related stories.

## News pipeline

The pipeline keeps a five-minute process cache and uses a shared Supabase snapshot for up to 30 minutes. It also includes a promise-level single-flight mechanism:

```ts
const raw = await aggregateNews();
const articles = removeDuplicates(raw);
```

This prevents concurrent consumers in one process from launching duplicate feed fetches. Supabase shares snapshots across server instances. When the database is unavailable, the pipeline falls back to RSS, then to the latest saved snapshot if RSS returns no articles.

To change the cache duration, update `NEWS_CACHE_TTL_MS` in `services/news/pipeline.ts`.

## AI explanation flow

Article pages call `simplifyNews(article)` from `services/ai/explain.ts`.

The service:

1. Builds a local fallback insight from article fields.
2. Checks a 30-minute in-memory cache by slug or title.
3. Reads `API_KEY`.
4. Calls the model configured in `GROQ_MODEL` through Groq Chat Completions when a key exists.
5. Parses JSON from the model response.
6. Replaces missing fields with fallback values.
7. Falls back completely to local insight on missing configuration or request errors.

The model prompt is limited to the first 12,000 characters of article content. Article insight caching is also process-local and resets when the server restarts.

## Getting started

### Prerequisites

- Node.js 20 or later is recommended
- npm
- Internet access for RSS feeds and optional Groq calls

### Install dependencies

```bash
npm install
```

### Configure environment

Create `.env.local` using the values in `.env.example`:

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CRON_SECRET=replace-with-a-long-random-secret
API_KEY=your-groq-api-key
GROQ_MODEL=openai/gpt-oss-120b
```

Supabase and Groq are optional for startup. Without Supabase configuration the app uses RSS directly; without `API_KEY` it uses its built-in fallback insight and article Q&A is unavailable.

### Connect Supabase

1. In the Supabase dashboard, open your `geolens` project and select **SQL Editor**.
2. Open [the initial migration](supabase/migrations/202611240001_initial_news_cache.sql), paste its contents into a new SQL query, and run it. This creates the tables and seeds the four configured RSS sources.
3. In **Project Settings → API** (or **API Keys**), copy the **Project URL** into `SUPABASE_URL`.
4. Copy the private `service_role` or service-role secret key into `SUPABASE_SERVICE_ROLE_KEY`. Never add a `NEXT_PUBLIC_` prefix, commit this key, or use it in browser code.
5. Copy `.env.example` to `.env.local`, replace the placeholders, and restart `npm run dev`.
6. Visit the homepage. The first request fetches RSS and upserts articles; later requests use the latest daily snapshot. Check **Table Editor → news_articles** to confirm rows were inserted.

The service-role key bypasses Row Level Security and is only accessed by the server module. RLS is enabled on all tables with no public policies.

### Schedule one daily refresh

The repository includes a Vercel Cron entry in `vercel.json`. It calls `/api/cron/refresh-news` daily at **00:00 UTC**. The endpoint requires `Authorization: Bearer <CRON_SECRET>` and refuses to overwrite a snapshot if RSS returns no articles.

1. Add `CRON_SECRET` to `.env.local` for local testing and to your Vercel deployment environment variables. Use a long random value and keep it private.
2. Deploy the project to Vercel. The schedule is registered from `vercel.json`; cron jobs run against the deployed URL, not through local `npm run dev`.
3. Optionally test the endpoint locally from PowerShell after starting the dev server:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/cron/refresh-news -Headers @{ Authorization = "Bearer $env:CRON_SECRET" }
```

For other hosting providers, configure their cron service to send a daily `GET` request to the same endpoint with that Authorization header. Without Supabase credentials the scheduled endpoint returns an error; page requests continue using RSS only when no snapshot has ever been saved.

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

## Environment variables

| Variable | Required | Purpose |
|---|---:|---|
| `SUPABASE_URL` | No | Supabase project URL for the server-side news cache |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Private server key used to read and upsert cached news |
| `CRON_SECRET` | No | Shared secret required by the scheduled refresh endpoint |
| `API_KEY` | No | Groq API key for article explanations and article-scoped Q&A |
| `GROQ_MODEL` | No | Groq chat model ID; defaults to `openai/gpt-oss-120b` |

Environment files are ignored by Git. Never commit API keys or secrets.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

There is currently no test, type-check, or formatter script. TypeScript can be checked directly with:

```bash
npx tsc --noEmit
```

## Configuration

### TypeScript

`tsconfig.json` enables strict mode and configures:

- `@/*` → project root
- Bundler module resolution
- ES2017 output target
- No emitted JavaScript
- Incremental compilation

### Next.js images

`next.config.ts` permits remote Next Image hosts including:

- `th-i.thgim.com`
- `www.thehindu.com`
- `www.hindustantimes.com`
- `images.hindustantimes.com`

RSS images from hosts outside this allowlist may require a corresponding `remotePatterns` entry.

### RSS sources

Update `constants/rssFeeds.ts` to add or replace feeds. Each feed must be assigned the correct source and category in `services/news/aggregator.ts`.

## Development guide

### Add a new category page

1. Create a route directory under `app/<category>/`.
2. Add a `page.tsx` async server component.
3. Add a selector in `services/news/news.service.ts`, if needed.
4. Render `components/category/CategoryPage` or a custom layout.
5. Add navigation in `constants/navigation.ts` and/or `components/layout/Navbar.tsx`.

### Add an RSS source

1. Add its URL in `constants/rssFeeds.ts`.
2. Update `aggregateNews` to fetch and categorize the feed.
3. Confirm the returned fields can be normalized.
4. Add the publication's image domains to `next.config.ts` if Next Image uses those images.

### Change article ranking

Update `services/news/scorer.ts` for ranking rules and `services/news/topStory.ts` for tie-breaking or selection behavior.

### Change AI output

Update `services/ai/prompts.ts` for prompt instructions and `types/articleInsight.ts` for the expected insight shape. `normalizeInsight` in `services/ai/explain.ts` validates and fills missing fields.

## Caching and runtime state

| Cache | TTL | Scope |
|---|---:|---|
| Deduplicated RSS news | 5 minutes | Node.js process |
| News snapshot | One UTC day | Shared Supabase database |
| AI article insight | 30 minutes | Node.js process |
| Media image extraction | 1 hour | Node.js process |

The process-local caches reset when the server restarts. News snapshots are shared through Supabase and refreshed daily by the configured cron. AI insight caching is still process-local and is not yet persisted in `ai_insights`.

## Current limitations

- The live pipeline uses RSS with a Supabase snapshot cache; it does not use a formal news API.
- Snapshot refresh currently happens on page requests, not on a scheduled job; articles older than 30 days are not automatically removed.
- News category filtering is primarily title-keyword matching and may produce false positives.
- RSS tags are not populated, despite `NewsArticle.tags` and tagging modules existing.
- Category modules such as classifier, categorizer, tags, summary, context, glossary, and timeline contain reserved or incomplete implementations.
- `/explained` is currently a placeholder.
- Search UI exists as an empty component and no search route is implemented.
- The navbar/trending UI may contain navigation targets that do not yet have routes.
- Some mock article links do not map to live RSS article slugs, so article routes may return 404.
- Breaking news is static mock data rather than derived from RSS results.
- Several RSS summaries or contents may contain HTML and are not normalized or explicitly sanitized before rendering.
- Multiple image extraction implementations exist; the test page and live page use different paths.
- RSS/image hosts outside `next.config.ts` may not work with Next Image.
- There is no test suite or CI configuration in the current package scripts.

## Contributing

1. Create a feature branch.
2. Follow the existing App Router and service structure.
3. Keep shared article shapes in `types/news.ts` and `types/articleInsight.ts`.
4. Prefer server components unless browser state or interaction requires a client component.
5. Update feed hosts and Next Image configuration together.
6. Run lint and a production build before submitting changes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```
BenkaiZenkai