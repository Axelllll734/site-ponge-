import { labResults } from "@/config/site";

/**
 * Espace « Résultats de tests ». Vide tant qu'aucun test indépendant n'a été
 * réalisé : on l'indique honnêtement au lieu d'afficher des chiffres.
 */
export function LabResults({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const box = dark ? "border-blanc/15 bg-blanc/[0.04] text-blanc" : "border-trait bg-blanc text-nuit";
  const muted = dark ? "text-blanc/70" : "text-nuit-doux";

  if (labResults.length === 0) {
    return (
      <div className={`rounded-3xl border border-dashed p-6 md:p-8 ${box}`}>
        <p className={`eyebrow ${dark ? "!text-kraft" : ""}`}>Tests en laboratoire</p>
        <p className="mt-3 font-serif text-xl">Des tests indépendants sont à venir.</p>
        <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
          Nous ne publierons des résultats chiffrés (temps de séchage, analyses microbiologiques) qu&apos;une fois
          obtenus auprès d&apos;un laboratoire indépendant. Cette section sera alors complétée.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {labResults.map((r) => (
        <article key={r.title} className={`rounded-3xl border p-6 md:p-8 ${box}`}>
          <p className={`eyebrow ${dark ? "!text-kraft" : ""}`}>
            {r.lab} · {r.date}
          </p>
          <h3 className="mt-3 font-serif text-xl">{r.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{r.summary}</p>
          {r.pdf ? (
            <a href={r.pdf} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">
              Télécharger le rapport (PDF)
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
