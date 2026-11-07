"use client";

import { useEffect } from "react";
import { cart } from "./cart-store";

/** Vide le panier local une fois la commande confirmée par le prestataire. */
export function ClearCartOnMount() {
  useEffect(() => {
    cart.clear();
  }, []);
  return null;
}
