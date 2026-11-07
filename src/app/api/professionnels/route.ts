import { NextResponse } from "next/server";
import { handleForm, type FieldRule } from "@/lib/forms";

const rules: Record<string, FieldRule> = {
  lastName: { label: "Nom", required: true, max: 120 },
  firstName: { label: "Prénom", required: true, max: 120 },
  company: { label: "Société", required: true, max: 160 },
  role: { label: "Fonction", required: true, max: 160 },
  email: { label: "E-mail professionnel", required: true, max: 200, type: "email" },
  phone: { label: "Téléphone", required: false, max: 30, type: "phone" },
  message: { label: "Message", required: true, max: 5000 },
};

export async function POST(request: Request) {
  const { status, body } = await handleForm(
    request,
    rules,
    (v) => `[Professionnels] Demande de présentation — ${v.company}`,
  );
  return NextResponse.json(body, { status });
}
