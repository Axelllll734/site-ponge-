import type { ReactNode } from "react";
import { PageHero } from "./Section";

/** Gabarit des pages juridiques et d'aide. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  draft = true,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  draft?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="py-14 md:py-20">
        <div className="container-chebka">
          <div className="mx-auto max-w-3xl">
            {draft ? (
              <p className="mb-10 rounded-2xl border border-dashed border-kraft bg-creme p-4 text-sm text-nuit-doux">
                <strong className="text-terracotta">Document en cours de finalisation.</strong> Les informations
                marquées « à confirmer » doivent être complétées, et le texte validé par un professionnel du droit avant
                l&apos;ouverture de la boutique.
              </p>
            ) : null}
            <div className="prose-chebka">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
