import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

type ProductCardProps = Pick<
  Product,
  "id" | "name" | "price" | "category" | "images" | "inStock"
>;

export default function ProductCard({
  id,
  name,
  price,
  category,
  images,
  inStock,
}: ProductCardProps) {
  const mainImage = images[0];

  return (
    <Link
      href={`/products/${id}`}
      className="group flex flex-col gap-3
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      aria-label={`${name} - ¥${price.toLocaleString()}`}
    >
      {/* Image area */}
      <div
        className="aspect-[3/4] overflow-hidden relative
                   group-hover:opacity-90 transition-opacity duration-300"
        style={{ backgroundColor: "#2a2a2a" }}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          /* 画像未登録時のプレースホルダー（BASE登録後に自動で画像表示） */
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-[10px] tracking-[0.3em] text-brand-gray-light">
              {category}
            </span>
          </div>
        )}

        {/* Sold out overlay */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-black/60">
            <span className="font-heading text-xs tracking-[0.3em] text-brand-white border border-brand-white px-3 py-1">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20
                     transition-colors duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="font-heading text-sm md:text-base tracking-[0.15em] text-brand-white
                      group-hover:text-brand-red transition-colors duration-200 leading-tight">
          {name}
        </p>
        <p className="font-body text-xs text-brand-gray-light">
          ¥{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
