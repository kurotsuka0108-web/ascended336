"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";
import { CREDO } from "@/lib/story-content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * ストーリーページのヒーロー。ブランドの一行（CREDO）を掲げる。
 *
 * 背景は実写のグラフィティ壁（wall-bg.png＝ロゴなし版）。その上に巨大な
 * ブラシ体のブランド名を screen 合成で重ね、壁に描かれた壁画のように見せる。
 * 単色でベタ塗りした図形を置くと壁から浮いてステッカーのように見えるため、
 * 合成モードで下の壁の凹凸を必ず透かすこと。
 */
export default function StoryHero() {
  const ref = useRef<HTMLDivElement>(null);
  const animated = !useHydratedReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wallY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const motifX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const motifScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-[62vh] md:min-h-[80vh] flex items-center justify-center
                 overflow-hidden border-y border-brand-gray-mid px-6 py-24"
    >
      {/* 実写のグラフィティ壁（パララックス） */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] h-[120%]"
        style={animated ? { y: wallY } : undefined}
        aria-hidden="true"
      >
        <Image
          src="/wall-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* 減光。テキストの可読性を確保しつつ、周辺を落として中央に視線を集める */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 66% at 50% 50%, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.78) 58%, rgba(10,10,10,0.95) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 28%, rgba(10,10,10,0) 72%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      {/* モチーフは減光の「上」に置く。下に置くとビネットに潰されて見えない。
          screen 合成にすることで壁の凹凸が透け、ベタ塗りのステッカーに見えない */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center
                   opacity-[0.42] md:opacity-[0.62]"
        style={{
          mixBlendMode: "screen",
          ...(animated ? { x: motifX, scale: motifScale } : {}),
        }}
      >
        {/* スクロール連動とは別に、ごくゆっくり左右に漂わせる。
            外側＝スクロール、内側＝常時ドリフトで x の指定が衝突しないよう分ける */}
        <motion.span
          className="font-display leading-none whitespace-nowrap select-none text-transparent"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            WebkitTextStroke: "2px rgba(170,170,170,0.85)",
          }}
          animate={{ x: ["-1.6%", "1.6%", "-1.6%"] }}
          transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
        >
          ASCENDED336
        </motion.span>
      </motion.div>

      {/* テキスト直下だけ落とすスポット。壁の赤とラベルの赤が干渉するのを防ぐ */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 54% 34% at 50% 50%, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 52%, rgba(10,10,10,0) 100%)",
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
          className="flex items-center gap-3 font-heading text-[10px] md:text-[11px] tracking-[0.55em] text-brand-cream"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          <span aria-hidden="true" className="block w-6 h-px bg-brand-red" />
          THE&nbsp;CREDO
          <span aria-hidden="true" className="block w-6 h-px bg-brand-red" />
        </motion.p>

        <h2 className="sr-only">ブランドの信条</h2>

        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span
            className="flex items-center justify-center gap-3 md:gap-5 whitespace-nowrap
                       font-body font-bold text-brand-white leading-[1.5] tracking-[0.08em]"
            style={{
              // 狭い画面でも「高潔であ／れ。」のように割れないよう1行に収める
              fontSize: "clamp(1.2rem, 4.6vw, 3.4rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.75)",
            }}
            variants={{
              hidden: { y: "115%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.95, ease: EASE } },
            }}
          >
            <span aria-hidden="true" className="text-brand-white/40">—</span>
            {CREDO}
            <span aria-hidden="true" className="text-brand-white/40">—</span>
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
