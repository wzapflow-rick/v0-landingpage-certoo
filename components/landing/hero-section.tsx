"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { landingLinks } from "@/lib/landing-content";

export function HeroSection() {
  const target = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  return (
    <section
      ref={target}
      id="inicio"
      aria-labelledby="hero-title"
      className="cinema-hero bg-foreground text-background"
    >
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow text-accent">
            <span className="inline-block size-2 rounded-full bg-accent" /> O
            seu negócio. No seu ritmo.
          </p>
          <h1 id="hero-title" className="hero-heading font-sans">
            Do cardápio
            <br />
            ao pedido.
            <br />
            <span className="text-accent">Tudo flui.</span>
          </h1>
          <p className="max-w-sm text-pretty text-base leading-relaxed text-background/70">
            Cardápio digital e gestão de pedidos conectados. Menos ruído na
            operação. Mais espaço para fazer o que você ama.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Button asChild size="lg" className="h-14 rounded-full px-7">
              <a href={landingLinks.partnership}>
                Testar 7 dias <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </Button>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-8 hover:underline"
              href="#produto"
            >
              Conhecer o produto <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
          <p className="text-sm text-background/55">
            Plano Parceria. Depois, R$ 29,90/mês.
          </p>
        </div>
        <m.div className="hero-food motion-object" style={{ y, rotate }}>
          <Image
            src="/images/landing/pizza-cutout.webp"
            alt="Pizza de pepperoni com uma fatia levantada e fios de queijo derretido"
            width={1024}
            height={1024}
            preload
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </m.div>
      </div>
      <div className="hero-bottom">
        <p className="text-sm text-background/60">
          Feito para quem alimenta boas ideias.
        </p>
        <a href="#fluxo" className="inline-flex items-center gap-3 text-sm">
          Descubra o fluxo <ArrowDownIcon className="size-4" />
        </a>
        <span className="hidden text-sm text-background/60 lg:block">
          Zero comissão por pedido.
        </span>
      </div>
    </section>
  );
}
