import Section from "@/components/Section";
import Entry from "@/components/Entry";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

function GroupHeading({ label, first }: { label: string; first?: boolean }) {
  return (
    <Reveal>
      <h3
        className={`font-serif text-xl text-ink md:text-2xl ${first ? "mb-2" : "mt-16 mb-2"}`}
      >
        {label}
      </h3>
    </Reveal>
  );
}

export default function Works({ lang }: { lang: Lang }) {
  const { scholar } = site.research;
  const service = site.works.items.filter((w) => w.group === "service");

  return (
    <Section
      id="works"
      index="03"
      eyebrow="Works"
      heading={site.works.heading[lang]}
    >
      {/* 研究 */}
      <GroupHeading label={site.workGroupLabel.research[lang]} first />
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
            Google Scholar ↗
          </a>
        </p>
      </Reveal>
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
      <GroupHeading label={site.workGroupLabel.magic[lang]} />
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
      <GroupHeading label={site.workGroupLabel.service[lang]} />
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
