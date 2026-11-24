import { NextRequest, NextResponse } from "next/server";

import { refreshNewsSnapshot } from "@/services/news/pipeline";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await refreshNewsSnapshot();
    return NextResponse.json({
      status: "success",
      refreshedAt: new Date().toISOString(),
      articleCount: articles.length,
    });
  } catch (error) {
    console.error("Scheduled news refresh failed.", error);
    return NextResponse.json({ error: "News refresh failed" }, { status: 502 });
  }
}