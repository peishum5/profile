import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Capabilities({ lang }: { lang: Lang }) {
  return (
    <Section
      id="capabilities"
      index="02"
      eyebrow="Capabilities"
      heading={site.capabilities.heading[lang]}
      lead={site.capabilities.lead[lang]}
    >
      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {site.capabilities.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.06} className="flex">
            <article className="flex flex-1 flex-col bg-paper p-7">
              <span className="eyebrow mb-5 text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl text-ink">{item.title[lang]}</h3>
              <p className="jp-wrap mt-3 text-sm leading-relaxed text-ink-soft">
                {item.summary[lang]}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
