import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, site, type Lang } from "@/content/site";

// ♠♡♢♧ を正しい順に辿った人だけが招かれる隠しページ。
// ナビには載せず、検索エンジンにも載せない（ただし静的サイトなので
// URLを知っていれば誰でも開ける「遊び」であって、本気の秘匿ではない）。

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const ja = lang === "ja";
  return {
    title: ja ? "♠ ♡ ♢ ♧ — 名越俊平" : "♠ ♡ ♢ ♧ — Shumpei Nagoshi",
    robots: { index: false, follow: false },
  };
}

export default async function SecretPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!LANGS.includes(raw as Lang)) notFound();
  const lang = raw as Lang;
  const t = site.secret;

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center md:px-10">
      <p aria-hidden className="eyebrow tracking-[0.5em]">
        ♠ ♡ ♢ ♧
      </p>
      <h1
        className={`${lang === "ja" ? "display-ja jp-palt" : "display"} mt-8 text-3xl text-ink md:text-5xl`}
      >
        {t.heading[lang]}
      </h1>
      <p className="jp-wrap mx-auto mt-8 max-w-xl whitespace-pre-line font-serif text-base leading-loose text-ink-soft">
        {t.body[lang]}
      </p>
      <p className="mt-8 font-serif italic text-ink-faint">
        {t.signature[lang]}
      </p>
      <Link href={`/${lang}/`} className="cta-link eyebrow mt-14 transition-colors hover:text-accent">
        {t.back[lang]} →
      </Link>
    </main>
  );
}
