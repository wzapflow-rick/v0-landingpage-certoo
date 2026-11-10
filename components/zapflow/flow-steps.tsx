import { flowSteps } from "@/lib/landing-content"

export function FlowSteps() {
  return (
    <section id="como-funciona" aria-labelledby="fluxo-titulo" className="relative border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:pt-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="fluxo-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Do clique do cliente à saída da entrega.
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Cinco etapas, um único fluxo. Logo abaixo você monta um pedido de teste e vê cada uma acontecendo.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-border/80 ring-1 ring-border/80 sm:grid-cols-2 lg:grid-cols-5">
          {flowSteps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col bg-background p-6 lg:min-h-56">
              <span className="font-display text-sm font-black italic text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-lg font-extrabold leading-tight tracking-tight lg:mt-auto">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              {index < flowSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-7 hidden h-0.5 w-8 rounded-full bg-primary/40 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
