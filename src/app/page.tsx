import Hero from "@/components/sections/Hero";
import CategoryBanner from "@/components/sections/CategoryBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import { getProducts } from "@/lib/base";

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
    </>
  );
}
