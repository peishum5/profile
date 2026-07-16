"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { site, type Lang } from "@/content/site";

// ============================================================================
// 隠しスートの謎解き
// ページ各所に散らばる ♠♡♢♧ を、この並び（フッターのコロフォンにも印字）の
// とおりにクリックすると、♧ の隣に隠しページへの扉が現れる。
// 順を間違えたら静かに振り出しへ戻る。マジックなので種明かしはしない。
// ============================================================================

export const SUIT_ORDER = ["♠", "♡", "♢", "♧"] as const;
export type Suit = (typeof SUIT_ORDER)[number];

// 4つの SuitMark はページ内の別コンポーネントに散らばるため、
// モジュールスコープの極小ストアで進行状況を共有する。
let progress = 0;
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const getProgress = () => progress;
const getServerProgress = () => 0;

function press(suit: Suit) {
  if (progress >= SUIT_ORDER.length) return; // 開錠後は固定
  progress =
    suit === SUIT_ORDER[progress] ? progress + 1 : suit === SUIT_ORDER[0] ? 1 : 0;
  listeners.forEach((cb) => cb());
}

export default function SuitMark({
  suit,
  lang,
  reveal = false,
  className = "",
}: {
  suit: Suit;
  lang: Lang;
  /** true のとき、全て揃った瞬間にこの印の隣へ隠しページへのリンクが現れる */
  reveal?: boolean;
  /** 置き場所（明色/暗色背景）に合わせた待機時の色 */
  className?: string;
}) {
  const current = useSyncExternalStore(subscribe, getProgress, getServerProgress);
  const unlocked = current >= SUIT_ORDER.length;
  const lit = SUIT_ORDER.indexOf(suit) < current; // 正しく押された印は朱色に灯る

  return (
    <>
      <button
        type="button"
        onClick={() => press(suit)}
        aria-label={suit}
        className={`inline-block select-none text-[0.65rem] leading-none transition-colors duration-500 hover:text-accent motion-reduce:transition-none ${
          lit ? "text-accent" : className
        }`}
      >
        {suit}
      </button>
      {reveal && (
        <Link
          href={`/${lang}/secret/`}
          aria-hidden={!unlocked}
          tabIndex={unlocked ? 0 : -1}
          className={`cta-link text-xs tracking-wide text-accent transition-opacity duration-700 motion-reduce:transition-none ${
            unlocked ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {site.secret.unlocked[lang]}
        </Link>
      )}
    </>
  );
}
