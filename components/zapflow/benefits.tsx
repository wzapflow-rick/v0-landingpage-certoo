import Image from "next/image"
import { Bot, ImageIcon, MessageCircle, Wallet } from "lucide-react"
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

function CardHeading({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div>
      <span className="flex size-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
        {icon}
      </span>
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
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tudo o que seu delivery precisa para vender mais, em um só lugar.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-6">
        <GlassCard className="md:col-span-4">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <CardHeading
              icon={<ImageIcon className="size-5" aria-hidden="true" />}
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
            icon={<Wallet className="size-5" aria-hidden="true" />}
            title="Zero comissão por venda"
            text="Você paga só a mensalidade. Cada real vendido fica com você."
          />
          <dl className="mt-6 flex flex-col gap-2 rounded-xl border border-border/80 bg-background/60 p-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Pedido de</dt>
              <dd className="font-semibold">R$ 100,00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Comissão wZapFlow</dt>
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
            icon={<MessageCircle className="size-5" aria-hidden="true" />}
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
            icon={<Bot className="size-5" aria-hidden="true" />}
            title="IA que atende e vende por você"
            text="Um agente de IA responde dúvidas, envia o cardápio e conduz o cliente até o pedido, mesmo quando a cozinha está cheia."
          />
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border/80 bg-background/60 p-4 text-sm">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Bot className="size-4" aria-hidden="true" />
            </span>
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
