import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Contact({ lang }: { lang: Lang }) {
  const soon = lang === "ja" ? "準備中" : "soon";
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <header className="mb-10 md:mb-14">
            <p className="eyebrow mb-3">
              <span className="text-accent">09</span>
              <span className="mx-2 text-line">/</span>
              Contact
            </p>
            <h2 className="display text-[clamp(1.6rem,3.4vw,2.6rem)] text-ink">
              {site.contact.heading[lang]}
            </h2>
            <p className="jp-wrap mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {site.contact.lead[lang]}
            </p>
          </header>
        </Reveal>

        {/* email */}
        <Reveal>
          <div className="grid gap-1 border-t border-line py-6 md:grid-cols-[8rem_1fr] md:gap-8">
            <div className="eyebrow md:pt-1">Email</div>
            <div>
              {site.contact.email ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group inline-flex items-baseline gap-2 font-serif text-lg text-ink transition-colors hover:text-accent md:text-xl"
                >
                  {site.contact.email}
                  <span className="text-accent">↗</span>
                </a>
              ) : (
                <p className="text-sm text-ink-faint">
                  {lang === "ja"
                    ? "公開用アドレスは準備中です"
                    : "Public address coming soon"}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* socials — one per row */}
        {site.contact.socials.map((s, i) => {
          const active = Boolean(s.url);
          return (
            <Reveal key={s.label} delay={i * 0.04}>
              <div className="grid gap-1 border-t border-line py-6 md:grid-cols-[8rem_1fr] md:gap-8">
                <div className="eyebrow md:pt-1">SNS</div>
                <div>
                  {active ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-2 font-serif text-lg text-ink transition-colors hover:text-accent md:text-xl"
                    >
                      {s.label}
                      <span className="text-accent">↗</span>
                    </a>
                  ) : (
                    <span className="font-serif text-lg text-ink-faint md:text-xl">
                      {s.label}
                      <span className="ml-2 text-xs">{soon}</span>
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}

        <Reveal>
          <div className="mt-12 border-t border-line pt-6 text-right">
            <a href="#top" className="eyebrow transition-colors hover:text-accent">
              {lang === "ja" ? "↑ 上へ" : "↑ Top"}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
