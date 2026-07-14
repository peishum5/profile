"use client";

import { useEffect } from "react";

/** The root layout can't see the [lang] segment (it renders once for both
 *  locales), so the correct html lang attribute is stamped client-side. */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
