"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CREDO } from "@/lib/story-content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * ストーリーページのヒーロー。ブランドの一行（CREDO）を掲げる。
 *
 * 背景は実写のグラフィティ壁（wall-bg.png＝ロゴなし版）。その上に巨大な
 * ブラシ体のブランド名を screen 合成で重ね、壁に描かれた壁画のように見せる。
 *
 * 背景は壁・文字とも完全に固定。パララックスで別々に動かすと両者がズレて
 * 「壁に描かれている」関係が崩れるため、動かすなら必ず一体で動かすこと。
 * 動くのは CREDO の初回登場のみ。
 */
export default function StoryHero() {
  return (
    <div
      className="relative w-full min-h-[62vh] md:min-h-[80vh] flex items-center justify-center
                 overflow-hidden border-y border-brand-gray-mid px-6 py-24"
    >
      {/* 実写のグラフィティ壁 */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/wall-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 減光。周辺を落として中央に視線を集める */}
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

      {/* 壁に描かれた文字。減光の「上」に置くこと（下だとビネットに潰されて見えない）。
          screen 合成にすることで壁の凹凸が透け、ベタ塗りのステッカーに見えない */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center
                   opacity-[0.42] md:opacity-[0.62]"
        style={{ mixBlendMode: "screen" }}
      >
        <span
          className="font-display leading-none whitespace-nowrap select-none text-transparent"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            WebkitTextStroke: "2px rgba(170,170,170,0.85)",
          }}
        >
          ASCENDED336
        </span>
      </div>

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
