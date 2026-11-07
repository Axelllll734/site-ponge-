import { ImageResponse } from "next/og";

export const alt = "CHEBKA — L'éponge en filet de pêche qui sèche vite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Visuel de partage (réseaux sociaux) généré à partir de l'identité CHEBKA. */
export default async function Image() {
  const lines = Array.from({ length: 34 }, (_, i) => i * 36 - 300);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3EEE5", fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 640 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#C83D36", fontFamily: "sans-serif", fontWeight: 700 }}>
            L&apos;ÉPONGE EN FILET DE PÊCHE
          </div>
          <div style={{ fontSize: 112, color: "#202747", letterSpacing: 14, marginTop: 18, fontWeight: 700 }}>CHEBKA</div>
          <div style={{ fontSize: 40, color: "#202747", marginTop: 18, lineHeight: 1.2 }}>
            Elle sèche vite. C&apos;est toute la différence.
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 26, color: "#4A5070", fontFamily: "sans-serif" }}>
            4 € TTC · Livraison en France
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", background: "#CBA77F" }}>
          <svg width="420" height="420" viewBox="0 0 420 420">
            <circle cx="210" cy="210" r="200" fill="#202747" />
            <clipPath id="c">
              <circle cx="210" cy="210" r="184" />
            </clipPath>
            <g clipPath="url(#c)" stroke="#C83D36" strokeWidth="7">
              {lines.map((o) => (
                <line key={`a${o}`} x1={o} y1="0" x2={o + 420} y2="420" />
              ))}
              {lines.map((o) => (
                <line key={`b${o}`} x1={o + 420} y1="0" x2={o} y2="420" />
              ))}
            </g>
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
