import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function CV({ lang }: { lang: Lang }) {
  return (
    <Section
      id="cv"
      index="06"
      eyebrow="Curriculum Vitae"
      heading={site.cv.heading[lang]}
      lead={site.cv.lead[lang]}
    >
      <ol>
        {site.cv.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <li className="grid grid-cols-1 gap-3 border-t border-line py-9 md:grid-cols-[9rem_minmax(0,1fr)_minmax(0,18rem)] md:items-baseline md:gap-10 md:py-12">
              <span className="display text-[clamp(1.7rem,2.8vw,2.4rem)] leading-none text-ink">
                {item.year}
              </span>
              <div>
                <span className="inline-block rounded-full border border-line px-3 py-1 text-[0.62rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
                  {site.cvKindLabel[item.kind][lang]}
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink md:text-2xl">
                  {item.title[lang]}
                </h3>
              </div>
              <p className="jp-wrap text-sm leading-relaxed text-ink-soft md:pt-2">
                {item.detail[lang]}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
