import Image from "next/image";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { featureGroups, landingLinks } from "@/lib/landing-content";

export function DemoSection() {
  return (
    <section
      id="produto"
      aria-labelledby="product-heading"
      className="scroll-mt-24 bg-background text-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-6">
            <p className="eyebrow text-secondary">
              O sistema por trás de cada pedido
            </p>
            <h2
              id="product-heading"
              className="text-balance text-5xl leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Simples para quem pede.
              <br />
              <span className="text-muted-foreground">
                Completo para quem faz.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
            Do primeiro toque no cardápio à saída do pedido. Sua equipe
            conectada em cada etapa.
          </p>
        </div>
        <div className="mt-16 grid overflow-hidden rounded-3xl bg-secondary text-secondary-foreground lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-6 p-8 sm:p-12 lg:p-16">
            <p className="eyebrow text-accent">Seu cardápio, sempre à mão</p>
            <h3 className="text-balance text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              O próximo pedido
              <br />
              começa com um toque.
            </h3>
            <p className="max-w-sm leading-relaxed text-secondary-foreground/75">
              Compartilhe seu link ou QR Code. Seu cliente escolhe, confere e
              faz o pedido no próprio celular.
            </p>
            <a
              href={landingLinks.partnership}
              className="inline-flex items-center gap-3 font-semibold underline underline-offset-8"
            >
              Criar meu cardápio <ArrowUpRightIcon className="size-5" />
            </a>
          </div>
          <figure className="flex flex-col items-center gap-4 px-8 pt-10">
            <div className="max-w-72 overflow-hidden rounded-t-[2.5rem] border-x-8 border-t-8 border-foreground bg-foreground">
              <Image
                src="/images/landing/cardapio-digital.png"
                alt="Captura real do cardápio ZapFlow mostrando categorias, produtos e preços"
                width={390}
                height={854}
                sizes="288px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="pb-6 text-sm text-secondary-foreground/70">
              Captura real de um cardápio ZapFlow.
            </figcaption>
          </figure>
        </div>
        <div
          id="recursos"
          className="mt-24 grid scroll-mt-28 gap-x-16 gap-y-12 md:grid-cols-2"
        >
          {featureGroups.map((group) => (
            <article
              key={group.label}
              className="flex flex-col gap-5 border-t border-border pt-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-secondary">{group.label}</p>
                <span className="text-sm text-muted-foreground">
                  {group.availability}
                </span>
              </div>
              <h3 className="text-balance text-3xl font-medium tracking-tight">
                {group.title}
              </h3>
              <p className="max-w-lg leading-relaxed text-muted-foreground">
                {group.description}
              </p>
              <ul className="flex flex-col gap-2">
                {group.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <CheckIcon
                      className="size-4 text-secondary"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
