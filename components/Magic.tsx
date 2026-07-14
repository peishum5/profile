import Section from "@/components/Section";
import Entry from "@/components/Entry";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Magic({ lang }: { lang: Lang }) {
  const q = site.magic.quote;
  const quoted = lang === "ja" ? `「${q.text.ja}」` : `“${q.text.en}”`;

  return (
    <Section
      id="magic"
      index="07"
      eyebrow="Magic"
      heading={site.magic.heading[lang]}
      lead={site.magic.lead[lang]}
    >
      {/* a single, understated quote */}
      <Reveal>
        <figure className="mb-12 border-l-2 border-line pl-5">
          <blockquote className="jp-wrap font-serif text-base leading-relaxed text-ink md:text-lg">
            {quoted}
          </blockquote>
          <figcaption className="mt-2 text-sm text-ink-faint">
            {q.source[lang]}
          </figcaption>
        </figure>
      </Reveal>

      {/* awards / appearances — one per row */}
      <div>
        {site.magic.items.map((item, i) => (
          <Entry
            key={i}
            delay={i * 0.05}
            label={item.year}
            title={item.title[lang]}
            meta={item.org[lang]}
            body={item.note[lang]}
          />
        ))}
      </div>
    </Section>
  );
}
