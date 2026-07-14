import Section from "@/components/Section";
import Entry from "@/components/Entry";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

/** Full-width ruled band: sub-index + group title left, optional meta cluster
 *  right. The rule draws in on scroll. */
function GroupHeading({
  index,
  label,
  meta,
  first,
}: {
  index: string;
  label: string;
  meta?: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div className={first ? "" : "mt-20"}>
      <Reveal variant="rule">
        <div className="h-px w-full bg-ink/25" />
      </Reveal>
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3 pb-4">
          <h3 className="flex items-baseline gap-3 font-serif text-xl text-ink md:text-2xl">
            <span className="text-sm text-accent tabular-nums">{index}</span>
            {label}
          </h3>
          {meta && <div className="text-xs text-ink-faint">{meta}</div>}
        </div>
      </Reveal>
    </div>
  );
}

export default function Works({ lang }: { lang: Lang }) {
  const { scholar } = site.research;
  const service = site.works.items.filter((w) => w.group === "service");
  const quote = site.magic.quote;
  const assetPrefix = process.env.GITHUB_PAGES === "true" ? "/profile" : "";

  const scholarMeta = (
    <span className="tabular-nums">
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
        Google Scholar ↗
      </a>
    </span>
  );

  return (
    <Section
      id="works"
      index="03"
      eyebrow="Works"
      heading={site.works.heading[lang]}
      lang={lang}
    >
      {/* 研究 */}
      <GroupHeading
        index="03.1"
        label={site.workGroupLabel.research[lang]}
        meta={scholarMeta}
        first
      />
      <div>
        {/* 論文は原題（英語）で表示。掲載誌・役割などの補足はローカライズ */}
        {site.research.items.map((item, i) => (
          <Entry
            key={`r${i}`}
            delay={i * 0.03}
            label={item.year}
            title={item.title.en}
            href={item.link}
            meta={item.venue[lang]}
            body={item.summary[lang]}
          />
        ))}
        {site.research.more.map((p, i) => (
          <Entry
            key={`m${i}`}
            label={p.year}
            title={p.title.en}
            href={p.link}
            meta={`${p.venue[lang]} ・ ${p.role[lang]}`}
          />
        ))}
        {site.research.press.map((p, i) => (
          <Entry
            key={`p${i}`}
            label={p.year}
            title={p.title[lang]}
            href={p.link}
            meta={`${p.venue[lang]} ・ ${p.role[lang]}`}
          />
        ))}
      </div>

      {/* マジック */}
      <GroupHeading index="03.2" label={site.workGroupLabel.magic[lang]} />
      <Reveal variant="fade">
        <figure className="mb-8 mt-2">
          <div className="border border-line bg-paper-deep p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${assetPrefix}/magic-live.jpg`}
              alt={
                lang === "ja"
                  ? "夜の街頭でパフォーマンスをする名越俊平"
                  : "Shumpei Nagoshi performing on the street at night"
              }
              className="block w-full [filter:grayscale(0.08)_contrast(1.03)]"
            />
          </div>
        </figure>
      </Reveal>
      {quote && (
        <Reveal variant="fade">
          <blockquote className="relative mt-2 mb-10 pl-9 md:pl-14">
            <span
              aria-hidden
              className={`absolute -top-3 left-0 text-[3rem] leading-none text-accent md:text-[3.6rem] ${
                lang === "ja" ? "display-ja" : "display"
              }`}
            >
              「
            </span>
            <p
              className={`jp-wrap text-[clamp(1.4rem,3vw,2.2rem)] leading-snug text-ink ${
                lang === "ja" ? "display-ja jp-palt" : "display"
              }`}
            >
              {quote.text[lang]}
            </p>
            <footer className="eyebrow mt-4">{quote.source[lang]}</footer>
          </blockquote>
        </Reveal>
      )}
      <div>
        {site.magic.items.map((item, i) => (
          <Entry
            key={`mag${i}`}
            delay={i * 0.03}
            label={item.year}
            title={item.title[lang]}
            meta={item.org[lang]}
            body={item.note[lang]}
          />
        ))}
      </div>

      {/* サービス */}
      <GroupHeading index="03.3" label={site.workGroupLabel.service[lang]} />
      <div>
        {service.map((item, i) => (
          <Entry
            key={`s${i}`}
            delay={i * 0.03}
            label={item.meta ? item.meta[lang] : item.year}
            title={item.title[lang]}
            href={item.link}
            body={item.summary[lang]}
          />
        ))}
      </div>
    </Section>
  );
}
