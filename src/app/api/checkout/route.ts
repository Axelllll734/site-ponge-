import { NextResponse } from "next/server";
import { getVariant } from "@/lib/catalog";
import { createCheckout, isShopifyConfigured } from "@/lib/shopify";

type Body = { lines?: { variantId?: unknown; quantity?: unknown }[] };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const lines = (body.lines ?? [])
    .map((l) => ({ variantId: String(l.variantId ?? ""), quantity: Number(l.quantity) }))
    .filter((l) => getVariant(l.variantId) && Number.isInteger(l.quantity) && l.quantity > 0 && l.quantity <= 99);

  if (lines.length === 0) {
    return NextResponse.json({ error: "Votre panier est vide." }, { status: 400 });
  }

  if (!isShopifyConfigured()) {
    return NextResponse.json(
      {
        error:
          "Le paiement en ligne n'est pas encore activé : la boutique est en cours de configuration. Aucune commande n'a été passée et aucun paiement n'a été demandé.",
        code: "CHECKOUT_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  try {
    const checkoutUrl = await createCheckout(lines);
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { error: "Le paiement sécurisé est momentanément indisponible. Merci de réessayer dans quelques instants." },
      { status: 502 },
    );
  }
}
