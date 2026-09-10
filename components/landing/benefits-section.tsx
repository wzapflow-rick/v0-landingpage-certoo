import { FlowScene } from "@/components/landing/flow-scene";

export function BenefitsSection() {
  return (
    <section
      id="fluxo"
      aria-label="Como o ZapFlow conecta as partes do pedido"
      className="scroll-mt-24 bg-foreground text-background"
    >
      <FlowScene />
    </section>
  );
}
