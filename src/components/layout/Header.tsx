"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/cart-store";
import { IconBag, IconClose, IconMenu } from "@/components/ui/Icons";

function CartLink({ onClick }: { onClick?: () => void }) {
  const { itemCount, lastAdded } = useCart();
  return (
    <Link
      href="/panier"
      onClick={onClick}
      className="relative inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold transition hover:bg-creme"
      aria-label={`Panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`}
    >
      <IconBag className="h-6 w-6" />
      <span className="hidden lg:inline">Panier</span>
      {itemCount > 0 && (
        <span
          key={lastAdded?.at ?? 0}
          className="animate-bump absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rouge px-1 text-[0.68rem] font-bold text-blanc lg:static"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-blanc/92 shadow-[0_1px_0_0_#E4DCCF] backdrop-blur-md" : "bg-blanc/0"
      }`}
    >
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-nuit focus:px-4 focus:py-2 focus:text-blanc">
        Aller au contenu
      </a>
      <div className="container-chebka flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="CHEBKA — accueil" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition hover:text-rouge ${
                    isActive(item.href) ? "text-rouge" : "text-nuit"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/produit" className="btn btn-primary hidden !px-5 !py-2.5 text-sm xl:inline-flex">
            Acheter · 4 €
          </Link>
          <CartLink />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-creme lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 bg-blanc transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Navigation mobile" className="container-chebka flex h-full flex-col pb-8 pt-6">
          <ul className="space-y-1">
            {mainNav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-trait py-4 font-serif text-[1.9rem] leading-tight ${
                    isActive(item.href) ? "text-rouge" : "text-nuit"
                  }`}
                >
                  {item.label}
                  <span className="text-base text-nuit-doux" aria-hidden="true">
                    0{i + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pt-8">
            <Link href="/produit" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Acheter CHEBKA · 4 € TTC
            </Link>
            <Link href="/panier" onClick={() => setOpen(false)} className="btn btn-secondary w-full">
              Voir le panier
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
