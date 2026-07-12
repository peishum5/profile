import type { Metadata } from "next";
import { Instrument_Serif, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Latin editorial display serif — layered over Shippori for Japanese glyphs.
const instrument = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
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
      className={`${instrument.variable} ${shippori.variable} ${zenKaku.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
