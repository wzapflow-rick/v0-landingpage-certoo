import { Reveal } from "@/components/landing/motion-primitives"
import { proofPoints } from "@/lib/landing-content"

export function ProofSection() {
  return (
    <section aria-labelledby="proof-heading" className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                03 — O que já é concreto
              </p>
              <h2
                id="proof-heading"
                className="mt-6 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl"
              >
                Números claros. Sem promessa inflada.
              </h2>
            </div>
            <p className="max-w-sm text-pretty leading-relaxed text-secondary-foreground/62">
              A prova abaixo usa somente informações verificáveis na oferta atual do ZapFlow.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid border-y border-secondary-foreground/16 md:grid-cols-3">
          {proofPoints.map((point, index) => (
            <Reveal key={point.value} delay={index * 0.08}>
              <article className="border-b border-secondary-foreground/16 py-8 last:border-b-0 md:min-h-64 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="text-6xl font-extrabold tracking-[-0.07em] text-primary sm:text-7xl lg:text-8xl">
                  {point.value}
                </p>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{point.label}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-secondary-foreground/58">{point.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
