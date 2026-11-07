import Link from "next/link";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { DryingComparison } from "@/components/brand/DryingComparison";
import { PackagingFront } from "@/components/brand/Packaging";
import { AddToCart } from "@/components/cart/AddToCart";
import { IconAir, IconArrow, IconDrop, IconHook, IconMesh } from "@/components/ui/Icons";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { labResults } from "@/config/site";
import { LabResults } from "@/components/brand/LabResults";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />

      {/* HERO */}
      <section className="relative -mt-[72px] overflow-hidden bg-creme pt-[72px]">
        <div className="container-chebka grid items-center gap-10 pb-14 pt-8 md:pb-24 md:pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow mb-5">L&apos;éponge en filet de pêche</p>
            <h1 className="text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.3rem]">
              Une nouvelle façon de penser l&apos;éponge du&nbsp;<em className="text-rouge">quotidien</em>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-nuit-doux">
              Découvrez CHEBKA, l&apos;éponge en filet de pêche conçue pour faciliter le rinçage et sécher rapidement.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/produit" className="btn btn-secondary">
                Découvrir le produit
              </Link>
              <Link href="/produit#acheter" className="btn btn-primary">
                Acheter maintenant <IconArrow />
              </Link>
            </div>
            <p className="mt-6 flex items-baseline gap-2 text-sm text-nuit-doux">
              <span className="font-serif text-3xl text-nuit">4&nbsp;€</span> TTC l&apos;éponge · Livraison en France
            </p>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <PhotoSlot id="hero" priority className="aspect-[4/3.6] rounded-[2rem] lg:aspect-[4/4.4]" />
          </Reveal>
        </div>
        <div className="border-y border-nuit/10 bg-blanc/60">
          <ul className="container-chebka grid grid-cols-2 gap-y-3 py-5 text-sm font-medium md:grid-cols-4">
            {["Filet de pêche ajouré", "Séchage rapide", "Rinçage facile", "Esprit méditerranéen"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rouge" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 2 — LA DIFFÉRENCE */}
      <section className="py-20 md:py-28">
        <div className="container-chebka">
          <SectionHeading
            eyebrow="La différence CHEBKA"
            title="Pas une éponge comme les autres."
            intro="Un filet de pêche, un maillage ouvert, un geste simple. CHEBKA revisite l'éponge vaisselle à partir d'une structure qui laisse passer l'eau et l'air."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                slot: "macro" as const,
                icon: <IconMesh />,
                title: "Une structure en filet ajourée",
                text: "Les mailles ouvertes ne forment pas de masse compacte : l'eau ne reste pas piégée au cœur de l'éponge.",
              },
              {
                slot: "hanging" as const,
                icon: <IconAir />,
                title: "Un séchage rapide",
                text: "L'air traverse le filet de part en part. Suspendue après usage, elle sèche vite.",
              },
              {
                slot: "underwater" as const,
                icon: <IconDrop />,
                title: "Un rinçage facile",
                text: "Sous le robinet, l'eau circule à travers les mailles et emporte les résidus. Un coup d'essorage et c'est prêt.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100} className="group">
                <article className="h-full overflow-hidden rounded-[1.75rem] bg-creme">
                  <PhotoSlot id={card.slot} className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]" sizes="(min-width: 768px) 33vw, 100vw" />
                  <div className="p-7">
                    <span className="text-rouge">{card.icon}</span>
                    <h3 className="mt-4 text-2xl">{card.title}</h3>
                    <p className="mt-3 leading-relaxed text-nuit-doux">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HYGIÈNE */}
      <section className="bg-nuit py-20 text-blanc md:py-28" aria-labelledby="hygiene-title">
        <div className="container-chebka">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow mb-4 !text-kraft">L&apos;hygiène au quotidien</p>
              <h2 id="hygiene-title" className="text-[2.3rem] leading-[1.05] sm:text-5xl md:text-[3.6rem]">
                Elle sèche vite. <span className="text-[#E8726B]">Et ça change tout.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg leading-relaxed text-blanc/80">
                Une éponge qui reste longtemps humide offre un environnement favorable au développement de certains
                micro-organismes. L&apos;hygiène commence donc par le séchage : moins une éponge reste humide, mieux
                c&apos;est.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-blanc/80">
                La structure ajourée de CHEBKA facilite l&apos;évacuation de l&apos;eau et la circulation de l&apos;air.
                Elle se rince facilement, s&apos;essore d&apos;un geste et sèche rapidement.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <IconAir />, t: "L'air circule", d: "Le maillage ouvert laisse l'air traverser toute l'éponge." },
              { icon: <IconDrop />, t: "L'eau s'évacue", d: "L'eau s'écoule entre les mailles au lieu de rester piégée." },
              { icon: <IconHook />, t: "Elle sèche suspendue", d: "Accrochée après usage, elle sèche à l'air libre." },
              { icon: <IconMesh />, t: "Moins longtemps humide", d: "Moins d'humidité, plus de fraîcheur entre deux vaisselles." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="h-full rounded-3xl border border-blanc/12 bg-blanc/[0.04] p-6">
                  <span className="text-kraft">{s.icon}</span>
                  <p className="mt-4 font-serif text-xl">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-blanc/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-[2rem] bg-creme p-5 text-nuit sm:p-8">
            <DryingComparison />
          </Reveal>

          {labResults.length > 0 ? (
            <div className="mt-10">
              <LabResults tone="dark" />
            </div>
          ) : null}

          <Reveal className="mt-10 text-center">
            <Link href="/avantages" className="btn btn-primary">
              Comprendre les avantages <IconArrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4 — LE PRODUIT EN DÉTAIL */}
      <section className="py-20 md:py-28">
        <div className="container-chebka">
          <SectionHeading eyebrow="Le produit en détail" title="Un filet rouge, souple et ajouré." />
          <div className="mt-14 grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
            <Reveal className="md:col-span-4">
              <PhotoSlot id="macro" className="aspect-[16/10] rounded-[1.75rem]" sizes="(min-width: 768px) 66vw, 100vw" />
              <p className="mt-4 font-serif text-xl">La texture du filet</p>
              <p className="mt-1 text-nuit-doux">Un maillage noué, régulier, qui accroche les résidus sans former de bloc.</p>
            </Reveal>
            <Reveal delay={100} className="md:col-span-2">
              <PhotoSlot id="detail-color" className="aspect-[4/5] rounded-[1.75rem] md:aspect-auto md:h-[calc(100%-5.5rem)]" sizes="(min-width: 768px) 33vw, 100vw" />
              <p className="mt-4 font-serif text-xl">Le rouge signature</p>
              <p className="mt-1 text-nuit-doux">Une couleur franche, reconnaissable au premier coup d&apos;œil.</p>
            </Reveal>
            <Reveal className="md:col-span-2">
              <PhotoSlot id="detail-softness" className="aspect-[4/5] rounded-[1.75rem]" sizes="(min-width: 768px) 33vw, 100vw" />
              <p className="mt-4 font-serif text-xl">La souplesse</p>
              <p className="mt-1 text-nuit-doux">Elle épouse la main et se faufile dans les recoins.</p>
            </Reveal>
            <Reveal delay={100} className="md:col-span-2">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.75rem] bg-creme p-8">
                <PackagingFront className="max-w-[17rem]" />
              </div>
              <p className="mt-4 font-serif text-xl">Le packaging kraft</p>
              <p className="mt-1 text-nuit-doux">Une bande kraft sobre, lisible, sans suremballage superflu.</p>
            </Reveal>
            <Reveal delay={200} className="md:col-span-2">
              <div className="flex aspect-[4/5] flex-col justify-between rounded-[1.75rem] bg-nuit p-8 text-blanc">
                <p className="eyebrow !text-kraft">Conseils</p>
                <div>
                  <p className="font-serif text-2xl leading-snug">Après chaque usage : rincer, essorer, suspendre.</p>
                  <p className="mt-3 text-sm text-blanc/70">Le bon réflexe pour qu&apos;elle sèche vite et reste agréable à utiliser.</p>
                </div>
                <Link href="/produit#conseils" className="inline-flex items-center gap-2 text-sm font-semibold">
                  Tous les conseils <IconArrow />
                </Link>
              </div>
              <p className="mt-4 font-serif text-xl">Les bons gestes</p>
              <p className="mt-1 text-nuit-doux">Simple, pratique et pensée pour le quotidien.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMMENT L'UTILISER */}
      <section className="bg-creme py-20 md:py-28">
        <div className="container-chebka">
          <SectionHeading eyebrow="Mode d'emploi" title="Comment l'utiliser ?" align="center" intro="Trois gestes, rien de plus." />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", slot: "underwater" as const, t: "Mouiller l'éponge", d: "Passez-la sous l'eau : le filet s'assouplit immédiatement." },
              { n: "02", slot: "kitchen" as const, t: "Ajouter du liquide vaisselle et frotter", d: "Une goutte suffit. Le maillage fait mousser et accroche les résidus." },
              { n: "03", slot: "hanging" as const, t: "Rincer, essorer et suspendre", d: "Rincez, essorez d'un geste, puis suspendez-la pour qu'elle sèche." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 110} as="li">
                <PhotoSlot id={s.slot} className="aspect-[4/3] rounded-[1.75rem]" sizes="(min-width: 768px) 33vw, 100vw" showLabel={false} />
                <p className="mt-6 font-serif text-5xl text-rouge">{s.n}</p>
                <h3 className="mt-2 text-2xl">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-nuit-doux">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 6 — ACHETER */}
      <section className="py-20 md:py-28" id="acheter" aria-labelledby="acheter-title">
        <div className="container-chebka grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <PhotoSlot id="packaging" className="aspect-square rounded-[2rem]" />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">Acheter CHEBKA</p>
            <h2 id="acheter-title" className="text-4xl leading-tight md:text-5xl">
              CHEBKA — Éponge filet
            </h2>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-4xl">4,00&nbsp;€</span>
              <span className="text-sm text-nuit-doux">TTC l&apos;éponge</span>
            </p>
            <p className="mt-5 max-w-lg leading-relaxed text-nuit-doux">
              L&apos;éponge vaisselle en filet de pêche rouge. Elle se rince facilement et sèche rapidement entre deux
              utilisations. Disponible à l&apos;unité ou en lots.
            </p>
            <div className="mt-8">
              <AddToCart />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 7 — PROFESSIONNELS */}
      <section className="pb-20 md:pb-28">
        <div className="container-chebka">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-kraft px-6 py-14 text-nuit md:px-14 md:py-20">
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow mb-4 !text-nuit">Professionnels</p>
              <h2 className="text-[2.1rem] leading-[1.08] md:text-5xl">CHEBKA, aussi disponible pour les professionnels.</h2>
              <p className="mt-5 text-lg leading-relaxed text-nuit/80">
                Centrales d&apos;achat, grandes et moyennes surfaces, enseignes spécialisées, distributeurs, commerces
                indépendants : découvrez comment référencer CHEBKA dans votre rayon.
              </p>
              <Link href="/professionnels" className="btn btn-nuit mt-8">
                Découvrir notre offre professionnelle <IconArrow />
              </Link>
            </div>
            <div className="pointer-events-none absolute -right-16 -top-10 hidden w-[26rem] rotate-6 opacity-95 md:block">
              <PackagingFront />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
