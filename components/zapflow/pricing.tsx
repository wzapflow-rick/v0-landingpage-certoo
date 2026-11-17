import { PlansCarousel } from "./plans-carousel"

export function Pricing() {
  return (
    <section id="planos" aria-labelledby="planos-titulo" className="scroll-mt-16 border-t border-border/60">
      <h2 id="planos-titulo" className="sr-only">
        Planos da ZapFlash
      </h2>
      <PlansCarousel />
    </section>
  )
}
