import Link from "next/link";
import { NetIllustration } from "@/components/brand/NetIllustration";

export default function NotFound() {
  return (
    <section className="container-chebka py-20 text-center md:py-28">
      <div className="mx-auto aspect-[4/3] w-64 overflow-hidden rounded-3xl">
        <NetIllustration scene="macro" className="h-full w-full" />
      </div>
      <p className="eyebrow mt-10">Erreur 404</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Cette page est passée entre les mailles.</h1>
      <p className="mt-4 text-nuit-doux">La page demandée n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
