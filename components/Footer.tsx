import { site, type Lang } from "@/content/site";

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink px-6 pb-12 pt-4 text-paper md:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="mb-6 max-w-2xl text-xs leading-relaxed text-paper/40">
          {site.ui.placeholderNote[lang]}
        </p>
        <div className="flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
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
