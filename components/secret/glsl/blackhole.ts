// ============================================================================
//  隠しページ /secret の背景 — シュヴァルツシルト時空のレイマーチング
//
//  画面全体を1枚の三角形で覆い、すべてフラグメントシェーダーで描く。
//  光線を測地線に沿って曲げているので、背景の星も降着円盤の裏側も
//  ブラックホールの周りで「回り込んで」見える。
//
//  色は表のサイトのトークンをそのまま使う（朱 --accent が白熱した円盤の色に
//  なる）。宇宙の黒だけ --void を足している。DESIGN.md「例外領域: /secret」参照。
// ============================================================================

/** フルスクリーン三角形。頂点バッファを持たず gl_VertexID だけで作る。 */
export const VERT = /* glsl */ `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

/** #version 行はソース先頭でなければならないため、ここには含めない。
 *  BlackHole.tsx が `#version` + `#define STEPS n` を前置してコンパイルする。 */
export const FRAG = /* glsl */ `precision highp float;

out vec4 fragColor;

uniform vec2  uRes;
uniform float uTime;
uniform float uScroll;  // 0→1 でカメラが事象の地平線へ寄る
uniform float uReveal;  // 0→1 の点火（星が先、円盤が後から灯る）
uniform vec2  uMouse;   // -1..1 のごく浅い視差

#ifndef STEPS
#define STEPS 120
#endif

const float RS       = 1.0;   // シュヴァルツシルト半径（この長さを単位にする）
const float DISK_IN  = 2.6;   // 降着円盤の内縁（最内安定円軌道あたり）
const float DISK_OUT = 9.0;   // 外縁

// --- サイトのカラートークン ------------------------------------------------
const vec3 PAPER      = vec3(0.969, 0.957, 0.929); // #f7f4ed
const vec3 ACCENT     = vec3(0.690, 0.267, 0.173); // #b0442c
const vec3 ACCENT_INK = vec3(0.486, 0.180, 0.114); // #7c2e1d
const vec3 VOID_COL   = vec3(0.020, 0.027, 0.039); // #05070a

// --- ハッシュとノイズ ------------------------------------------------------
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i + vec3(0,0,0)), hash31(i + vec3(1,0,0)), f.x),
        mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
        mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y),
    f.z);
}

// 3オクターブで足りる。円盤の乱流はディテールより「流れ」が見えることが大事。
float fbm(vec3 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    s += a * vnoise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return s;
}

// --- 星野 ------------------------------------------------------------------
// 曲げ終わった方向でサンプルするので、星も穴の周りで引き伸ばされる。
vec3 starField(vec3 rd) {
  vec3 p = rd * 190.0;
  vec3 i = floor(p);
  vec3 f = fract(p) - 0.5;
  float h = hash31(i);
  if (h < 0.952) return vec3(0.0);

  vec3 off = (vec3(hash31(i + 1.7), hash31(i + 3.1), hash31(i + 5.3)) - 0.5) * 0.68;
  float d = length(f - off);
  float bright = pow(smoothstep(0.32, 0.0, d), 3.0);

  float t = hash31(i + 9.1);
  vec3 col = mix(vec3(0.72, 0.80, 1.00), vec3(1.00, 0.86, 0.70), t);
  float twinkle = 0.75 + 0.25 * sin(uTime * (0.5 + t * 0.9) + h * 40.0);
  return col * bright * (0.5 + 1.6 * hash31(i + 2.2)) * twinkle;
}

// --- 円盤の温度カラーランプ（t: 0 外縁 → 1 内縁） --------------------------
// 朱（--accent）を主役に据える。白熱まで持っていくのは最内縁のごく一部だけで、
// 早く白に振ると全体が灰色の輪になってサイトの色でなくなる。
vec3 diskColor(float t) {
  vec3 c = mix(ACCENT_INK, ACCENT, smoothstep(0.0, 0.45, t));
  c = mix(c, vec3(1.00, 0.60, 0.28), smoothstep(0.58, 0.90, t));
  c = mix(c, PAPER, smoothstep(0.95, 1.0, t));
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // カメラ — スクロールで寄りつつ、視線が円盤面すれすれに落ちていく。
  // 寄せすぎると円盤が画面を横断する帯になって本文が読めなくなるので、
  // 最終位置でも穴が画面の半分に収まる距離で止める。
  float dist  = mix(30.0, 13.0, uScroll);
  float pitch = mix(0.26, 0.10, uScroll);
  float yaw   = uMouse.x * 0.11 + uTime * 0.012;

  vec3 ro = vec3(
    dist * cos(pitch) * sin(yaw),
    dist * sin(pitch) + uMouse.y * 0.5,
    -dist * cos(pitch) * cos(yaw)
  );

  // 寄るにつれて注視点を持ち上げる＝穴が画面の下へ下がる。
  // 終幕でエッジオンの円盤が画面中央を横切って署名と戻るリンクに重なるのを避ける。
  vec3 target = vec3(0.0, mix(0.0, 2.1, uScroll), 0.0);
  vec3 fw = normalize(target - ro);
  vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(uv.x * rt + uv.y * up + 1.55 * fw);

  // 点火。星が先に灯り、遅れて円盤が燃え上がる。
  float starGain = smoothstep(0.00, 0.45, uReveal);
  float diskGain = smoothstep(0.30, 1.00, uReveal);

  // --- 測地線の積分 --------------------------------------------------------
  vec3 pos = ro;
  vec3 dir = rd;
  vec3 hvec = cross(pos, dir);
  float h2 = dot(hvec, hvec); // 角運動量の2乗（保存量）

  vec3 col = vec3(0.0);
  bool captured = false;
  float minR = 1e9;

  for (int i = 0; i < STEPS; i++) {
    float r = length(pos);
    minR = min(minR, r);

    if (r < RS) { captured = true; break; }
    if (r > 70.0 && dot(pos, dir) > 0.0) break; // 遠ざかりきったら打ち切り

    float dt = clamp(r * 0.13, 0.030, 1.1); // 近いほど細かく刻む

    vec3 prev = pos;
    vec3 acc = -1.5 * h2 * pos / pow(r, 5.0); // シュヴァルツシルト測地線の曲げ
    dir += acc * dt;
    pos += dir * dt;

    // 赤道面（y=0）の通過を検出して、円盤との交点を線形補間で拾う
    if (prev.y * pos.y < 0.0) {
      float f = prev.y / (prev.y - pos.y);
      vec3 hit = mix(prev, pos, f);
      float rr = length(hit.xz);

      if (rr > DISK_IN && rr < DISK_OUT) {
        float t = 1.0 - smoothstep(DISK_IN, DISK_OUT, rr);

        // ケプラー回転 — 内側ほど速い（r^-1.5）
        float ang = atan(hit.z, hit.x);
        float kep = uTime * 7.0 / pow(rr, 1.5);
        vec2 np = vec2(cos(ang + kep), sin(ang + kep)) * rr * 0.62;
        float turb = fbm(vec3(np * 1.7, rr * 0.45));
        float dens = smoothstep(0.24, 0.92, turb) * 0.8 + 0.32;

        float edge = smoothstep(DISK_IN, DISK_IN + 0.8, rr)
                   * (1.0 - smoothstep(DISK_OUT - 2.6, DISK_OUT, rr));

        // ドップラー増光 — 近づいてくる側だけ明るくなる。
        // これが無いと「光る輪」で終わり、これがあると天体に見える。
        vec3 vdir = normalize(cross(vec3(0.0, 1.0, 0.0), hit));
        float beta = clamp(sqrt(0.5 * RS / rr), 0.0, 0.6);
        float mu = dot(vdir, -normalize(dir));
        float dop = pow(clamp(1.0 + beta * mu * 1.7, 0.05, 3.0), 3.0);

        col += diskColor(t) * pow(t, 2.1) * dens * edge * dop * 1.15 * diskGain;
      }
    }
  }

  if (!captured) {
    col += starField(normalize(dir)) * starGain;
  }

  // 光子球（1.5Rs）をかすめた光線が作る細い輪を少しだけ持ち上げる。
  // 寄るほど弱める。近距離では実際にレンズされた円盤が輪を作るので、
  // これを足したままだと「手で描いた円」に見えてしまう。
  float ring = smoothstep(0.10, 0.0, abs(minR - 1.5 * RS));
  col += mix(ACCENT, PAPER, 0.45) * ring * 0.55 * diskGain * (1.0 - 0.75 * uScroll);

  col += VOID_COL * (0.5 + 0.5 * starGain);

  // トーンマップ。チャンネルごとに col/(1+col) すると、明るいところほど
  // R:G:B の比が 1:1:1 に潰れて朱が白い輪になる。最大成分だけで割れば
  // 比が保たれるので、明るくても朱のままでいてくれる。
  float peak = max(max(col.r, col.g), col.b);
  col = col / (1.0 + peak);
  col = pow(max(col, 0.0), vec3(0.82));
  col += (hash21(gl_FragCoord.xy + fract(uTime) * 97.0) - 0.5) * 0.014;

  fragColor = vec4(max(col, 0.0), 1.0);
}
`;
