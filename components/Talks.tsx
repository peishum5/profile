import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Talks({ lang }: { lang: Lang }) {
  return (
    <Section
      id="talks"
      index="05"
      eyebrow="Talks & Features"
      heading={site.talks.heading[lang]}
      lead={site.talks.lead[lang]}
    >
      <ul>
        {site.talks.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <li className="grid grid-cols-1 gap-2 border-t border-line py-7 md:grid-cols-[7rem_minmax(0,1fr)_8rem] md:items-baseline md:gap-10">
              <span className="display text-xl text-accent md:text-2xl">
                {item.year}
              </span>
              <div>
                <h3 className="font-serif text-lg text-ink md:text-xl">
                  {item.title[lang]}
                </h3>
                <p className="mt-1 text-sm text-ink-faint">{item.venue[lang]}</p>
              </div>
              <span className="text-xs tracking-wide text-ink-faint md:text-right">
                {item.role[lang]}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
