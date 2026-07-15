import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

/** Numbered two-column grid — the page's first rhythm break after the prose
 *  About section. No card backgrounds: hairlines and whitespace only. */
export default function Capabilities({ lang }: { lang: Lang }) {
  return (
    <Section
      id="capabilities"
      index="02"
      eyebrow="Capabilities"
      heading={site.capabilities.heading[lang]}
      lead={site.capabilities.lead[lang]}
      lang={lang}
      tone="deep"
    >
      <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">
        {site.capabilities.items.map((item, i) => (
          <Reveal
            key={i}
            delay={(i % 2) * 0.08}
            className={i === site.capabilities.items.length - 1 && i % 2 === 0 ? "md:col-span-2" : ""}
          >
            <div className="border-t border-line pt-4">
              <div className="display text-[2rem] leading-none text-ink-faint/60 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-serif text-base text-ink md:text-lg">
                {item.title[lang]}
              </h3>
              <p className="jp-wrap mt-1.5 max-w-prose text-sm leading-relaxed text-ink-soft">
                {item.summary[lang]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
