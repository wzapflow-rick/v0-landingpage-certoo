import { ArrowRight } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { Brand } from "./brand"
import { OrderTicket } from "./order-ticket"

export function FinalCta() {
  return (
    <section aria-labelledby="final-titulo" className="relative overflow-hidden border-t border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_50%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 md:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <h2 id="final-titulo" className="max-w-[14ch] text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
            Seu cardápio pode receber pedidos ainda hoje.
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Cadastre os produtos, compartilhe o link e acompanhe os pedidos no Kanban. Se não fizer sentido para o seu
            delivery, cancele dentro dos 7 dias.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              data-hide-mobile-cta
              href={landingLinks.partnership}
              className="btn-glow inline-flex h-13 items-center justify-center gap-2 rounded-full px-8 text-base font-bold text-primary-foreground"
            >
              Criar meu cardápio grátis
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href={landingLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center px-4 font-semibold text-foreground/80 hover:text-foreground"
            >
              Tirar dúvidas no WhatsApp
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm -rotate-2 lg:mx-0 lg:ml-auto">
          <OrderTicket
            title="Seu delivery no ZapFlash"
            meta="Plano Parceria"
            lines={[
              { label: "Cardápio com link e QR Code", value: "incluso" },
              { label: "Kanban de pedidos", value: "incluso" },
              { label: "Pix e cartões", value: "incluso" },
              { label: "7 dias de teste", value: "R$ 0,00" },
            ]}
            details={[
              { label: "Depois do teste", value: "R$ 29,90/mês" },
              { label: "Comissão por pedido", value: "R$ 0,00" },
              { label: "Cancelamento", value: "quando quiser" },
            ]}
            totalLabel="Para começar hoje"
            total="R$ 0,00"
          />
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Brand />
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#demo" className="hover:text-foreground">Como funciona</a>
          <a href="#planos" className="hover:text-foreground">Planos</a>
          <a href={landingLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Instagram
          </a>
          <a href={landingLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Suporte
          </a>
          <a href={landingLinks.login} className="hover:text-foreground">Entrar</a>
        </nav>
        <p className="text-xs text-muted-foreground">
          {"© "}
          {new Date().getFullYear()} ZapFlash. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
