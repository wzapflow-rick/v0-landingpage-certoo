import { MagneticButton, Reveal } from "@/components/landing/motion-primitives"
import { landingLinks } from "@/lib/landing-content"

const assurances = ["0% taxa por pedido", "7 dias para testar", "Cancele quando quiser"] as const

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="rounded-[2rem] border border-background/14 p-6 sm:p-10 lg:p-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              O próximo pedido pode começar aqui
            </p>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-4xl">
                <h2
                  id="cta-heading"
                  className="text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl"
                >
                  Sua operação já pode fluir melhor.
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-background/64">
                  Comece pelo Parceria: grátis por 7 dias e, depois, R$ 29,90 por mês.
                </p>
              </div>
              <MagneticButton href={landingLinks.partnership}>Começar agora</MagneticButton>
            </div>

            <ul className="mt-12 flex flex-col border-t border-background/14 pt-6 sm:flex-row sm:gap-8" aria-label="Condições principais">
              {assurances.map((assurance) => (
                <li key={assurance} className="border-b border-background/10 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background/58 last:border-b-0 sm:border-b-0 sm:py-0">
                  {assurance}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
