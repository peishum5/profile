import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, site, type Lang } from "@/content/site";
import { eyebrow } from "@/lib/ui";
import SecretStage from "@/components/secret/SecretStage";
import "./secret.css";

// ♠♡♢♧ を全て見つけた人だけが招かれる隠しページ。
// ナビには載せず、検索エンジンにも載せない（ただし静的サイトなので
// URLを知っていれば誰でも開ける「遊び」であって、本気の秘匿ではない）。
//
// 構造: 下に「JS 無しでも読める静的な詩」を置き、その上に SecretStage が
// ブラックホールの空間を被せる。JS が無ければ静的な詩がそのまま残る。

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
    <>
      {/* 既定では宇宙側（secret.css）を見せ、JS が無いときだけ紙に戻す。
          スクリプトで暗転させる手もあるが、React ツリー内の <script> は
          クライアント遷移では実行されず、♠♡♢♧ のリンクから来た人だけ
          紙のページが見えてしまう。CSS なら経路を選ばない。 */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>
            :root:has(.secret-root){background:var(--paper)}
            :root:has(.secret-root) body{color:var(--ink)}
            :root:has(.secret-root) body::after{opacity:.035;mix-blend-mode:normal}
            .secret-static{display:flex}
            .secret-stage{display:none}
          </style>`,
        }}
      />

      <main className="secret-static flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center md:px-10">
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
        <Link
          href={`/${lang}/`}
          className={eyebrow(lang, "cta-link mt-14 transition-colors hover:text-accent")}
        >
          {t.back[lang]} →
        </Link>
      </main>

      <SecretStage lang={lang} />
    </>
  );
}
