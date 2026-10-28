import { ArrowRight, Check } from "lucide-react"
import { plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

export function Pricing() {
  return (
    <section id="planos" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-accent">Planos</p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Mensalidade fixa. Nenhuma comissão sobre suas vendas.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Comece grátis por 7 dias no Parceria e mude de plano quando sua operação crescer.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const featured = plan.name === "Pro"
          return (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-3xl p-6",
                featured ? "bg-card ring-1 ring-primary/50 shadow-2xl shadow-primary/10" : "surface",
              )}
            >
              {featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  Mais escolhido
                </span>
              ) : null}
              <p className="text-sm font-medium text-muted-foreground">{plan.stage}</p>
              <h3 className="mt-1 text-xl font-extrabold">{plan.name}</h3>
              <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

              <p className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{plan.billingNote ?? "Sem taxa por pedido"}</p>

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
              <p className="mt-3 text-center text-xs text-muted-foreground">Garantia de 7 dias · Cancele quando quiser</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
