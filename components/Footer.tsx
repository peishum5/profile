import { site, type Lang } from "@/content/site";

/** Dark colophon — the back cover of the page. */
export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink px-6 pb-12 pt-16 text-paper md:px-10">
      <div className="mx-auto max-w-4xl">
        <p
          className={`${lang === "ja" ? "display-ja" : "display"} text-3xl text-paper md:text-4xl`}
        >
          {site.name[lang]}
        </p>
        <p className="mt-3 font-serif text-sm text-paper/60">
          {site.tagline[lang]}
        </p>
        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <span>© {year} {site.name[lang]}</span>
          <div className="flex items-center gap-5">
            {site.contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
