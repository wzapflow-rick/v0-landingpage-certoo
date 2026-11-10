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

const assurances = ["Sem comissão por pedido", "Cancele quando quiser", "Sem compromisso de permanência"]

export function Pricing() {
  const paid = plans.slice(1)

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 id="planos-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Comece grátis. <span className="text-flash italic">Cresça no seu ritmo.</span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Experimente a ZapFlash por 7 dias e descubra como é ter seu delivery organizado.
          </p>
        </div>

        <article
          aria-labelledby="plano-parceria"
          className="mt-10 grid gap-8 rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14"
        >
          <div>
            <h3 id="plano-parceria" className="text-sm font-black uppercase tracking-[0.2em] opacity-75">
              Plano Parceria
            </h3>
            <p className="mt-4 font-display text-5xl font-black italic uppercase leading-none tracking-tight sm:text-7xl">
              7 dias grátis
            </p>
            <p className="mt-4 text-lg font-semibold">Depois, R$ 29,90/mês.</p>
            <a
              href={landingLinks.partnership}
              data-hide-mobile-cta
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-8 text-base font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              Começar meus 7 dias grátis
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:flex-wrap sm:gap-x-5">
              {assurances.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-primary-foreground/15 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="text-sm font-bold uppercase tracking-widest opacity-75">Inclui</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {partnershipIncludes.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-12">
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
