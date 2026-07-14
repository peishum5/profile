import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Magic({ lang }: { lang: Lang }) {
  const q = site.magic.quote;
  const quoted =
    lang === "ja" ? `「${q.text.ja}」` : `“${q.text.en}”`;

  return (
    <Section
      id="magic"
      index="07"
      eyebrow="Magic"
      heading={site.magic.heading[lang]}
      lead={site.magic.lead[lang]}
      dark
    >
      {/* pull quote — huge faint mark sits behind the text as a texture */}
      <Reveal>
        <figure className="relative mb-16 overflow-hidden md:mb-20">
          <span
            aria-hidden
            className="display pointer-events-none absolute -left-4 -top-20 select-none text-[18rem] leading-none text-paper/[0.05] md:-top-28 md:text-[26rem]"
          >
            &ldquo;
          </span>
          <blockquote className="jp-wrap jp-palt relative max-w-3xl font-serif text-[clamp(1.15rem,2.2vw,1.75rem)] leading-[1.8] tracking-[0.01em] text-paper">
            {quoted}
          </blockquote>
          <figcaption className="mt-6 text-sm text-paper/50">
            {q.source[lang]}
          </figcaption>
        </figure>
      </Reveal>

      <ul className="grid gap-px overflow-hidden border border-paper/15 bg-paper/15 md:grid-cols-3">
        {site.magic.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.06} className="flex">
            <li className="flex flex-1 flex-col bg-ink p-6">
              <span className="display text-2xl text-accent">{item.year}</span>
              <h3 className="mt-4 font-serif text-lg text-paper">{item.title[lang]}</h3>
              <p className="mt-1 eyebrow !text-paper/45">{item.org[lang]}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">
                {item.note[lang]}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
