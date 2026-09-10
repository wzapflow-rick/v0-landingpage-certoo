import Image from "next/image";
import { MagneticButton } from "@/components/landing/motion-primitives";
import { landingLinks } from "@/lib/landing-content";

export function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="overflow-hidden bg-foreground text-background"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-7">
          <p className="eyebrow text-accent">Sua receita. Nosso fluxo.</p>
          <h2
            id="cta-heading"
            className="text-balance text-5xl leading-[1.04] tracking-[-0.055em] sm:text-7xl"
          >
            Seu próximo pedido pode começar aqui.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-background/70">
            Teste o Parceria por 7 dias. Depois, R$ 29,90/mês. Cancele quando
            quiser.
          </p>
          <MagneticButton href={landingLinks.partnership}>
            Colocar meu negócio no fluxo
          </MagneticButton>
        </div>
        <Image
          src="/images/landing/pizza-cutout.webp"
          alt="Pizza artesanal com uma fatia de pepperoni e queijo"
          width={1024}
          height={1024}
          sizes="(min-width: 768px) 40vw, 90vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
