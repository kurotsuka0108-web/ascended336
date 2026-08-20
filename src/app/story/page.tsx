import type { Metadata } from "next";
import StoryHero from "@/components/sections/StoryHero";
import StoryChapters, { type Chapter } from "@/components/sections/StoryChapters";

export const metadata: Metadata = {
  title: "OUR STORY",
  description: "ASCENDED336 のブランドストーリー。ブリティッシュパンクの精神を現代へ。",
};

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    title: "THE ORIGIN",
    body: "70年代のロンドン。Sex Pistols が轟かせた怒りと解放の音が、街のレンガ壁に刻まれた。あの時代の反骨心が、このブランドの原点。",
  },
  {
    num: "02",
    title: "THE PHILOSOPHY",
    body: "「上品さの中に宿る反骨心」。荒々しさと品格は矛盾しない。ASCENDED336 はその両立を、一着一着に込める。",
  },
  {
    num: "03",
    title: "THE FUTURE",
    body: "パンクは終わらない。形を変え、世代を超え、今もどこかで燃え続けている。あなたの反骨心を、纏え。",
  },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-brand-black">

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

      {/* Hero image placeholder — パララックス */}
      <StoryHero />

      {/* Chapters — スクロール登場 */}
      <StoryChapters chapters={CHAPTERS} />
    </div>
  );
}
