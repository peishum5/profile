"use client";

import { motion } from "motion/react";
import { site, type Lang } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const index = [
  { n: "01", key: "about" },
  { n: "02", key: "capabilities" },
  { n: "03", key: "works" },
  { n: "04", key: "cv" },
  { n: "05", key: "blog" },
  { n: "06", key: "contact" },
] as const;

export default function Hero({ lang }: { lang: Lang }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col px-6 pt-28 pb-10 md:px-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {/* top row: eyebrow + section index */}
        <div className="flex items-start justify-between">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {lang === "ja" ? "個人サイト — Portfolio & CV" : "Personal Site — Portfolio & CV"}
          </motion.p>
          <motion.nav
            className="hidden text-right sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            aria-label={lang === "ja" ? "目次" : "Index"}
          >
            <p className="eyebrow mb-2">{lang === "ja" ? "目次" : "Index"}</p>
            <ul className="flex flex-col gap-1">
              {index.map((i) => (
                <li key={i.n}>
                  <a
                    href={`#${i.key}`}
                    className="group inline-flex items-baseline gap-2 text-xs text-ink-soft transition-colors hover:text-accent"
                  >
                    <span className="text-ink-faint">{i.n}</span>
                    {site.ui.nav[i.key][lang]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* name — vertically centered in the remaining space */}
        <div className="my-auto">
          <h1 className="display text-ink">
            <motion.span
              className="block text-[clamp(2.4rem,7vw,5.5rem)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
            >
              {lang === "ja" ? "名越 俊平" : "Shumpei"}
            </motion.span>
            <motion.span
              className="mt-1 block text-[clamp(1.9rem,5.2vw,4rem)] italic text-accent md:-mt-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease }}
            >
              {lang === "ja" ? "Shumpei Nagoshi" : "Nagoshi"}
            </motion.span>
          </h1>

          {/* bottom band: tagline then intro, stacked */}
          <motion.div
            className="mt-10 border-t border-line pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
          >
            <p className="font-serif text-lg leading-relaxed text-ink md:text-xl">
              {site.tagline[lang]}
            </p>
            <p className="mt-2 text-xs tracking-wide text-ink-faint">
              {site.nameReading[lang]}
            </p>
            <p className="jp-wrap mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {site.intro[lang]}
            </p>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="mx-auto mt-10 flex w-full max-w-6xl items-center gap-3 text-ink-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <span className="eyebrow">{site.ui.scroll[lang]}</span>
        <motion.span
          className="block h-6 w-px bg-line"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
