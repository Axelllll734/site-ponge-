import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PackagingBack, PackagingFront } from "@/components/brand/Packaging";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Pending } from "@/components/ui/Pending";
import { Form, type FieldDef } from "@/components/forms/Form";
import { company, productSpecs, proDocuments } from "@/config/site";
import { IconArrow } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Espace professionnels — référencer CHEBKA",
  description:
    "Centrales d'achat, GMS, enseignes spécialisées et distributeurs : découvrez CHEBKA, l'éponge en filet de pêche au prix public envisagé de 4 € TTC, et demandez une présentation commerciale.",
  alternates: { canonical: "/professionnels" },
};

const fields: FieldDef[] = [
  { name: "lastName", label: "Nom", required: true, autoComplete: "family-name", half: true },
  { name: "firstName", label: "Prénom", required: true, autoComplete: "given-name", half: true },
  { name: "company", label: "Société", required: true, autoComplete: "organization", half: true },
  { name: "role", label: "Fonction", required: true, autoComplete: "organization-title", half: true },
  { name: "email", label: "E-mail professionnel", type: "email", required: true, autoComplete: "email", half: true },
  { name: "phone", label: "Téléphone", type: "tel", autoComplete: "tel", half: true },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Votre enseigne, vos points de vente, votre projet de référencement…",
  },
];

const targets = ["Centrales d'achat", "Hypermarchés", "Supermarchés", "Enseignes spécialisées", "Distributeurs", "Commerces indépendants"];

const arguments_ = [
  { t: "Un produit qui se distingue en rayon", d: "Une éponge en filet de pêche rouge, immédiatement reconnaissable au milieu des éponges classiques." },
  { t: "Un bénéfice simple à comprendre", d: "« Elle sèche vite. » Un argument lisible en un coup d'œil, centré sur le rinçage et le séchage." },
  { t: "Un prix public accessible", d: "Un prix public envisagé de 4 € TTC, cohérent avec un achat du quotidien." },
  { t: "Un packaging sobre et lisible", d: "Une bande kraft minimaliste, informations essentielles au verso, faible suremballage." },
];

export default function ProPage() {
  return (
    <>
      <PageHero
        eyebrow="Espace professionnels"
        title={
          <>
            CHEBKA, aussi disponible <span className="text-rouge">pour les professionnels.</span>
          </>
        }
        intro="Une marque d'éponges en filet de pêche pensée pour la grande distribution française : un produit différenciant, un argument clair, un prix accessible."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#demande" className="btn btn-primary">
            Demander une présentation commerciale <IconArrow />
          </a>
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="container-chebka">
          <SectionHeading eyebrow="Pour qui ?" title="Les partenaires que nous recherchons." />
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {targets.map((t, i) => (
              <Reveal key={t} as="li" delay={i * 60} className="rounded-2xl border border-trait p-5 font-serif text-lg md:text-xl">
                {t}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-creme py-20 md:py-24">
        <div className="container-chebka grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Le concept" title="Une éponge du quotidien devenue une marque." />
            <p className="mt-5 text-lg leading-relaxed text-nuit-doux">
              CHEBKA transforme un objet banal en produit désirable : une éponge vaisselle en filet de pêche, au maillage
              ajouré, qui se rince facilement et sèche rapidement. Une identité méditerranéenne contemporaine, sans
              cliché, pensée pour le linéaire.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {arguments_.map((a) => (
                <div key={a.t} className="rounded-2xl bg-blanc p-5">
                  <p className="font-semibold">{a.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-nuit-doux">{a.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <PhotoSlot id="group" className="aspect-[4/5] rounded-[2rem]" />
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-chebka grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Fiche produit" title="Le produit et ses caractéristiques." />
            <dl className="mt-8 border-t border-trait text-sm">
              {[
                ["Produit", "Éponge vaisselle en filet de pêche"],
                ["Couleur", "Rouge"],
                ["Prix public envisagé", "4,00 € TTC"],
                ["Provenance communiquée", productSpecs.communicatedOrigin],
                ["Pays de fabrication", <Pending key="c" value={productSpecs.manufacturingCountry} />],
                ["Composition", <Pending key="m" value={productSpecs.composition} />],
                ["Dimensions / poids", <Pending key="d" value={productSpecs.dimensions} />],
                ["Code EAN", <Pending key="e" value={productSpecs.ean} />],
                ["Certifications", <Pending key="x" value={productSpecs.certifications.join(", ") || null} fallback="Aucune à ce jour" />],
              ].map(([k, v]) => (
                <div key={String(k)} className="grid grid-cols-[45%_1fr] gap-4 border-b border-trait py-3.5">
                  <dt className="font-semibold">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Référencement & conditionnement" title="Construisons l'offre ensemble." />
            <div className="mt-6 space-y-4 leading-relaxed text-nuit-doux">
              <p>
                Formats de vente consommateur : à l&apos;unité, et en lots de 2, 3 ou 5 éponges. Les possibilités de
                conditionnement (colisage, présentoirs, PLV) sont étudiées avec chaque enseigne selon ses besoins.
              </p>
              <p>
                Les tarifs professionnels, conditions logistiques et minimums de commande vous sont communiqués lors
                de la présentation commerciale.
              </p>
            </div>
            <div className="mt-8 space-y-3">
              {proDocuments.map((d) =>
                d.href ? (
                  <a key={d.label} href={d.href} className="btn btn-secondary w-full justify-between" download>
                    {d.label} <IconArrow />
                  </a>
                ) : (
                  <div key={d.label} className="flex items-center justify-between rounded-full border border-dashed border-kraft px-6 py-3.5 text-sm">
                    <span>{d.label}</span>
                    <span className="text-terracotta">Bientôt disponible</span>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-kraft-clair/50 py-20 md:py-24">
        <div className="container-chebka">
          <SectionHeading eyebrow="Packaging" title="Pensé pour le linéaire." intro="Bande kraft, filet rouge visible, nom CHEBKA lisible à distance. Mentions réglementaires regroupées au verso." />
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            <PackagingFront />
            <PackagingBack />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" id="demande">
        <div className="container-chebka grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading eyebrow="Contact professionnel" title="Demander une présentation commerciale." />
            <p className="mt-5 leading-relaxed text-nuit-doux">
              Laissez-nous vos coordonnées : nous revenons vers vous avec une présentation de la marque, du produit et
              des modalités de référencement.
            </p>
            <p className="mt-6 text-sm">
              E-mail professionnel : <Pending value={company.proEmail ?? company.email} />
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-[2rem] border border-trait p-6 md:p-10">
            <Form
              endpoint="/api/professionnels"
              fields={fields}
              submitLabel="Demander une présentation commerciale"
              successTitle="Merci, votre demande est envoyée."
              successText="Notre équipe vous recontacte rapidement avec une présentation commerciale."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
