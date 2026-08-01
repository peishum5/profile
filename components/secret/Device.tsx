"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { site, type Lang } from "@/content/site";
import { eyebrow } from "@/lib/ui";
import Typewriter from "./Typewriter";
import { clearDevice, useCleared, type DeviceId } from "./progress";

// ============================================================================
//  3つの装置に共通の枠。
//  ・見出しと操作説明
//  ・装置本体（children）
//  ・状態表示（aria-live）と「先へ進む」
//  ・クリアで刻まれる詩の断片
//
//  「先へ進む」は必ず出す。遊べない人・遊びたくない人が詩を読めないまま
//  終わるのが一番まずいので、ここは削らない。
// ============================================================================

export type GameProps = {
  lang: Lang;
  /** 画面内に入っていて動かしてよいか（画面外の canvas は回さない） */
  live: boolean;
  /** 動きを減らす設定 */
  reduced: boolean;
  /** クリア。装置側から呼ぶ */
  onClear: () => void;
  /** 「◯/◯」などの進捗表示を親に伝える。読み上げにも使う */
  onStatus: (text: string) => void;
};

export default function Device({
  id,
  lang,
  index,
  children,
}: {
  id: DeviceId;
  lang: Lang;
  /** 0 起点。詩の断片 site.secret.fragments[index] と対応する */
  index: number;
  /** 装置本体を組み立てる関数。live/reduced/onClear/onStatus を受け取る */
  children: (props: GameProps) => React.ReactNode;
}) {
  const t = site.secret;
  const meta = t.devices[id];
  const reduce = useReducedMotion() ?? false;
  const cleared = useCleared(id);

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const [status, setStatus] = useState("");
  // 「先へ進む」は最初から DOM に置き、見た目だけ遅れて現れる。
  // 開いた瞬間に見えていると遊ぶ前に飛ばしてしまうが、要素ごと後出しにすると
  // キーボードやスクリーンリーダーの人が「待たないと逃げ道が無い」状態になる。
  // Tab でフォーカスすれば時間に関係なく現れる。
  const [canSkip, setCanSkip] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (!inView || cleared) return;
    const id2 = window.setTimeout(() => setCanSkip(true), 18_000);
    return () => window.clearTimeout(id2);
  }, [inView, cleared]);

  const revealed = cleared || skipped;

  return (
    <section
      ref={ref}
      role="group"
      aria-label={meta.label[lang]}
      className="flex min-h-svh flex-col justify-center px-6 py-20 md:px-10"
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className={eyebrow(lang, "secret-legible text-paper/55")}>
          {meta.label[lang]}
        </p>
        <p className="secret-legible jp-wrap mt-3 max-w-lg text-sm leading-relaxed text-paper/55">
          {meta.hint[lang]}
        </p>

        <div className="mt-8">
          {children({
            lang,
            live: inView,
            reduced: reduce,
            onClear: () => clearDevice(id),
            onStatus: setStatus,
          })}
        </div>

        <div className="mt-5 flex min-h-6 items-center justify-between gap-6">
          <p
            aria-live="polite"
            className={eyebrow(
              lang,
              // クリアは朱で灯したいところだが、暗背景の朱は 3.9:1 で AA を
              // 割る。文言が「観測成功」に変わり、明るさも上がるので区別はつく。
              `secret-legible ${cleared ? "text-paper" : "text-paper/55"}`,
            )}
          >
            {cleared ? t.cleared[lang] : status}
          </p>
          {!revealed && (
            <button
              type="button"
              onClick={() => setSkipped(true)}
              className={eyebrow(
                lang,
                `secret-legible shrink-0 text-paper/55 transition-opacity duration-700 hover:text-paper focus-visible:opacity-100 motion-reduce:transition-none ${
                  canSkip ? "opacity-100" : "opacity-0"
                }`,
              )}
            >
              {t.skip[lang]}
            </button>
          )}
        </div>

        {revealed && (
          <div className="mt-12 border-t border-paper/12 pt-12">
            <Typewriter
              text={t.fragments[index][lang]}
              active
              instant={reduce || skipped}
              className="secret-legible jp-wrap block font-serif text-base leading-loose text-paper/85 md:text-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
