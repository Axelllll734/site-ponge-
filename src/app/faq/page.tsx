import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — questions fréquentes sur l'éponge filet",
  description:
    "Comment utiliser et entretenir l'éponge en filet CHEBKA ? Séchage, rinçage, livraison, retours : toutes les réponses.",
  alternates: { canonical: "/faq" },
};

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Le produit",
    items: [
      {
        q: "Qu'est-ce qu'une éponge en filet de pêche ?",
        a: "C'est une éponge vaisselle faite d'un filet aux mailles nouées et ajourées, au lieu d'une mousse compacte. L'eau s'écoule à travers les mailles et l'air y circule librement.",
      },
      {
        q: "Pourquoi sèche-t-elle plus vite qu'une éponge classique ?",
        a: "Sa structure ouverte ne retient pas l'eau en son cœur. Une fois rincée, essorée et suspendue, l'air la traverse de part en part, ce qui accélère le séchage.",
      },
      {
        q: "CHEBKA est-elle antibactérienne ?",
        a: "Non. CHEBKA ne contient aucun traitement antibactérien et nous ne revendiquons aucune propriété de ce type. Son intérêt est structurel : elle se rince facilement et reste moins longtemps humide.",
      },
      {
        q: "Raye-t-elle les surfaces ?",
        a: "Ce point est en cours de vérification sur les différentes surfaces (inox, revêtements anti-adhésifs, verre). Nous préciserons nos recommandations ici. En cas de doute, testez sur une zone peu visible.",
      },
      {
        q: "De quoi est-elle composée ?",
        a: "La composition exacte est en cours de confirmation auprès de notre fournisseur et sera indiquée sur la fiche produit et sur l'emballage.",
      },
    ],
  },
  {
    title: "Utilisation et entretien",
    items: [
      {
        q: "Comment l'utiliser ?",
        a: "Mouillez-la, ajoutez une goutte de liquide vaisselle et frottez. Rincez, essorez, puis suspendez-la pour qu'elle sèche.",
      },
      {
        q: "Comment l'entretenir ?",
        a: "Après chaque usage, rincez-la et laissez-la sécher suspendue à l'air libre. Les conditions de lavage en machine seront précisées une fois validées.",
      },
      {
        q: "Quand la remplacer ?",
        a: "Comme toute éponge, remplacez-la dès qu'elle présente des signes d'usure ou ne vous semble plus propre.",
      },
    ],
  },
  {
    title: "Commande et livraison",
    items: [
      {
        q: "Où livrez-vous ?",
        a: "Nous livrons en France. Les modes, délais et frais de livraison sont affichés avant le paiement.",
      },
      {
        q: "Quels sont les formats disponibles ?",
        a: "CHEBKA est disponible à l'unité (4 € TTC) et en lots de 2, 3 ou 5 éponges.",
      },
      {
        q: "Puis-je retourner ma commande ?",
        a: "Oui, vous disposez d'un délai légal de rétractation de 14 jours à compter de la réception. Les modalités figurent sur la page Livraison et retours.",
      },
      {
        q: "Vendez-vous aux professionnels ?",
        a: "Oui. Centrales d'achat, enseignes et distributeurs peuvent demander une présentation commerciale depuis l'espace professionnels.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={groups.flatMap((g) => g.items)} />
      <PageHero eyebrow="FAQ" title="Questions fréquentes." intro="Tout ce qu'il faut savoir sur CHEBKA, son usage et votre commande." />
      <section className="py-14 md:py-20">
        <div className="container-chebka mx-auto max-w-3xl space-y-14">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-3xl">{g.title}</h2>
              <div className="mt-6 divide-y divide-trait border-y border-trait">
                {g.items.map((item) => (
                  <details key={item.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-trait text-xl transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-nuit-doux">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-nuit-doux">
            Vous ne trouvez pas votre réponse ?{" "}
            <Link href="/contact" className="font-semibold text-rouge underline underline-offset-4">
              Contactez-nous
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
