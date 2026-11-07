import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { CookieSettingsLink } from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  title: "Gestion des cookies",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Cookies" title="Gestion des cookies" draft={false}>
      <h2>Ce que nous utilisons aujourd&apos;hui</h2>
      <ul>
        <li>
          <strong>Panier</strong> (stockage local du navigateur) : conserve les articles de votre panier. Strictement
          nécessaire au fonctionnement de la boutique, il n&apos;est pas soumis à consentement.
        </li>
        <li>
          <strong>Préférences de cookies</strong> (stockage local) : mémorise votre choix pendant 6 mois au plus.
        </li>
      </ul>
      <p>Le site n&apos;utilise actuellement aucun cookie publicitaire ni outil de mesure d&apos;audience.</p>

      <h2>Mesure d&apos;audience</h2>
      <p>
        Si un outil de mesure d&apos;audience est ajouté, il ne sera activé qu&apos;avec votre consentement. Vous pouvez
        accepter ou refuser à tout moment, aussi simplement l&apos;un que l&apos;autre.
      </p>

      <h2>Paiement</h2>
      <p>
        Lors du paiement, vous êtes redirigé vers la page sécurisée de notre prestataire, qui dépose ses propres cookies
        nécessaires à la transaction.
      </p>

      <h2>Modifier vos choix</h2>
      <p>
        <CookieSettingsLink className="btn btn-secondary !no-underline" />
      </p>
    </LegalPage>
  );
}
