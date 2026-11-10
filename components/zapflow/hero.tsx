import type { CSSProperties } from "react"
import { ArrowRight, Check, LayoutGrid } from "lucide-react"
import { ctaLabel, landingLinks } from "@/lib/landing-content"
import { OrderTicket, ZapFlashCommission } from "./order-ticket"
import { PhoneFrame } from "./phone-frame"
import { SpeedLines } from "./speed-lines"

const delay = (step: number) => ({ "--d": step }) as CSSProperties

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_80%_45%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-10 sm:pt-14 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-8 lg:py-12">
        <div className="flex flex-col">
          <h1
            className="rise mt-2 max-w-[13ch] text-balance text-[2.6rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]"
            style={delay(0)}
          >
            Venda pelo delivery{" "}
            <span className="inline-flex items-center gap-[0.18em]">
              <SpeedLines className="hidden w-[0.8em] sm:flex" />
              <span className="text-flash italic">sem pagar comissão</span>
            </span>{" "}
            por pedido.
          </h1>

          <p
            className="rise mt-6 max-w-[32rem] text-pretty text-lg leading-relaxed text-muted-foreground"
            style={delay(1)}
          >
            Cardápio digital, pedidos e WhatsApp num só painel. Você paga uma mensalidade fixa e nenhuma porcentagem
            das suas vendas fica com a ZapFlash.
          </p>

          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={delay(2)}>
            <a
              href={landingLinks.partnership}
              data-hide-mobile-cta
              data-track="cta_click"
              data-position="hero"
              data-plan="parceria"
              className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-bold text-primary-foreground"
            >
              {ctaLabel}
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href="#como-funciona"
              className="btn-quiet inline-flex h-14 items-center justify-center rounded-full px-7 text-[15px] font-semibold"
            >
              Ver como funciona
            </a>
          </div>

          <ul
            className="rise mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            style={delay(3)}
            aria-label="Condições do teste grátis"
          >
            {["Sem cartão de crédito", "Depois R$ 29,90/mês", "Cancele quando quiser"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroComposition />
      </div>
    </section>
  )
}

function HeroComposition() {
  return (
    <div className="relative mx-auto h-[30rem] w-full max-w-[26rem] sm:h-[36rem] sm:max-w-[32rem] lg:mx-0 lg:ml-auto">
      <figure className="rise absolute left-0 top-0 w-[58%] sm:w-[55%]" style={delay(2)}>
        <PhoneFrame
          src="/images/landing/menu-real-mobile.png"
          alt="Cardápio digital real do Tropical Açaí criado na ZapFlash, aberto no celular"
          priority
        />
        <figcaption className="sr-only">O cliente escolhe pelo cardápio no celular</figcaption>
      </figure>

      <div
        className="ticket-print absolute right-0 top-[18%] w-[62%] rotate-[2.5deg] sm:w-[56%]"
        style={{ "--print-delay": "0.9s" } as CSSProperties}
      >
        <OrderTicket
          title="Tropical Açaí"
          meta="#1042 · 19:42"
          lines={[
            { label: "1x Açaí 500 ml", value: "22,00" },
            { label: "+ Granola", value: "2,00", sub: true },
            { label: "+ Leite em pó", value: "2,50", sub: true },
          ]}
          details={[
            { label: "Entrega", value: "Rua das Flores, 120" },
            { label: "Pagamento", value: "Pix" },
          ]}
          total="R$ 26,50"
          footer={<ZapFlashCommission />}
        />
      </div>

      <div
        className="rise absolute bottom-2 right-2 flex max-w-[15rem] items-center gap-3 rounded-2xl bg-card/95 p-3 shadow-2xl ring-1 ring-primary/25 backdrop-blur sm:bottom-6"
        style={delay(9)}
      >
        <span className="order-dot relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <LayoutGrid className="size-4" aria-hidden="true" />
        </span>
        <p className="text-[13px] leading-snug">
          <span className="block font-bold">Novo pedido no painel</span>
          <span className="text-muted-foreground">Pronto para preparar</span>
        </p>
      </div>
    </div>
  )
}
