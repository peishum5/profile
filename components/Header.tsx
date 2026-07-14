"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, type Lang } from "@/content/site";

const sections = [
  "about",
  "capabilities",
  "ventures",
  "research",
  "works",
  "talks",
  "magic",
  "cv",
  "contact",
] as const;

export default function Header({ lang }: { lang: Lang }) {
  const other: Lang = lang === "ja" ? "en" : "ja";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href={`/${lang}`}
          className="display text-xl tracking-tight text-ink"
          aria-label={site.name[lang]}
        >
          {lang === "ja" ? "名越俊平" : "Shumpei Nagoshi"}
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-[0.82rem] tracking-wide text-ink-soft transition-colors hover:text-accent"
            >
              {site.ui.nav[s][lang]}
            </a>
          ))}
          <LangToggle lang={lang} other={other} />
        </nav>

        {/* mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LangToggle lang={lang} other={other} />
          <button
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`h-px w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <nav className="border-t border-line bg-paper/95 px-6 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-ink-soft"
                >
                  {site.ui.nav[s][lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function LangToggle({ lang, other }: { lang: Lang; other: Lang }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="font-medium text-ink">{lang.toUpperCase()}</span>
      <span className="text-ink-faint">/</span>
      <Link
        href={`/${other}`}
        className="text-ink-faint transition-colors hover:text-accent"
      >
        {other.toUpperCase()}
      </Link>
    </div>
  );
}
