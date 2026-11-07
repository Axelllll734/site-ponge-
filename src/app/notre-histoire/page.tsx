import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "La naissance de CHEBKA : revisiter l'éponge du quotidien à partir du filet de pêche. Une conception simple, un esprit méditerranéen.",
  alternates: { canonical: "/notre-histoire" },
};

const chapters = [
  {
    title: "L'idée",
    text: "Tout part d'un constat simple : l'éponge est l'un des objets les plus utilisés de la maison, et l'un de ceux auxquels on pense le moins. Elle reste souvent humide au bord de l'évier, on la remplace sans y réfléchir. Nous avons voulu la regarder autrement.",
  },
  {
    title: "Le choix du filet de pêche",
    text: "Le filet est un matériau pensé pour être plongé dans l'eau et en ressortir aussitôt. Ses mailles laissent passer l'eau, ses nœuds accrochent. Transposé à la cuisine, il donne une éponge ajourée qui se rince facilement et sèche rapidement.",
  },
  {
    title: "Revisiter un objet du quotidien",
    text: "CHEBKA ne cherche pas à réinventer la vaisselle. Elle propose une alternative à l'éponge compacte, avec le même geste, et une structure qui change la façon dont l'éponge vit entre deux utilisations.",
  },
  {
    title: "La simplicité avant tout",
    text: "Un filet, une couleur, une bande kraft. Pas de traitement, pas de promesse excessive. Un produit facile à comprendre, à utiliser et à entretenir.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre histoire"
        title={
          <>
            Une conception simple, <span className="italic text-rouge">un esprit méditerranéen.</span>
          </>
        }
        intro="CHEBKA est née d'une envie : redonner de l'attention à un objet que l'on utilise chaque jour sans le regarder."
      />

      <section className="py-20 md:py-28">
        <div className="container-chebka grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <PhotoSlot id="story" className="aspect-[4/5] rounded-[2rem]" />
            </Reveal>
          </div>
          <div className="space-y-16">
            {chapters.map((c, i) => (
              <Reveal key={c.title}>
                <p className="eyebrow">Chapitre {i + 1}</p>
                <h2 className="mt-3 text-3xl md:text-4xl">{c.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-nuit-doux">{c.text}</p>
              </Reveal>
            ))}
            <Reveal>
              <blockquote className="border-l-2 border-rouge pl-6 font-serif text-2xl leading-snug md:text-3xl">
                « Le filet qui change votre quotidien. »
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-nuit py-20 text-blanc md:py-28">
        <div className="container-chebka grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <Reveal>
            <p className="eyebrow !text-kraft">L&apos;inspiration</p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl">Inspirée par la Méditerranée, pensée pour le quotidien.</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-blanc/75">
            <p>
              CHEBKA a des origines méditerranéennes. Nous les évoquons à notre manière : une lumière franche, des
              matières simples comme la pierre, le bois et la céramique, le rouge du filet et le kraft du papier.
            </p>
            <p>
              Pas de folklore ni de carte postale : simplement l&apos;esprit d&apos;un objet utile, robuste et bien fait,
              qui trouve naturellement sa place dans une cuisine d&apos;aujourd&apos;hui.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 text-center md:py-28">
        <div className="container-chebka">
          <Reveal>
            <p className="font-serif text-3xl md:text-4xl">Essayez CHEBKA dans votre cuisine.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/produit" className="btn btn-primary">
                Découvrir le produit <IconArrow />
              </Link>
              <Link href="/avantages" className="btn btn-secondary">
                Les avantages
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
