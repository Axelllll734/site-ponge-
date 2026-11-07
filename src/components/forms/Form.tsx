"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { IconCheck } from "@/components/ui/Icons";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  half?: boolean;
  placeholder?: string;
};

type Result = { ok: boolean; delivered?: boolean; errors?: Record<string, string>; message?: string };

/** Formulaire générique : validation navigateur + serveur, anti-spam, consentement RGPD. */
export function Form({
  endpoint,
  fields,
  submitLabel,
  successTitle,
  successText,
}: {
  endpoint: string;
  fields: FieldDef[];
  submitLabel: string;
  successTitle: string;
  successText: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [result, setResult] = useState<Result | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as Result;
      setResult(json);
      setStatus(json.ok ? "done" : "idle");
    } catch {
      setResult({ ok: false, message: "Connexion impossible. Merci de réessayer." });
      setStatus("idle");
    }
  };

  if (status === "done" && result?.ok) {
    return (
      <div role="status" className="rounded-3xl bg-creme p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rouge text-blanc">
          <IconCheck />
        </span>
        {result.delivered ? (
          <>
            <p className="mt-5 font-serif text-2xl">{successTitle}</p>
            <p className="mt-2 text-nuit-doux">{successText}</p>
          </>
        ) : (
          <>
            <p className="mt-5 font-serif text-2xl">Formulaire valide</p>
            <p className="mt-2 text-nuit-doux">
              L&apos;envoi automatique des messages n&apos;est pas encore activé sur ce site (configuration en cours).
              Votre message n&apos;a donc pas été transmis : merci de réessayer prochainement.
            </p>
          </>
        )}
      </div>
    );
  }

  const err = result?.errors ?? {};

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const common = {
          id,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          placeholder: f.placeholder,
          "aria-invalid": err[f.name] ? true : undefined,
          "aria-describedby": err[f.name] ? `${id}-err` : undefined,
          className: "field",
        } as const;
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
              {f.label}
              {f.required ? <span className="text-rouge"> *</span> : <span className="font-normal text-nuit-doux"> (facultatif)</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={6} maxLength={5000} />
            ) : f.type === "select" ? (
              <select {...common} defaultValue="">
                <option value="" disabled>
                  Choisir…
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} maxLength={200} />
            )}
            {err[f.name] ? (
              <p id={`${id}-err`} className="mt-1 text-sm text-rouge">
                {err[f.name]}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Champ piège anti-robots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#C83D36]" />
        <span className="text-nuit-doux">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
          <Link href="/confidentialite" className="underline underline-offset-4">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      {err.consent ? <p className="-mt-3 text-sm text-rouge sm:col-span-2">{err.consent}</p> : null}

      {result?.message && !result.ok ? (
        <p role="alert" className="rounded-2xl bg-creme p-4 text-sm sm:col-span-2">
          {result.message}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
