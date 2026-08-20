import type { Metadata } from "next";
import StoryHero from "@/components/sections/StoryHero";
import StoryChapters from "@/components/sections/StoryChapters";

export const metadata: Metadata = {
  title: "OUR STORY",
  description:
    "ASCENDED336 のブランドストーリー。一輪のセリの花言葉「貧相だけど高潔」から生まれたブランドの信条。",
};

export default function StoryPage() {
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
            OUR STORY
          </h1>
        </div>
      </div>

      {/* ブランドの一行 */}
      <StoryHero />

      {/* 本編 */}
      <StoryChapters />
    </div>
  );
}
