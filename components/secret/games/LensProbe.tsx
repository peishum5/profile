"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { GameProps } from "../Device";

// ============================================================================
//  装置 I — 重力レンズ
//  暗い場に文字が伏せてある。カーソル（＝小さな重力源）を近づけると、
//  その周りだけ空間が歪み、歪みの中にだけ文字が見える。
//  全部の文字を照らすとクリア。
//
//  歪みは probe を中心にした縮尺変化で、参照元テクスチャ（オフスクリーンに
//  描いた文字列）を引き伸ばして読み出している。プローブ周りの円内だけ
//  ImageData を触るので、毎フレームの計算量は画面サイズに依らない。
// ============================================================================

const R = 96; // レンズの半径（CSS px）
const STRENGTH = 0.72; // 歪みの強さ
const DWELL_MS = 260; // 1文字を「観測した」ことにするまでの滞在時間

type Box = { x: number; y: number; w: number; h: number };

// reduced は受け取らない。この装置はカーソルに追従するだけで自発的に動かず、
// 動きを減らす設定でも挙動を変える必要がないため。
export default function LensProbe({
  lang,
  live,
  onClear,
  onStatus,
}: Omit<GameProps, "reduced">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [found, setFound] = useState(0);

  const probeRef = useRef({ x: -1e4, y: -1e4 });
  const boxesRef = useRef<Box[]>([]);
  const foundRef = useRef(0);
  foundRef.current = found;
  const dwellRef = useRef<{ index: number; since: number }>({ index: -1, since: 0 });

  const word = site.secret.devices.lens.hidden[lang];
  const total = word.length;

  useEffect(() => {
    onStatus(
      found >= total ? "" : `${site.secret.status.observed[lang]} ${found} / ${total}`,
    );
  }, [found, total, onStatus, lang]);

  useEffect(() => {
    if (found >= total) onClear();
  }, [found, total, onClear]);

  // --- 入力 ---------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const local = (e: { clientX: number; clientY: number }) => {
      const r = canvas.getBoundingClientRect();
      probeRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => local(e);
    const onLeave = () => {
      probeRef.current = { x: -1e4, y: -1e4 };
    };
    const onKey = (e: KeyboardEvent) => {
      const p = probeRef.current;
      const step = e.shiftKey ? 24 : 10;
      if (p.x < 0) {
        // 初回のキー操作は中央から始める
        p.x = canvas.clientWidth / 2;
        p.y = canvas.clientHeight / 2;
      }
      if (e.key === "ArrowLeft") p.x -= step;
      else if (e.key === "ArrowRight") p.x += step;
      else if (e.key === "ArrowUp") p.y -= step;
      else if (e.key === "ArrowDown") p.y += step;
      else return;
      p.x = Math.max(0, Math.min(canvas.clientWidth, p.x));
      p.y = Math.max(0, Math.min(canvas.clientHeight, p.y));
      e.preventDefault();
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("keydown", onKey);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("keydown", onKey);
    };
  }, []);

  // --- 描画 ---------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 参照元テクスチャ（文字列）。CSS px 等倍で持つ。
    const tex = document.createElement("canvas");
    const tctx = tex.getContext("2d", { willReadFrequently: true });
    if (!tctx) return;

    let w = 0;
    let h = 0;
    let src: ImageData | null = null;

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (w === 0 || h === 0) return false;
      tex.width = w;
      tex.height = h;
      tctx.clearRect(0, 0, w, h);

      const size = Math.min(64, Math.max(30, w / (total * 1.35)));
      // canvas の font は var() を解決しないので、canvas 要素に付けた
      // font-serif の計算済みフォント名をそのまま借りる。
      const family = getComputedStyle(canvas).fontFamily || "Georgia, serif";
      tctx.font = `600 ${size}px ${family}`;
      tctx.textBaseline = "middle";
      tctx.fillStyle = "#f7f4ed";

      // 文字を1つずつ置いて、同時に当たり判定の矩形を作る
      const gap = size * 0.34;
      let totalW = 0;
      const widths = [...word].map((ch) => tctx.measureText(ch).width);
      widths.forEach((v) => (totalW += v));
      totalW += gap * (total - 1);

      let x = (w - totalW) / 2;
      const y = h / 2;
      const boxes: Box[] = [];
      [...word].forEach((ch, i) => {
        tctx.fillText(ch, x, y);
        boxes.push({ x, y: y - size / 2, w: widths[i], h: size });
        x += widths[i] + gap;
      });
      boxesRef.current = boxes;
      src = tctx.getImageData(0, 0, w, h);
      return true;
    };

    if (!build()) return;
    // 明朝の読み込みが終わってからもう一度焼き直す（初回は fallback で
    // 焼かれていて、字幅が変わると当たり判定までずれる）。
    document.fonts?.ready.then(() => {
      build();
    });

    let raf = 0;

    const draw = (now: number) => {
      if (canvas.clientWidth !== w || canvas.clientHeight !== h) build();
      if (!src) return;

      // DPR は上げない。ImageData を1枚ずつ触るので、等倍のほうが素直に速い。
      if (canvas.width !== w) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);

      const p = probeRef.current;
      const x0 = Math.max(0, Math.floor(p.x - R));
      const x1 = Math.min(w, Math.ceil(p.x + R));
      const y0 = Math.max(0, Math.floor(p.y - R));
      const y1 = Math.min(h, Math.ceil(p.y + R));

      if (x1 > x0 && y1 > y0) {
        const out = ctx.createImageData(x1 - x0, y1 - y0);
        const sd = src.data;
        const od = out.data;
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const dx = x - p.x;
            const dy = y - p.y;
            const d = Math.hypot(dx, dy);
            if (d > R) continue;

            // 中心ほど強く内側から引き寄せる＝レンズの倍率
            const f = 1 - STRENGTH * Math.exp(-(d * d) / (2 * (R * 0.42) * (R * 0.42)));
            const sx = Math.round(p.x + dx * f);
            const sy = Math.round(p.y + dy * f);
            if (sx < 0 || sy < 0 || sx >= w || sy >= h) continue;

            const si = (sy * w + sx) * 4;
            const oi = ((y - y0) * (x1 - x0) + (x - x0)) * 4;
            // 縁で切れると「丸い窓」に見えるので、外側へ向けて溶かす
            const edge = Math.min(1, (R - d) / (R * 0.45));
            od[oi] = sd[si];
            od[oi + 1] = sd[si + 1];
            od[oi + 2] = sd[si + 2];
            od[oi + 3] = sd[si + 3] * edge;
          }
        }
        ctx.putImageData(out, x0, y0);
      }

      // レンズの縁をうっすら示す（どこを触っているか分からないと迷子になる）
      if (p.x > -1e3) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, R * 0.98, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(176,68,44,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 観測判定 — 同じ文字の上に DWELL_MS 留まったら灯る
      const boxes = boxesRef.current;
      let hit = -1;
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (p.x >= b.x - 6 && p.x <= b.x + b.w + 6 && p.y >= b.y && p.y <= b.y + b.h) {
          hit = i;
          break;
        }
      }
      const dw = dwellRef.current;
      if (hit !== dw.index) {
        dw.index = hit;
        dw.since = now;
      } else if (hit >= 0 && now - dw.since > DWELL_MS) {
        dw.index = -1;
        setFound((n) => (n < total ? n + 1 : n));
      }

      // 見つけた分だけ、素の文字を朱で灯したままにする
      if (foundRef.current > 0) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < Math.min(foundRef.current, boxes.length); i++) {
          const b = boxes[i];
          ctx.fillStyle = "rgba(176,68,44,0.9)";
          ctx.fillRect(b.x, b.y + b.h + 8, b.w, 1);
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    if (!live) return;
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
    // reduced でも動かす。カーソルに追従するだけで、勝手には動かないため。
  }, [live, total, word]);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      role="application"
      aria-label={site.secret.devices.lens.label[lang]}
      // font-serif は見た目のためではなく、canvas に流す実フォント名を
      // getComputedStyle から取り出すために付けている（下の build を参照）。
      // touch-pan-y: 横のなぞりは装置に渡しつつ、縦スクロールは通す。
      // touch-none にすると、この帯の上で指が完全に止まってしまう。
      className="font-serif block h-[220px] w-full cursor-crosshair touch-pan-y border border-paper/12 bg-void/85 md:h-[260px]"
    />
  );
}
