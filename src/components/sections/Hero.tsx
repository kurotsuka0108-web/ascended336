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
      className="relative overflow-hidden min-h-[100svh] bg-brand-black"
      aria-label="ヒーローセクション"
    >

      {/* ── Layer 0: グラフィティ壁 ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: 1.08, originY: 0, willChange: "transform", zIndex: 0 }}
      >
        <Image
          src="/wall-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* ── コンテンツ ── */}
      <div
        className="relative flex flex-col px-6 md:px-12 pt-6 pb-40 min-h-[100svh]"
        style={{ zIndex: 3 }}
      >
        <div className="flex flex-col flex-1 justify-end pb-6">
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.55 }}
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

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-36 right-10 flex flex-col items-center gap-3"
        style={{ zIndex: 4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden
      >
        <motion.div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, #cc0000, transparent)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
        <span
          className="font-heading text-[9px] tracking-[0.5em] text-brand-cream/30"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
