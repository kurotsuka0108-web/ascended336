import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/base";
import ProductGallery from "@/components/product/ProductGallery";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "商品が見つかりません" };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 120),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 120),
      images: product.images.length > 0 ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Breadcrumb */}
        <nav aria-label="パンくず" className="flex items-center gap-2 mb-10">
          <Link
            href="/products"
            className="font-heading text-[11px] tracking-[0.3em] text-brand-gray-light
                       hover:text-brand-white transition-colors duration-200"
          >
            SHOP
          </Link>
          <span className="text-brand-gray-light text-xs">/</span>
          <span className="font-heading text-[11px] tracking-[0.3em] text-brand-white">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Image gallery */}
          <ProductGallery
            images={product.images}
            name={product.name}
            category={product.category}
          />

          {/* Info area */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-heading text-[11px] tracking-[0.4em] text-brand-red mb-2">
                ASCENDED336
              </p>
              <h1 className="font-display text-brand-white leading-tight mb-3"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                {product.name}
              </h1>
              <p className="font-body text-xl text-brand-white">
                ¥{product.price.toLocaleString()}
              </p>
            </div>

            <p className="font-body text-sm text-brand-gray-light leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {/* Size selector */}
            {product.variations.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-heading text-[11px] tracking-[0.3em] text-brand-gray-light">
                  SIZE
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((v) => {
                    const soldOut = v.stock <= 0;
                    return (
                      <button
                        key={v.id}
                        disabled={soldOut}
                        className={`min-w-12 h-12 px-3 border font-heading text-xs
                                   transition-colors duration-200
                                   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red
                                   ${
                                     soldOut
                                       ? "border-brand-gray text-brand-gray-light/40 line-through cursor-not-allowed"
                                       : "border-brand-gray text-brand-gray-light hover:border-brand-white hover:text-brand-white"
                                   }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BASE purchase button */}
            {product.inStock ? (
              <a
                href="https://base.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm tracking-[0.35em] px-8 py-4 text-center
                           bg-brand-red text-brand-cream border-2 border-brand-red
                           shadow-[3px_3px_0_rgba(0,0,0,0.55)]
                           hover:bg-transparent hover:text-brand-red
                           transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
              >
                BASE で購入する →
              </a>
            ) : (
              <span
                className="font-heading text-sm tracking-[0.35em] px-8 py-4 text-center
                           border-2 border-brand-gray text-brand-gray-light cursor-not-allowed"
              >
                SOLD OUT
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
