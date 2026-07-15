"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[72svh] flex-col px-6 pt-28 pb-8 md:px-10"
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
                    <span className="text-ink-faint tabular-nums">{i.n}</span>
                    {site.ui.nav[i.key][lang]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* name — vertically centered, with the vertical tagline filling the
            right edge on desktop (a distinctly Japanese editorial gesture) */}
        <div className="my-auto pt-10">
          <div className="flex items-stretch justify-between gap-10">
            <h1 className="text-ink">
              <motion.span
                className={`${lang === "ja" ? "display-ja" : "display"} block text-[clamp(2.4rem,7.5vw,5.5rem)]`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease }}
              >
                {lang === "ja" ? "名越 俊平" : "Shumpei"}
              </motion.span>
              <motion.span
                className="display mt-1 block text-[clamp(1.7rem,4.6vw,3.4rem)] italic text-accent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease }}
              >
                {lang === "ja" ? "Shumpei Nagoshi" : "Nagoshi"}
              </motion.span>
            </h1>

            {lang === "ja" && (
              <motion.p
                aria-hidden
                className="hidden shrink-0 self-center font-serif text-base tracking-[0.24em] text-ink-soft [writing-mode:vertical-rl] md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.35, ease }}
              >
                {site.tagline.ja}
              </motion.p>
            )}
          </div>

          {/* bottom band: tagline (horizontal where not shown vertically),
              reading, then meta + scroll cue */}
          <motion.div
            className="mt-7 border-t border-line pt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <p
              className={`font-serif text-lg leading-relaxed text-ink md:text-xl ${
                lang === "ja" ? "md:hidden" : ""
              }`}
            >
              {site.tagline[lang]}
            </p>
            <p className={`text-xs tracking-wide text-ink-faint ${lang === "ja" ? "mt-2 md:mt-0" : "mt-2"}`}>
              {site.nameReading[lang]}
            </p>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="eyebrow tabular-nums">
                Kyoto, Japan — 35.01°N 135.77°E
              </p>
              <a href="#about" className="eyebrow transition-colors hover:text-accent">
                {site.ui.scroll[lang]}{" "}
                <motion.span
                  className="inline-block"
                  animate={reduce ? undefined : { y: [0, 5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
