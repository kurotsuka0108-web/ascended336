import Hero from "@/components/sections/Hero";
import CategoryBanner from "@/components/sections/CategoryBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HorizontalGallery, { type GalleryItem } from "@/components/sections/HorizontalGallery";
import { getProducts } from "@/lib/base";

const LOOKBOOK_TEASER: GalleryItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  label: `LOOK ${String(i + 1).padStart(2, "0")}`,
}));

export default async function Home() {
  const products = await getProducts();

  // 注目商品（モック/実データの先頭から抽出）
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <>
      <Hero />
      <CategoryBanner />
      <FeaturedProducts title="NEW ARRIVALS" products={newArrivals} />
      <div className="h-px bg-brand-gray mx-6 md:mx-12" />
      <FeaturedProducts title="BEST SELLERS" products={bestSellers} />

      {/* LOOKBOOK 誘導（水平スクロール） */}
      <HorizontalGallery
        items={LOOKBOOK_TEASER}
        heading="LOOKBOOK"
        subheading="荒削りと品格が交差する、AW2024 コレクション。スクロールで世界観を覗く。"
        ctaHref="/lookbook"
        ctaLabel="VIEW LOOKBOOK"
      />
    </>
  );
}
