import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SuitMark from "@/components/SuitMark";
import { site, type Lang, type CVItem } from "@/content/site";

// カテゴリの表示順
const ORDER: CVItem["kind"][] = ["education", "career", "award"];

/** Dense, scannable document — deliberately tighter than Works so adjacent
 *  sections don't share a rhythm. Groups sit side by side on md+. */
export default function CV({ lang }: { lang: Lang }) {
  const yearValue = (y: string) => (/^\d{4}$/.test(y) ? parseInt(y, 10) : -1);
  const groups = ORDER.map((kind) => ({
    kind,
    items: site.cv.items
      .filter((it) => it.kind === kind)
      .slice()
      .sort((a, b) => yearValue(b.year) - yearValue(a.year)),
  })).filter((g) => g.items.length > 0);

  return (
    <Section
      id="cv"
      index="04"
      eyebrow="Curriculum Vitae"
      heading={site.cv.heading[lang]}
      lang={lang}
    >
      <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        {groups.map((group, gi) => (
          <Reveal key={group.kind} delay={gi * 0.08}>
            <div>
              <h3 className="eyebrow border-b border-ink/25 pb-3">
                {site.cvKindLabel[group.kind][lang]}
              </h3>
              <ul className="flex flex-col">
                {group.items.map((item, i) => {
                  const label =
                    item.kind === "venture"
                      ? lang === "ja"
                        ? "運営中"
                        : "Ongoing"
                      : item.year;
                  return (
                    <li
                      key={i}
                      className="flex items-baseline gap-4 border-t border-line py-2.5 first:border-t-0"
                    >
                      <span className="w-12 shrink-0 text-xs tracking-wide text-ink-faint tabular-nums">
                        {label}
                      </span>
                      <div className="min-w-0">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-baseline gap-2 font-serif text-base text-ink transition-colors hover:text-accent"
                          >
                            {item.title[lang]}
                            <span className="text-accent">↗</span>
                          </a>
                        ) : (
                          <h4 className="font-serif text-base text-ink">
                            {item.title[lang]}
                          </h4>
                        )}
                        <p className="jp-wrap mt-0.5 text-xs leading-relaxed text-ink-soft">
                          {item.detail[lang]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-right">
        <SuitMark suit="♢" lang={lang} className="text-ink-faint/50" />
      </p>
    </Section>
  );
}
