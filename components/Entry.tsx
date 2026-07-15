import Reveal from "@/components/Reveal";

/** One list entry, CV-style: a short label on the left (year or tag), and the
 *  title + supporting text stacked on the right. One item per row.
 *  The label stays quiet (faint tabular figures) so vermilion is reserved for
 *  interaction and the few deliberate accent moments. */
export default function Entry({
  label,
  title,
  href,
  meta,
  body,
  delay = 0,
}: {
  label?: string;
  title: string;
  href?: string;
  meta?: string; // faint supporting line (venue / org / role)
  body?: string; // main supporting line (summary / detail)
  delay?: number;
}) {
  const titleEl = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-2 font-serif text-base text-ink transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:text-lg"
    >
      <span className="underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-accent/40">
        {title}
      </span>
      <span className="text-accent">↗</span>
    </a>
  ) : (
    <h3 className="font-serif text-base text-ink md:text-lg">{title}</h3>
  );

  return (
    <Reveal delay={delay}>
      <div className="grid gap-1 border-t border-line py-4 md:grid-cols-[8rem_1fr] md:gap-8">
        <div className="text-sm tracking-wide text-ink-faint tabular-nums md:pt-1">
          {label}
        </div>
        <div>
          {titleEl}
          {meta && <p className="mt-0.5 text-sm text-ink-faint">{meta}</p>}
          {body && (
            <p className="jp-wrap mt-1.5 text-sm leading-relaxed text-ink-soft">
              {body}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
