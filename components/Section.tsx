import Reveal from "@/components/Reveal";

/** Shared sober section shell: numbered eyebrow, heading, optional lead stacked
 *  below (document/CV-like, no side-by-side layout). */
export default function Section({
  id,
  index,
  eyebrow,
  heading,
  lead,
  children,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  heading: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line px-6 py-16 md:px-10 md:py-24 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <header className="mb-10 md:mb-14">
            <p className="eyebrow mb-3">
              <span className="text-accent">{index}</span>
              <span className="mx-2 text-line">/</span>
              {eyebrow}
            </p>
            <h2 className="display text-[clamp(1.6rem,3.4vw,2.6rem)] text-ink">
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
