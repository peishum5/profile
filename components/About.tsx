import { existsSync } from "node:fs";
import { join } from "node:path";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function About({ lang }: { lang: Lang }) {
  // Portrait ships only once the real photo is committed — no placeholder frame.
  const hasPortrait = existsSync(join(process.cwd(), "public", "portrait.jpg"));
  const assetPrefix = process.env.GITHUB_PAGES === "true" ? "/profile" : "";

  return (
    <Section
      id="about"
      index="01"
      eyebrow="Profile"
      heading={site.about.heading[lang]}
      lang={lang}
    >
      {/* the portrait column is only reserved when there is a portrait —
          otherwise the grid would keep an empty 18rem gutter */}
      <div
        className={`grid gap-10 md:gap-16 ${
          hasPortrait ? "md:grid-cols-[minmax(0,1fr)_18rem]" : ""
        }`}
      >
        {/* left: prose — all paragraphs share the same voice */}
        <div>
          <Reveal>
            <p className="jp-wrap font-serif text-base leading-relaxed text-ink md:text-lg">
              {site.about.body[lang]}
            </p>
          </Reveal>
          {/* 空行区切りで段落に分ける（1段落だと長すぎて読めないため） */}
          {site.about.personal[lang].split("\n\n").map((para, i) => (
            <Reveal key={i} delay={0.05 + i * 0.04}>
              <p className="jp-wrap mt-5 font-serif text-base leading-relaxed text-ink md:text-lg">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        {/* right: portrait */}
        {hasPortrait && (
          <Reveal variant="fade">
            <figure>
              <div className="border border-line bg-paper-deep p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${assetPrefix}/portrait.jpg`}
                  alt={site.name[lang]}
                  className="block w-full [filter:grayscale(0.15)_sepia(0.12)_contrast(1.05)]"
                />
              </div>
            </figure>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
