import { NextResponse } from "next/server";
import { handleForm, type FieldRule } from "@/lib/forms";

const rules: Record<string, FieldRule> = {
  name: { label: "Nom", required: true, max: 120 },
  email: { label: "E-mail", required: true, max: 200, type: "email" },
  subject: { label: "Objet", required: true, max: 160 },
  message: { label: "Message", required: true, max: 5000 },
};

export async function POST(request: Request) {
  const { status, body } = await handleForm(request, rules, (v) => `[Contact] ${v.subject}`);
  return NextResponse.json(body, { status });
}
