import { Check, X } from "lucide-react"
import { painPoints } from "@/lib/landing-content"

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-titulo" className="relative border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2
            id="problema-titulo"
            className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
          >
            Delivery no improviso custa caro{" "}
            <span className="text-flash italic">todos os dias.</span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Pedido no papel, mensagem perdida, entrega sem acompanhamento. A ZapFlash reúne tudo isso em um só lugar
            para a sua operação andar no mesmo ritmo.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl bg-card/50 ring-1 ring-border/80">
          <div className="hidden grid-cols-2 border-b border-border/80 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:grid">
            <p className="px-7 py-4">Sem organização</p>
            <p className="border-l border-border/80 px-7 py-4 text-primary">Com a ZapFlash</p>
          </div>
          <ul>
            {painPoints.map((item) => (
              <li
                key={item.pain}
                className="grid border-b border-border/60 last:border-b-0 md:grid-cols-2"
              >
                <div className="flex items-start gap-3 px-6 pb-2 pt-6 md:px-7 md:py-6">
                  <X className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-bold">{item.pain}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.cost}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-6 pb-6 pt-2 md:border-l md:border-border/80 md:px-7 md:py-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-pretty leading-relaxed">
                    <span className="sr-only">Com a ZapFlash: </span>
                    {item.solution}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
