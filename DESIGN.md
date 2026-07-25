# 名越俊平 個人サイト デザインガイド

見た目に関わる作業の前に必ずこのファイルを読むこと。ここに無い色・フォントを勝手に追加しない。

## ブランドの方向性

モダン・エディトリアル。温かみのある紙（生成り）の上に深い墨色の文字を置き、朱色（editorial vermilion）だけを唯一のアクセントとして効かせる、雑誌・書籍的な佇まい。装飾は罫線（hairline）と余白で構成し、紙のノイズテクスチャや縦書きタグラインなど、和のエディトリアルの所作を控えめに取り入れる。日英バイリンガル（`/ja` `/en`）で、日本語は明朝、欧文はセリフの見出しで品格を揃える。

## カラー

すべて `app/globals.css` の `:root` で定義され、`@theme inline` 経由で Tailwind ユーティリティ（`text-ink` 等）として使う。

| トークン | 値 | 用途 |
|---|---|---|
| `--paper` | `#f7f4ed` | ページ背景（body）。基本のセクション背景 |
| `--paper-deep` | `#efe9dd` | トーンを変えるセクションの背景（`Section` の `tone="deep"`） |
| `--ink` | `#171310` | 本文・見出しの基本文字色 |
| `--ink-soft` | `#514b42` | 補助テキスト（リード文・ナビリンク） |
| `--ink-faint` | `#6f6a5f` | 最も弱いテキスト（eyebrow・番号・メタ情報）。`--paper` 上で 4.95:1（WCAG AA 4.5:1 を満たす最小限の濃さ。これ以上薄くしない） |
| `--line` | `#d9d3c7` | 罫線（セクション区切りの `border-t` 等） |
| `--accent` | `#b0442c` | アクセント（朱色）。ローマ字名・番号・hover色・CTA下線・::selection |
| `--accent-ink` | `#7c2e1d` | アクセントの濃色版 |
| `--accent-wash` | `rgba(176, 68, 44, 0.07)` | アクセントの極薄い塗り（背景ウォッシュ） |

## タイポグラフィ

フォントは `app/layout.tsx` で next/font（Google Fonts）から4書体を読み込み、`globals.css` の `--stack-*` で合成している。

| スタック | フォント | 用途 |
|---|---|---|
| `--stack-display`（`.display` / `font-display`） | Instrument Serif → Shippori Mincho → Georgia | 欧文の大見出し（英語ページの見出し） |
| `--stack-name`（`.display-name`） | Cormorant Garamond（italic, weight 500） → Georgia | ヒーローのローマ字名専用 |
| `--stack-serif`（`.display-ja` / `font-serif`） | Shippori Mincho → Georgia | 日本語の見出し（明朝）、本文中のセリフアクセント |
| `--stack-sans`（`font-sans`、body既定） | Zen Kaku Gothic New → system-ui | 本文・UI・eyebrow |

日英の使い分け: 見出しは日本語なら `.display-ja`（明朝・`palt` 有効）、英語なら `.display`（Instrument Serif）を使う。この切り替えは `Section` / `Hero` が `lang` で自動的に行う。

補助クラス:
- `.eyebrow` — 極小（0.72rem）・大文字・字間 0.24em の見出しラベル（色は `--ink-faint`）
- `.eyebrow-ja` — `.eyebrow` と併用し、字間だけ 0.08em に緩める。0.24em はラテン大文字向けの値で、日本語の短いラベルに当てると「学 歴」のように分解して見えるため。**日本語のラベルには必ず併用する**。`lib/ui.ts` の `eyebrow(lang)` を使えば自動で切り替わる（例: `className={eyebrow(lang, "mb-2")}`）。ラテンと日本語が混じる行は、ラテン部分だけ `tracking-[0.24em]` の `<span>` で包む
- `.jp-wrap` — 日本語本文の禁則・折り返し処理。日本語の段落には必ず付ける
- `.jp-palt` — 大きな日本語表示での約物詰め

## レイアウト・余白

- コンテナ幅: セクションは `max-w-4xl`（narrow・既定）/ `max-w-5xl`（wide）、ヒーローとヘッダーのみ `max-w-6xl`。すべて `mx-auto` + `px-6 md:px-10`
- **左右余白は必ず max-width の「外側」に置く**（`<div className="px-6 md:px-10"><div className="mx-auto max-w-6xl">…`）。内側に置くとその要素だけ 40px 内側にずれる。固定ヘッダーとヒーローが縦に並ぶため、ここがずれると常時見える
- セクション余白: `py-12 md:py-16`、セクション見出し下は `mb-8 md:mb-10`。セクション間は `border-t border-line` の罫線で区切る
- 角丸・影: 一切使わない。完全にフラットで、区切りはすべて `--line` 色の1px罫線（hairline）で表現する
- 背景全体に極薄（opacity 0.035）の紙ノイズ（body::after の SVG fractalNoise）が乗っている。消さない・濃くしない
- 新しいセクションは `components/Section.tsx` の共通シェル（番号付き eyebrow + 見出し + リード）を使う

## モーション

ライブラリは `motion/react`（Framer Motion系）。イージングは全編 `[0.22, 1, 0.36, 1]` に統一。

- スクロール出現: `components/Reveal.tsx`（`up` = 24pxの浮上+フェード 0.7s / `fade` = フェードのみ 1s / `rule` = 罫線が左から伸びる 0.8s）。一度だけ発火（`once: true`）
- ヒーロー: 初回ロード時に 0.6〜1s の段階的フェード/浮上、スクロール矢印のみ緩いループ（2.4s）
- CTAリンク: hoverで朱色の下線が左から伸びる（`.cta-link`、0.5s）
- キーボードのフォーカスは `globals.css` の共通 `:focus-visible`（朱色2pxのアウトライン）に任せる。コンポーネント個別に足さない
- hover色は原則 `--accent`。ただし**暗背景（フッター）では朱色のコントラストが3.3:1まで落ちるため、`--paper` に明るくする**のが唯一の例外
- 度合いはかなり控えめ。パララックス・大きな移動・無限ループ装飾は使わない
- `prefers-reduced-motion` を必ず尊重する（Reveal は静的表示にフォールバック、ループも停止）
- **レイアウトの寸法（height・width）はアニメーションさせない**。opacity と小さな移動だけにする。途中でアニメーションが止まっても要素が潰れず、読める状態を保つため（モバイルメニューがこの方針）
- スクロール出現は inline の `opacity:0` として静的HTMLに出力される。JS が無い環境で真っ白にならないよう、`app/layout.tsx` の `<noscript>` で opacity を戻している。**Reveal の仕組みを変えるときはこのフォールバックも合わせて確認する**

## 禁止事項

- @theme トークン以外の色（Tailwind汎用色・16進数直書き）を新規に使わない
- 角丸（rounded-*）・影（shadow-*）・グラデーションを使わない（フラット+罫線の系を崩さない）
- 上記4書体以外のフォントを追加しない。日本語見出しにゴシック（`--stack-sans`）を使わない
- テキストはすべて `content/site.ts` の辞書に置く。コンポーネントに日英の文言を直書きしない。UI文言（ラベル・ボタン・案内）は `site.ui` に集約する
- 外部リンクの `↗` は見出しテキストと同じ行内（` ↗`）に置く。`inline-flex` で別要素にすると、タイトルが折り返したとき矢印だけ1行目の右端に取り残される
- 長い日本語の本文は `\n\n` で段落に分ける（`site.about.personal` がこの形式）。1段落が10行を超えないようにする
- 実データ（研究・CV・実績・連絡先）は本人提供を正とし、推測で創作しない（AGENTS.md 参照）
