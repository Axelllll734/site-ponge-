import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Gallery } from "@/components/product/Gallery";
import { AddToCart } from "@/components/cart/AddToCart";
import { PackagingBack, PackagingFront } from "@/components/brand/Packaging";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { productSpecs, shipping } from "@/config/site";
import { formatPrice, product } from "@/lib/catalog";
import { IconArrow, IconHook, IconLock, IconTruck } from "@/components/ui/Icons";
import type { PhotoSlotId } from "@/config/media";

export const metadata: Metadata = {
  title: "Éponge filet rouge — 4 € TTC",
  description:
    "CHEBKA, l'éponge vaisselle en filet de pêche rouge : maillage ajouré, rinçage facile, séchage rapide. 4 € TTC l'éponge, lots de 2, 3 ou 5. Livraison en France.",
  alternates: { canonical: "/produit" },
};

const gallery: { id: PhotoSlotId; label: string }[] = [
  { id: "hero", label: "L'éponge CHEBKA roulée" },
  { id: "macro", label: "Le maillage ajouré en gros plan" },
  { id: "packaging", label: "Le packaging bande kraft" },
  { id: "underwater", label: "Sous l'eau : l'eau traverse les mailles" },
  { id: "hanging", label: "Suspendue pour sécher" },
  { id: "group", label: "Plusieurs éponges CHEBKA" },
];

function Spec({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div className="grid grid-cols-[42%_1fr] gap-4 border-b border-trait py-3.5 text-sm">
      <dt className="font-semibold">{label}</dt>
      <dd>
        {value}
        {note ? <span className="mt-1 block text-xs text-nuit-doux">{note}</span> : null}
      </dd>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <ProductJsonLd />
      <nav aria-label="Fil d'Ariane" className="container-chebka pt-6 text-sm text-nuit-doux">
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="hover:text-rouge">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-nuit">
            Le produit
          </li>
        </ol>
      </nav>

      {/* FICHE PRODUIT */}
      <section className="container-chebka grid gap-10 pb-20 pt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16" id="acheter">
        <Gallery
          items={gallery.map((g) => ({
            key: g.id,
            label: g.label,
            node: <PhotoSlot id={g.id} className="h-full w-full" priority={g.id === "hero"} />,
            thumb: <PhotoSlot id={g.id} className="h-full w-full" showLabel={false} sizes="80px" />,
          }))}
        />

        <div className="lg:pt-4">
          <p className="eyebrow">Éponge vaisselle en filet de pêche</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-4xl">{formatPrice(product.variants[0].priceCents)}</span>
            <span className="text-sm text-nuit-doux">TTC l&apos;éponge</span>
          </p>
          <p className="mt-5 text-lg leading-relaxed text-nuit-doux">{product.description}</p>

          <ul className="mt-6 grid gap-2 text-sm">
            {["Structure en filet ajourée", "Rinçage facile, séchage rapide", "Souple et agréable en main", "Rouge signature, packaging kraft"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rouge" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl bg-creme p-5 sm:p-6">
            <AddToCart />
          </div>

          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-trait p-4">
              <IconTruck className="h-5 w-5 shrink-0 text-rouge" />
              <span>
                <strong className="block">Livraison en France</strong>
                <span className="text-nuit-doux">Délais et tarifs affichés avant le paiement.</span>
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-trait p-4">
              <IconLock className="h-5 w-5 shrink-0 text-rouge" />
              <span>
                <strong className="block">Paiement sécurisé</strong>
                <span className="text-nuit-doux">Rétractation sous {shipping.returnDays} jours.</span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* DESCRIPTION / COMPOSITION / PROVENANCE */}
      <section className="bg-creme py-20 md:py-24">
        <div className="container-chebka grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Description</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-nuit-doux">
              <p>
                CHEBKA est une éponge vaisselle fabriquée à partir de filet de pêche. Son maillage noué et ajouré la
                distingue des éponges classiques compactes : l&apos;eau s&apos;écoule à travers les mailles et l&apos;air
                circule librement dans toute la structure.
              </p>
              <p>
                Résultat : elle se rince facilement, s&apos;essore d&apos;un geste et sèche rapidement après usage. Souple,
                elle s&apos;adapte à la main et aux formes des ustensiles.
              </p>
              <p>Une conception simple, un esprit méditerranéen.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl">Caractéristiques</h2>
            <dl className="mt-5 border-t border-trait">
              <Spec label="Produit" value="Éponge vaisselle en filet" />
              <Spec label="Couleur" value="Rouge" />
              <Spec
                label="Composition"
                value={<Pending value={productSpecs.composition} />}
                note={productSpecs.composition ? undefined : "Premier concept de packaging : 100 % polyamide — à confirmer."}
              />
              <Spec label="Provenance" value={productSpecs.communicatedOrigin} />
              <Spec
                label="Pays de fabrication"
                value={<Pending value={productSpecs.manufacturingCountry} />}
                note="Mention réglementaire distincte de la provenance."
              />
              <Spec label="Dimensions" value={<Pending value={productSpecs.dimensions} />} />
              <Spec label="Poids" value={<Pending value={productSpecs.weight} />} />
              <Spec label="Formats" value="À l'unité, lots de 2, 3 ou 5" />
              <Spec label="Prix" value="4,00 € TTC l'éponge" />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ZOOM MAILLAGE */}
      <section className="py-20 md:py-24">
        <div className="container-chebka grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <PhotoSlot id="macro" className="aspect-square rounded-[2rem]" />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Zoom sur le maillage" title="Des mailles qui laissent passer l'eau et l'air." />
            <p className="mt-5 leading-relaxed text-nuit-doux">
              Chaque maille est délimitée par des nœuds. Cette structure ouverte ne retient pas l&apos;eau en son cœur :
              c&apos;est ce qui permet à CHEBKA de se rincer facilement et de sécher rapidement.
            </p>
            <Link href="/avantages" className="btn btn-secondary mt-8">
              Les avantages du filet <IconArrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PACKAGING */}
      <section className="bg-kraft-clair/50 py-20 md:py-24">
        <div className="container-chebka">
          <SectionHeading
            eyebrow="Packaging"
            title="Une bande kraft, l'essentiel lisible."
            intro="Le recto présente le produit, le verso réunit le mode d'emploi, l'entretien et les informations réglementaires."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <PackagingFront />
              <p className="mt-4 text-center text-sm text-nuit-doux">Recto</p>
            </Reveal>
            <Reveal delay={100}>
              <PackagingBack />
              <p className="mt-4 text-center text-sm text-nuit-doux">Verso — les mentions entre crochets restent à confirmer</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONSEILS */}
      <section className="py-20 md:py-24" id="conseils">
        <div className="container-chebka grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Conseils d&apos;utilisation</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Mouiller", "Passez l'éponge sous l'eau pour assouplir le filet."],
                ["Frotter", "Ajoutez une goutte de liquide vaisselle et frottez."],
                ["Rincer et essorer", "Rincez abondamment puis essorez d'un geste."],
                ["Suspendre", "Accrochez-la à l'air libre pour qu'elle sèche rapidement."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-serif text-3xl leading-none text-rouge">0{i + 1}</span>
                  <span>
                    <strong className="block">{t}</strong>
                    <span className="text-nuit-doux">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl">Conseils d&apos;entretien</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-nuit-doux">
              <p className="flex gap-3">
                <IconHook className="h-6 w-6 shrink-0 text-rouge" />
                Après chaque utilisation, rincez-la et laissez-la sécher suspendue, à l&apos;air libre, plutôt qu&apos;au
                fond de l&apos;évier.
              </p>
              <p>
                Lavage en machine :{" "}
                <Pending value={productSpecs.washTemperature ? `jusqu'à ${productSpecs.washTemperature}` : null} />
              </p>
              <p>Remplacez votre éponge dès qu&apos;elle présente des signes d&apos;usure.</p>
              <p>
                Fin de vie et tri : <Pending value={productSpecs.sortingInfo} />
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIVRAISON */}
      <section className="pb-20 md:pb-24">
        <div className="container-chebka">
          <div className="grid gap-6 rounded-[2rem] bg-nuit p-8 text-blanc md:grid-cols-3 md:p-12">
            <div>
              <p className="eyebrow !text-kraft">Livraison</p>
              <p className="mt-3 font-serif text-2xl">Livraison partout en France.</p>
            </div>
            <p className="text-sm leading-relaxed text-blanc/75">
              Les modes, délais et frais de livraison sont présentés avant le paiement. Vous recevez un e-mail de
              confirmation dès la validation de votre commande.
            </p>
            <div className="flex items-center md:justify-end">
              <Link href="/livraison-retours" className="btn btn-primary">
                Livraison et retours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
