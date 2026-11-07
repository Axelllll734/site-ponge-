import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Panier",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <section className="container-chebka py-12 md:py-16">
      <h1 className="mb-10 text-4xl md:text-5xl">Votre panier</h1>
      <CartView />
    </section>
  );
}
