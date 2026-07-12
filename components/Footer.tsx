import { site, type Lang } from "@/content/site";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-ink px-6 pb-12 pt-4 text-paper md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 max-w-2xl text-xs leading-relaxed text-paper/40">
          {site.ui.placeholderNote[lang]}
        </p>
        <div className="flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name[lang]}</span>
          <span className="font-serif">名越俊平 — Shumpei Nagoshi</span>
        </div>
      </div>
    </footer>
  );
}
