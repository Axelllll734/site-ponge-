type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IconMesh = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...base}>
    <path d="M4 10l6-6M4 18L18 4M4 26L26 4M10 28L28 10M18 28l10-10M4 22l6 6M4 14l14 14M4 6l22 22M14 4l14 14M22 4l6 6" />
  </svg>
);
export const IconAir = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...base}>
    <path d="M4 12h15a4 4 0 1 0-4-4M4 18h20a4 4 0 1 1-4 4M4 24h8" />
  </svg>
);
export const IconDrop = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...base}>
    <path d="M16 4c5 6.5 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8.5 8-15z" />
    <path d="M12 20a4 4 0 0 0 4 4" />
  </svg>
);
export const IconHook = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...base}>
    <path d="M16 3v8a5 5 0 1 1-5 5" />
    <path d="M10 22h12l-2 7h-8z" />
  </svg>
);
export const IconHand = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...base}>
    <path d="M10 16V7a2 2 0 0 1 4 0v8M14 14V5a2 2 0 0 1 4 0v9M18 14V7a2 2 0 0 1 4 0v10c0 6-3.5 10-9 10-4 0-6-2-8.5-6L3 17.5a2 2 0 0 1 3.2-2.4L10 19" />
  </svg>
);
export const IconBag = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M5 8h14l-1 12H6z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const IconArrow = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconTruck = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M2 6h12v10H2zM14 10h4l3 3v3h-7" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);
export const IconLock = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
export const IconLeaf = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16zM4 20l8-8" />
  </svg>
);
export const IconSun = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
  </svg>
);
export const IconClose = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconMenu = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const IconPlus = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMinus = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
    <path d="M5 12h14" />
  </svg>
);
export const IconCheck = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
