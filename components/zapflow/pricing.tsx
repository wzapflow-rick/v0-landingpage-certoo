import Image from "next/image"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import { ctaLabel, landingLinks, plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"
import { CommissionCalculator } from "./commission-calculator"

const chefs = {
  Start: { src: "/brand/chef-start.png", width: 330, height: 344, tone: "text-plan-start", alt: "Chef Start, personagem azul oficial da ZapFlash" },
  Pro: { src: "/brand/chef-pro.png", width: 300, height: 348, tone: "text-primary", alt: "Chef Pro, personagem verde oficial da ZapFlash" },
  Elite: { src: "/brand/chef-elite.png", width: 316, height: 352, tone: "text-plan-elite", alt: "Chef Elite, personagem dourado oficial da ZapFlash" },
} as const

const timeline = [
  { when: "Hoje", price: "R$ 0", text: "Você cria a conta sem cartão de crédito e monta seu cardápio." },
  { when: "Dias 1 a 7", price: "R$ 0", text: "Usa o plano Parceria completo e recebe seus primeiros pedidos." },
  { when: "Depois", price: "R$ 29,90/mês", text: "Se quiser continuar, paga só a mensalidade. Zero comissão por pedido." },
]

const partnershipIncludes = [
  "Cardápio digital com link e QR Code",
  "Gestão de pedidos com Kanban",
  "Pagamentos por Pix e cartões",
  "Taxa fixa por bairro",
  "Suporte por e-mail",
]

export function Pricing() {
  const paid = plans.slice(1)

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 id="planos-titulo" className="text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Comece grátis. <span className="text-flash italic">Continue sem comissão.</span>
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            O plano Parceria é a forma mais simples de colocar seu delivery no ar.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div data-plan-view="parceria" className="flex flex-col">
            <ol className="flex flex-col" aria-label="Como funciona o plano Parceria">
              {timeline.map((step, index) => (
                <li key={step.when} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < timeline.length - 1 ? (
                    <span aria-hidden="true" className="absolute left-[0.6875rem] top-7 h-[calc(100%-1.75rem)] w-px bg-border" />
                  ) : null}
                  <span
                    className={cn(
                      "relative mt-1 flex size-6 shrink-0 items-center justify-center rounded-full ring-1",
                      index < 2 ? "bg-primary/15 ring-primary/50" : "bg-card ring-border",
                    )}
                  >
                    <span className={cn("size-2 rounded-full", index < 2 ? "bg-primary" : "bg-muted-foreground")} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{step.when}</span>
                      <span className="font-display text-2xl font-black tabular-nums">{step.price}</span>
                    </p>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Incluso no plano Parceria">
              {partnershipIncludes.map((item) => (
                <li key={item} className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm ring-1 ring-border">
                  <Check className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={landingLinks.partnership}
              data-hide-mobile-cta
              data-track="cta_click"
              data-position="parceria"
              data-plan="parceria"
              className="btn-glow mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-8 text-base font-bold text-primary-foreground sm:w-auto sm:self-start"
            >
              {ctaLabel}
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <p className="mt-3 text-sm text-muted-foreground">Sem cartão de crédito. Cancele quando quiser.</p>
          </div>

          <CommissionCalculator />
        </div>

        <details className="group mt-14 rounded-3xl bg-card ring-1 ring-border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block font-bold">Precisa de mais recursos?</span>
              <span className="text-sm text-muted-foreground">
                Start R$ 79,90 · Pro R$ 149,90 · Elite R$ 297,90 por mês
              </span>
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-primary">
              <span className="hidden sm:inline">Ver planos</span>
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </span>
          </summary>

          <div className="grid gap-3 border-t border-border/60 p-5 sm:p-6 md:grid-cols-3">
            {paid.map((plan) => {
              const chef = chefs[plan.name as keyof typeof chefs]
              const slug = plan.name.toLowerCase()
              return (
                <article
                  key={plan.name}
                  data-plan-view={slug}
                  className="flex flex-col rounded-2xl bg-background/60 p-5 ring-1 ring-border/80"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={chef.src}
                      alt={chef.alt}
                      width={chef.width}
                      height={chef.height}
                      className="size-12 shrink-0 rounded-full bg-background object-cover object-[50%_15%]"
                    />
                    <div className="flex-1">
                      <h3 className={cn("text-lg font-black italic tracking-tight", chef.tone)}>{plan.name}</h3>
                      <p className="text-xs text-muted-foreground">{plan.stage}</p>
                    </div>
                    <p className="text-right">
                      <span className="block font-display text-xl font-black tabular-nums">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.cadence}</span>
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-4 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.href}
                    data-track="cta_click"
                    data-position="planos_pagos"
                    data-plan={slug}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  >
                    {plan.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              )
            })}
          </div>
        </details>
      </div>
    </section>
  )
}
