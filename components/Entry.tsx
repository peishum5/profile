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
  // The link stays inline (not inline-flex) so a title that wraps keeps the ↗
  // on its last line instead of stranding it at the top right. The no-break
  // space glues the mark to the final word.
  const titleEl = (
    <h4 className="font-serif text-base text-ink md:text-lg">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-colors hover:text-accent focus-visible:text-accent"
        >
          <span className="underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-accent/40">
            {title}
          </span>
          <span className="text-accent">{"\u00A0↗"}</span>
        </a>
      ) : (
        title
      )}
    </h4>
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
