import Link from "next/link";

const CATEGORIES = [
  { label: "TOPS",        href: "/products?category=tops" },
  { label: "BOTTOMS",     href: "/products?category=bottoms" },
  { label: "OUTERWEAR",   href: "/products?category=outerwear" },
  { label: "ACCESSORIES", href: "/products?category=accessories" },
];

export default function CategoryBanner() {
  return (
    <section className="border-y border-brand-gray" aria-label="カテゴリー一覧">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-gray">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col items-center justify-center py-10 gap-3
                         hover:bg-brand-gray transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-brand-red"
            >
              {/* Placeholder image area */}
              <div
                className="w-full max-w-[120px] aspect-square flex items-center justify-center"
                style={{ backgroundColor: "#2a2a2a" }}
              >
                <span className="font-heading text-[9px] tracking-[0.2em] text-brand-gray-light">
                  IMAGE
                </span>
              </div>
              <span
                className="font-heading tracking-[0.3em] text-brand-white/70
                           group-hover:text-brand-white transition-colors duration-200"
                style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)" }}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
