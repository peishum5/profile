import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Works({ lang }: { lang: Lang }) {
  return (
    <Section
      id="works"
      index="05"
      eyebrow="Works"
      heading={site.works.heading[lang]}
      lead={site.works.lead[lang]}
    >
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {site.works.items.map((item, i) => {
          const inner = (
            <>
              {/* thumbnail placeholder */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="eyebrow text-ink-faint">Thumbnail</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{item.category[lang]}</span>
                  <span className="font-serif text-sm text-ink-faint">{item.year}</span>
                </div>
                <h3 className="mt-3 font-serif text-xl text-ink transition-colors group-hover:text-accent">
                  {item.title[lang]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.summary[lang]}
                </p>
                {item.link && (
                  <span className="mt-4 text-sm text-ink-faint">
                    {site.ui.viewMore[lang]} ↗
                  </span>
                )}
              </div>
            </>
          );
          return (
            <Reveal key={i} delay={(i % 3) * 0.06} className="flex">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 flex-col bg-paper transition-colors hover:bg-paper-deep"
                >
                  {inner}
                </a>
              ) : (
                <article className="group flex flex-1 flex-col bg-paper">{inner}</article>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
