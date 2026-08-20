"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StarMark from "@/components/sections/StarMark";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";
import { CREDO } from "@/lib/story-content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * ストーリーページのヒーロー。ブランドの一行（CREDO）を掲げる。
 * スクロールに合わせて背面のプレースホルダーと星を緩やかに動かす。
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
  const starRotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const starScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-[62vh] md:min-h-[78vh] flex items-center justify-center
                 overflow-hidden border-y border-brand-gray-mid px-6 py-20"
    >
      {/* パララックスする壁 */}
      <motion.div
        className="placeholder-surface absolute inset-x-0 -top-[12%] h-[124%]"
        style={animated ? { y } : undefined}
        aria-hidden="true"
      />

      {/* 背面の星（セリのつぼみ） */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute w-[78vw] max-w-[500px] text-brand-white/[0.07]"
        style={animated ? { rotate: starRotate, scale: starScale } : undefined}
      >
        <StarMark className="w-full h-auto" />
      </motion.div>

      {/* 上下のフェード（下地となじませる） */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.15) 35%, rgba(10,10,10,0.15) 65%, rgba(10,10,10,0.8) 100%)",
        }}
      />

      {/* ブランドの一行 */}
      <motion.div
        className="relative flex flex-col items-center text-center gap-6 md:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
        }}
      >
        <motion.p
          className="font-heading text-[10px] md:text-[11px] tracking-[0.55em] text-brand-red"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          THE&nbsp;CREDO
        </motion.p>

        <h2 className="sr-only">ブランドの信条</h2>

        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block font-body font-bold text-brand-white leading-[1.5] tracking-[0.08em]"
            style={{ fontSize: "clamp(1.5rem, 5.4vw, 3.4rem)" }}
            variants={{
              hidden: { y: "115%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.95, ease: EASE },
              },
            }}
          >
            <span className="text-brand-white/40">—</span>
            &nbsp;{CREDO}&nbsp;
            <span className="text-brand-white/40">—</span>
          </motion.span>
        </span>

        <motion.span
          aria-hidden="true"
          className="block w-16 h-px bg-brand-red origin-center"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
          }}
        />
      </motion.div>
    </div>
  );
}
