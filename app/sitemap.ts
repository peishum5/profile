import type { MetadataRoute } from "next";
import { LANGS } from "@/content/site";

// 検索エンジンに伝えるページ一覧。/secret はあえて載せない（noindexの隠しページ）。
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return LANGS.map((lang) => ({
    url: `${base}/${lang}/`,
    changeFrequency: "weekly",
    priority: lang === "ja" ? 1 : 0.8,
  }));
}
