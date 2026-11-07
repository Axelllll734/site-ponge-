import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { Pending } from "@/components/ui/Pending";
import { company, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalNoticePage() {
  return (
    <LegalPage eyebrow="Informations légales" title="Mentions légales">
      <h2>Éditeur du site</h2>
      <ul>
        <li>
          Raison sociale : <Pending value={company.legalName} />
        </li>
        <li>
          Forme juridique et capital : <Pending value={company.legalForm && company.capital ? `${company.legalForm} au capital de ${company.capital}` : null} />
        </li>
        <li>
          Siège social : <Pending value={company.address} />
        </li>
        <li>
          SIREN / RCS : <Pending value={company.siren && company.rcs ? `${company.siren} — ${company.rcs}` : null} />
        </li>
        <li>
          N° de TVA intracommunautaire : <Pending value={company.vatNumber} />
        </li>
        <li>
          Contact : <Pending value={company.email} /> · <Pending value={company.phone} />
        </li>
        <li>
          Directeur de la publication : <Pending value={company.publicationDirector} />
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>{company.host}</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        La marque CHEBKA, le logo, les textes, illustrations et éléments graphiques du site {site.url.replace(/^https?:\/\//, "")}{" "}
        sont la propriété de l&apos;éditeur. Toute reproduction sans autorisation préalable est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles est décrit dans notre <a href="/confidentialite">politique de confidentialité</a>.
      </p>
    </LegalPage>
  );
}
