"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { ABOUT_TEXT, ABOUT_TITLE } from "@/lib/about-content";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/**
 * ABOUT ページの本体。グラフィティ壁の写真の上にブランド紹介文を載せる。
 *
 * 背景は実写のグラフィティ壁（wall-bg.png＝ロゴなし版）で、完全に固定。
 * 動くのは文章の初回登場のみ。
 */
export default function AboutHero() {
  return (
    <div
      className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center
                 overflow-hidden border-y border-brand-gray-mid px-6 py-20 md:py-32"
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

      {/* 文章の下だけ落とすスポット。壁の落書きと本文が重なっても読めるよう、文章の範囲を広めに覆う */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 58% at 50% 50%, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.72) 55%, rgba(10,10,10,0) 100%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-2xl flex flex-col gap-6 md:gap-7"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* 見出しフォント（Bebas Neue）は大文字しか持たず "AscenDed" の大小が潰れるので、本文フォントで出す。
            h2 にすると globals.css の見出し指定（Bebas Neue）が勝つため p にしている */}
        <motion.p
          className="font-body font-semibold text-brand-white text-[1.6rem] md:text-[2.2rem] tracking-[0.06em]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.75)" }}
          variants={rise}
        >
          {ABOUT_TITLE}
        </motion.p>

        <motion.span
          aria-hidden="true"
          className="block w-16 h-px bg-brand-red origin-left -mt-2"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
          }}
        />

        {/* スマホで読む前提で組む。
            - 行間は 1.9（2 を超えると行どうしが離れて、段落の切れ目と見分けにくくなる）
            - 段落の間は行間より大きく空けて、1段落＝1つの文のまとまりに見せる
            - 改行は句の切れ目（<wbr>）だけ。keep-all で句の途中では折らず、
              句そのものが画面幅より長いときだけ anywhere で折り返す */}
        <motion.div className="flex flex-col gap-7 md:gap-8" variants={stagger}>
          {ABOUT_TEXT.map((phrases) => (
            <motion.p
              key={phrases.join("")}
              className="font-body font-light text-brand-cream/90 tracking-[0.04em]
                         text-[0.94rem] leading-[1.9] md:text-[1.05rem] md:leading-[2.1]
                         [word-break:keep-all] [overflow-wrap:anywhere]"
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
              variants={rise}
            >
              {phrases.map((phrase, i) => (
                <Fragment key={phrase}>
                  {i > 0 && <wbr />}
                  {phrase}
                </Fragment>
              ))}
            </motion.p>
          ))}
        </motion.div>

        <motion.div className="pt-6" variants={rise}>
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
        </motion.div>
      </motion.div>
    </div>
  );
}
