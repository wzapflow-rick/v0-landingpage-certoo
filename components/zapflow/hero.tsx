import type { CSSProperties } from "react"
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { FlowLines, HeroAtmosphere } from "./hero-atmosphere"
import { PhoneFrame } from "./phone-frame"
import { PhoneStage } from "./phone-stage"

const assurances = ["0% de comissão por venda", "7 dias grátis", "Cancele quando quiser"]

const delay = (step: number) => ({ "--d": step }) as CSSProperties

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <HeroAtmosphere />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 lg:py-14 xl:grid-cols-[minmax(0,1fr)_21rem] xl:gap-20">
        <FlowLines />
        <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
          <p
            className="rise inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-[13px] font-semibold text-accent"
            style={delay(0)}
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Cardápio digital + WhatsApp + IA
          </p>

          <h1
            className="rise mt-7 max-w-[20ch] text-balance text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:max-w-none lg:whitespace-nowrap lg:text-[3.4rem] xl:text-[3.75rem]"
            style={delay(1)}
          >
            <span className="lg:block">Seu cardápio vendendo</span>{" "}
            <span className="lg:block">
              <span className="text-warm">no automático</span>, direto
            </span>{" "}
            <span className="lg:block">no WhatsApp.</span>
          </h1>

          <p
            className="rise mt-6 max-w-[34rem] text-pretty text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg"
            style={delay(2)}
          >
            O cliente escolhe pelo celular, o pedido chega pronto no seu WhatsApp e a IA responde por você. Sem
            comissão por venda: <strong className="whitespace-nowrap font-semibold text-foreground">o lucro é 100% seu.</strong>
          </p>

          <div className="rise mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={delay(3)}>
            <a
              href={landingLinks.partnership}
              data-hide-mobile-cta
  className="btn-glow inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-bold text-primary-foreground sm:h-12"
            >
              Criar meu cardápio
              <ArrowRight className="size-[1.125rem]" aria-hidden="true" />
            </a>
            <a
              href="#demo"
              className="btn-quiet inline-flex h-13 items-center justify-center rounded-full px-7 text-[15px] font-semibold sm:h-12"
            >
              Ver um exemplo
            </a>
          </div>

          <ul
            className="rise mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground lg:justify-start"
            style={delay(4)}
          >
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise relative mx-auto w-full max-w-[16.5rem] sm:max-w-[19rem] lg:max-w-none" style={delay(5)}>
          <div aria-hidden="true" className="phone-floor pointer-events-none absolute inset-x-6 -bottom-8 h-16" />
          <PhoneStage>
            <div className="phone-float">
              <PhoneFrame
                src="/images/landing/menu-real-mobile.png"
                alt="Cardápio digital real do Tropical Açaí criado no ZapFlash, aberto no celular"
                priority
              />
            </div>

            <div className="chip-depth absolute -left-28 top-[29%] hidden w-52 sm:block lg:-left-32">
              <div className="float-chip chip-in-left rounded-2xl p-2.5" style={delay(8)}>
                <div className="flex items-center gap-2.5">
                  <span className="order-dot relative flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <MessageCircle className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-tight">Novo pedido #1042</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">2x Batata Frita · R$ 34,00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="chip-depth absolute -right-12 top-[38%] hidden sm:block lg:-right-14">
              <div className="float-chip chip-in-right rounded-2xl px-3.5 py-2.5" style={delay(10)}>
                <p className="text-xs font-medium text-muted-foreground">Comissão</p>
                <p className="text-xl font-extrabold leading-tight text-accent">0%</p>
              </div>
            </div>
          </PhoneStage>
        </div>
      </div>
    </section>
  )
}
