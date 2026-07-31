"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { site, type Lang } from "@/content/site";
import { eyebrow } from "@/lib/ui";
import Device from "./Device";
import LensProbe from "./games/LensProbe";
import OrbitToss from "./games/OrbitToss";
import RedshiftDial from "./games/RedshiftDial";
import { hydrateProgress } from "./progress";

// WebGL は「観測を開始する」を押すまで要らない。ルート分割して遅延読み込みする。
const BlackHole = dynamic(() => import("./BlackHole"), { ssr: false });

// ============================================================================
//  隠しページの演出全体を仕切る。
//  表のサイトとは別世界（DESIGN.md「例外領域: /secret」）。
//  JS が無いときは page.tsx の静的な詩がそのまま残るので、ここは上に被せるだけ。
// ============================================================================

type ViewMargin = NonNullable<Parameters<typeof useInView>[1]>["margin"];

/** 画面に入ったら true になり、以後 true のまま */
function useEntered(margin: ViewMargin = "-25%") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

export default function SecretStage({ lang }: { lang: Lang }) {
  const t = site.secret;
  const reduce = useReducedMotion() ?? false;

  const [ignited, setIgnited] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  const onUnsupported = useCallback(() => setUnsupported(true), []);

  // リロードしても装置のクリア状況は残す（sessionStorage）。
  // サーバーと初期値を揃えるため、読み出しはマウント後に行う。
  useEffect(() => {
    hydrateProgress();
  }, []);

  // 点火前はスクロールを止める（真っ暗な空白を延々スクロールさせないため）。
  // 暗転そのものは secret.css が .secret-root を見て行うので、ここでは
  // ゲートの開閉だけを扱う。
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-secret", ignited ? "live" : "gate");
    return () => {
      root.removeAttribute("data-secret");
    };
  }, [ignited]);

  const [endRef, endIn] = useEntered("-20%");

  return (
    // .secret-root は「このページに居る」ことを CSS に伝える目印（secret.css）。
    <div className="secret-root secret-stage">
      {ignited && !unsupported && (
        <BlackHole ignited={ignited} reduced={reduce} onUnsupported={onUnsupported} />
      )}
      {/* WebGL2 が無い環境でも「何かがそこにある」画にはする */}
      {unsupported && <div aria-hidden className="secret-fallback" />}

      <div aria-hidden className="secret-film" />
      {/* reduce による出し分けはマークアップでやらない。useReducedMotion() は
          サーバーでは常に false なので、条件レンダリングにするとハイドレーションが
          壊れる。止めるのは CSS のメディアクエリの仕事。 */}
      <div aria-hidden className="secret-glitch" />

      {/* --- 幕0: 迎える ------------------------------------------------- */}
      {!ignited && (
        <div className="secret-gate-screen">
          <button
            type="button"
            onClick={() => setIgnited(true)}
            className="group flex flex-col items-center gap-4"
          >
            <span className={eyebrow(lang, "text-paper/70 transition-colors group-hover:text-paper")}>
              {t.begin[lang]}
              <span className="secret-caret" />
            </span>
            <span className="text-[0.68rem] tracking-[0.2em] text-paper/55">
              {t.beginHint[lang]}
            </span>
          </button>
        </div>
      )}

      {/* --- 幕1〜3 -------------------------------------------------------- */}
      <main className="relative z-20">
        <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center md:px-10">
          <p aria-hidden className="eyebrow secret-legible tracking-[0.5em] text-paper/40">
            ♠ ♡ ♢ ♧
          </p>
          <h1
            className={`${lang === "ja" ? "display-ja jp-palt" : "display"} secret-legible mt-8 max-w-2xl text-3xl text-paper md:text-5xl`}
          >
            {t.heading[lang]}
          </h1>
        </section>

        {/* --- 3つの装置。クリア（または「先へ進む」）で詩の断片が刻まれる --- */}
        <Device id="lens" lang={lang} index={0}>
          {(p) => <LensProbe {...p} />}
        </Device>

        <Device id="orbit" lang={lang} index={1}>
          {(p) => <OrbitToss {...p} />}
        </Device>

        <Device id="redshift" lang={lang} index={2}>
          {(p) => <RedshiftDial {...p} />}
        </Device>

        <section
          ref={endRef}
          className="flex min-h-svh flex-col items-center justify-center px-6 text-center md:px-10"
        >
          <p
            className={`secret-legible font-serif italic text-paper/60 transition-opacity duration-1000 ${
              endIn ? "opacity-100" : "opacity-0"
            } motion-reduce:opacity-100 motion-reduce:transition-none`}
          >
            {t.signature[lang]}
          </p>
          <Link
            href={`/${lang}/`}
            className={eyebrow(lang, "cta-link secret-legible mt-14 text-paper/70 transition-colors hover:text-paper")}
          >
            {t.back[lang]} →
          </Link>
        </section>
      </main>
    </div>
  );
}
