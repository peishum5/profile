import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function About({ lang }: { lang: Lang }) {
  return (
    <Section
      id="about"
      index="01"
      eyebrow={lang === "ja" ? "Profile" : "Profile"}
      heading={site.about.heading[lang]}
    >
      <div className="grid gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        {/* portrait placeholder */}
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-paper-deep">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="eyebrow text-ink-faint">Portrait</span>
            </div>
            {/* thin editorial corner marks */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-ink-faint" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-ink-faint" />
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <p className="jp-wrap font-serif text-lg leading-relaxed text-ink md:text-xl">
              {site.about.body[lang]}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {site.about.facts.map((f, i) => {
                const [key, val] = f[lang].split("—");
                return (
                  <div key={i} className="bg-paper px-5 py-6">
                    <dt className="eyebrow mb-2">{key?.trim()}</dt>
                    <dd className="text-sm text-ink-soft">{val?.trim()}</dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
