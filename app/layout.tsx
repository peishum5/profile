import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Serif, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// GA4 計測ID（G-XXXXXXXXXX）。ビルド時に環境変数から埋め込む。
// 未設定なら計測タグは出力されない（＝安全に無効化される）。
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// Latin editorial display serif — layered over Shippori for Japanese glyphs.
const instrument = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

// Classic Garamond italic — reserved for the romanized name in the hero.
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

// Japanese serif for display + refined body accents.
const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
});

// Japanese sans for body copy and UI.
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
});

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "名越俊平 — Shumpei Nagoshi",
  description:
    "名越俊平（Shumpei Nagoshi）の個人サイト。研究成果、経歴（CV）、マジックの実績、そして成果物をまとめています。",
  openGraph: {
    title: "名越俊平 — Shumpei Nagoshi",
    description:
      "研究・経歴・マジック・成果物。名越俊平の人物像がわかる個人サイト。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      // /secret は本文より前の同期スクリプトで <html> に data-secret を立て、
      // 紙のページが一瞬見えてから暗転するのを防いでいる。React から見ると
      // サーバーHTMLとの差分になるため、この要素の属性差分だけ黙らせる
      // （子要素には波及しない。next-themes 等と同じ定石）。
      suppressHydrationWarning
      className={`${instrument.variable} ${cormorant.variable} ${shippori.variable} ${zenKaku.variable}`}
    >
      <body>
        {/* The scroll reveals ship as inline opacity:0 and are only cleared
            once motion hydrates, so without JS the page renders blank. Put
            everything back at rest. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
        {children}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
