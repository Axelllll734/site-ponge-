import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CartToast } from "@/components/cart/CartToast";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "CHEBKA — L'éponge en filet de pêche qui sèche vite",
    template: "%s · CHEBKA",
  },
  description: site.description,
  applicationName: "CHEBKA",
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: "CHEBKA",
    title: "CHEBKA — L'éponge en filet de pêche qui sèche vite",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartToast />
        <CookieBanner />
      </body>
    </html>
  );
}
