import { notFound } from "next/navigation";
import { LANGS, site, type Lang } from "@/content/site";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Works from "@/components/Works";
import CV from "@/components/CV";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!LANGS.includes(raw as Lang)) notFound();
  const lang = raw as Lang;

  // 検索エンジン向けの人物情報（構造化データ）。
  // 「名越俊平 = Shumpei Nagoshi = この人物」を機械的に伝え、指名検索での表示を助ける。
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name[lang],
    alternateName: [
      site.name[lang === "ja" ? "en" : "ja"],
      site.nameReading.ja,
    ],
    url: `${base}/${lang}/`,
    image: `${base}/portrait.jpg`,
    description: site.intro[lang],
    jobTitle: site.tagline[lang].split(" / "),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: lang === "ja" ? "京都大学" : "Kyoto University",
    },
    worksFor: {
      "@type": "Organization",
      name: lang === "ja" ? "株式会社Cosmic Magic" : "Cosmic Magic Inc.",
    },
    sameAs: [
      ...site.contact.socials.map((s) => s.url),
      site.research.scholar.url,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Capabilities lang={lang} />
        <Works lang={lang} />
        <CV lang={lang} />
        <Blog lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
