"use client";

import { useEffect, useRef } from "react";
import { FRAG, VERT } from "./glsl/blackhole";

// ============================================================================
//  背景のブラックホール（WebGL2）
//  ライブラリは使わない。画面全体を覆う三角形1枚に blackhole.ts のシェーダーを
//  貼るだけなので、three.js を入れる理由が無い（バンドル ~150KB の節約）。
// ============================================================================

type Props = {
  /** 「観測を開始する」を押した後に true。ここから点火のランプが始まる */
  ignited: boolean;
  /** prefers-reduced-motion。true なら1フレームだけ描いて静止画にする */
  reduced: boolean;
  /** WebGL2 が使えない／コンテキストを失った。CSS のフォールバックに切り替える */
  onUnsupported: () => void;
};

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("[secret] shader compile failed:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function BlackHole({ ignited, reduced, onUnsupported }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ループ内から読む値は ref に置く。再マウントせずに毎フレーム反映させたい。
  const ignitedRef = useRef(ignited);
  const reducedRef = useRef(reduced);
  ignitedRef.current = ignited;
  reducedRef.current = reduced;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      onUnsupported();
      return;
    }

    // 端末に合わせて march のステップ数を落とす。GPU 負荷はここがほぼ全て。
    const coarse = window.matchMedia("(max-width: 767px)").matches;
    const steps = coarse ? 60 : 120;
    const frag = `#version 300 es\n#define STEPS ${steps}\n${FRAG}`;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
    const prog = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !prog) {
      onUnsupported();
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[secret] program link failed:", gl.getProgramInfoLog(prog));
      onUnsupported();
      return;
    }
    gl.useProgram(prog);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uReveal = gl.getUniformLocation(prog, "uReveal");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    // 頂点バッファは無し（gl_VertexID だけで三角形を作る）が、
    // VAO は WebGL2 の描画に必要なので空のものを1つ束ねておく。
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // --- サイズ ------------------------------------------------------------
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.0 : 1.5);
      const nw = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const nh = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    // --- 入力 --------------------------------------------------------------
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    const onPointer = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth) * 2 - 1;
      tmy = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let scroll = 0;
    const readScroll = () => {
      const doc = document.documentElement;
      const range = doc.scrollHeight - window.innerHeight;
      scroll = range > 0 ? Math.min(1, Math.max(0, doc.scrollTop / range)) : 0;
    };

    // --- ループ ------------------------------------------------------------
    let raf = 0;
    let reveal = 0;
    let last = performance.now();
    const t0 = last;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      resize();
      readScroll();

      // 点火のランプ（約1.6秒）
      const target = ignitedRef.current ? 1 : 0;
      reveal += (target - reveal) * Math.min(1, dt * 1.9);
      if (reducedRef.current) reveal = target;

      // 視差はゆっくり追従させる。素の座標だと画面がぶれて読めない。
      mx += (tmx - mx) * Math.min(1, dt * 2.5);
      my += (tmy - my) * Math.min(1, dt * 2.5);

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, reducedRef.current ? 12.0 : (now - t0) / 1000);
      // 静止モードではスクロール連動が効かないので、穴が本文をちょうど収める
      // 大きさになる中間の画角で固定する（引ききると本文が明るい円盤に重なる）。
      gl.uniform1f(uScroll, reducedRef.current ? 0.45 : scroll);
      gl.uniform1f(uReveal, reveal);
      gl.uniform2f(uMouse, reducedRef.current ? 0 : mx, reducedRef.current ? 0 : my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 静止モードでは1フレームだけ描いて止める
      if (reducedRef.current && reveal === target) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // タブが隠れている間は回さない
    const onVisibility = () => (document.hidden ? stop() : start());

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      onUnsupported();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);
    start();

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteVertexArray(vao);
      // ここで loseContext() は呼ばない。canvas 要素は残るため getContext は
      // 同じコンテキストを返し、失わせると再マウント時に何もコンパイルできなくなる
      // （StrictMode の二重実行で実際に踏む）。canvas ごと消えれば GC される。
    };
    // onUnsupported は親で useCallback 済み。マウント時に一度だけ組み立てる。
  }, [onUnsupported]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 block h-full w-full"
    />
  );
}
