import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OUR STORY",
  description: "ASCENDED336 のブランドストーリー。ブリティッシュパンクの精神を現代へ。",
};

const CHAPTERS = [
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

      {/* Hero image placeholder */}
      <div className="w-full h-[50vh] flex items-center justify-center border-y border-brand-gray-mid" style={{ backgroundColor: "#2a2a2a" }}>
        <span className="font-heading text-xs tracking-[0.3em] text-brand-gray-light">
          STORY IMAGE
        </span>
      </div>

      {/* Chapters */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 flex flex-col gap-16">
        {CHAPTERS.map((ch) => (
          <div key={ch.num} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-heading text-brand-red text-sm tracking-[0.3em]">
                {ch.num}
              </span>
              <div className="h-px flex-1 bg-brand-gray" />
            </div>
            <h2
              className="font-heading text-brand-white leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {ch.title}
            </h2>
            <p className="font-body text-brand-gray-light leading-relaxed text-sm md:text-base">
              {ch.body}
            </p>
          </div>
        ))}

        {/* CTA */}
        <div className="flex items-center gap-6 pt-4">
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
        </div>
      </div>
    </div>
  );
}
