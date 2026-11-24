import "server-only";

import { createClient } from "@supabase/supabase-js";

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

type Database = {
  public: {
    Tables: {
      news_articles: Table<{
        external_id: string;
        title: string;
        summary: string;
        content: string;
        image_url: string | null;
        source: string;
        published_at: string | null;
        feed: string;
        slug: string;
        score: number;
        tags: string[];
        snapshot_date: string;
        updated_at: string;
      }>;
      news_snapshots: Table<{
        snapshot_date: string;
        status: string;
        article_count: number;
        refreshed_at: string;
        error: string | null;
      }>;
      ai_insights: Table<Record<string, unknown>>;
      rss_sources: Table<Record<string, unknown>>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  client ??= createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return client;
}