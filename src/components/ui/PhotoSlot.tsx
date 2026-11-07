import Image from "next/image";
import { photos, type PhotoSlotId } from "@/config/media";
import { NetIllustration, type NetScene } from "@/components/brand/NetIllustration";

const sceneFor: Record<PhotoSlotId, NetScene> = {
  hero: "hero",
  macro: "macro",
  underwater: "water",
  hanging: "hanging",
  packaging: "packaging",
  kitchen: "kitchen",
  group: "group",
  "detail-texture": "macro",
  "detail-color": "hero",
  "detail-softness": "hanging",
  story: "story",
};

/**
 * Emplacement photographique.
 * - Photo réelle renseignée dans src/config/media.ts → affichée (optimisée).
 * - Sinon → illustration + libellé « Emplacement photo » clairement visible.
 */
export function PhotoSlot({
  id,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showLabel = true,
}: {
  id: PhotoSlotId;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showLabel?: boolean;
}) {
  const photo = photos[id];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <div role="img" aria-label={`Illustration provisoire : ${photo.alt}`} className="absolute inset-0">
            <NetIllustration scene={sceneFor[id]} className="h-full w-full" />
          </div>
          {showLabel ? (
            <span className="absolute bottom-3 left-3 right-3 flex max-w-max items-start gap-2 rounded-full bg-blanc/85 px-3 py-1.5 text-[0.68rem] font-medium leading-snug text-nuit-doux shadow-sm backdrop-blur">
              <svg viewBox="0 0 16 16" className="mt-px h-3 w-3 shrink-0" aria-hidden="true">
                <rect x="1.5" y="3.5" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="8.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 3.5l1-1.5h3l1 1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span>
                <strong className="font-semibold">Emplacement photo</strong> · {photo.brief}
              </span>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
