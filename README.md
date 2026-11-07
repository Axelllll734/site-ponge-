# CHEBKA — site e-commerce officiel

Site de la marque **CHEBKA**, l'éponge en filet de pêche qui sèche vite.
Vente aux particuliers (France, prix TTC en euros) et espace dédié aux acheteurs de la grande distribution.

## Stack

- **Next.js 16** (App Router, Cache Components) · **TypeScript** · **Tailwind CSS 4**
- **Shopify Storefront API** pour le paiement, les commandes, les stocks et les frais de livraison
- **Resend** (optionnel) pour l'envoi des formulaires
- Déploiement prévu sur **Vercel**

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Organisation

| Dossier | Rôle |
| --- | --- |
| `src/config/site.ts` | **Infos entreprise, fiche produit, livraison, tests labo, documents pro** — tout ce qui est `null` s'affiche « À confirmer » |
| `src/config/media.ts` | Emplacements photo (brief + chemin de la photo réelle) |
| `src/lib/catalog.ts` | Produit, variantes (1, 2, 3, 5 éponges) et prix (centimes TTC) |
| `src/lib/shopify.ts` | Connecteur Shopify (création du panier → checkout officiel) |
| `src/lib/forms.ts` | Validation et envoi des formulaires |
| `src/components/brand/` | Logo, illustrations du filet, packaging recto/verso, schéma de séchage |
| `src/components/cart/` | Panier (stockage navigateur), ajout au panier, tunnel de commande |
| `src/app/` | Pages, routes API, sitemap, robots, image Open Graph |

## Identité

Palette : rouge `#C83D36` · bleu nuit `#202747` · kraft `#CBA77F` · crème `#F3EEE5` · blanc cassé `#FAF9F6` · terracotta `#B9653E`.
Typographies : **Fraunces** (titres) et **Manrope** (textes). Logos : `public/brand/`.

## Éléments à configurer avant la mise en ligne

1. **Photos réelles** : déposer dans `public/photos/` et renseigner `src/config/media.ts`. Les illustrations actuelles sont provisoires et signalées « Emplacement photo ».
2. **Fiche produit** (`productSpecs`) : composition (100 % polyamide à confirmer), pays de fabrication, dimensions, poids, température de lavage, info-tri, EAN.
3. **Entreprise** (`company`) : raison sociale, SIREN/RCS, TVA, adresse, e-mails, téléphone, directeur de publication, médiateur.
4. **Livraison** (`shipping`) : transporteurs, délais, tarifs (les tarifs effectifs se règlent dans Shopify).
5. **Prix des lots** : par défaut, multiple du prix unitaire (aucune remise inventée), voir `src/lib/catalog.ts`.
6. **Tests labo / certifications** : `labResults` et `certifications` — à ne remplir qu'avec des résultats réels.
7. **Documents pro** : catalogue et fiche technique PDF dans `public/docs/`, puis `proDocuments`.
8. **Textes juridiques** (mentions, CGV, confidentialité) : compléter et faire valider par un juriste.

## Brancher Shopify

1. Créer la boutique Shopify, le produit « CHEBKA — Éponge filet » et 4 variantes (1, 2, 3, 5 éponges).
2. Installer le canal **Headless** et créer un jeton **Storefront API**.
3. Renseigner les variables de `.env.example` dans Vercel (le jeton reste côté serveur).
4. Configurer dans Shopify les zones de livraison (France), les taxes et les moyens de paiement.

Sans Shopify, le site fonctionne (panier, récapitulatif) mais le bouton de paiement indique clairement que la commande en ligne n'est pas encore ouverte : **aucun paiement n'est simulé**.

## Mise en ligne (Vercel)

1. Importer le dépôt sur vercel.com (framework détecté automatiquement).
2. Ajouter les variables d'environnement, dont `NEXT_PUBLIC_SITE_URL`.
3. Relier le nom de domaine.
4. Soumettre `https://<domaine>/sitemap.xml` à Google Search Console.
