"use client";

import { useEffect } from "react";

// Static-export friendly root redirect. A relative "ja/" target resolves
// correctly whether the site is served at "/" (dev) or "/profile/" (Pages).
export default function Home() {
  useEffect(() => {
    window.location.replace("ja/");
  }, []);

  return (
    <main style={{ padding: "3rem", fontFamily: "system-ui, sans-serif" }}>
      <p>
        <a href="ja/">日本語</a> / <a href="en/">English</a>
      </p>
    </main>
  );
}
