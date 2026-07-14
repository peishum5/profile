import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function About({ lang }: { lang: Lang }) {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="Profile"
      heading={site.about.heading[lang]}
    >
      <Reveal>
        <p className="jp-wrap max-w-2xl font-serif text-lg leading-relaxed text-ink">
          {site.about.body[lang]}
        </p>
      </Reveal>

      {/* facts — one per row */}
      <dl className="mt-10">
        {site.about.facts.map((f, i) => {
          const [key, val] = f[lang].split("—");
          return (
            <Reveal key={i} delay={i * 0.04}>
              <div className="grid gap-1 border-t border-line py-4 md:grid-cols-[8rem_1fr] md:gap-8">
                <dt className="eyebrow md:pt-1">{key?.trim()}</dt>
                <dd className="text-sm text-ink-soft">{val?.trim()}</dd>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </Section>
  );
}
