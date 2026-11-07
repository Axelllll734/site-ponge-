import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { Pending } from "@/components/ui/Pending";
import { company } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="RGPD" title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>
      <p>
        <Pending value={company.legalName} /> — <Pending value={company.address} /> — <Pending value={company.email} />
      </p>

      <h2>Données collectées et finalités</h2>
      <ul>
        <li>
          <strong>Formulaire de contact</strong> : nom, e-mail, message — pour répondre à votre demande (base légale :
          intérêt légitime / mesures précontractuelles).
        </li>
        <li>
          <strong>Formulaire professionnel</strong> : nom, prénom, société, fonction, e-mail, téléphone, message — pour
          vous adresser une présentation commerciale (base légale : intérêt légitime).
        </li>
        <li>
          <strong>Commandes</strong> : identité, adresses, e-mail, téléphone, historique de commande — pour exécuter le
          contrat de vente et respecter nos obligations comptables (base légale : exécution du contrat, obligation
          légale). Les données de paiement sont traitées exclusivement par notre prestataire de paiement.
        </li>
        <li>
          <strong>Panier</strong> : le contenu de votre panier est conservé dans votre navigateur (stockage local) ; il
          n&apos;est pas transmis tant que vous ne passez pas commande.
        </li>
      </ul>

      <h2>Durées de conservation</h2>
      <p>
        Demandes de contact : 3 ans à compter du dernier échange. Données de commande : durée de la relation
        commerciale, puis archivage pendant les durées légales (10 ans pour les pièces comptables).
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Hébergeur du site, plateforme e-commerce et de paiement, service d&apos;envoi d&apos;e-mails, transporteurs.
        Liste détaillée et localisation des données : <Pending value={null} />.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
        et de portabilité de vos données. Pour les exercer : <Pending value={company.email} />. Vous pouvez également
        introduire une réclamation auprès de la CNIL (www.cnil.fr).
      </p>

      <h2>Cookies</h2>
      <p>
        Voir notre <Link href="/cookies">politique de gestion des cookies</Link>.
      </p>
    </LegalPage>
  );
}
