"use client";

import { useSyncExternalStore } from "react";

// ============================================================================
//  3つの装置のクリア状況。
//  components/SuitMark.tsx と同じ作法（モジュールスコープの極小ストア +
//  useSyncExternalStore）で、離れた場所にある装置と終幕が同じ状態を見る。
//  リロードでやり直しにならないよう sessionStorage に載せるが、localStorage は
//  使わない — 次に来たときはまた遊べるほうがいい。
// ============================================================================

export const DEVICES = ["lens", "orbit", "redshift"] as const;
export type DeviceId = (typeof DEVICES)[number];

const KEY = "secret:cleared";

let state = 0;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((cb) => cb());

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const getSnapshot = () => state;
/** サーバーでは常に「まだ何も解いていない」。クライアントの初期値も 0 に
 *  揃えたいので、sessionStorage の読み出しはマウント後（hydrateProgress）に回す。 */
const getServerSnapshot = () => 0;

/** SecretStage のマウント時に一度だけ呼ぶ */
export function hydrateProgress() {
  try {
    const raw = sessionStorage.getItem(KEY);
    const n = raw ? Number.parseInt(raw, 10) : 0;
    if (Number.isFinite(n) && n !== state) {
      state = n;
      emit();
    }
  } catch {
    // プライベートモード等で sessionStorage が使えなくても遊べればいい
  }
}

export function clearDevice(id: DeviceId) {
  const bit = 1 << DEVICES.indexOf(id);
  if (state & bit) return;
  state |= bit;
  try {
    sessionStorage.setItem(KEY, String(state));
  } catch {
    /* 保存できなくても続行 */
  }
  emit();
}

export function useCleared(id: DeviceId) {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (s & (1 << DEVICES.indexOf(id))) !== 0;
}
