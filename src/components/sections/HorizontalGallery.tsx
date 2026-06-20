"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export interface GalleryItem {
  id: string | number;
  label: string;
}

interface HorizontalGalleryProps {
  items: GalleryItem[];
  /** 先頭に置くイントロパネル（任意） */
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

/** プレースホルダーのLOOKタイル */
function LookTile({ label }: { label: string }) {
  return (
    <div className="shrink-0 w-[78vw] sm:w-[52vw] lg:w-[34vw]">
      <div className="placeholder-surface aspect-[3/4] relative overflow-hidden flex items-end p-5">
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl tracking-[0.1em] text-brand-white/10 select-none">
          A336
        </span>
        <span className="relative font-heading text-xs tracking-[0.35em] text-brand-gray-light">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function HorizontalGallery({
  items,
  heading,
  subheading,
  ctaHref,
  ctaLabel = "VIEW ALL",
}: HorizontalGalleryProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [height, setHeight] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -distanceRef.current * v);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const dist = Math.max(0, track.scrollWidth - window.innerWidth);
    distanceRef.current = dist;
    setHeight(dist + window.innerHeight);
  }, []);

  useEffect(() => {
    if (reduce) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce, measure, items.length]);

  const Intro = heading ? (
    <div className="shrink-0 w-[80vw] sm:w-[44vw] lg:w-[30vw] flex flex-col justify-center pr-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brand-red" />
        <span className="font-heading text-[11px] tracking-[0.4em] text-brand-red">ASCENDED336</span>
      </div>
      <h2
        className="font-display text-brand-white leading-none mb-4"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        {heading}
      </h2>
      {subheading && (
        <p className="font-body text-sm text-brand-gray-light leading-relaxed mb-6 max-w-[34ch]">
          {subheading}
        </p>
      )}
      {ctaHref && (
        <Link
          href={ctaHref}
          className="font-heading text-xs tracking-[0.35em] text-brand-white w-fit
                     flex items-center gap-2 group
                     focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
        >
          {ctaLabel}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  ) : null;

  // reduced-motion：ピン留めせず通常の横スクロールで全件閲覧可能に
  if (reduce) {
    return (
      <section aria-label="ルックギャラリー" className="overflow-x-auto">
        <div className="flex gap-4 md:gap-6 px-6 md:px-12 py-12">
          {Intro}
          {items.map((item) => (
            <LookTile key={item.id} label={item.label} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      aria-label="ルックギャラリー"
      className={`relative ${height == null ? "h-[300vh]" : ""}`}
      style={height != null ? { height } : undefined}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="flex items-center gap-4 md:gap-6 px-6 md:px-12"
        >
          {Intro}
          {items.map((item) => (
            <LookTile key={item.id} label={item.label} />
          ))}
        </motion.div>

        {/* 進捗バー */}
        <motion.div
          aria-hidden
          className="absolute bottom-10 left-6 md:left-12 right-6 md:right-12 h-px bg-brand-gray origin-left"
        >
          <motion.div className="h-full bg-brand-red origin-left" style={{ scaleX: scrollYProgress }} />
        </motion.div>
      </div>
    </section>
  );
}
