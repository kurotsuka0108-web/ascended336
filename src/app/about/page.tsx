import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "ASCENDED336 について。UKパンクの反骨精神と、エモカルチャーの感情表現を融合したオルタナティブファッションブランド。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black overflow-x-clip">

      {/* Page header */}
      <div className="border-b border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <p className="font-heading text-[11px] tracking-[0.5em] text-brand-red mb-3">
            ASCENDED336
          </p>
          <h1
            className="font-display text-brand-white leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            ABOUT
          </h1>
        </div>
      </div>

      {/* 壁の写真の上にブランド紹介文 */}
      <AboutHero />
    </div>
  );
}
