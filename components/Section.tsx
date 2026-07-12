import Reveal from "@/components/Reveal";

/** Shared editorial section shell: numbered eyebrow, large heading, optional lead. */
export default function Section({
  id,
  index,
  eyebrow,
  heading,
  lead,
  children,
  dark = false,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  heading: string;
  lead?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 py-20 md:px-10 md:py-28 ${
        dark ? "bg-ink text-paper" : "border-t border-line"
      } ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`eyebrow mb-4 ${dark ? "!text-paper/50" : ""}`}>
                <span className="text-accent">{index}</span>
                <span className={`mx-2 ${dark ? "text-paper/30" : "text-line"}`}>/</span>
                {eyebrow}
              </p>
              <h2
                className={`display text-[clamp(1.6rem,3.4vw,2.6rem)] ${
                  dark ? "text-paper" : "text-ink"
                }`}
              >
                {heading}
              </h2>
            </div>
            {lead && (
              <p
                className={`jp-wrap max-w-sm font-serif text-base leading-relaxed ${
                  dark ? "text-paper/70" : "text-ink-soft"
                }`}
              >
                {lead}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
