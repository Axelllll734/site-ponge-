import Link from "next/link";
import { company, site } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { CookieSettingsLink } from "./CookieBanner";

const columns = [
  {
    title: "Boutique",
    links: [
      { href: "/produit", label: "L'éponge filet" },
      { href: "/panier", label: "Panier" },
      { href: "/livraison-retours", label: "Livraison et retours" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "La marque",
    links: [
      { href: "/avantages", label: "Les avantages" },
      { href: "/notre-histoire", label: "Notre histoire" },
      { href: "/professionnels", label: "Professionnels" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/cgv", label: "CGV" },
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/cookies", label: "Cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-nuit text-blanc">
      <div className="container-chebka grid gap-12 py-16 md:grid-cols-[1.3fr_2fr] md:py-20">
        <div>
          <Link href="/" aria-label="CHEBKA — accueil">
            <Logo tone="blanc" />
          </Link>
          <p className="mt-5 max-w-xs font-serif text-xl leading-snug text-blanc/90">{site.signature}</p>
          <p className="mt-4 max-w-xs text-sm text-blanc/60">
            L&apos;éponge en filet de pêche qui facilite le rinçage et sèche rapidement.
          </p>
          {(company.instagram || company.linkedin) && (
            <div className="mt-6 flex gap-4 text-sm">
              {company.instagram && (
                <a href={company.instagram} className="link-underline" rel="noopener" target="_blank">
                  Instagram
                </a>
              )}
              {company.linkedin && (
                <a href={company.linkedin} className="link-underline" rel="noopener" target="_blank">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-kraft">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-blanc/80">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline hover:text-blanc">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Informations" && (
                  <li>
                    <CookieSettingsLink className="link-underline text-left hover:text-blanc" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-blanc/10">
        <div className="container-chebka flex flex-col gap-2 py-6 text-xs text-blanc/50 sm:flex-row sm:justify-between">
          <p>© CHEBKA — Tous droits réservés.</p>
          <p>Prix en euros TTC · Livraison en France</p>
        </div>
      </div>
    </footer>
  );
}
