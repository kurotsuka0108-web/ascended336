"use client";

import { motion, useReducedMotion } from "framer-motion";

const PHRASE = "BRITISH PUNK — REFINED CHAOS — ELEVATED REBELLION — ASCENDED336 — ";
const COPIES = 4; // -100/COPIES% 移動でシームレスにループ

/**
 * 常時流れるマーキー（スクロール非依存の無限ループ）。
 * 同一フレーズを COPIES 個並べ、1コピー分だけ平行移動してループ＝継ぎ目なし。
 * reduced-motion 時は静止。装飾要素なので aria-hidden。
 */
export default function Marquee() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-brand-gray bg-brand-black py-4 md:py-7"
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={reduce ? undefined : { x: ["0%", `-${100 / COPIES}%`] }}
        transition={
          reduce ? undefined : { duration: 10, ease: "linear", repeat: Infinity }
        }
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <span
            key={i}
            className="font-display leading-none pr-6 select-none"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 4.2rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(245, 245, 240, 0.55)",
            }}
          >
            {PHRASE}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
