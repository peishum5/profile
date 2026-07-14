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
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-16">
        {/* left: prose */}
        <div>
          <Reveal>
            <p className="jp-wrap font-serif text-lg leading-relaxed text-ink">
              {site.about.body[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="jp-wrap mt-6 text-sm leading-loose text-ink-soft">
              {site.about.personal[lang]}
            </p>
          </Reveal>
        </div>

        {/* right: portrait + compact facts */}
        <div>
          {hasPortrait && (
            <Reveal variant="fade">
              <figure className="mb-8">
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
          <dl>
            {site.about.facts.map((f, i) => {
              const [key, val] = f[lang].split("—");
              return (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="border-t border-line py-3 last:border-b">
                    <dt className="eyebrow">{key?.trim()}</dt>
                    <dd className="mt-1 text-sm text-ink-soft">{val?.trim()}</dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </Section>
  );
}
