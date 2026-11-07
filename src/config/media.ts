/**
 * Photographies du site.
 *
 * Chaque emplacement photo du site est déclaré ici. Tant que `src` vaut null,
 * le site affiche une illustration accompagnée d'un libellé
 * « Emplacement photo » clairement identifié — jamais une fausse photo.
 *
 * ➜ Pour intégrer une vraie photo : déposer le fichier dans /public/photos
 *   puis renseigner `src` (ex. "/photos/hero.jpg") et `alt`.
 */

export type PhotoSlotId =
  | "hero"
  | "macro"
  | "underwater"
  | "hanging"
  | "packaging"
  | "kitchen"
  | "group"
  | "detail-texture"
  | "detail-color"
  | "detail-softness"
  | "story";

export type PhotoEntry = {
  /** Brief photo destiné au photographe. */
  brief: string;
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
};

export const photos: Record<PhotoSlotId, PhotoEntry> = {
  hero: {
    brief: "Grande photo de l'éponge rouge roulée, fond crème, lumière naturelle rasante",
    src: null,
    alt: "Éponge CHEBKA rouge en filet de pêche posée sur un plan en pierre claire",
  },
  macro: {
    brief: "Macro du maillage rouge : nœuds et mailles ajourées en gros plan",
    src: null,
    alt: "Gros plan sur le maillage ajouré de l'éponge CHEBKA",
  },
  underwater: {
    brief: "Éponge sous un filet d'eau du robinet, gouttes en mouvement",
    src: null,
    alt: "Éponge CHEBKA rincée sous l'eau du robinet",
  },
  hanging: {
    brief: "Éponge suspendue à un crochet après utilisation, près d'une fenêtre",
    src: null,
    alt: "Éponge CHEBKA suspendue pour sécher dans une cuisine lumineuse",
  },
  packaging: {
    brief: "Packaging bande kraft CHEBKA, éponge rouge roulée, fond crème",
    src: null,
    alt: "Éponge CHEBKA dans son packaging bande kraft",
  },
  kitchen: {
    brief: "Éponge près d'un évier en céramique, cuisine contemporaine, bois et pierre",
    src: null,
    alt: "Éponge CHEBKA dans une cuisine contemporaine",
  },
  group: {
    brief: "Composition de plusieurs éponges rouges alignées, vue de dessus",
    src: null,
    alt: "Plusieurs éponges CHEBKA rouges alignées",
  },
  "detail-texture": {
    brief: "Texture du filet tenue entre deux doigts",
    src: null,
    alt: "Texture du filet de l'éponge CHEBKA",
  },
  "detail-color": {
    brief: "Rouge signature sur fond crème, lumière douce",
    src: null,
    alt: "Le rouge signature de l'éponge CHEBKA",
  },
  "detail-softness": {
    brief: "Éponge pressée dans la main, montrant sa souplesse",
    src: null,
    alt: "La souplesse de l'éponge CHEBKA",
  },
  story: {
    brief: "Filet rouge plié sur une table en bois, lumière d'après-midi",
    src: null,
    alt: "Filet rouge plié sur une table en bois",
  },
};
