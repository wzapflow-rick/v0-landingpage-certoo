import { FlowScene } from "@/components/landing/flow-scene"
import { ScrollText } from "@/components/landing/motion-primitives"

export function BenefitsSection() {
  return (
    <section id="fluxo" aria-labelledby="flow-heading" className="scroll-mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          01 — O problema muda de forma
        </p>
        <ScrollText
          text="Mensagem solta vira pedido. Pedido vira etapa. Etapa vira uma operação que todo mundo entende."
          className="mt-6 max-w-6xl text-4xl font-bold leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
        />
        <p id="flow-heading" className="sr-only">Como o ZapFlow organiza o fluxo do pedido</p>
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-background/64 sm:text-lg">
          Em vez de fazer a equipe perseguir informações, o ZapFlow reúne os momentos essenciais do pedido em uma sequência clara.
        </p>
      </div>

      <div className="mx-auto max-w-[100rem] px-5 pb-24 pt-16 sm:px-8 sm:pb-32">
        <FlowScene />
      </div>
    </section>
  )
}
