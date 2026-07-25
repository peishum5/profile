"use client";

import { useEffect } from "react";

// Static-export friendly root redirect. A relative "ja/" target resolves
// correctly whether the site is served at "/" (dev) or "/profile/" (Pages).
// The markup below is only seen for the moment before the redirect fires (and
// by anyone without JS), so it stays inside the design system rather than
// falling back to unstyled HTML.
export default function Home() {
  useEffect(() => {
    window.location.replace("ja/");
  }, []);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs tracking-wide text-ink-faint">
        名越俊平 — Shumpei Nagoshi
      </p>
      <p className="flex items-baseline gap-4 font-serif text-base text-ink">
        <a href="ja/" className="cta-link transition-colors hover:text-accent">
          日本語
        </a>
        <span className="text-line">/</span>
        <a href="en/" className="cta-link transition-colors hover:text-accent">
          English
        </a>
      </p>
    </main>
  );
}
