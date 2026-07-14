import Reveal from "@/components/Reveal";

/** One list entry, CV-style: a short label on the left (year or tag), and the
 *  title + supporting text stacked on the right. One item per row. */
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
      className="group inline-flex items-baseline gap-2 font-serif text-lg text-ink transition-colors hover:text-accent md:text-xl"
    >
      {title}
      <span className="text-accent">↗</span>
    </a>
  ) : (
    <h3 className="font-serif text-lg text-ink md:text-xl">{title}</h3>
  );

  return (
    <Reveal delay={delay}>
      <div className="grid gap-1 border-t border-line py-6 md:grid-cols-[8rem_1fr] md:gap-8">
        <div className="font-serif text-base text-accent md:pt-1 md:text-lg">
          {label}
        </div>
        <div>
          {titleEl}
          {meta && <p className="mt-1 text-sm text-ink-faint">{meta}</p>}
          {body && (
            <p className="jp-wrap mt-2 text-sm leading-relaxed text-ink-soft">
              {body}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
