import { company, site } from "@/config/site";
import { product, UNIT_PRICE_CENTS } from "@/lib/catalog";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Données structurées Product (schema.org). Seules les données confirmées sont publiées. */
export function ProductJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        brand: { "@type": "Brand", name: "CHEBKA" },
        color: "Rouge",
        category: "Éponges vaisselle",
        image: [`${site.url}/opengraph-image`],
        url: `${site.url}/produit`,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: (UNIT_PRICE_CENTS / 100).toFixed(2),
          url: `${site.url}/produit`,
          areaServed: "FR",
        },
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.legalName ?? "CHEBKA",
        url: site.url,
        logo: `${site.url}/brand/chebka-logo.svg`,
        ...(company.email ? { email: company.email } : {}),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      }}
    />
  );
}
