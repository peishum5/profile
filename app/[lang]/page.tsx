import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/content/site";
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

  return (
    <>
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
