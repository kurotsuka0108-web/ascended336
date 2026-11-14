import Hero from "@/components/sections/Hero";
import CategoryBanner from "@/components/sections/CategoryBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Marquee from "@/components/sections/Marquee";
import HorizontalGallery, { type GalleryItem } from "@/components/sections/HorizontalGallery";
import { getProducts } from "@/lib/base";

const LOOKBOOK_TEASER: GalleryItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  label: `LOOK ${String(i + 1).padStart(2, "0")}`,
}));

export default async function Home() {
  const products = await getProducts();

  // 新着（BASE の商品一覧の先頭から）
  const newArrivals = products.slice(0, 4);

  return (
    <>
      <Hero />
      <CategoryBanner />
      <FeaturedProducts title="NEW ARRIVALS" products={newArrivals} />
      <Marquee />

      {/* LOOKBOOK 誘導（水平スクロール） */}
      <HorizontalGallery
        items={LOOKBOOK_TEASER}
        heading="LOOKBOOK"
        ctaHref="/lookbook"
        ctaLabel="VIEW LOOKBOOK"
      />
    </>
  );
}
