"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[100svh] bg-brand-black -mt-20 md:-mt-28"
      aria-label="ヒーローセクション"
    >

      {/* ── Layer 0: グラフィティ壁 ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: 1.08, originY: 0, willChange: "transform", zIndex: 0 }}
      >
        {/* スマホ（縦長）。display:none の他サイズ画像は読み込まれない */}
        <Image
          src="/hero-bg-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
        {/* タブレット */}
        <Image
          src="/hero-bg-tablet.png"
          alt=""
          fill
          className="object-cover object-center hidden md:block lg:hidden"
          sizes="100vw"
        />
        {/* PC（横長） */}
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center hidden lg:block"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* ── コンテンツ ── */}
      <div
        className="relative flex flex-col justify-end px-6 md:px-12 pt-24 pb-16 min-h-[100svh]"
        style={{ zIndex: 3 }}
      >
        {/* ── Tagline + CTA（下部・左寄せ） ── */}
        <div className="flex flex-col items-start gap-6">
          <motion.p
            className="font-heading text-[10px] md:text-xs tracking-[0.5em] text-brand-cream/55"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            REFINED&nbsp;CHAOS&nbsp;&nbsp;—&nbsp;&nbsp;ELEVATED&nbsp;REBELLION
          </motion.p>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
          >
          <Link
            href="/products"
            className="font-heading text-sm tracking-[0.35em] px-8 py-3 inline-block
                       bg-brand-red text-brand-cream border-2 border-brand-red
                       shadow-[3px_3px_0_rgba(0,0,0,0.55)]
                       transition-all duration-200
                       hover:bg-transparent hover:text-brand-red
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            SHOP NOW →
          </Link>
          <Link
            href="/story"
            className="font-heading text-xs tracking-[0.35em]
                       text-brand-cream/35 transition-colors duration-200
                       hover:text-brand-cream
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cream"
          >
            OUR STORY
          </Link>
        </motion.div>
        </div>
      </div>

    </section>
  );
}
