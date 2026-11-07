import type { Metadata } from "next";
import { Checkout } from "@/components/cart/Checkout";

export const metadata: Metadata = {
  title: "Commande",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="container-chebka py-12 md:py-16">
      <h1 className="mb-8 text-4xl md:text-5xl">Commande</h1>
      <Checkout />
    </section>
  );
}
