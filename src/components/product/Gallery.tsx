"use client";

import { useRef, useState, type ReactNode } from "react";

/** Galerie produit : vignettes + vue principale avec zoom au survol / au toucher. */
export function Gallery({ items }: { items: { key: string; label: string; node: ReactNode; thumb: ReactNode }[] }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frame = useRef<HTMLDivElement>(null);

  const move = (clientX: number, clientY: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setOrigin(`${((clientX - r.left) / r.width) * 100}% ${((clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="flex min-w-0 flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-3 overflow-x-auto pb-1 md:w-20 md:flex-col md:overflow-visible" role="tablist" aria-label="Photos du produit">
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.label}
            onClick={() => {
              setIndex(i);
              setZoom(false);
            }}
            className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl transition md:w-20 ${
              i === index ? "ring-2 ring-nuit ring-offset-2 ring-offset-blanc" : "opacity-70 hover:opacity-100"
            }`}
          >
            {item.thumb}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <div
          ref={frame}
          className={`relative aspect-square overflow-hidden rounded-[1.75rem] bg-creme ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={(e) => move(e.clientX, e.clientY)}
          onClick={(e) => {
            move(e.clientX, e.clientY);
            setZoom((z) => !z);
          }}
          role="tabpanel"
          aria-label={`${items[index].label} — cliquer pour zoomer`}
        >
          <div
            className="h-full w-full transition-transform duration-300 ease-out [&>*]:h-full"
            style={{ transform: zoom ? "scale(2.2)" : "none", transformOrigin: origin }}
          >
            {items[index].node}
          </div>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-blanc/90 px-3 py-1 text-xs font-semibold shadow-sm">
            {zoom ? "Zoom ×2,2" : "Zoom sur le maillage"}
          </span>
        </div>
        <p className="mt-3 text-sm text-nuit-doux">{items[index].label}</p>
      </div>
    </div>
  );
}
