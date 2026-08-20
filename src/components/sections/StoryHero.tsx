"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

/**
 * ストーリーページのヒーロー。
 * スクロールに合わせて背面のプレースホルダーを緩やかにパララックス移動させる。
 * reduced-motion 時は完全に静止させる。
 *
 * 注意: framer-motion の `useReducedMotion()` はクライアント初回描画から実値を
 * 返すため、その値で style を出し分けるとハイドレーション不一致になる。
 * サーバー描画と初回描画を揃える `useHydratedReducedMotion()` を使う。
 */
export default function StoryHero() {
  const ref = useRef<HTMLDivElement>(null);
  const animated = !useHydratedReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 背面レイヤーを上下に -12% 〜 12% 動かす（枠より高くしてはみ出しを防ぐ）
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [0.35, 1, 0.2]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[50vh] md:h-[62vh] overflow-hidden border-y border-brand-gray-mid"
    >
      {/* パララックスする背面レイヤー */}
      <motion.div
        className="placeholder-surface absolute inset-x-0 -top-[12%] h-[124%]"
        style={animated ? { y } : undefined}
        aria-hidden="true"
      >
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-brand-white/[0.06] select-none leading-none"
          style={{ fontSize: "clamp(8rem, 26vw, 22rem)" }}
        >
          336
        </span>
      </motion.div>

      {/* 上下のフェード（下地となじませる） */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.75) 100%)",
        }}
      />

      {/* ラベル */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={animated ? { opacity: labelOpacity } : undefined}
      >
        <span className="font-heading text-xs md:text-sm tracking-[0.5em] text-brand-gray-light">
          STORY IMAGE
        </span>
      </motion.div>
    </div>
  );
}
