"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export interface Chapter {
  num: string;
  title: string;
  body: string;
}

interface StoryChaptersProps {
  chapters: Chapter[];
}

const viewport = { once: true, margin: "-80px" } as const;

/** 章番号：大きなアウトライン数字が奥から立ち上がる */
const ghostNumber = {
  hidden: { opacity: 0, scale: 1.25, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

/** 章タイトル横の罫線が左から伸びる */
const ruleGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function StoryChapters({ chapters }: StoryChaptersProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 flex flex-col gap-24 md:gap-32">
      {chapters.map((ch) => (
        <motion.section
          key={ch.num}
          className="relative flex flex-col gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-labelledby={`chapter-${ch.num}`}
        >
          {/* 背面の大きな章番号 */}
          <motion.span
            className="pointer-events-none absolute -top-14 -left-2 md:-left-8 font-display
                       leading-none select-none text-transparent"
            style={{
              fontSize: "clamp(6rem, 18vw, 13rem)",
              WebkitTextStroke: "1px rgba(245,245,240,0.10)",
            }}
            variants={ghostNumber}
            aria-hidden="true"
          >
            {ch.num}
          </motion.span>

          <motion.div className="relative flex items-center gap-4" variants={fadeInUp}>
            <span className="font-heading text-brand-red text-sm tracking-[0.3em]">
              {ch.num}
            </span>
            <motion.div
              className="h-px flex-1 bg-brand-gray origin-left"
              variants={ruleGrow}
            />
          </motion.div>

          <motion.h2
            id={`chapter-${ch.num}`}
            className="relative font-heading text-brand-white leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            variants={fadeInUp}
          >
            {ch.title}
          </motion.h2>

          <motion.p
            className="relative font-body text-brand-gray-light leading-relaxed text-sm md:text-base"
            variants={fadeInUp}
          >
            {ch.body}
          </motion.p>
        </motion.section>
      ))}

      {/* CTA */}
      <motion.div
        className="flex items-center gap-6 -mt-10 md:-mt-14"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <Link
          href="/products"
          className="font-heading text-sm tracking-[0.35em] px-8 py-3
                     bg-brand-red text-brand-cream border-2 border-brand-red
                     shadow-[3px_3px_0_rgba(0,0,0,0.55)]
                     hover:bg-transparent hover:text-brand-red
                     transition-all duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
        >
          SHOP NOW →
        </Link>
      </motion.div>
    </div>
  );
}
