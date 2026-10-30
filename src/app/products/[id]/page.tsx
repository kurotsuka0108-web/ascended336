import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts } from "@/lib/base";
import ProductDetail from "@/components/product/ProductDetail";
import FeaturedProducts from "@/components/sections/FeaturedProducts";

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
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ color?: string | string[] }>;
}) {
  const { id } = await params;
  const { color } = await searchParams;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product);

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

        <ProductDetail
          product={product}
          initialColorId={typeof color === "string" ? color : undefined}
        />
      </div>

      {/* おすすめ。見出し・グリッド・スクロール演出はトップと同じ FeaturedProducts を再利用する。
          自前の max-w / px を持つので、上の内側コンテナの外に置くこと（余白が二重になる） */}
      {related.length > 0 && (
        <div className="border-t border-brand-gray-mid">
          <FeaturedProducts title="YOU MAY ALSO LIKE" products={related} />
        </div>
      )}
    </div>
  );
}
