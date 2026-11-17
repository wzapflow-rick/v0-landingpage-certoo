import { ArrowRight, Check } from "lucide-react"
import { ctaLabel, landingLinks } from "@/lib/landing-content"
import { cn } from "@/lib/utils"
import { CommissionCalculator } from "./commission-calculator"
import { PlansCarousel } from "./plans-carousel"

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

      </div>

      <div className="mx-auto max-w-7xl px-5 pb-8">
        <h3 className="text-balance text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">Precisa de mais recursos?</h3>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          Conheça os chefs de cada plano. Use as setas ou clique em um personagem.
        </p>
      </div>
      <PlansCarousel />
    </section>
  )
}
