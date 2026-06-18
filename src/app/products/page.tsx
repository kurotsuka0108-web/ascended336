import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/base";

export const metadata: Metadata = {
  title: "SHOP",
  description: "ASCENDED336 の全商品一覧。ブリティッシュパンクファッション。",
};

const CATEGORIES = ["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "ACCESSORIES"] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = (category ?? "ALL").toUpperCase();
  const products = await getProducts(category);

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Page header */}
      <div className="border-b border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <p className="font-heading text-[11px] tracking-[0.5em] text-brand-red mb-3">
            ASCENDED336
          </p>
          <h1 className="font-display text-brand-white leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            SHOP
          </h1>
          <p className="font-heading text-[11px] tracking-[0.3em] text-brand-gray-light mt-4">
            {active === "ALL" ? "ALL ITEMS" : active} — {products.length} ITEMS
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-b border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center gap-6 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const href = cat === "ALL" ? "/products" : `/products?category=${cat.toLowerCase()}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`font-heading text-xs tracking-[0.3em] whitespace-nowrap
                           transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red
                           ${isActive ? "text-brand-red" : "text-brand-gray-light hover:text-brand-white"}`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
