"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  title: string;
  viewAllHref?: string;
  products: Product[];
}

const viewport = { once: true, margin: "-80px" } as const;

export default function FeaturedProducts({
  title,
  viewAllHref = "/products",
  products,
}: FeaturedProductsProps) {
  const sectionId = `section-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className="py-16 md:py-20" aria-labelledby={sectionId}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="w-1 h-6 bg-brand-red" />
            <h2
              id={sectionId}
              className="font-heading text-brand-white tracking-[0.2em]"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="font-heading text-xs tracking-[0.3em] text-brand-gray-light
                       hover:text-brand-white transition-colors duration-200
                       flex items-center gap-2 group
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
          >
            VIEW ALL
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Grid — stagger fade-up on scroll */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
