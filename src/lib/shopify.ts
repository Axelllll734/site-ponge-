import "server-only";

/**
 * Connecteur Shopify (Storefront API).
 *
 * Le site ne gère jamais de paiement lui-même : le panier est transmis à
 * Shopify, qui ouvre son checkout officiel et sécurisé (paiement, adresse,
 * frais de livraison, confirmation de commande, stocks).
 *
 * Variables d'environnement (côté serveur uniquement, jamais exposées) :
 *   SHOPIFY_STORE_DOMAIN               ex. chebka.myshopify.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN    jeton Storefront API
 *   SHOPIFY_API_VERSION                ex. 2025-10 (optionnel)
 *   SHOPIFY_VARIANT_LOT_1 / _2 / _3 / _5   gid://shopify/ProductVariant/…
 */

const VARIANT_ENV: Record<string, string> = {
  "lot-1": "SHOPIFY_VARIANT_LOT_1",
  "lot-2": "SHOPIFY_VARIANT_LOT_2",
  "lot-3": "SHOPIFY_VARIANT_LOT_3",
  "lot-5": "SHOPIFY_VARIANT_LOT_5",
};

export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

export function shopifyVariantId(localVariantId: string): string | null {
  const key = VARIANT_ENV[localVariantId];
  return key ? (process.env[key] ?? null) : null;
}

async function storefront<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION ?? "2025-10";
  if (!domain || !token) throw new Error("Shopify n'est pas configuré.");

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify a répondu ${res.status}.`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join(" · "));
  if (!json.data) throw new Error("Réponse Shopify vide.");
  return json.data;
}

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type CartCreateResult = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

/** Crée un panier Shopify et renvoie l'URL du checkout sécurisé. */
export async function createCheckout(lines: { variantId: string; quantity: number }[]): Promise<string> {
  const merchandise = lines.map((line) => {
    const merchandiseId = shopifyVariantId(line.variantId);
    if (!merchandiseId) throw new Error(`Variante Shopify non configurée pour « ${line.variantId} ».`);
    return { merchandiseId, quantity: line.quantity };
  });

  const data = await storefront<CartCreateResult>(CART_CREATE, {
    input: {
      lines: merchandise,
      buyerIdentity: { countryCode: "FR" },
    },
  });

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length) throw new Error(userErrors.map((e) => e.message).join(" · "));
  if (!cart) throw new Error("Impossible de créer le panier Shopify.");
  return cart.checkoutUrl;
}
