import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { PhoneFrame } from "./phone-frame"

const assurances = ["0% de comissão por venda", "7 dias grátis", "Cancele quando quiser"]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-halo pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Cardápio digital + WhatsApp + IA
          </p>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Seu cardápio vendendo <span className="text-warm">no automático</span>, direto no WhatsApp.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            O cliente escolhe pelo celular, o pedido chega pronto no seu WhatsApp e a IA responde por você.
            Sem comissão por venda: <strong className="font-semibold text-foreground">o lucro é 100% seu.</strong>
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={landingLinks.partnership}
              className="btn-glow inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-base font-bold text-primary-foreground"
            >
              Criar meu cardápio
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href="#demo"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-border bg-card/40 px-7 text-base font-semibold transition-colors hover:border-muted-foreground/50 hover:bg-card"
            >
              Ver um exemplo
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-[19rem]">
          <PhoneFrame
            src="/images/landing/menu-real-mobile.png"
            alt="Cardápio digital real do Tropical Açaí criado no wZapFlow, aberto no celular"
            priority
            className="rotate-0 lg:rotate-2"
          />

          <div className="float-card absolute -left-6 top-24 w-56 rounded-2xl border border-border/80 bg-card/90 p-3 shadow-xl backdrop-blur-md sm:-left-20">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <MessageCircle className="size-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold">Novo pedido #1042</p>
                <p className="truncate text-xs text-muted-foreground">2x Batata Frita · R$ 34,00</p>
              </div>
            </div>
          </div>

          <div
            className="float-card absolute -right-4 bottom-28 rounded-2xl border border-border/80 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-md sm:-right-14"
            style={{ animationDelay: "-3s" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Comissão</p>
            <p className="text-2xl font-extrabold text-accent">0%</p>
          </div>
        </div>
      </div>
    </section>
  )
}
