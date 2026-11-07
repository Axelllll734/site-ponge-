/**
 * Configuration centrale du site CHEBKA.
 *
 * Toutes les informations commerciales, juridiques et techniques qui ne sont
 * pas encore confirmées valent `null`. Le site affiche alors automatiquement
 * la mention « à confirmer » au lieu d'inventer une valeur.
 *
 * ➜ Pour mettre le site en production, compléter ce fichier
 *   (voir aussi README.md, section « Éléments à configurer »).
 */

export type Pending<T> = T | null;

export const site = {
  name: "CHEBKA",
  /** URL publique du site — définie par la variable NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "fr_FR",
  baseline: "L'éponge en filet de pêche.",
  signature: "Inspirée par la Méditerranée, pensée pour le quotidien.",
  description:
    "CHEBKA, l'éponge vaisselle en filet de pêche : une structure ajourée qui facilite le rinçage et sèche rapidement. 4 € TTC, livraison en France.",
} as const;

/** Coordonnées de l'entreprise (mentions légales, contact, packaging). */
export const company: {
  legalName: Pending<string>;
  legalForm: Pending<string>;
  capital: Pending<string>;
  siren: Pending<string>;
  rcs: Pending<string>;
  vatNumber: Pending<string>;
  address: Pending<string>;
  email: Pending<string>;
  proEmail: Pending<string>;
  phone: Pending<string>;
  publicationDirector: Pending<string>;
  host: string;
  mediator: Pending<string>;
  instagram: Pending<string>;
  linkedin: Pending<string>;
} = {
  legalName: null,
  legalForm: null,
  capital: null,
  siren: null,
  rcs: null,
  vatNumber: null,
  address: null,
  email: null,
  proEmail: null,
  phone: null,
  publicationDirector: null,
  host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com",
  mediator: null,
  instagram: null,
  linkedin: null,
};

/** Fiche technique produit — valeurs à confirmer par le fournisseur. */
export const productSpecs: {
  composition: Pending<string>;
  compositionDraft: string;
  manufacturingCountry: Pending<string>;
  communicatedOrigin: string;
  dimensions: Pending<string>;
  weight: Pending<string>;
  washTemperature: Pending<string>;
  measuredDryingTime: Pending<string>;
  certifications: string[];
  sortingInfo: Pending<string>;
  ean: Pending<string>;
} = {
  /** Le premier concept de packaging indique « 100 % polyamide » : non confirmé. */
  composition: null,
  compositionDraft: "100 % polyamide (indication du premier concept de packaging, à confirmer)",
  /** Pays réel de fabrication — mention réglementaire, distincte de la provenance communiquée. */
  manufacturingCountry: null,
  communicatedOrigin: "Bassin méditerranéen",
  dimensions: null,
  weight: null,
  washTemperature: null,
  measuredDryingTime: null,
  certifications: [],
  sortingInfo: null,
  ean: null,
};

/**
 * Résultats de tests en laboratoire.
 * Laisser vide tant qu'aucun test indépendant n'a été réalisé.
 * Exemple : { title: "Test de séchage comparatif", lab: "…", date: "2027-01", summary: "…", pdf: "/docs/test.pdf" }
 */
export const labResults: {
  title: string;
  lab: string;
  date: string;
  summary: string;
  pdf?: string;
}[] = [];

/** Livraison — les tarifs sont gérés par Shopify une fois la boutique connectée. */
export const shipping: {
  zones: string;
  carriers: Pending<string>;
  delays: Pending<string>;
  rates: Pending<string>;
  freeShippingThreshold: Pending<number>;
  returnDays: number;
} = {
  zones: "France",
  carriers: null,
  delays: null,
  rates: null,
  freeShippingThreshold: null,
  /** Délai légal de rétractation pour la vente à distance (Code de la consommation, art. L221-18). */
  returnDays: 14,
};

/** Documents destinés aux acheteurs professionnels (à déposer dans /public/docs). */
export const proDocuments: { label: string; href: Pending<string> }[] = [
  { label: "Catalogue CHEBKA (PDF)", href: null },
  { label: "Fiche technique produit (PDF)", href: null },
];

export const mainNav = [
  { href: "/", label: "Accueil" },
  { href: "/produit", label: "Le produit" },
  { href: "/avantages", label: "Les avantages" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/professionnels", label: "Professionnels" },
  { href: "/contact", label: "Contact" },
] as const;
