"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { site, type Lang } from "@/content/site";

// ============================================================================
// 隠しスートの謎解き
// ページ各所に散らばる ♠♡♢♧ を4つすべてクリックすると（順番は問わない）、
// ♧ の隣に隠しページへの扉が現れる。マジックなので種明かしはしない。
// ============================================================================

export const SUITS = ["♠", "♡", "♢", "♧"] as const;
export type Suit = (typeof SUITS)[number];

// 4つの SuitMark はページ内の別コンポーネントに散らばるため、
// モジュールスコープの極小ストア（ビットマスク）で発見状況を共有する。
let found = 0;
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const getFound = () => found;
const getServerFound = () => 0;

function press(suit: Suit) {
  found |= 1 << SUITS.indexOf(suit);
  listeners.forEach((cb) => cb());
}

const ALL_FOUND = (1 << SUITS.length) - 1;

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
  const current = useSyncExternalStore(subscribe, getFound, getServerFound);
  const unlocked = current === ALL_FOUND;
  const lit = (current & (1 << SUITS.indexOf(suit))) !== 0; // 見つけた印は朱色に灯る

  return (
    <>
      <button
        type="button"
        onClick={() => press(suit)}
        aria-label={suit}
        className={`inline-block select-none text-[0.8rem] leading-none transition-colors duration-500 hover:text-accent motion-reduce:transition-none ${
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
