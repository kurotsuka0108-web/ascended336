"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    href: "/products",
    label: "SHOP",
    children: [
      { href: "/products?category=tops", label: "TOPS" },
      { href: "/products?category=bottoms", label: "BOTTOMS" },
      { href: "/products?category=outerwear", label: "OUTERWEAR" },
      { href: "/products?category=accessories", label: "ACCESSORIES" },
    ],
  },
  { href: "/lookbook", label: "LOOKBOOK" },
  { href: "/story", label: "STORY" },
];

/* ── Cart icon ── */
function CartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-brand-black/95 backdrop-blur-sm border-b border-brand-gray"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-28 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="block hover:opacity-80 transition-opacity duration-200"
            onClick={() => setIsMenuOpen(false)}
            aria-label="ASCENDED336 - ホームへ"
          >
            <Image
              src="/logo-mark.png"
              alt="AscenDed336"
              width={160}
              height={160}
              className="h-16 md:h-24 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12" aria-label="メインナビゲーション">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="font-heading text-base lg:text-lg tracking-[0.2em] text-brand-gray-light
                             hover:text-brand-white transition-colors duration-200 relative group
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-red
                                   transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      className="absolute top-full left-0 mt-3 bg-brand-black border border-brand-gray
                                 min-w-[180px] py-2"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 font-heading text-sm tracking-[0.25em]
                                     text-brand-gray-light hover:text-brand-white hover:bg-brand-gray
                                     transition-colors duration-150
                                     focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart → BASE store */}
            <a
              href="https://base.shop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="カートを開く（BASE）"
              className="text-brand-white/70 hover:text-brand-white transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red p-1"
            >
              <CartIcon />
            </a>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={isMenuOpen}
            >
              <motion.span
                className="block w-6 h-px bg-brand-white origin-center"
                animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-px bg-brand-white origin-center"
                animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-brand-black flex flex-col justify-center
                       items-center gap-8 px-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.href} className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href={link.href}
                  className="font-heading text-5xl tracking-[0.2em] text-brand-white
                             hover:text-brand-red transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {/* Mobile sub-links */}
                {link.children && (
                  <div className="flex gap-5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="font-heading text-xs tracking-[0.25em] text-brand-gray-light
                                   hover:text-brand-white transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Mobile cart link */}
            <motion.a
              href="https://base.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm tracking-[0.3em] text-brand-red mt-4
                         hover:text-brand-white transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              CART →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
