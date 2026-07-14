import Section from "@/components/Section";
import Entry from "@/components/Entry";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Research({ lang }: { lang: Lang }) {
  const { scholar, more } = site.research;

  return (
    <Section
      id="research"
      index="04"
      eyebrow="Research"
      heading={site.research.heading[lang]}
      lead={site.research.lead[lang]}
    >
      {/* metrics — a single plain line */}
      <Reveal>
        <p className="mb-2 text-sm text-ink-soft">
          {lang === "ja" ? "被引用数" : "Citations"} {scholar.citations}
          <span className="mx-2 text-line">/</span>h-index {scholar.hIndex}
          <span className="mx-2 text-line">/</span>i10-index {scholar.i10}
          <span className="mx-2 text-line">/</span>
          <a
            href={scholar.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            {lang === "ja" ? "Google Scholar" : "Google Scholar"} ↗
          </a>
        </p>
      </Reveal>

      {/* highlighted papers — one per row */}
      <div>
        {site.research.items.map((item, i) => (
          <Entry
            key={i}
            delay={i * 0.05}
            label={item.year}
            title={item.title[lang]}
            href={item.link}
            meta={item.venue[lang]}
            body={item.summary[lang]}
          />
        ))}
      </div>

      {/* other publications & talks */}
      {more.length > 0 && (
        <>
          <Reveal>
            <p className="eyebrow mb-2 mt-12">
              {lang === "ja" ? "その他の論文・発表" : "Other Publications & Talks"}
            </p>
          </Reveal>
          <div>
            {more.map((p, i) => (
              <Entry
                key={i}
                delay={i * 0.04}
                label={p.year}
                title={p.title[lang]}
                href={p.link}
                meta={`${p.venue[lang]} ・ ${p.role[lang]}`}
              />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
