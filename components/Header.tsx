"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site, type Lang } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
  "about",
  "capabilities",
  "works",
  "cv",
  "blog",
  "contact",
] as const;

export default function Header({ lang }: { lang: Lang }) {
  const other: Lang = lang === "ja" ? "en" : "ja";
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // the drawer closes on Escape and on any click outside the header
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* padding sits outside the max-width, matching Hero/Section, so the
          brand lines up with the hero content instead of sitting 40px in */}
      <div className="px-6 py-4 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            href={`/${lang}`}
            className={`${lang === "ja" ? "display-ja" : "display"} text-xl tracking-tight text-ink`}
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
                aria-current={active === s ? "location" : undefined}
                className={`text-[0.82rem] tracking-wide transition-colors hover:text-accent ${
                  active === s ? "text-accent" : "text-ink-soft"
                }`}
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
              type="button"
              aria-label={site.ui.menu[lang]}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
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
      </div>

      {/* mobile drawer. Only opacity/offset animate — the drawer keeps its real
          height at every frame, so it stays usable even if the animation is
          skipped or interrupted. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="border-t border-line bg-paper/95 backdrop-blur-md md:hidden"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
          >
            <ul className="flex flex-col px-6 py-2">
              {sections.map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s ? "location" : undefined}
                    className={`block py-3 text-sm transition-colors ${
                      active === s ? "text-accent" : "text-ink-soft"
                    }`}
                  >
                    {site.ui.nav[s][lang]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
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
