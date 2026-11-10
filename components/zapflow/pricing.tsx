import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

const chefs = {
  Start: { src: "/brand/chef-start.png", width: 330, height: 344, tone: "text-plan-start", alt: "Chef Start, personagem azul oficial da ZapFlash" },
  Pro: { src: "/brand/chef-pro.png", width: 300, height: 348, tone: "text-primary", alt: "Chef Pro, personagem verde oficial da ZapFlash" },
  Elite: { src: "/brand/chef-elite.png", width: 316, height: 352, tone: "text-plan-elite", alt: "Chef Elite, personagem dourado oficial da ZapFlash" },
} as const

export function Pricing() {
  const [partnership, ...paid] = plans

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="relative border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="planos-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Planos sem comissão. <span className="text-flash italic">Preço fixo.</span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Comece grátis no Parceria e mude de plano quando a operação crescer.
          </p>
        </div>

        <article
          aria-labelledby="plano-parceria"
          className="mt-10 grid gap-8 rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest opacity-70">Comece por aqui</p>
            <h3 id="plano-parceria" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Plano {partnership.name}
            </h3>
            <p className="mt-6 font-display text-5xl font-black italic leading-none tracking-tight sm:text-6xl">
              7 dias grátis
            </p>
            <p className="mt-3 font-semibold">{partnership.billingNote}</p>
            <a
              href={partnership.href}
              className="mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-7 font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              Começar grátis por 7 dias
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </div>

          <div className="border-t border-primary-foreground/15 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="max-w-md text-pretty font-medium leading-relaxed">{partnership.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {partnership.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {paid.map((plan) => {
            const chef = chefs[plan.name as keyof typeof chefs]
            const featured = plan.name === "Pro"
            return (
              <article
                key={plan.name}
                className={cn(
                  "flex flex-col overflow-hidden rounded-3xl bg-card ring-1",
                  featured ? "ring-primary/50" : "ring-border/80",
                )}
              >
                <div className="relative h-44 overflow-hidden bg-background">
                  <Image
                    src={chef.src}
                    alt={chef.alt}
                    width={chef.width}
                    height={chef.height}
                    className="h-full w-full object-cover object-[50%_20%]"
                  />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
                  {featured ? (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      Mais escolhido para crescer
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6 pt-2 sm:p-7 sm:pt-2">
                  <p className="text-sm font-semibold text-muted-foreground">{plan.stage}</p>
                  <h3 className={cn("text-2xl font-black italic tracking-tight", chef.tone)}>{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:min-h-[4.5rem]">{plan.description}</p>

                  <p className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-black tracking-tight tabular-nums">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Sem taxa por pedido</p>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.href}
                    className={cn(
                      "mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold",
                      featured ? "btn-glow text-primary-foreground" : "btn-quiet",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Todos os planos: 0% de comissão, garantia de 7 dias e cancelamento quando quiser.
        </p>
      </div>
    </section>
  )
}
