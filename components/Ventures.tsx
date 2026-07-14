import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Ventures({ lang }: { lang: Lang }) {
  return (
    <Section
      id="ventures"
      index="03"
      eyebrow="Ventures"
      heading={site.ventures.heading[lang]}
      lead={site.ventures.lead[lang]}
    >
      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
        {site.ventures.items.map((item, i) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="eyebrow">{item.tag[lang]}</span>
                {item.link && (
                  <span className="text-accent transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-serif text-2xl text-ink transition-colors group-hover:text-accent md:text-3xl">
                {item.title[lang]}
              </h3>
              <p className="jp-wrap mt-3 text-sm leading-relaxed text-ink-soft">
                {item.summary[lang]}
              </p>
            </>
          );
          return (
            <Reveal key={i} delay={i * 0.06} className="flex">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 flex-col bg-paper p-8 transition-colors hover:bg-paper-deep"
                >
                  {inner}
                </a>
              ) : (
                <article className="group flex flex-1 flex-col bg-paper p-8">
                  {inner}
                </article>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
