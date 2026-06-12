import type { Metadata } from "next";
import { Bebas_Neue, Inter, Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dracutaz = localFont({
  src: "./fonts/Dracutaz.ttf",
  variable: "--font-dracutaz",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASCENDED336",
    template: "%s | ASCENDED336",
  },
  description: "British punk fashion brand. Refined chaos, elevated rebellion.",
  openGraph: {
    title: "ASCENDED336",
    description: "British punk fashion brand. Refined chaos, elevated rebellion.",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${dracutaz.variable} ${bebasNeue.variable} ${inter.variable} ${notoSansJP.variable}`}
    >
      <body className="bg-brand-black text-brand-white font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
