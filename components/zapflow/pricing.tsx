import Image from "next/image"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import { landingLinks, plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

const chefs = {
  Start: { src: "/brand/chef-start.png", width: 330, height: 344, tone: "text-plan-start", alt: "Chef Start, personagem azul oficial da ZapFlash" },
  Pro: { src: "/brand/chef-pro.png", width: 300, height: 348, tone: "text-primary", alt: "Chef Pro, personagem verde oficial da ZapFlash" },
  Elite: { src: "/brand/chef-elite.png", width: 316, height: 352, tone: "text-plan-elite", alt: "Chef Elite, personagem dourado oficial da ZapFlash" },
} as const

const partnershipIncludes = [
  "Cardápio digital com link e QR Code",
  "Gestão de pedidos",
  "Kanban básico",
  "Pagamentos por Pix e cartões",
  "Taxa fixa por bairro",
  "Suporte por e-mail",
]

const assurances = ["Zero comissão por pedido", "Cancele quando quiser"]

export function Pricing() {
  const paid = plans.slice(1)

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 id="planos-titulo" className="text-balance text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Seu delivery pode começar hoje.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Experimente a ZapFlash por 7 dias e organize seus primeiros pedidos.
          </p>
        </div>

        <article
          aria-labelledby="plano-parceria"
          className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-3xl bg-card ring-1 ring-border md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div className="flex flex-col p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <h3 id="plano-parceria" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Plano Parceria
              </h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
                7 dias grátis
              </span>
            </div>

            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl">R$ 0,00</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">durante os primeiros 7 dias.</p>
            <p className="mt-4 text-sm">
              Depois, <span className="font-semibold">R$ 29,90/mês</span>.
            </p>

            <a
              href={landingLinks.partnership}
              data-hide-mobile-cta
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Começar meus 7 dias grátis
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
              {assurances.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col border-t border-border bg-background/40 p-6 sm:p-9 md:border-l md:border-t-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Recursos incluídos</p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {partnershipIncludes.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-3 text-primary" aria-hidden="true" />
                  </span>
                  {feature}.
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mx-auto mt-14 max-w-4xl">
          <h3 className="font-bold">Precisa de mais recursos?</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {paid.map((plan) => {
              const chef = chefs[plan.name as keyof typeof chefs]
              return (
                <article key={plan.name} className="flex flex-col rounded-2xl bg-card p-5 ring-1 ring-border/80">
                  <div className="flex items-center gap-3">
                    <Image
                      src={chef.src}
                      alt={chef.alt}
                      width={chef.width}
                      height={chef.height}
                      className="size-12 shrink-0 rounded-full bg-background object-cover object-[50%_15%]"
                    />
                    <div className="flex-1">
                      <h4 className={cn("text-lg font-black italic tracking-tight", chef.tone)}>{plan.name}</h4>
                      <p className="text-xs text-muted-foreground">{plan.stage}</p>
                    </div>
                    <p className="text-right">
                      <span className="block font-display text-xl font-black tabular-nums">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.cadence}</span>
                    </p>
                  </div>

                  <details className="group mt-4 border-t border-border/60 pt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                      Ver recursos
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mt-3 flex flex-col gap-2 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <a
                    href={plan.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  >
                    {plan.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
