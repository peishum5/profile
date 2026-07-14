import Reveal from "@/components/Reveal";
import type { Lang } from "@/content/site";

/** Shared sober section shell: numbered eyebrow, heading, optional lead stacked
 *  below (document/CV-like, no side-by-side layout).
 *  - lang picks the right display cut (mincho for JA, Latin serif otherwise)
 *  - width/tone give sections rhythm without leaving the system */
export default function Section({
  id,
  index,
  eyebrow,
  heading,
  lead,
  lang,
  width = "narrow",
  tone = "paper",
  children,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  heading: string;
  lead?: string;
  lang?: Lang;
  width?: "narrow" | "wide";
  tone?: "paper" | "deep";
  children: React.ReactNode;
  className?: string;
}) {
  const displayClass = lang === "ja" ? "display-ja" : "display";
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line px-6 py-16 md:px-10 md:py-24 ${
        tone === "deep" ? "bg-paper-deep" : ""
      } ${className ?? ""}`}
    >
      <div className={`mx-auto ${width === "wide" ? "max-w-5xl" : "max-w-4xl"}`}>
        <Reveal>
          <header className="mb-10 md:mb-14">
            <p className="eyebrow mb-3">
              <span className="text-accent tabular-nums">{index}</span>
              <span className="mx-2 text-line">/</span>
              {eyebrow}
            </p>
            <h2 className={`${displayClass} text-[clamp(1.8rem,4vw,3rem)] text-ink`}>
              {heading}
            </h2>
            {lead && (
              <p className="jp-wrap mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {lead}
              </p>
            )}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
