"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import StarMark from "@/components/sections/StarMark";
import { STORY, type StoryBlock } from "@/lib/story-content";

const viewport = { once: true, margin: "-100px" } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ────────────────────────────────────────────────
   強調記法 `*...*` → ブランドレッド
   ──────────────────────────────────────────────── */
function emphasize(text: string): ReactNode[] {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic text-brand-red">
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/* ────────────────────────────────────────────────
   1行のマスクリビール
   下から立ち上がる。reduced-motion 時は MotionConfig が
   transform を無効化し、opacity のフェードだけが残る。
   ──────────────────────────────────────────────── */
const lineOuter = "block overflow-hidden pb-[0.12em]";

function makeLineVariants(distance: string): Variants {
  return {
    hidden: { y: distance, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: EASE },
    },
  };
}

const lineVariants = makeLineVariants("110%");
const lineVariantsAscend = makeLineVariants("150%");

function Line({
  children,
  className = "",
  ascend = false,
}: {
  children: ReactNode;
  className?: string;
  ascend?: boolean;
}) {
  return (
    <span className={lineOuter}>
      <motion.span
        className={`block ${className}`}
        variants={ascend ? lineVariantsAscend : lineVariants}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ────────────────────────────────────────────────
   ブロック種別ごとの描画
   ──────────────────────────────────────────────── */
const verseText =
  "font-body font-light text-brand-cream/75 leading-[2.1] tracking-[0.04em] text-[0.98rem] md:text-[1.1rem] [word-break:auto-phrase]";

function Block({ block, ascend }: { block: StoryBlock; ascend: boolean }) {
  switch (block.type) {
    case "verse":
      return (
        <motion.p
          className={verseText}
          variants={groupStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {block.lines.map((line, i) => (
            <Line key={i} ascend={ascend}>
              {emphasize(line)}
            </Line>
          ))}
        </motion.p>
      );

    case "chain":
      return (
        <motion.p
          className="font-body font-medium text-brand-white leading-[1.9] tracking-[0.06em] [word-break:auto-phrase]"
          variants={chainStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {block.lines.map((line, i) => (
            <Line
              key={i}
              ascend={ascend}
              className="text-[1.15rem] md:text-[1.6rem]"
            >
              <span
                className="inline-block"
                style={{ paddingLeft: `${i * 1.4}em` }}
              >
                {emphasize(line)}
              </span>
            </Line>
          ))}
        </motion.p>
      );

    case "quote":
      return (
        <motion.figure
          className="relative flex gap-5 md:gap-7 my-2"
          variants={groupStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* 左の赤バーが縦に伸びる */}
          <motion.span
            aria-hidden="true"
            className="w-[3px] shrink-0 bg-brand-red origin-top"
            variants={{
              hidden: { scaleY: 0 },
              visible: { scaleY: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          />
          {/* 日本語が「上げ／ろ。」のように割れないよう、文節で折り返す。
              auto-phrase 非対応ブラウザでは balance だけが効く */}
          <blockquote
            className="font-body font-bold text-brand-white leading-[1.55] tracking-[0.02em]
                       text-[1.45rem] sm:text-[1.8rem] md:text-[2.4rem] text-balance
                       [word-break:auto-phrase]"
          >
            <Line ascend={ascend}>{emphasize(block.text)}</Line>
          </blockquote>
        </motion.figure>
      );

    case "accent":
      return (
        <motion.p
          className="flex items-center gap-3 font-body font-medium text-brand-white text-[1.1rem] md:text-[1.45rem] tracking-[0.05em]"
          variants={groupStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            aria-hidden="true"
            className="shrink-0 text-brand-red"
            variants={{
              hidden: { opacity: 0, rotate: -120, scale: 0.4 },
              visible: {
                opacity: 1,
                rotate: 0,
                scale: 1,
                transition: { duration: 0.8, ease: EASE },
              },
            }}
          >
            <StarMark className="w-[1.25em] h-[1.25em]" />
          </motion.span>
          <Line ascend={ascend}>{emphasize(block.text)}</Line>
        </motion.p>
      );

    case "define":
      return (
        <motion.dl
          className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-y border-brand-gray py-5"
          variants={groupStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* 見出しフォント（Bebas Neue）は大文字しか持たず "AscenDed" の大小が潰れるので、本文フォントで出す */}
          <dt className="font-body font-semibold text-brand-white text-[1.6rem] md:text-[2.2rem] tracking-[0.06em]">
            <Line ascend={ascend}>{block.term}</Line>
          </dt>
          <dd className="font-body font-medium text-brand-red text-[1.1rem] md:text-[1.45rem] tracking-[0.08em]">
            <Line ascend={ascend}>＝&nbsp;{block.meaning}</Line>
          </dd>
        </motion.dl>
      );
  }
}

const groupStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

const chainStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
};

/* ────────────────────────────────────────────────
   ページ本体
   ──────────────────────────────────────────────── */
export default function StoryBody() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col gap-20 md:gap-28">
      {/* 本文。章立てせず1本の詩として流す */}
      <div className="flex flex-col gap-9 md:gap-11">
        {STORY.map((block, i) => (
          <Block key={i} block={block} ascend={false} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="flex flex-wrap items-center gap-6"
        variants={groupStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <Line>
          <Link
            href="/products"
            className="font-heading text-sm tracking-[0.35em] px-8 py-3 inline-block
                       bg-brand-red text-brand-cream border-2 border-brand-red
                       shadow-[3px_3px_0_rgba(0,0,0,0.55)]
                       hover:bg-transparent hover:text-brand-red
                       transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            SHOP NOW →
          </Link>
        </Line>
      </motion.div>
    </div>
  );
}
