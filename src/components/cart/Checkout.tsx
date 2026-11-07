"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart-store";
import { OrderSummary } from "./CartView";
import { IconArrow, IconLock } from "@/components/ui/Icons";

/**
 * Tunnel d'achat : récapitulatif → acceptation des CGV → redirection vers le
 * checkout sécurisé Shopify (adresse, livraison, paiement).
 * Aucun paiement n'est simulé : sans Shopify configuré, l'utilisateur est
 * clairement informé que la commande en ligne n'est pas encore ouverte.
 */
export function Checkout() {
  const { lines } = useCart();
  const [accepted, setAccepted] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-2xl">Votre panier est vide.</p>
        <Link href="/produit" className="btn btn-primary mt-6">
          Découvrir le produit
        </Link>
      </div>
    );
  }

  const onPay = async () => {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })) }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (res.ok && data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }
      setState("error");
      setMessage(data.error ?? "Une erreur est survenue.");
    } catch {
      setState("error");
      setMessage("Connexion impossible. Vérifiez votre connexion internet et réessayez.");
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Étapes de la commande">
          {["Panier", "Récapitulatif", "Livraison & paiement sécurisé", "Confirmation"].map((step, i) => (
            <li key={step} className={`flex items-center gap-2 ${i === 1 ? "font-semibold text-nuit" : "text-nuit-doux"}`}>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  i < 1 ? "bg-nuit text-blanc" : i === 1 ? "bg-rouge text-blanc" : "border border-trait"
                }`}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <section className="rounded-3xl border border-trait p-6 md:p-8">
          <h2 className="font-serif text-2xl">Votre commande</h2>
          <ul className="mt-4 divide-y divide-trait">
            {lines.map((l) => (
              <li key={l.variantId} className="flex justify-between py-3 text-sm">
                <span>
                  {l.quantity} × CHEBKA — {l.variant.label}
                </span>
                <span className="tabular-nums">{formatPrice(l.totalCents)}</span>
              </li>
            ))}
          </ul>
          <Link href="/panier" className="mt-2 inline-block text-sm underline underline-offset-4">
            Modifier le panier
          </Link>
        </section>

        <section className="rounded-3xl border border-trait p-6 md:p-8">
          <h2 className="font-serif text-2xl">Livraison et paiement</h2>
          <p className="mt-3 text-sm leading-relaxed text-nuit-doux">
            À l&apos;étape suivante, vous saisirez votre adresse de livraison en France, choisirez le mode de livraison et
            réglerez votre commande sur la page de paiement sécurisée de notre prestataire. Les frais de livraison sont
            affichés avant validation.
          </p>
          <label className="mt-6 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[#C83D36]"
            />
            <span>
              J&apos;ai lu et j&apos;accepte les{" "}
              <Link href="/cgv" className="underline underline-offset-4" target="_blank">
                conditions générales de vente
              </Link>{" "}
              et la{" "}
              <Link href="/confidentialite" className="underline underline-offset-4" target="_blank">
                politique de confidentialité
              </Link>
              .
            </span>
          </label>

          {message ? (
            <div role="alert" className="mt-6 rounded-2xl border border-kraft bg-creme p-4 text-sm">
              <p className="font-semibold">Commande en ligne indisponible</p>
              <p className="mt-1 text-nuit-doux">{message}</p>
              <p className="mt-2 text-nuit-doux">
                Votre panier est conservé. Vous pouvez aussi{" "}
                <Link href="/contact" className="underline underline-offset-4">
                  nous contacter
                </Link>
                .
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <OrderSummary
          cta={
            <button type="button" className="btn btn-primary w-full" disabled={!accepted || state === "loading"} onClick={onPay}>
              <IconLock className="h-4 w-4" />
              {state === "loading" ? "Connexion au paiement…" : "Continuer vers le paiement sécurisé"}
              {state !== "loading" && <IconArrow />}
            </button>
          }
        />
      </div>
    </div>
  );
}
