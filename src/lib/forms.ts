import "server-only";

/**
 * Validation et acheminement des formulaires (contact et professionnels).
 *
 * Envoi e-mail via l'API Resend si configurée :
 *   RESEND_API_KEY        clé API Resend (serveur uniquement)
 *   FORMS_TO_EMAIL        adresse qui reçoit les messages
 *   FORMS_FROM_EMAIL      expéditeur vérifié, ex. "CHEBKA <site@chebka.fr>"
 * Sans configuration, le formulaire est validé mais le message n'est pas
 * acheminé : la réponse l'indique honnêtement à l'utilisateur.
 */

export type FieldRule = {
  label: string;
  required?: boolean;
  max: number;
  type?: "email" | "phone";
};

export type FormResult =
  | { ok: true; delivered: boolean }
  | { ok: false; errors: Record<string, string>; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s.()-]{5,24}$/;

export function validate(
  input: Record<string, unknown>,
  rules: Record<string, FieldRule>,
): { values: Record<string, string>; errors: Record<string, string> } {
  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const [name, rule] of Object.entries(rules)) {
    const raw = typeof input[name] === "string" ? (input[name] as string).trim() : "";
    values[name] = raw;
    if (rule.required && !raw) {
      errors[name] = `${rule.label} : champ requis.`;
    } else if (raw.length > rule.max) {
      errors[name] = `${rule.label} : ${rule.max} caractères maximum.`;
    } else if (raw && rule.type === "email" && !EMAIL_RE.test(raw)) {
      errors[name] = "Adresse e-mail invalide.";
    } else if (raw && rule.type === "phone" && !PHONE_RE.test(raw)) {
      errors[name] = "Numéro de téléphone invalide.";
    }
  }

  if (input.consent !== true && input.consent !== "on" && input.consent !== "true") {
    errors.consent = "Merci d'accepter le traitement de vos données pour que nous puissions vous répondre.";
  }

  return { values, errors };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function deliver(
  subject: string,
  values: Record<string, string>,
  rules: Record<string, FieldRule>,
  replyTo?: string,
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL;
  const from = process.env.FORMS_FROM_EMAIL;
  if (!key || !to || !from) {
    console.info(`[forms] « ${subject} » validé mais non acheminé : envoi e-mail non configuré.`);
    return false;
  }

  const rows = Object.entries(rules)
    .map(
      ([name, rule]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#4a5070"><strong>${escapeHtml(rule.label)}</strong></td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(values[name] || "—")}</td></tr>`,
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      reply_to: replyTo,
      html: `<h2 style="font-family:Georgia,serif;color:#202747">${escapeHtml(subject)}</h2><table>${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[forms] échec d'envoi", res.status, await res.text());
    throw new Error("Envoi impossible");
  }
  return true;
}

export async function handleForm(
  request: Request,
  rules: Record<string, FieldRule>,
  subject: (values: Record<string, string>) => string,
): Promise<{ status: number; body: FormResult }> {
  let input: Record<string, unknown>;
  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return { status: 400, body: { ok: false, errors: {}, message: "Requête invalide." } };
  }

  // Champ piège anti-robots : invisible pour les humains.
  if (typeof input.website === "string" && input.website.length > 0) {
    return { status: 200, body: { ok: true, delivered: true } };
  }

  const { values, errors } = validate(input, rules);
  if (Object.keys(errors).length) {
    return { status: 422, body: { ok: false, errors, message: "Merci de vérifier les champs indiqués." } };
  }

  try {
    const delivered = await deliver(subject(values), values, rules, values.email);
    return { status: 200, body: { ok: true, delivered } };
  } catch {
    return {
      status: 502,
      body: { ok: false, errors: {}, message: "L'envoi a échoué. Merci de réessayer dans quelques instants." },
    };
  }
}
