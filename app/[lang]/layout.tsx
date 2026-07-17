import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/content/site";
import HtmlLang from "@/components/HtmlLang";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const ja = lang === "ja";
  return {
    title: ja ? "名越俊平 — Shumpei Nagoshi" : "Shumpei Nagoshi — 名越俊平",
    description: ja
      ? "名越俊平（Shumpei Nagoshi）の個人サイト。研究成果、経歴（CV）、マジックの実績、そして成果物をまとめています。"
      : "Personal site of Shumpei Nagoshi — scientist, magician, and experience-maker. Research, CV, magic, and works.",
    alternates: {
      canonical: `/${lang}/`,
      languages: { ja: "/ja/", en: "/en/" },
    },
    openGraph: {
      title: ja ? "名越俊平 — Shumpei Nagoshi" : "Shumpei Nagoshi — 名越俊平",
      description: ja
        ? "研究・経歴・マジック・成果物。名越俊平の人物像がわかる個人サイト。"
        : "Research, CV, magic, and works — the personal site of Shumpei Nagoshi.",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  return (
    <>
      <HtmlLang lang={lang} />
      {children}
    </>
  );
}
