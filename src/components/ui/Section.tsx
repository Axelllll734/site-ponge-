import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: H = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <H className="text-[2.15rem] leading-[1.08] sm:text-5xl md:text-[3.4rem]">{title}</H>
      {intro ? <div className="mt-5 text-lg leading-relaxed text-nuit-doux">{intro}</div> : null}
    </Reveal>
  );
}

/** En-tête des pages intérieures. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-creme">
      <div className="container-chebka pb-16 pt-14 md:pb-20 md:pt-20">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        {children}
      </div>
    </section>
  );
}
