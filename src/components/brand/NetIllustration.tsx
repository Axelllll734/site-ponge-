import { useId } from "react";

/**
 * Illustrations vectorielles de l'éponge en filet rouge.
 * Elles servent d'illustrations de principe tant que les photographies
 * réelles du produit ne sont pas fournies — elles ne se présentent jamais
 * comme des photos.
 */

export type NetScene = "hero" | "macro" | "water" | "hanging" | "packaging" | "kitchen" | "group" | "story";

const ROUGE = "#C83D36";
const ROUGE_OMBRE = "#8E2924";
const ROLL = "M64 150 C62 96 118 80 200 82 C286 84 338 98 338 150 C338 204 286 220 200 218 C116 216 66 204 64 150Z";

function Defs({ id, cell = 17, stroke = 2.3, displace = 7 }: { id: string; cell?: number; stroke?: number; displace?: number }) {
  const h = cell / 2;
  return (
    <defs>
      <pattern id={`mesh-${id}`} width={cell} height={cell} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d={`M0 ${h}H${cell}M${h} 0V${cell}`} stroke={ROUGE} strokeWidth={stroke} />
        <circle cx={h} cy={h} r={stroke * 0.95} fill={ROUGE} />
      </pattern>
      <pattern
        id={`back-${id}`}
        width={cell}
        height={cell}
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(38) translate(${h / 2} ${h / 3})`}
      >
        <path d={`M0 ${h}H${cell}M${h} 0V${cell}`} stroke={ROUGE_OMBRE} strokeWidth={stroke * 0.9} />
      </pattern>
      <filter id={`wave-${id}`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale={displace} />
      </filter>
      <radialGradient id={`light-${id}`} cx="35%" cy="28%" r="80%">
        <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
        <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#202747" stopOpacity="0.28" />
      </radialGradient>
      <radialGradient id={`shadow-${id}`}>
        <stop offset="0" stopColor="#202747" stopOpacity="0.22" />
        <stop offset="1" stopColor="#202747" stopOpacity="0" />
      </radialGradient>
      <clipPath id={`roll-${id}`}>
        <path d={ROLL} />
      </clipPath>
    </defs>
  );
}

/** Éponge roulée — l'objet signature. */
function Roll({ id, band = false }: { id: string; band?: boolean }) {
  return (
    <g>
      <ellipse cx="204" cy="226" rx="150" ry="16" fill={`url(#shadow-${id})`} />
      <g clipPath={`url(#roll-${id})`} filter={`url(#wave-${id})`}>
        <path d={ROLL} fill="#F3EEE5" opacity="0.35" />
        <rect x="40" y="60" width="320" height="180" fill={`url(#back-${id})`} opacity="0.75" />
        <rect x="40" y="60" width="320" height="180" fill={`url(#mesh-${id})`} />
        <rect x="40" y="60" width="320" height="180" fill={`url(#light-${id})`} />
      </g>
      {/* plis du roulage */}
      <g fill="none" stroke={ROUGE_OMBRE} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" filter={`url(#wave-${id})`}>
        <path d="M84 118 C140 104 260 104 318 120" />
        <path d="M76 168 C150 186 262 186 326 166" />
        <path d="M110 96 C88 128 90 176 116 206" />
      </g>
      {band ? (
        <g>
          <path d="M168 81 C188 80 214 80 236 81 L236 219 C214 220 188 220 168 219 Z" fill="#CBA77F" />
          <path d="M168 81 C188 80 214 80 236 81 L236 219 C214 220 188 220 168 219 Z" fill={`url(#light-${id})`} />
          <text
            x="202"
            y="146"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontWeight="700"
            fontSize="14"
            letterSpacing="2.2"
            fill="#202747"
          >
            CHEBKA
          </text>
          <text x="202" y="162" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="6.5" letterSpacing="1.4" fill="#202747">
            ÉPONGE FILET
          </text>
          <line x1="186" y1="172" x2="218" y2="172" stroke="#C83D36" strokeWidth="1.5" />
        </g>
      ) : null}
    </g>
  );
}

function Drops({ x, y, n = 4 }: { x: number; y: number; n?: number }) {
  return (
    <g fill="#7C8BAE" opacity="0.7">
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          className="animate-drip"
          style={{ animationDelay: `${i * 0.6}s` }}
          d={`M${x + i * 26 - (n * 13)} ${y} q4 7 0 10 q-4 -3 0 -10z`}
        />
      ))}
    </g>
  );
}

export function NetIllustration({ scene, className = "" }: { scene: NetScene; className?: string }) {
  const id = useId().replace(/:/g, "");

  if (scene === "macro") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
        <Defs id={id} cell={64} stroke={7} displace={18} />
        <rect width="400" height="300" fill="#FAF9F6" />
        <g filter={`url(#wave-${id})`}>
          <rect x="-40" y="-40" width="480" height="380" fill={`url(#back-${id})`} opacity="0.35" transform="translate(6 8)" />
          <rect x="-40" y="-40" width="480" height="380" fill={`url(#mesh-${id})`} />
        </g>
        <rect width="400" height="300" fill={`url(#light-${id})`} />
      </svg>
    );
  }

  const backgrounds: Record<NetScene, string> = {
    hero: "#F3EEE5",
    macro: "#FAF9F6",
    water: "#EEF0F2",
    hanging: "#FAF9F6",
    packaging: "#F3EEE5",
    kitchen: "#F3EEE5",
    group: "#FAF9F6",
    story: "#E9DCC8",
  };

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ backgroundColor: backgrounds[scene] }}
      aria-hidden="true"
    >
      <Defs id={id} />
      
      {scene === "hero" && <Roll id={id} />}

      {scene === "packaging" && <Roll id={id} band />}

      {scene === "story" && (
        <g>
          <rect y="236" width="400" height="64" fill="#CBA77F" opacity="0.55" />
          <g transform="translate(0 6)">
            <Roll id={id} />
          </g>
        </g>
      )}

      {scene === "water" && (
        <g>
          <rect x="188" y="0" width="22" height="120" fill="#C9D3E3" opacity="0.8" rx="11" />
          <rect x="194" y="0" width="6" height="110" fill="#fff" opacity="0.7" rx="3" />
          <Roll id={id} />
          <Drops x={210} y={232} n={5} />
        </g>
      )}

      {scene === "hanging" && (
        <g>
          <path d="M200 10 v22 a10 10 0 1 1 -10 10" fill="none" stroke="#202747" strokeWidth="3" strokeLinecap="round" />
          <line x1="200" y1="52" x2="200" y2="66" stroke="#CBA77F" strokeWidth="2" />
          <g transform="translate(200 160) rotate(90) scale(0.62) translate(-200 -150)">
            <Roll id={id} />
          </g>
          <Drops x={214} y={262} n={3} />
        </g>
      )}

      {scene === "kitchen" && (
        <g>
          <rect y="210" width="400" height="90" fill="#E2CFB5" />
          <rect x="230" y="150" width="190" height="70" rx="18" fill="#FAF9F6" stroke="#E4DCCF" strokeWidth="2" />
          <path d="M300 60 v40 q0 14 14 14 h14" fill="none" stroke="#4A5070" strokeWidth="6" strokeLinecap="round" />
          <g transform="translate(-34 52) scale(0.62)">
            <Roll id={id} />
          </g>
        </g>
      )}

      {scene === "group" && (
        <g>
          <g transform="translate(-20 -12) scale(0.56)">
            <Roll id={id} />
          </g>
          <g transform="translate(170 8) scale(0.56) rotate(-8 200 150)">
            <Roll id={id} />
          </g>
          <g transform="translate(70 110) scale(0.56) rotate(6 200 150)">
            <Roll id={id} />
          </g>
        </g>
      )}
    </svg>
  );
}
