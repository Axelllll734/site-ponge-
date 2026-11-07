import { useId } from "react";

/**
 * Comparaison pédagogique : éponge compacte vs éponge en filet.
 * Schéma de principe — aucune mesure ni résultat microbiologique.
 */

function Compact() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 240 180" className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id={`foam-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.4" fill="#d9c9ae" />
          <circle cx="11" cy="10" r="1.8" fill="#d9c9ae" />
        </pattern>
      </defs>
      <rect x="40" y="52" width="160" height="84" rx="14" fill="#E9DCC8" />
      <rect x="40" y="52" width="160" height="84" rx="14" fill={`url(#foam-${id})`} />
      <rect x="40" y="52" width="160" height="22" rx="10" fill="#B9653E" opacity="0.55" />
      {/* eau retenue dans la masse */}
      <g fill="#7C8BAE" opacity="0.75">
        {[
          [70, 100],
          [98, 118],
          [126, 96],
          [152, 116],
          [176, 100],
          [84, 124],
          [140, 126],
          [110, 90],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 6} q5 7 0 10 q-5 -3 0 -10z`} />
        ))}
      </g>
      {/* air bloqué */}
      <g stroke="#4A5070" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M6 94 h22" />
        <path d="M22 88 l6 6 -6 6" />
        <path d="M8 120 h20" />
        <path d="M22 114 l6 6 -6 6" />
      </g>
      <g stroke="#C83D36" strokeWidth="2" strokeLinecap="round">
        <path d="M30 86 l6 6 M36 86 l-6 6" />
        <path d="M30 116 l6 6 M36 116 l-6 6" />
      </g>
    </svg>
  );
}

function Net() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 240 180" className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id={`n-${id}`} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 9H18M9 0V18" stroke="#C83D36" strokeWidth="2.6" />
          <circle cx="9" cy="9" r="2.4" fill="#C83D36" />
        </pattern>
        <clipPath id={`c-${id}`}>
          <rect x="40" y="52" width="160" height="84" rx="40" />
        </clipPath>
      </defs>
      <g clipPath={`url(#c-${id})`}>
        <rect x="40" y="52" width="160" height="84" fill={`url(#n-${id})`} />
      </g>
      {/* air qui traverse */}
      <g stroke="#4A5070" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {[82, 100, 118].map((y, i) => (
          <g key={y} className="animate-air" style={{ animationDelay: `${i * 0.5}s` }}>
            <path d={`M10 ${y} h44`} />
            <path d={`M48 ${y - 5} l6 5 -6 5`} />
          </g>
        ))}
        {[88, 112].map((y, i) => (
          <g key={y} className="animate-air" style={{ animationDelay: `${0.8 + i * 0.6}s` }}>
            <path d={`M196 ${y} h30`} />
            <path d={`M220 ${y - 5} l6 5 -6 5`} />
          </g>
        ))}
      </g>
      {/* l'eau s'évacue */}
      <g fill="#7C8BAE">
        {[96, 120, 144].map((x, i) => (
          <path key={x} className="animate-drip" style={{ animationDelay: `${i * 0.7}s` }} d={`M${x} 138 q5 7 0 10 q-5 -3 0 -10z`} />
        ))}
      </g>
    </svg>
  );
}

export function DryingComparison() {
  return (
    <figure>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-trait bg-blanc p-6">
          <p className="eyebrow !text-nuit-doux">Éponge classique compacte</p>
          <div className="my-4">
            <Compact />
          </div>
          <ul className="space-y-2 text-sm text-nuit-doux">
            <li>• Une matière dense qui retient l&apos;eau au cœur de l&apos;éponge.</li>
            <li>• L&apos;air circule difficilement à l&apos;intérieur.</li>
            <li>• Elle peut rester humide longtemps après usage.</li>
          </ul>
        </div>
        <div className="rounded-3xl border-2 border-rouge/70 bg-blanc p-6">
          <p className="eyebrow">Éponge en filet CHEBKA</p>
          <div className="my-4">
            <Net />
          </div>
          <ul className="space-y-2 text-sm text-nuit">
            <li>• Un maillage ajouré : l&apos;eau s&apos;écoule à travers les mailles.</li>
            <li>• L&apos;air traverse la structure de part en part.</li>
            <li>• Elle s&apos;essore d&apos;un geste et sèche rapidement.</li>
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-nuit-doux">
        Schéma de principe illustrant la structure des deux types d&apos;éponge. Il ne s&apos;agit pas d&apos;une mesure.
      </figcaption>
    </figure>
  );
}
