import type { ReactNode } from "react";

/** Affiche la valeur si elle est confirmée, sinon un marqueur « à confirmer ». */
export function Pending({ value, fallback = "À confirmer" }: { value: ReactNode | null | undefined; fallback?: string }) {
  if (value !== null && value !== undefined && value !== "") return <>{value}</>;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-kraft px-2.5 py-0.5 text-[0.8em] font-medium text-terracotta">
      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
      {fallback}
    </span>
  );
}
