"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const LOGOS_PER_SET = 10; // 1セットで広い画面（〜2000px）の幅を埋められる数
const SETS = 2; // 同じセットを2つ並べ、1セット分（-50%）動かしてループ＝継ぎ目なし

/**
 * 常時流れるロゴのマーキー（スクロール非依存の無限ループ）。
 * ヘッダーと同じロゴ（星＋AscenDed336）を等間隔に並べて横に流す。
 * logo-mark.png は周りの透明な余白が大きく帯が間延びするため、余白を切り落とした logo-mark-trim.png（850×561）を使う。
 * 間隔は gap ではなく各ロゴの右余白で取る。gap だとセットの継ぎ目だけ幅がずれ、ループ時に跳ねるため。
 * reduced-motion 時は静止。装飾要素なので aria-hidden。
 */
export default function Marquee() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-brand-gray bg-brand-black py-7 md:py-10"
    >
      <motion.div
        className="flex w-max will-change-transform"
        animate={reduce ? undefined : { x: ["0%", `-${100 / SETS}%`] }}
        transition={
          reduce ? undefined : { duration: 30, ease: "linear", repeat: Infinity }
        }
      >
        {Array.from({ length: SETS * LOGOS_PER_SET }).map((_, i) => (
          <div key={i} className="shrink-0 pr-14 md:pr-24">
            <Image
              src="/logo-mark-trim.png"
              alt=""
              width={850}
              height={561}
              sizes="(min-width: 768px) 122px, 85px"
              className="h-14 md:h-20 w-auto opacity-80 select-none"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
