import Image from "next/image"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <article
      className={cn(
        "surface card-lit relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </article>
  )
}

function NeonIcon({ name, className }: { name: "photos" | "wallet" | "chat" | "bot"; className?: string }) {
  return (
    <span
      className={cn(
        "relative block size-9 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-accent/40 shadow-[0_0_12px_-6px_var(--color-accent)] md:size-10 md:rounded-xl",
        className,
      )}
    >
      <Image src={`/icons/neon-${name}.png`} alt="" fill sizes="40px" className="scale-110 object-cover" />
    </span>
  )
}

function CardHeading({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div>
      {icon}
      <h3 className="mt-5 text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{text}</p>
    </div>
  )
}

export function Benefits() {
  return (
    <section id="recursos" data-reveal className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-accent">Recursos</p>
        <h2 data-wipe className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tudo o que seu delivery precisa para vender mais, em um só lugar.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-6">
        <GlassCard className="md:col-span-4">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <CardHeading
              icon={<NeonIcon name="photos" />}
              title="Cardápio com fotos que abrem o apetite"
              text="Produtos com foto, preço e categorias organizadas. Seu cliente encontra o que quer em segundos, por link ou QR Code."
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/80">
              <Image
                src="/images/landing/menu-food-grid.png"
                alt="Grade de pratos com fotos em um cardápio digital"
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeading
            icon={<NeonIcon name="wallet" />}
            title="Zero comissão por venda"
            text="Você paga só a mensalidade. Cada real vendido fica com você."
          />
          <dl className="mt-6 flex flex-col gap-2 rounded-xl border border-border/80 bg-background/60 p-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Pedido de</dt>
              <dd className="font-semibold">R$ 100,00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Comissão ZapFlash</dt>
              <dd className="font-semibold text-accent">R$ 0,00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-border/80 pt-2">
              <dt className="font-semibold">Fica com você</dt>
              <dd className="text-lg font-extrabold text-primary">R$ 100,00</dd>
            </div>
          </dl>
        </GlassCard>

        <GlassCard className="md:col-span-3">
          <CardHeading
            icon={<NeonIcon name="chat" />}
            title="Pedidos direto no WhatsApp"
            text="Cada pedido chega completo, com itens, endereço e pagamento. Notificações automáticas avisam o cliente a cada etapa."
          />
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <p className="self-end rounded-2xl rounded-br-sm bg-primary/15 px-4 py-2.5 text-foreground">
              Seu pedido saiu para entrega!
            </p>
            <p className="self-start rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5">Oba, chegando já! Obrigado.</p>
          </div>
        </GlassCard>

        <GlassCard className="md:col-span-3">
          <CardHeading
            icon={<NeonIcon name="bot" />}
            title="IA que atende e vende por você"
            text="Um agente de IA responde dúvidas, envia o cardápio e conduz o cliente até o pedido, mesmo quando a cozinha está cheia."
          />
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border/80 bg-background/60 p-4 text-sm">
            <NeonIcon name="bot" className="size-6 rounded-md md:size-7 md:rounded-md" />
            <p className="leading-relaxed text-muted-foreground">
              {"\"Temos sim! A batata grande sai por R$ 17. Quer que eu adicione ao seu pedido?\""}
            </p>
          </div>
        </GlassCard>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Notificações no WhatsApp e agente de IA disponíveis nos planos Pro e Elite.
      </p>
    </section>
  )
}
