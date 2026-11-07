"use client";

import { useState } from "react";
import { formatPrice, product, UNIT_PRICE_CENTS } from "@/lib/catalog";
import { cart } from "./cart-store";
import { IconCheck, IconMinus, IconPlus } from "@/components/ui/Icons";

export function QuantityInput({
  value,
  onChange,
  label = "Quantité",
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-12";
  return (
    <div className={`inline-flex ${h} items-center rounded-full border border-trait bg-blanc`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-full w-10 items-center justify-center rounded-l-full text-nuit transition hover:bg-creme disabled:opacity-40"
        aria-label="Diminuer la quantité"
        disabled={value <= 1}
      >
        <IconMinus />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={99}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(99, Math.max(1, n)));
        }}
        className="h-full w-10 bg-transparent text-center font-semibold tabular-nums [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={label}
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(99, value + 1))}
        className="flex h-full w-10 items-center justify-center rounded-r-full text-nuit transition hover:bg-creme"
        aria-label="Augmenter la quantité"
      >
        <IconPlus />
      </button>
    </div>
  );
}

/** Sélecteur de lot + quantité + ajout au panier. */
export function AddToCart({ compact = false }: { compact?: boolean }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId)!;

  const onAdd = () => {
    cart.add(variantId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-5">
      {!compact && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Format</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <label
                  key={v.id}
                  className={`cursor-pointer rounded-2xl border px-3 py-3 text-center transition ${
                    active ? "border-nuit bg-nuit text-blanc" : "border-trait bg-blanc hover:border-nuit/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={active}
                    onChange={() => setVariantId(v.id)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-semibold">{v.label}</span>
                  <span className={`block text-xs ${active ? "text-blanc/80" : "text-nuit-doux"}`}>{formatPrice(v.priceCents)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <QuantityInput value={quantity} onChange={setQuantity} />
        <button type="button" onClick={onAdd} className="btn btn-primary h-12 min-w-[13rem] flex-1 sm:flex-none" aria-live="polite">
          {added ? (
            <>
              <IconCheck /> Ajouté au panier
            </>
          ) : (
            <>Ajouter au panier · {formatPrice(variant.priceCents * quantity)}</>
          )}
        </button>
      </div>
      <p className="text-xs text-nuit-doux">
        Prix TTC · soit {formatPrice(UNIT_PRICE_CENTS)} l&apos;éponge · Livraison en France, frais calculés au paiement.
      </p>
    </div>
  );
}
