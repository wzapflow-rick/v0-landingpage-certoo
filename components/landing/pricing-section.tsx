import { ArrowUpRightIcon, CheckIcon, ShieldCheckIcon } from "lucide-react"

import { Reveal } from "@/components/landing/motion-primitives"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section id="planos" aria-labelledby="pricing-heading" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              No ritmo do seu negócio
            </p>
            <h2
              id="pricing-heading"
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Comece simples. Evolua sem desmontar o fluxo.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Escolha a estrutura para o seu momento. Todos os planos com zero comissão por pedido.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-border xl:block" />
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06} className="h-full">
              <article
                className={cn(
                  "relative h-full overflow-hidden rounded-3xl border p-6",
                  plan.tone === "dark"
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-card-foreground",
                )}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{plan.name === "Pro" ? "Mais automação" : "Sem comissão"}</span>
                    <Badge variant={plan.tone === "dark" ? "secondary" : "outline"}>{plan.stage}</Badge>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{plan.name}</h3>
                    <p
                      className={cn(
                        "mt-3 min-h-20 text-sm leading-relaxed",
                        plan.tone === "dark" ? "text-secondary-foreground/62" : "text-muted-foreground",
                      )}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-6 border-y border-current/12 py-6">
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-extrabold tracking-[-0.055em]">{plan.price}</p>
                      <p className="pb-1 text-sm opacity-65">{plan.cadence}</p>
                    </div>
                    {plan.billingNote ? <p className="mt-2 text-sm font-semibold text-primary">{plan.billingNote}</p> : null}
                  </div>

                  <ul className="mt-6 flex flex-col gap-3" aria-label={`Recursos do plano ${plan.name}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                        <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button
                      asChild
                      variant={plan.tone === "dark" ? "default" : "outline"}
                      className="h-11 w-full rounded-full"
                    >
                      <a href={plan.href}>
                        {plan.cta}
                        <ArrowUpRightIcon data-icon="inline-end" />
                      </a>
                    </Button>
                    <div className="mt-5 flex flex-col gap-2">
                      {plan.assurances.map((assurance) => (
                        <p key={assurance} className="flex items-center gap-2 text-xs opacity-62">
                          <ShieldCheckIcon aria-hidden="true" className="size-3.5" />
                          {assurance}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
