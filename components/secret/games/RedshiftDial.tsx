"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { GameProps } from "../Device";

// ============================================================================
//  装置 III — 赤方偏移
//  スライダーで波長をずらすと、輝線が固定の基準線に重なる。
//  合っているほどノイズが引き、一定時間そこに留まるとロックする。
//  操作は <input type="range"> なので、3つの装置でいちばんキーボードに素直。
// ============================================================================

const Z_TARGET = 0.618; // 正解。特に意味は無いが、覚えやすい数にしてある
const TOL = 0.045; // 許容誤差
const HOLD_MS = 1100; // ロックまでの保持時間
/** 基準線の位置（canvas 幅に対する比） */
const LINES = [0.16, 0.31, 0.44, 0.62, 0.79];

/** x と時刻から決まる擬似ノイズ。Math.random だと毎フレーム総入れ替えで
 *  ちらつきすぎるので、時間を粗い粒に落として「走査」に見せる。 */
function hash(x: number, t: number) {
  const n = Math.sin(x * 12.9898 + t * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

export default function RedshiftDial({
  lang,
  live,
  reduced,
  onClear,
  onStatus,
}: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [z, setZ] = useState(0.12);
  const [locked, setLocked] = useState(false);

  const zRef = useRef(z);
  zRef.current = z;

  const align = Math.max(0, 1 - Math.abs(z - Z_TARGET) / TOL);

  // 許容範囲に HOLD_MS 留まったらロック
  useEffect(() => {
    if (locked || align < 0.001) return;
    const id = window.setTimeout(() => {
      setLocked(true);
      onClear();
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [align, locked, onClear]);

  useEffect(() => {
    onStatus(
      locked ? "" : `${site.secret.status.align[lang]} ${Math.round(align * 100)}%`,
    );
  }, [align, locked, onStatus, lang]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const a = Math.max(0, 1 - Math.abs(zRef.current - Z_TARGET) / TOL);
      const mid = h * 0.62;
      // 静止モードでは走査を止める
      const t = reduced ? 0 : Math.floor(now / 45);

      // 基準線 — ここに輝線を重ねる
      ctx.strokeStyle = "rgba(247,244,237,0.16)";
      ctx.lineWidth = 1;
      for (const p of LINES) {
        ctx.beginPath();
        ctx.moveTo(Math.round(p * w) + 0.5, h * 0.1);
        ctx.lineTo(Math.round(p * w) + 0.5, h * 0.9);
        ctx.stroke();
      }

      // スペクトル本体
      const noiseAmp = 22 * (1 - a) + 1.5;
      const drift = (zRef.current - Z_TARGET) * w * 0.55;
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        let y = mid;
        // 輝線（ガウス）。z のずれの分だけ横に流れる
        for (const p of LINES) {
          const cx = p * w + drift;
          const d = x - cx;
          y -= Math.exp(-(d * d) / 26) * (h * 0.42);
        }
        y += (hash(x, t) - 0.5) * noiseAmp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${176 + 71 * a}, ${68 + 176 * a}, ${44 + 185 * a}, ${0.55 + 0.4 * a})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // 底の罫線
      ctx.strokeStyle = "rgba(247,244,237,0.12)";
      ctx.beginPath();
      ctx.moveTo(0, h - 0.5);
      ctx.lineTo(w, h - 0.5);
      ctx.stroke();

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    if (reduced || !live) {
      // 1フレームだけ描いて止める
      draw(0);
      return;
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [live, reduced]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block h-[150px] w-full border border-paper/12 bg-void/80 md:h-[180px]"
      />
      <div className="mt-4 flex items-center gap-4">
        <label className="flex-1">
          <span className="sr-only">z</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.002}
            value={z}
            disabled={locked}
            onChange={(e) => setZ(Number(e.target.value))}
            className="secret-range w-full"
          />
        </label>
        <output className="secret-legible w-24 text-right font-serif text-sm tabular-nums text-paper/60">
          z = {z.toFixed(3)}
        </output>
      </div>
    </div>
  );
}
