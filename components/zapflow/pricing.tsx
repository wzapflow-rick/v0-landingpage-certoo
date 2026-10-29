import { ArrowRight, Check, Minus } from "lucide-react"
import { plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

type Cell = boolean | string

const comparison: { feature: string; values: [Cell, Cell, Cell, Cell] }[] = [
  { feature: "Cardápio digital com link e QR Code", values: [true, true, true, true] },
  { feature: "Kanban de pedidos", values: ["Básico", "Básico", true, true] },
  { feature: "Pix e cartões", values: [true, true, true, true] },
  { feature: "Taxa fixa por bairro", values: [true, true, true, true] },
  { feature: "Notificações no WhatsApp", values: [false, false, true, true] },
  { feature: "Agente de IA no WhatsApp", values: [false, false, true, true] },
  { feature: "Taxa por Google Maps", values: [false, false, true, true] },
  { feature: "Cupons de desconto", values: [false, false, true, true] },
  { feature: "Customização total", values: [false, false, false, true] },
  { feature: "App para entregadores", values: [false, false, false, true] },
  { feature: "Programa de pontos", values: [false, false, false, true] },
  { feature: "Relatórios avançados", values: [false, false, false, true] },
  { feature: "Suporte", values: ["E-mail", "E-mail", "Prioritário", "Onboarding VIP e gerente de conta"] },
]

function CellValue({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto size-4 text-primary" aria-label="Incluído" />
  if (value === false) return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Não incluído" />
  return <span className="text-sm">{value}</span>
}

export function Pricing() {
  return (
    <section id="planos" aria-labelledby="planos-titulo" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="planos-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Mensalidade fixa. Nenhuma comissão sobre suas vendas.
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Comece grátis por 7 dias no Parceria e mude de plano quando a operação pedir. Todos os planos têm garantia de 7
            dias e cancelamento quando quiser.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-border/80 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => {
            const isTrial = plan.name === "Parceria"
            return (
              <article
                key={plan.name}
                className={cn(
                  "relative flex flex-col p-6 sm:p-7",
                  index > 0 && "border-t border-border/80 sm:border-t-0",
                  index % 2 === 1 && "sm:border-l sm:border-border/80",
                  index >= 2 && "sm:border-t lg:border-t-0",
                  index === 2 && "lg:border-l lg:border-border/80",
                  isTrial ? "bg-accent/[0.07]" : "bg-card/40",
                )}
              >
                {isTrial ? <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent" /> : null}
                <p className="text-sm font-semibold text-muted-foreground">{isTrial ? "Comece por aqui" : plan.stage}</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground lg:min-h-[4.5rem]">{plan.description}</p>

                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight tabular-nums">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{plan.billingNote ?? "Sem taxa por pedido"}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm lg:hidden">
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
                    "mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold lg:mt-auto",
                    isTrial ? "btn-glow text-primary-foreground" : "btn-quiet",
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>

        <div className="mt-6 hidden overflow-hidden rounded-3xl border border-border/80 lg:block">
          <table className="w-full table-fixed text-left">
            <caption className="sr-only">Comparação de recursos por plano</caption>
            <thead>
              <tr className="border-b border-border/80 bg-card/60 text-sm">
                <th scope="col" className="w-[28%] px-6 py-4 font-semibold">
                  Recursos
                </th>
                {plans.map((plan) => (
                  <th key={plan.name} scope="col" className="px-4 py-4 text-center font-semibold">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-b border-border/60 last:border-b-0">
                  <th scope="row" className="px-6 py-3.5 text-sm font-medium text-muted-foreground">
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => (
                    <td key={plans[index].name} className="px-4 py-3.5 text-center">
                      <CellValue value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
