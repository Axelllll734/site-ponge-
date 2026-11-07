"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Bandeau de consentement (CNIL) : « Tout refuser » aussi visible que
 * « Tout accepter ». Le site n'utilise aujourd'hui aucun traceur soumis à
 * consentement ; le choix est mémorisé pour les futurs outils de mesure.
 * Lire le consentement : getCookieConsent().
 */

const KEY = "chebka-consent-v1";
const EVENT = "chebka:open-cookie-settings";
export type Consent = { analytics: boolean; date: string };

export function getCookieConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENT))}>
      Gérer les cookies
    </button>
  );
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!getCookieConsent()) setOpen(true);
    }, 600);
    const reopen = () => setOpen(true);
    window.addEventListener(EVENT, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(EVENT, reopen);
    };
  }, []);

  const save = (analytics: boolean) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ analytics, date: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="animate-toast fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-3xl border border-trait bg-blanc p-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:p-6"
    >
      <p id="cookie-title" className="font-serif text-lg">
        Vos préférences de cookies
      </p>
      <p className="mt-2 text-sm leading-relaxed text-nuit-doux">
        Nous utilisons uniquement le stockage nécessaire au fonctionnement du site (panier). Avec votre accord, nous
        pourrons mesurer l&apos;audience afin d&apos;améliorer le site. Vous pouvez changer d&apos;avis à tout moment.{" "}
        <Link href="/cookies" className="underline underline-offset-4">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button type="button" className="btn btn-secondary flex-1 !py-2.5" onClick={() => save(false)}>
          Tout refuser
        </button>
        <button type="button" className="btn btn-nuit flex-1 !py-2.5" onClick={() => save(true)}>
          Tout accepter
        </button>
      </div>
    </div>
  );
}
