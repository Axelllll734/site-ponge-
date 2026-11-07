import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { Form, type FieldDef } from "@/components/forms/Form";
import { Pending } from "@/components/ui/Pending";
import { company } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur CHEBKA, une commande ou un partenariat ? Contactez-nous.",
  alternates: { canonical: "/contact" },
};

const fields: FieldDef[] = [
  { name: "name", label: "Nom", required: true, autoComplete: "name", half: true },
  { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email", half: true },
  {
    name: "subject",
    label: "Objet",
    type: "select",
    required: true,
    options: ["Question sur le produit", "Ma commande", "Livraison ou retour", "Partenariat professionnel", "Presse", "Autre"],
  },
  { name: "message", label: "Message", type: "textarea", required: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Écrivez-nous." intro="Une question sur l'éponge, une commande, un partenariat ? Nous vous répondons avec plaisir." />
      <section className="py-16 md:py-24">
        <div className="container-chebka grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <aside className="space-y-8">
            <div>
              <p className="eyebrow">Coordonnées</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold">E-mail</dt>
                  <dd className="mt-1">
                    {company.email ? <a href={`mailto:${company.email}`} className="underline underline-offset-4">{company.email}</a> : <Pending value={null} />}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Téléphone</dt>
                  <dd className="mt-1">
                    <Pending value={company.phone} />
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Adresse</dt>
                  <dd className="mt-1">
                    <Pending value={company.address} />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-3xl bg-creme p-6 text-sm">
              <p className="font-semibold">Vous êtes un professionnel ?</p>
              <p className="mt-1 text-nuit-doux">Centrales d&apos;achat, enseignes, distributeurs : utilisez notre formulaire dédié.</p>
              <Link href="/professionnels#demande" className="mt-3 inline-block font-semibold text-rouge underline underline-offset-4">
                Espace professionnels
              </Link>
            </div>
            <div className="text-sm text-nuit-doux">
              Consultez aussi notre{" "}
              <Link href="/faq" className="underline underline-offset-4">
                FAQ
              </Link>{" "}
              et nos{" "}
              <Link href="/livraison-retours" className="underline underline-offset-4">
                conditions de livraison et de retour
              </Link>
              .
            </div>
          </aside>
          <div className="rounded-[2rem] border border-trait p-6 md:p-10">
            <Form endpoint="/api/contact" fields={fields} submitLabel="Envoyer le message" successTitle="Message envoyé." successText="Merci ! Nous vous répondons dans les meilleurs délais." />
          </div>
        </div>
      </section>
    </>
  );
}
