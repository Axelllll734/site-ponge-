import { useId } from "react";

/** Monogramme : une fenêtre ronde sur le maillage, comme sur le packaging. */
export function LogoMark({ className = "h-8 w-8", title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 40" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id={`lm-${id}`}>
          <circle cx="20" cy="20" r="15.5" />
        </clipPath>
      </defs>
      <circle cx="20" cy="20" r="19" fill="#C83D36" />
      <g clipPath={`url(#lm-${id})`} stroke="#FAF9F6" strokeWidth="1.6" strokeLinecap="round" opacity="0.95">
        {[-24, -16, -8, 0, 8, 16, 24].map((o) => (
          <g key={o}>
            <line x1={o} y1="0" x2={o + 40} y2="40" />
            <line x1={o + 40} y1="0" x2={o} y2="40" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Logo complet : monogramme + logotype CHEBKA. */
export function Logo({ className = "", tone = "nuit" }: { className?: string; tone?: "nuit" | "blanc" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span
        className={`font-serif text-[1.45rem] font-semibold leading-none tracking-[0.14em] ${
          tone === "blanc" ? "text-blanc" : "text-nuit"
        }`}
      >
        CHEBKA
      </span>
    </span>
  );
}
