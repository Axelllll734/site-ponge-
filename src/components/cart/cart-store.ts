"use client";

import { useSyncExternalStore } from "react";
import { getVariant } from "@/lib/catalog";

/**
 * Panier côté navigateur (localStorage). Le panier est strictement
 * nécessaire au fonctionnement de la boutique : il ne requiert pas de
 * consentement cookies. Au paiement, il est transmis à Shopify.
 */

export type CartLine = { variantId: string; quantity: number };
export type CartState = { lines: CartLine[]; lastAdded: { variantId: string; quantity: number; at: number } | null };

const KEY = "chebka-cart-v1";
const MAX_QTY = 99;
const EMPTY: CartState = { lines: [], lastAdded: null };

let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const lines = (JSON.parse(raw) as CartLine[]).filter(
        (l) => getVariant(l.variantId) && Number.isInteger(l.quantity) && l.quantity > 0,
      );
      state = { lines, lastAdded: null };
    }
  } catch {
    /* stockage indisponible : panier en mémoire seulement */
  }
}

function commit(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next.lines));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    state = EMPTY;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

const clamp = (n: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(n)));

export const cart = {
  add(variantId: string, quantity = 1) {
    if (!getVariant(variantId) || quantity < 1) return;
    const existing = state.lines.find((l) => l.variantId === variantId);
    const lines = existing
      ? state.lines.map((l) => (l.variantId === variantId ? { ...l, quantity: clamp(l.quantity + quantity) } : l))
      : [...state.lines, { variantId, quantity: clamp(quantity) }];
    commit({ lines, lastAdded: { variantId, quantity, at: Date.now() } });
  },
  setQuantity(variantId: string, quantity: number) {
    const q = clamp(quantity);
    const lines =
      q === 0
        ? state.lines.filter((l) => l.variantId !== variantId)
        : state.lines.map((l) => (l.variantId === variantId ? { ...l, quantity: q } : l));
    commit({ ...state, lines });
  },
  remove(variantId: string) {
    commit({ ...state, lines: state.lines.filter((l) => l.variantId !== variantId) });
  },
  clear() {
    commit(EMPTY);
  },
  dismissToast() {
    if (state.lastAdded) {
      state = { ...state, lastAdded: null };
      listeners.forEach((l) => l());
    }
  },
};

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const detailed = snapshot.lines
    .map((line) => {
      const variant = getVariant(line.variantId);
      return variant ? { ...line, variant, totalCents: variant.priceCents * line.quantity } : null;
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  return {
    lines: detailed,
    lastAdded: snapshot.lastAdded,
    itemCount: detailed.reduce((n, l) => n + l.quantity, 0),
    spongeCount: detailed.reduce((n, l) => n + l.quantity * l.variant.units, 0),
    subtotalCents: detailed.reduce((n, l) => n + l.totalCents, 0),
  };
}
