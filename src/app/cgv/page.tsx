import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { Pending } from "@/components/ui/Pending";
import { company, shipping } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  alternates: { canonical: "/cgv" },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Informations légales" title="Conditions générales de vente">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent les ventes en ligne de produits CHEBKA à des consommateurs résidant en France,
        conclues par <Pending value={company.legalName} /> (ci-après « le Vendeur ») via le présent site.
      </p>

      <h2>2. Produits</h2>
      <p>
        Les caractéristiques essentielles des produits sont présentées sur la <Link href="/produit">fiche produit</Link>.
        Les photographies et illustrations sont aussi fidèles que possible mais n&apos;ont pas de valeur contractuelle.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison. Les frais de livraison
        sont indiqués avant la validation de la commande. Le Vendeur se réserve le droit de modifier ses prix à tout
        moment ; les produits sont facturés au prix en vigueur lors de la validation de la commande.
      </p>

      <h2>4. Commande</h2>
      <p>
        Le client sélectionne les produits, vérifie le contenu de son panier, accepte les présentes conditions puis
        procède au paiement. La commande est définitive après confirmation du paiement ; un e-mail de confirmation est
        adressé au client.
      </p>

      <h2>5. Paiement</h2>
      <p>
        Le paiement s&apos;effectue en ligne par l&apos;intermédiaire d&apos;un prestataire de paiement sécurisé. Moyens de
        paiement acceptés : <Pending value={null} />. Le Vendeur n&apos;a jamais accès aux coordonnées bancaires du client.
      </p>

      <h2>6. Livraison</h2>
      <p>
        Les produits sont livrés en {shipping.zones}, à l&apos;adresse indiquée lors de la commande. Délais :{" "}
        <Pending value={shipping.delays} />. Voir la page <Link href="/livraison-retours">Livraison et retours</Link>.
      </p>

      <h2>7. Droit de rétractation</h2>
      <p>
        Le client dispose d&apos;un délai de {shipping.returnDays} jours à compter de la réception des produits pour
        exercer son droit de rétractation (art. L221-18 du Code de la consommation). Le droit de rétractation ne peut
        être exercé pour les biens descellés après livraison qui ne peuvent être renvoyés pour des raisons d&apos;hygiène
        (art. L221-28). Modalités et frais de retour : <Pending value={null} />.
      </p>

      <h2>8. Garanties légales</h2>
      <p>
        Les produits bénéficient de la garantie légale de conformité (art. L217-3 et suivants du Code de la
        consommation) et de la garantie des vices cachés (art. 1641 et suivants du Code civil).
      </p>

      <h2>9. Médiation</h2>
      <p>
        En cas de litige, le client peut recourir gratuitement au médiateur de la consommation suivant :{" "}
        <Pending value={company.mediator} />. Le client peut également utiliser la plateforme européenne de règlement
        en ligne des litiges.
      </p>

      <h2>10. Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit français.</p>
    </LegalPage>
  );
}
