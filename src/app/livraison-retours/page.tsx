import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { Pending } from "@/components/ui/Pending";
import { shipping } from "@/config/site";

export const metadata: Metadata = {
  title: "Livraison et retours",
  description: "Livraison en France, délais, frais et conditions de retour des commandes CHEBKA.",
  alternates: { canonical: "/livraison-retours" },
};

export default function ShippingPage() {
  return (
    <LegalPage eyebrow="Aide" title="Livraison et retours" intro="Commande, expédition, rétractation : les informations pratiques.">
      <h2>Zone de livraison</h2>
      <p>Nous livrons en {shipping.zones}.</p>

      <h2>Transporteurs et délais</h2>
      <ul>
        <li>
          Transporteurs : <Pending value={shipping.carriers} />
        </li>
        <li>
          Délais de préparation et de livraison : <Pending value={shipping.delays} />
        </li>
      </ul>

      <h2>Frais de livraison</h2>
      <p>
        <Pending value={shipping.rates} /> Les frais de livraison sont dans tous les cas affichés avant la validation
        du paiement.
      </p>

      <h2>Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L221-18 du Code de la consommation, vous disposez d&apos;un délai de{" "}
        {shipping.returnDays} jours à compter de la réception de votre commande pour exercer votre droit de
        rétractation, sans avoir à justifier de motif. Pour des raisons d&apos;hygiène, les produits doivent être
        retournés neufs, non utilisés et dans leur emballage d&apos;origine.
      </p>
      <p>
        Pour exercer ce droit, contactez-nous via la <Link href="/contact">page contact</Link> en précisant votre numéro
        de commande. Les frais de retour : <Pending value={null} />. Le remboursement intervient au plus tard dans les 14
        jours suivant la réception de votre demande, sous réserve de la réception des produits ou de la preuve de leur
        expédition.
      </p>

      <h2>Produit endommagé ou non conforme</h2>
      <p>
        Si votre colis arrive endommagé ou si un produit ne correspond pas à votre commande, contactez-nous dans les
        meilleurs délais avec une photo. Vous bénéficiez de la garantie légale de conformité (articles L217-3 et suivants
        du Code de la consommation).
      </p>
    </LegalPage>
  );
}
