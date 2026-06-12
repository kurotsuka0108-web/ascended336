import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/products", label: "SHOP" },
  { href: "/lookbook", label: "LOOKBOOK" },
  { href: "/story", label: "STORY" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-gray" aria-label="フッター">

      {/* ── Main row ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between gap-10">

        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="ASCENDED336 - ホームへ" className="hover:opacity-75 transition-opacity duration-200 inline-block">
            <Image
              src="/logo-mark.png"
              alt="AscenDed336"
              width={120}
              height={120}
              className="h-14 w-auto object-contain"
            />
          </Link>
          <p className="font-body text-xs text-brand-gray-light leading-relaxed max-w-[22ch]">
            British punk fashion.<br />
            Refined chaos, elevated rebellion.
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="フッターナビゲーション" className="flex flex-col gap-3">
          <span className="font-heading text-[10px] tracking-[0.4em] text-brand-gray-light mb-1">
            MENU
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm tracking-[0.25em] text-brand-white/60
                         hover:text-brand-white transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red w-fit"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Purchase + SNS */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-heading text-[10px] tracking-[0.4em] text-brand-gray-light">
              PURCHASE
            </span>
            <a
              href="https://base.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm tracking-[0.25em] text-brand-red
                         hover:text-brand-white transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red w-fit"
            >
              BASE STORE →
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-heading text-[10px] tracking-[0.4em] text-brand-gray-light">
              FOLLOW
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="font-heading text-sm tracking-[0.25em] text-brand-white/60
                         hover:text-brand-white transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red w-fit"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-[11px] text-brand-gray-light">
            © {new Date().getFullYear()} ASCENDED336. All rights reserved.
          </p>
          <p className="font-body text-[11px] text-brand-gray-light">
            Powered by{" "}
            <a
              href="https://thebase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-white transition-colors duration-200 underline underline-offset-2"
            >
              BASE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
