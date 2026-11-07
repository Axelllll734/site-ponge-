/**
 * Catalogue local CHEBKA.
 *
 * Sert de source de vérité tant que Shopify n'est pas connecté, et de
 * correspondance avec les variantes Shopify une fois la boutique en place
 * (voir src/lib/shopify). Les prix sont exprimés en centimes TTC.
 *
 * Prix public envisagé : 4,00 € TTC par éponge.
 * Les lots sont calculés au prix unitaire : aucune remise n'est inventée.
 * ➜ Pour définir des tarifs de lots spécifiques, modifier `priceCents`.
 */

export const UNIT_PRICE_CENTS = 400;

export type Variant = {
  id: string;
  label: string;
  units: number;
  priceCents: number;
};

export type Product = {
  id: string;
  handle: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  variants: Variant[];
};

const lot = (units: number): Variant => ({
  id: `lot-${units}`,
  label: units === 1 ? "1 éponge" : `Lot de ${units}`,
  units,
  priceCents: UNIT_PRICE_CENTS * units,
});

export const product: Product = {
  id: "chebka-eponge-filet",
  handle: "eponge-filet",
  name: "CHEBKA — Éponge filet",
  shortName: "Éponge filet",
  tagline: "L'éponge en filet de pêche qui sèche vite.",
  description:
    "Une éponge vaisselle en filet de pêche rouge, au maillage ajouré. Elle se rince facilement, s'essore d'un geste et sèche rapidement entre deux vaisselles.",
  variants: [lot(1), lot(2), lot(3), lot(5)],
};

export function getVariant(id: string): Variant | undefined {
  return product.variants.find((v) => v.id === id);
}

const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function formatPrice(cents: number): string {
  return euro.format(cents / 100);
}
