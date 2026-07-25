import type { Lang } from "@/content/site";

/** Eyebrow label classes. Japanese needs the tighter tracking (.eyebrow-ja);
 *  Latin keeps the wide small-caps look. See app/globals.css. */
export function eyebrow(lang: Lang, extra = ""): string {
  const base = lang === "ja" ? "eyebrow eyebrow-ja" : "eyebrow";
  return extra ? `${base} ${extra}` : base;
}
