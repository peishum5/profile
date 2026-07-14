import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang, type CVItem } from "@/content/site";

// カテゴリの表示順
const ORDER: CVItem["kind"][] = ["education", "career", "award"];

export default function CV({ lang }: { lang: Lang }) {
  // 実年（4桁）は新しい順。未記入の "20XX" プレースホルダーは末尾へ。
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
      index="08"
      eyebrow="Curriculum Vitae"
      heading={site.cv.heading[lang]}
      lead={site.cv.lead[lang]}
    >
      <div className="flex flex-col gap-14">
        {groups.map((group, gi) => (
          <Reveal key={group.kind} delay={gi * 0.05}>
            <div className="grid gap-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
              {/* category label — the "box" heading */}
              <h3 className="eyebrow md:pt-2">
                {site.cvKindLabel[group.kind][lang]}
              </h3>

              <ul className="flex flex-col">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-1 gap-2 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8"
                  >
                    <span className="display text-xl text-accent md:text-2xl">
                      {item.year}
                    </span>
                    <div>
                      <h4 className="font-serif text-lg text-ink md:text-xl">
                        {item.title[lang]}
                      </h4>
                      <p className="jp-wrap mt-1 text-sm leading-relaxed text-ink-soft">
                        {item.detail[lang]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
