"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import { shipping } from "@/config/site";
import { cart, useCart } from "./cart-store";
import { QuantityInput } from "./AddToCart";
import { NetIllustration } from "@/components/brand/NetIllustration";
import { IconArrow, IconLock } from "@/components/ui/Icons";

export function OrderSummary({ cta }: { cta?: React.ReactNode }) {
  const { subtotalCents, spongeCount } = useCart();
  return (
    <aside className="rounded-3xl bg-creme p-6 md:p-8" aria-label="Récapitulatif">
      <h2 className="font-serif text-2xl">Récapitulatif</h2>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt>Éponges</dt>
          <dd className="tabular-nums">{spongeCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Sous-total TTC</dt>
          <dd className="tabular-nums">{formatPrice(subtotalCents)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Livraison ({shipping.zones})</dt>
          <dd className="text-right text-nuit-doux">Calculée à l&apos;étape du paiement</dd>
        </div>
        <div className="flex justify-between border-t border-nuit/15 pt-4 text-base font-semibold">
          <dt>Total TTC (hors livraison)</dt>
          <dd className="tabular-nums">{formatPrice(subtotalCents)}</dd>
        </div>
      </dl>
      {cta ? <div className="mt-6">{cta}</div> : null}
      <p className="mt-4 flex items-center gap-2 text-xs text-nuit-doux">
        <IconLock className="h-4 w-4" /> Paiement sécurisé opéré par notre prestataire de paiement.
      </p>
    </aside>
  );
}

export function CartView() {
  const { lines } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto mb-8 aspect-[4/3] w-56 overflow-hidden rounded-3xl">
          <NetIllustration scene="hero" className="h-full w-full" />
        </div>
        <h2 className="font-serif text-3xl">Votre panier est vide</h2>
        <p className="mt-3 text-nuit-doux">Découvrez l&apos;éponge en filet qui sèche vite.</p>
        <Link href="/produit" className="btn btn-primary mt-8">
          Découvrir CHEBKA <IconArrow />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-trait border-y border-trait">
        {lines.map((line) => (
          <li key={line.variantId} className="flex gap-4 py-6 sm:gap-6">
            <div className="aspect-square w-24 shrink-0 overflow-hidden rounded-2xl sm:w-28">
              <NetIllustration scene="packaging" className="h-full w-full" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-serif text-lg">CHEBKA — Éponge filet</p>
                <p className="text-sm text-nuit-doux">
                  {line.variant.label} · {formatPrice(line.variant.priceCents)}
                </p>
                <button
                  type="button"
                  onClick={() => cart.remove(line.variantId)}
                  className="mt-2 text-sm text-nuit-doux underline underline-offset-4 hover:text-rouge"
                >
                  Supprimer
                </button>
              </div>
              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <QuantityInput
                  size="sm"
                  value={line.quantity}
                  onChange={(n) => cart.setQuantity(line.variantId, n)}
                  label={`Quantité — ${line.variant.label}`}
                />
                <p className="w-20 text-right font-semibold tabular-nums">{formatPrice(line.totalCents)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <OrderSummary
          cta={
            <Link href="/commande" className="btn btn-primary w-full">
              Passer commande <IconArrow />
            </Link>
          }
        />
        <Link href="/produit" className="mt-4 block text-center text-sm underline underline-offset-4">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
