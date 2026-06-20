import type { Metadata } from "next";
import HorizontalGallery, { type GalleryItem } from "@/components/sections/HorizontalGallery";

export const metadata: Metadata = {
  title: "LOOKBOOK",
  description: "ASCENDED336 ルックブック。コーディネートギャラリー。",
};

const LOOKS: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `LOOK ${String(i + 1).padStart(2, "0")}`,
}));

export default function LookbookPage() {
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
            LOOKBOOK
          </h1>
        </div>
      </div>

      {/* Season label */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-2 flex items-center gap-4">
        <div className="h-px flex-1 bg-brand-gray" />
        <span className="font-heading text-xs tracking-[0.4em] text-brand-gray-light">
          AW 2024 COLLECTION
        </span>
        <div className="h-px flex-1 bg-brand-gray" />
      </div>

      {/* 水平スクロールギャラリー（縦スクロール連動で横移動） */}
      <HorizontalGallery items={LOOKS} />
    </div>
  );
}
