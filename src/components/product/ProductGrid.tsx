"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="font-heading text-2xl tracking-[0.2em] text-brand-gray-light">
          NO PRODUCTS
        </p>
        <p className="font-body text-sm text-brand-gray-light">
          現在商品はありません。
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={fadeInUp}>
          <ProductCard {...product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
