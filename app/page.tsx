import { FinalCta, SiteFooter } from "@/components/zapflow/closing"
import { Faq } from "@/components/zapflow/faq"
import { Features } from "@/components/zapflow/features"
import { FlowSteps } from "@/components/zapflow/flow-steps"
import { Hero } from "@/components/zapflow/hero"
import { MobileCtaBar } from "@/components/zapflow/mobile-cta-bar"
import { Operation } from "@/components/zapflow/operation"
import { OrderDemo } from "@/components/zapflow/order-demo"
import { Pricing } from "@/components/zapflow/pricing"
import { Problem } from "@/components/zapflow/problem"
import { Savings } from "@/components/zapflow/savings"
import { SegmentsBand } from "@/components/zapflow/segments-band"
import { SiteHeader } from "@/components/zapflow/site-header"
import { Trust } from "@/components/zapflow/trust"

export default function Home() {
  return (
    <div className="pb-24 font-sans md:pb-0">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <SegmentsBand />
        <Problem />
        <FlowSteps />
        <OrderDemo />
        <Features />
        <Operation />
        <Savings />
        <Pricing />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  )
}
