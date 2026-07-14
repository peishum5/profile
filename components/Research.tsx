import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Research({ lang }: { lang: Lang }) {
  const { scholar, more } = site.research;
  const metrics = [
    { label: lang === "ja" ? "被引用数" : "Citations", value: String(scholar.citations) },
    { label: "h-index", value: String(scholar.hIndex) },
    { label: "i10-index", value: String(scholar.i10) },
  ];

  return (
    <Section
      id="research"
      index="04"
      eyebrow="Research"
      heading={site.research.heading[lang]}
      lead={site.research.lead[lang]}
    >
      {/* metrics + link to full profile */}
      <Reveal>
        <div className="mb-4 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
          <dl className="flex gap-10">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow mb-1">{m.label}</dt>
                <dd className="display text-2xl text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={scholar.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            {lang === "ja" ? "全業績を Google Scholar で見る" : "Full profile on Google Scholar"} ↗
          </a>
        </div>
      </Reveal>

      {/* highlighted papers */}
      <ul>
        {site.research.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <li className="group grid gap-3 border-t border-line py-8 md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,24rem)] md:gap-10 md:py-11">
              <span className="display text-xl text-accent md:text-2xl">
                {item.year}
              </span>
              <div>
                <h3 className="font-serif text-xl text-ink md:text-2xl">
                  {item.title[lang]}
                </h3>
                <p className="mt-1 text-sm text-ink-faint">{item.venue[lang]}</p>
              </div>
              <div className="md:pt-1">
                <p className="jp-wrap text-sm leading-relaxed text-ink-soft">
                  {item.summary[lang]}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                  >
                    {site.ui.viewMore[lang]} ↗
                  </a>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ul>

      {/* other publications & talks */}
      {more.length > 0 && (
        <Reveal>
          <div className="mt-14 border-t border-line pt-8">
            <p className="eyebrow mb-6">
              {lang === "ja" ? "その他の論文・発表" : "Other Publications & Talks"}
            </p>
            <ul className="flex flex-col gap-5">
              {more.map((p, i) => (
                <li
                  key={i}
                  className="grid gap-1 md:grid-cols-[7rem_minmax(0,1fr)_8rem] md:items-baseline md:gap-10"
                >
                  <span className="font-serif text-base text-accent">{p.year}</span>
                  <div>
                    <p className="text-sm text-ink md:text-base">{p.title[lang]}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">{p.venue[lang]}</p>
                  </div>
                  <span className="text-xs text-ink-faint md:text-right">
                    {p.role[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
