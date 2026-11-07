"use client";

import Link from "next/link";
import { useEffect } from "react";
import { formatPrice, getVariant } from "@/lib/catalog";
import { cart, useCart } from "./cart-store";
import { IconCheck, IconClose } from "@/components/ui/Icons";

/** Micro-interaction : confirmation discrète après un ajout au panier. */
export function CartToast() {
  const { lastAdded, itemCount } = useCart();

  useEffect(() => {
    if (!lastAdded) return;
    const t = window.setTimeout(() => cart.dismissToast(), 4500);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  if (!lastAdded) return null;
  const variant = getVariant(lastAdded.variantId);
  if (!variant) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 sm:bottom-6 sm:justify-end sm:px-6">
      <div
        key={lastAdded.at}
        role="status"
        className="animate-toast pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-2xl bg-nuit p-4 text-blanc shadow-2xl"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rouge">
          <IconCheck />
        </span>
        <div className="min-w-0 flex-1 text-sm">
          <p className="font-semibold">Ajouté au panier</p>
          <p className="text-blanc/75">
            {lastAdded.quantity} × {variant.label} · {formatPrice(variant.priceCents * lastAdded.quantity)}
          </p>
          <Link href="/panier" className="mt-1 inline-block font-semibold underline underline-offset-4" onClick={() => cart.dismissToast()}>
            Voir le panier ({itemCount})
          </Link>
        </div>
        <button type="button" onClick={() => cart.dismissToast()} aria-label="Fermer" className="self-start text-blanc/70 hover:text-blanc">
          <IconClose />
        </button>
      </div>
    </div>
  );
}
