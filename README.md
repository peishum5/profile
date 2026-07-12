# 名越俊平 個人HP

名越俊平（Shumpei Nagoshi）の個人サイト。研究成果・経歴(CV)・マジック実績・成果物をまとめ、
検索や紹介でたどり着いた人が客観的に人物像を把握できることを目的とする。日英バイリンガル。

## 技術
- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4、フォントは next/font（しっぽり明朝・Instrument Serif・Zen Kaku Gothic New）
- motion（控えめなスクロール演出）
- DB・APIなしの静的コンテンツサイト。Vercelにデプロイ。

## ローカルで動かす
```bash
npm install
npm run dev      # http://localhost:3000 （/ja にリダイレクト）
npm run build    # 本番ビルド確認
```
- 日本語: `/ja` ／ 英語: `/en`（右上・ヘッダーの JA/EN で切替）

## 中身（テキスト）の差し替え方
サイトの文言・データは **すべて `content/site.ts` の1ファイル** に日英ペアで集約している。
ここを編集すれば、両言語・全セクションに反映される。現状はプレースホルダー（仮）。

- `⚠` コメントの付いた項目＝要確認・要記入
- `research` / `works` / `magic` / `cv` の配列に項目を足し引きすれば表示も増減
- `contact.email` に公開用アドレスを入れると大型CTAが自動で mailto リンクになる
- `contact.socials` の各 `url` を入れると「準備中」表示が有効リンクに変わる（空なら準備中のまま）

## 画像
`public/` に顔写真・作品サムネイルを置き、該当コンポーネント（`components/About.tsx`, `components/Works.tsx`）の
プレースホルダー枠を `next/image` に差し替える。

## 公開（GitHub Pages）
- 公開URL: **https://peishum5.github.io/profile/**
- `main` に push すると GitHub Actions（`.github/workflows/deploy.yml`）が
  静的書き出し（`GITHUB_PAGES=true npm run build` → `out/`）を行い、自動でPagesに反映。
- サブパス `/profile/` 配下で配信するため、`next.config.ts` で `basePath` を設定している
  （ローカル `npm run dev` は basePath なしのまま）。
- ローカルで本番と同じ静的書き出しを確認: `GITHUB_PAGES=true npm run build`（`out/` を生成）。
