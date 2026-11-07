import type { Metadata } from "next";
import Link from "next/link";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";
import { NetIllustration } from "@/components/brand/NetIllustration";
import { IconCheck } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Confirmation de commande",
  robots: { index: false, follow: false },
};

/**
 * Page de retour après paiement. Dans Shopify, renseigner cette URL
 * (https://<domaine>/commande/confirmation) comme lien de retour
 * « Continuer vos achats » / script de la page de remerciement.
 */
export default function ConfirmationPage() {
  return (
    <section className="container-chebka py-16 md:py-24">
      <ClearCartOnMount />
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rouge text-blanc">
          <IconCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl">Merci pour votre commande&nbsp;!</h1>
        <p className="mt-4 text-lg leading-relaxed text-nuit-doux">
          Votre paiement a été traité par notre prestataire sécurisé. Vous allez recevoir un e-mail de confirmation
          récapitulant votre commande et les informations de livraison.
        </p>
        <div className="mx-auto mt-10 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-3xl">
          <NetIllustration scene="packaging" className="h-full w-full" />
        </div>
        <p className="mt-8 font-serif text-xl">En attendant : rincer, essorer, suspendre.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Une question ?
          </Link>
        </div>
      </div>
    </section>
  );
}
