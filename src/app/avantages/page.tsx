import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { DryingComparison } from "@/components/brand/DryingComparison";
import { LabResults } from "@/components/brand/LabResults";
import { IconArrow } from "@/components/ui/Icons";
import type { PhotoSlotId } from "@/config/media";

export const metadata: Metadata = {
  title: "Les avantages de l'éponge en filet : séchage rapide et rinçage facile",
  description:
    "Pourquoi une éponge en filet de pêche ? Une structure ajourée qui laisse circuler l'air et l'eau : l'éponge vaisselle se rince facilement et sèche rapidement.",
  alternates: { canonical: "/avantages" },
};

const blocks: { n: string; slot: PhotoSlotId; title: string; paragraphs: string[] }[] = [
  {
    n: "01",
    slot: "macro",
    title: "Une structure ajourée",
    paragraphs: [
      "CHEBKA est fabriquée à partir de filet de pêche : un réseau de fils noués qui forme des mailles régulières et ouvertes.",
      "Contrairement à une éponge classique, faite d'une mousse dense, le filet ne forme pas de bloc. Il reste aéré dans toute son épaisseur, même roulé ou froissé dans la main.",
    ],
  },
  {
    n: "02",
    slot: "hanging",
    title: "Un séchage rapide",
    paragraphs: [
      "Grâce aux mailles ouvertes, l'eau s'évacue au lieu de rester piégée, et l'air traverse l'éponge de part en part.",
      "Rincée, essorée puis suspendue, CHEBKA sèche rapidement entre deux vaisselles. Elle ne reste pas longtemps humide au bord de l'évier.",
    ],
  },
  {
    n: "03",
    slot: "underwater",
    title: "Une meilleure gestion de l'humidité",
    paragraphs: [
      "L'humidité persistante est l'un des facteurs qui favorisent le développement de certains micro-organismes dans les éponges de cuisine. Réduire le temps pendant lequel une éponge reste humide est donc un bon réflexe d'hygiène.",
      "La structure de CHEBKA va dans ce sens : elle facilite le rinçage et le séchage. Elle ne remplace pas pour autant les gestes d'entretien ni le remplacement régulier de l'éponge.",
    ],
  },
];

export default function AdvantagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Les avantages"
        title={
          <>
            L&apos;hygiène commence <span className="text-rouge">par le séchage.</span>
          </>
        }
        intro="Moins d'humidité, plus de fraîcheur. Voici ce que change la structure en filet de CHEBKA."
      />

      <div className="container-chebka space-y-24 py-20 md:space-y-32 md:py-28">
        {blocks.map((b, i) => (
          <section key={b.n} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <PhotoSlot id={b.slot} className="aspect-[5/4] rounded-[2rem]" />
            </Reveal>
            <Reveal delay={100}>
              <p className="font-serif text-6xl text-rouge">{b.n}</p>
              <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{b.title}</h2>
              {b.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="mt-5 text-lg leading-relaxed text-nuit-doux">
                  {p}
                </p>
              ))}
            </Reveal>
          </section>
        ))}
      </div>

      <section className="bg-creme py-20 md:py-28">
        <div className="container-chebka">
          <SectionHeading
            eyebrow="Comparaison"
            title="Éponge compacte ou éponge en filet ?"
            intro="Deux structures, deux comportements face à l'eau et à l'air."
          />
          <div className="mt-12">
            <DryingComparison />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-chebka grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Transparence" title="Ce que nous affirmons, et ce que nous n'affirmons pas." />
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-nuit-doux">
            <p className="leading-relaxed">
              CHEBKA n&apos;est pas une éponge antibactérienne : elle ne contient aucun traitement de ce type. Nous ne
              revendiquons ni réduction chiffrée des bactéries, ni certification que nous ne possédons pas.
            </p>
            <p className="leading-relaxed">
              Notre argument est un argument de conception : un filet ajouré se rince facilement et sèche plus vite
              qu&apos;une matière compacte. Des tests indépendants viendront préciser ces qualités.
            </p>
            <LabResults />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-chebka text-center">
          <Reveal>
            <p className="font-serif text-3xl md:text-4xl">Simple, pratique et pensée pour le quotidien.</p>
            <Link href="/produit" className="btn btn-primary mt-8">
              Acheter CHEBKA · 4 € TTC <IconArrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
