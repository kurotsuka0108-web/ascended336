import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOOKBOOK",
  description: "ASCENDED336 ルックブック。コーディネートギャラリー。",
};

const ITEMS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  aspect: i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-brand-gray" />
        <span className="font-heading text-xs tracking-[0.4em] text-brand-gray-light">
          AW 2024 COLLECTION
        </span>
        <div className="h-px flex-1 bg-brand-gray" />
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className={`break-inside-avoid ${item.aspect} w-full
                          flex items-center justify-center border border-brand-gray-mid
                          hover:opacity-80 transition-opacity duration-300 cursor-pointer`}
              style={{ backgroundColor: "#2a2a2a" }}
            >
              <span className="font-heading text-[10px] tracking-[0.3em] text-brand-gray-light">
                LOOK {String(item.id).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
