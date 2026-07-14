"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";

type Variant = "up" | "fade" | "rule";

/** Subtle editorial scroll-reveal, once, on enter.
 *  - "up":   short rise + fade (default, for text blocks and rows)
 *  - "fade": opacity only — large elements (quotes, images) should arrive still
 *  - "rule": a hairline drawing in from the left (wrap a border/hr element)
 *  Respects prefers-reduced-motion (renders static, fully visible) so content
 *  is never hidden when motion is off. */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  variant = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  variant?: Variant;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const conf = {
    up: {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      duration: 0.7,
      style: undefined,
    },
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      duration: 1,
      style: undefined,
    },
    rule: {
      initial: { opacity: 0, scaleX: 0 },
      whileInView: { opacity: 1, scaleX: 1 },
      duration: 0.8,
      style: { transformOrigin: "left" } as const,
    },
  }[variant];

  return (
    <motion.div
      className={className}
      style={conf.style}
      initial={conf.initial}
      whileInView={conf.whileInView}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: conf.duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
