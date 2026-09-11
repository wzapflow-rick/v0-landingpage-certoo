"use client";

import { PizzaVideo } from "./pizza-video";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingLinks } from "@/lib/landing-content";

export function HeroSection() {
  return (
    <section
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
        <div className="hero-food" style={{ pointerEvents: 'auto' }}>
          <PizzaVideo />
        </div>
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
