import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";

export default function Contact({ lang }: { lang: Lang }) {
  const soon = lang === "ja" ? "準備中" : "soon";
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">
                <span className="text-accent">09</span>
                <span className="mx-2 text-line">/</span>
                Contact
              </p>
              <h2 className="display text-[clamp(1.6rem,3.4vw,2.6rem)] text-ink">
                {site.contact.heading[lang]}
              </h2>
            </div>
            <p className="jp-wrap max-w-sm font-serif text-base leading-relaxed text-ink-soft">
              {site.contact.lead[lang]}
            </p>
          </div>
        </Reveal>

        {/* email as the headline action — styled as a finished CTA even while
            the address itself is pending */}
        <Reveal delay={0.05}>
          <div className="border-t border-line pt-8">
            <p className="eyebrow mb-4">Email</p>
            {site.contact.email ? (
              <a
                href={`mailto:${site.contact.email}`}
                className="display group inline-flex items-baseline gap-4 text-[clamp(1.35rem,3.6vw,2.4rem)] text-ink decoration-accent decoration-2 underline-offset-[0.12em] transition-colors hover:text-accent hover:underline"
              >
                {site.contact.email}
                <span className="text-accent transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ) : (
              <>
                <span className="display inline-flex items-baseline gap-4 text-[clamp(1.35rem,3.6vw,2.4rem)] text-ink underline decoration-accent decoration-2 underline-offset-[0.12em]">
                  {lang === "ja" ? "メールでご連絡ください" : "Reach me by email"}
                  <span className="text-accent">↗</span>
                </span>
                <p className="mt-4 text-sm text-ink-faint">
                  {lang === "ja"
                    ? "※ 公開用アドレスは準備中です"
                    : "Public address coming soon"}
                </p>
              </>
            )}
          </div>
        </Reveal>

        {/* socials — always shown; empty ones read as coming-soon */}
        <Reveal delay={0.1}>
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {site.contact.socials.map((s) => {
              const active = Boolean(s.url);
              const inner = (
                <div className="flex items-center justify-between bg-paper px-5 py-5 transition-colors group-hover:bg-paper-deep">
                  <span className="text-sm font-medium text-ink">{s.label}</span>
                  <span className={`text-xs ${active ? "text-accent" : "text-ink-faint"}`}>
                    {active ? "↗" : soon}
                  </span>
                </div>
              );
              return (
                <li key={s.label}>
                  {active ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group block">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
            <span className="text-xs text-ink-faint">
              {site.contact.email || (lang === "ja" ? "お気軽にご連絡ください" : "In touch, soon.")}
            </span>
            <a
              href="#top"
              className="eyebrow transition-colors hover:text-accent"
            >
              {lang === "ja" ? "↑ 上へ" : "↑ Top"}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
