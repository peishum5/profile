"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================================
//  詩を1文字ずつ刻む。
//  見た目は途中でも、スクリーンリーダーには最初から全文を渡す（sr-only）。
//  読めない時間を作らないための措置なので、ここは省略しない。
// ============================================================================

export default function Typewriter({
  text,
  active,
  instant = false,
  speed = 55,
  className = "",
  onDone,
}: {
  text: string;
  /** 画面に入って刻み始めてよいか */
  active: boolean;
  /** true になったら残りを一気に出す（スキップ／reduced motion） */
  instant?: boolean;
  /** 1文字あたりのミリ秒 */
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [n, setN] = useState(0);
  const doneRef = useRef(false);

  // 1文字＝1エフェクト。更新関数の中で副作用を起こさないので
  // StrictMode の二重実行でも進みすぎない。
  useEffect(() => {
    if (instant) {
      setN(text.length);
      return;
    }
    if (!active || n >= text.length) return;
    // 改行の手前で一拍置くと、詩の行間の呼吸になる
    const pause = text[n] === "\n" ? 620 : speed;
    const id = window.setTimeout(() => setN(n + 1), pause);
    return () => window.clearTimeout(id);
  }, [active, instant, n, speed, text]);

  useEffect(() => {
    if (n >= text.length && !doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
  }, [n, text.length, onDone]);

  const shown = text.slice(0, n);
  const typing = n < text.length;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="whitespace-pre-line">
        {shown}
        {typing && <span className="secret-caret" />}
      </span>
    </span>
  );
}
