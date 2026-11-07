import { useId } from "react";
import { company, productSpecs } from "@/config/site";

/**
 * Packaging CHEBKA — évolution de la « Piste A » :
 * bande kraft conservée, filet rouge (et non cuivré), nom CHEBKA lisible,
 * graphisme contemporain sans référence touristique.
 */

function MeshWindow() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`pk-${id}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 8H16M8 0V16" stroke="#C83D36" strokeWidth="2.6" />
          <circle cx="8" cy="8" r="2.3" fill="#C83D36" />
        </pattern>
        <filter id={`pkw-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
        <clipPath id={`pkc-${id}`}>
          <circle cx="100" cy="100" r="88" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="96" fill="#202747" />
      <g clipPath={`url(#pkc-${id})`}>
        <rect width="200" height="200" fill="#2A3157" />
        <rect width="200" height="200" fill={`url(#pk-${id})`} filter={`url(#pkw-${id})`} />
      </g>
    </svg>
  );
}

export function PackagingFront({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-square w-full bg-kraft p-[6%] text-nuit [container-type:inline-size] shadow-[0_30px_60px_-30px_rgba(32,39,71,0.45)] ${className}`}
      role="img"
      aria-label="Recto du packaging CHEBKA : fenêtre ronde sur le filet rouge, nom CHEBKA et accroche."
    >
      <div className="flex h-full flex-col items-center justify-between border border-nuit/40 px-[6%] py-[7%] text-center">
        <p className="text-[3cqw] font-bold tracking-[0.3em]">ÉPONGE FILET</p>
        <div className="aspect-square w-[52%]">
          <MeshWindow />
        </div>
        <div>
          <p className="font-serif text-[12cqw] font-semibold leading-none tracking-[0.12em]">CHEBKA</p>
          <p className="mt-[2cqw] text-[3.5cqw]">Elle sèche vite. C&apos;est toute la différence.</p>
          <span className="mx-auto mt-3 block h-[2px] w-8 bg-rouge" />
        </div>
      </div>
    </div>
  );
}

function Line({ label, value, draft }: { label: string; value: string | null; draft?: string }) {
  return (
    <div className="grid grid-cols-[40%_1fr] gap-2">
      <dt className="font-semibold">{label}</dt>
      <dd className={value ? "" : "italic opacity-75"}>{value ?? draft ?? "[à confirmer]"}</dd>
    </div>
  );
}

export function PackagingBack({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-square w-full bg-kraft p-[6%] text-nuit [container-type:inline-size] shadow-[0_30px_60px_-30px_rgba(32,39,71,0.45)] ${className}`}
      role="img"
      aria-label="Verso du packaging CHEBKA : mode d'emploi, entretien, composition, origine et zones réglementaires."
    >
      <div className="flex h-full flex-col border border-nuit/40 p-[6%] text-[3.3cqw] leading-snug">
        <p className="font-serif text-[1.35em] font-semibold">Mode d&apos;emploi</p>
        <p className="mt-1">
          Mouillez, ajoutez une goutte de liquide vaisselle et frottez. Rincez, essorez, puis suspendez-la pour
          qu&apos;elle sèche.
        </p>
        <p className="mt-3 font-serif text-[1.35em] font-semibold">Entretien</p>
        <p className="mt-1">
          {productSpecs.washTemperature ? `Lavable en machine à ${productSpecs.washTemperature}.` : "[Conditions d'entretien à confirmer]"}
        </p>
        <hr className="my-3 border-nuit/40" />
        <dl className="space-y-1">
          <Line label="Composition" value={productSpecs.composition} draft="[100 % polyamide, à confirmer]" />
          <Line label="Fabriqué en" value={productSpecs.manufacturingCountry} draft="[pays à confirmer]" />
          <Line label="Lot" value={null} draft="[zone tampon]" />
        </dl>
        <p className="mt-2 opacity-90">
          CHEBKA · {company.address ?? "[adresse en France]"} · {company.email ?? "[e-mail]"}
        </p>
        <div className="mt-auto flex gap-[4%] pt-3">
          <div className="flex flex-1 items-center justify-center border border-dashed border-nuit/60 py-[5%] text-center font-semibold">
            {productSpecs.sortingInfo ?? "[Info-tri]"}
          </div>
          <div className="flex aspect-square w-[22%] items-center justify-center border border-dashed border-nuit/60 font-semibold">
            [QR]
          </div>
        </div>
      </div>
    </div>
  );
}
