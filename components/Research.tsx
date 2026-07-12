import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Research({ lang }: { lang: Lang }) {
  return (
    <Section
      id="research"
      index="03"
      eyebrow="Research"
      heading={site.research.heading[lang]}
      lead={site.research.lead[lang]}
    >
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
    </Section>
  );
}
