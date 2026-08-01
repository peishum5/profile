"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { GameProps } from "../Device";

// ============================================================================
//  装置 II — 投擲
//  星を放って、落ちも飛び去りもしない軌道に乗せる。
//  重力だけの2体問題を semi-implicit Euler で積分している。
//
//  ポインタ: ドラッグして離す（引いた向きと長さが初速）
//  キーボード: ← → で角度、↑ ↓ で初速、Enter / Space で放つ
// ============================================================================

type Vec = { x: number; y: number };

// 半径 120px の円軌道が 120px/s（＝1周およそ6.3秒）になるよう GM を決めた。
// v² = GM/r なので GM = 120² × 120。これで「見ていて気持ちのいい速さ」と
// 「6秒＝ほぼ1周」が揃い、初速のスライダー幅も現実的な数字に収まる。
const GM = 1_728_000;
const R_HORIZON = 16; // ここに触れたら吸い込まれる
const R_ESCAPE = 320; // 画面から出ていったら見失い
const SURVIVE_MS = 6000; // これだけ持てば「安定軌道」（およそ1周）
const HINT_AFTER_FAILS = 2; // 何回落としたら予測線を出すか
/** キーボードで放つときの射出点 */
const KEY_ORIGIN: Vec = { x: -150, y: 40 };

type Star = {
  p: Vec;
  v: Vec;
  trail: Vec[];
  born: number;
};

/** 与えられた初期条件を先の方まで空撃ちして、予測線を作る */
function predict(p0: Vec, v0: Vec, steps: number): Vec[] {
  const pts: Vec[] = [];
  let px = p0.x;
  let py = p0.y;
  let vx = v0.x;
  let vy = v0.y;
  const dt = 1 / 240;
  for (let i = 0; i < steps; i++) {
    const r2 = px * px + py * py;
    const r = Math.sqrt(r2) || 1;
    if (r < R_HORIZON || r > R_ESCAPE) break;
    const a = -GM / (r2 * r);
    vx += a * px * dt;
    vy += a * py * dt;
    px += vx * dt;
    py += vy * dt;
    if (i % 8 === 0) pts.push({ x: px, y: py });
  }
  return pts;
}

export default function OrbitToss({ lang, live, reduced, onClear, onStatus }: GameProps) {
  const st = site.secret.status;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fails, setFails] = useState(0);
  const [done, setDone] = useState(false);

  // 描画ループから読む可変値。state にすると毎フレーム再レンダリングになる。
  const starRef = useRef<Star | null>(null);
  const dragRef = useRef<{ from: Vec; to: Vec } | null>(null);
  const aimRef = useRef({ angle: -0.26, power: 95 }); // キーボード照準
  const keyAimRef = useRef(false); // キーボードで狙っている間だけ照準を出す
  const doneRef = useRef(false);
  doneRef.current = done;

  const failsRef = useRef(0);
  failsRef.current = fails;

  /** canvas 中心を原点とした座標へ */
  const toLocal = (canvas: HTMLCanvasElement, e: { clientX: number; clientY: number }) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
  };

  const launch = useCallback(
    (from: Vec, v: Vec) => {
      starRef.current = { p: { ...from }, v, trail: [], born: performance.now() };
      onStatus(st.observing[lang]);
    },
    [onStatus, st, lang],
  );

  // --- 入力 ---------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || done) return;

    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      const p = toLocal(canvas, e);
      dragRef.current = { from: p, to: p };
      keyAimRef.current = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      dragRef.current = { ...dragRef.current, to: toLocal(canvas, e) };
    };
    const onUp = () => {
      const d = dragRef.current;
      dragRef.current = null;
      if (!d) return;
      const vx = (d.from.x - d.to.x) * 2.2;
      const vy = (d.from.y - d.to.y) * 2.2;
      if (Math.hypot(vx, vy) < 20) return; // 単なるクリックは無視
      launch(d.from, { x: vx, y: vy });
    };

    const onKey = (e: KeyboardEvent) => {
      const a = aimRef.current;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        a.angle += (e.key === "ArrowLeft" ? -1 : 1) * 0.09;
        keyAimRef.current = true;
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        a.power = Math.max(40, Math.min(200, a.power + (e.key === "ArrowUp" ? 5 : -5)));
        keyAimRef.current = true;
      } else if (e.key === "Enter" || e.key === " ") {
        launch(KEY_ORIGIN, {
          x: Math.cos(a.angle) * a.power,
          y: Math.sin(a.angle) * a.power,
        });
        keyAimRef.current = false;
      } else {
        return;
      }
      e.preventDefault();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("keydown", onKey);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("keydown", onKey);
    };
  }, [done, launch]);

  // --- 物理と描画 ---------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dtReal = Math.min((now - last) / 1000, 0.05);
      last = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);

      // 事象の地平線と円盤の目安
      ctx.beginPath();
      ctx.arc(0, 0, R_HORIZON, 0, Math.PI * 2);
      ctx.fillStyle = "#05070a";
      ctx.fill();
      ctx.strokeStyle = "rgba(176,68,44,0.55)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = "rgba(247,244,237,0.08)";
      for (const r of [70, 130]) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 照準（ドラッグ中／キーボード操作中）
      const drag = dragRef.current;
      // キーボードは手応えで測れないので、狙っている間は常に予測線を出す。
      const showHint =
        keyAimRef.current || failsRef.current >= HINT_AFTER_FAILS || reduced;
      let aimFrom: Vec | null = null;
      let aimV: Vec | null = null;
      if (drag) {
        aimFrom = drag.from;
        aimV = { x: (drag.from.x - drag.to.x) * 2.2, y: (drag.from.y - drag.to.y) * 2.2 };
      } else if (keyAimRef.current) {
        const a = aimRef.current;
        aimFrom = KEY_ORIGIN;
        aimV = { x: Math.cos(a.angle) * a.power, y: Math.sin(a.angle) * a.power };
      }

      if (aimFrom && aimV) {
        ctx.strokeStyle = "rgba(247,244,237,0.35)";
        ctx.beginPath();
        ctx.moveTo(aimFrom.x, aimFrom.y);
        ctx.lineTo(aimFrom.x + aimV.x * 0.16, aimFrom.y + aimV.y * 0.16);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(aimFrom.x, aimFrom.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(247,244,237,0.8)";
        ctx.fill();

        if (showHint) {
          const pts = predict(aimFrom, aimV, 2400);
          ctx.strokeStyle = "rgba(176,68,44,0.4)";
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // 星の積分。表示 FPS に依らず一定になるよう固定刻みで回す。
      const star = starRef.current;
      if (star && !doneRef.current) {
        // 近点では加速度が跳ね上がるので、刻みを細かくして発散を防ぐ
        const dt = 1 / 240;
        const sub = Math.max(1, Math.min(16, Math.round(dtReal / dt)));
        for (let i = 0; i < sub; i++) {
          const r2 = star.p.x * star.p.x + star.p.y * star.p.y;
          const r = Math.sqrt(r2) || 1;
          const a = -GM / (r2 * r);
          star.v.x += a * star.p.x * dt;
          star.v.y += a * star.p.y * dt;
          star.p.x += star.v.x * dt;
          star.p.y += star.v.y * dt;
        }
        star.trail.push({ x: star.p.x, y: star.p.y });
        if (star.trail.length > 260) star.trail.shift();

        const r = Math.hypot(star.p.x, star.p.y);
        const alive = now - star.born;
        if (r < R_HORIZON || r > R_ESCAPE) {
          starRef.current = null;
          setFails((n) => n + 1);
          onStatus(r < R_HORIZON ? st.fell[lang] : st.strayed[lang]);
        } else if (alive > SURVIVE_MS) {
          starRef.current = null;
          setDone(true);
          onClear();
        } else {
          onStatus(
            `${st.hold[lang]} ${(alive / 1000).toFixed(1)} / ${(SURVIVE_MS / 1000).toFixed(1)}`,
          );
        }
      }

      if (star) {
        ctx.beginPath();
        star.trail.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.strokeStyle = "rgba(176,68,44,0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.p.x, star.p.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = "#f7f4ed";
        ctx.fill();
      }

      ctx.restore();
    };

    if (!live) return;
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [live, reduced, onClear, onStatus, st, lang]);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      role="application"
      aria-label={site.secret.devices.orbit.label[lang]}
      className="block h-[280px] w-full cursor-crosshair touch-none border border-paper/12 bg-void/80 md:h-[340px]"
    />
  );
}
