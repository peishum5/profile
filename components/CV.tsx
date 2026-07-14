import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang, type CVItem } from "@/content/site";

// カテゴリの表示順（事業を最後に）
const ORDER: CVItem["kind"][] = ["education", "career", "award", "venture"];

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
      lead={site.cv.lead[lang]}
    >
      <div className="flex flex-col gap-14">
        {groups.map((group, gi) => (
          <Reveal key={group.kind} delay={gi * 0.05}>
            <div className="grid gap-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
              <h3 className="eyebrow md:pt-2">
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
                      className="grid grid-cols-1 gap-1 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
                    >
                      <span className="font-serif text-base text-accent md:pt-1 md:text-lg">
                        {label}
                      </span>
                      <div>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-baseline gap-2 font-serif text-lg text-ink transition-colors hover:text-accent md:text-xl"
                          >
                            {item.title[lang]}
                            <span className="text-accent">↗</span>
                          </a>
                        ) : (
                          <h4 className="font-serif text-lg text-ink md:text-xl">
                            {item.title[lang]}
                          </h4>
                        )}
                        <p className="jp-wrap mt-1 text-sm leading-relaxed text-ink-soft">
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
    </Section>
  );
}
