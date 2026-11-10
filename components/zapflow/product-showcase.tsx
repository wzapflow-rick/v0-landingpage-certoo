import { Bot, CheckCheck, MessageCircle } from "lucide-react"
import { OrderTicket } from "./order-ticket"
import { PhoneFrame } from "./phone-frame"

const board = [
  { column: "Recebidos", orders: [{ id: "#1046", items: "2x Smash duplo" }, { id: "#1045", items: "1x Açaí 500 ml" }] },
  { column: "Em preparo", orders: [{ id: "#1044", items: "1x Pizza grande" }] },
  { column: "Saiu", orders: [{ id: "#1042", items: "1x Brigadeiros" }] },
]

function Caption({ title, text, availability }: { title: string; text: string; availability: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
        <span className="rounded-full bg-background px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
          {availability}
        </span>
      </div>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  )
}

export function ProductShowcase() {
  return (
    <section id="produto" aria-labelledby="produto-titulo" className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <h2
          id="produto-titulo"
          className="max-w-2xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
        >
          Tudo o que você precisa <span className="text-flash italic">para operar.</span>
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <article className="flex flex-col gap-6 overflow-hidden rounded-3xl bg-card p-6 sm:p-8 lg:col-span-5 lg:row-span-2">
            <Caption
              title="Cardápio digital"
              text="Link e QR Code. O cliente pede pelo celular, sem baixar aplicativo."
              availability="Todos os planos"
            />
            <div className="mx-auto w-full max-w-[17rem] flex-1">
              <PhoneFrame
                src="/images/landing/menu-real-mobile.png"
                alt="Cardápio digital real criado na ZapFlash, aberto no celular"
              />
            </div>
          </article>

          <article className="flex flex-col gap-6 rounded-3xl bg-card p-6 sm:p-8 lg:col-span-7">
            <Caption
              title="Painel de pedidos"
              text="Cada pedido no Kanban, do recebimento à saída para entrega."
              availability="Kanban em todos os planos"
            />
            <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Exemplo do Kanban de pedidos">
              {board.map((col) => (
                <div key={col.column} className="flex flex-col gap-2 rounded-2xl bg-background p-2.5 sm:p-3">
                  <p className="flex items-center justify-between text-xs font-bold">
                    {col.column}
                    <span className="text-muted-foreground">{col.orders.length}</span>
                  </p>
                  {col.orders.map((order) => (
                    <div key={order.id} className="rounded-xl bg-card p-2.5 ring-1 ring-border/80">
                      <p className="text-xs font-bold text-primary">{order.id}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{order.items}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </article>

          <article className="flex flex-col gap-6 rounded-3xl bg-card p-6 sm:p-8 lg:col-span-3">
            <Caption
              title="Gestão da operação"
              text="Itens, endereço e pagamento registrados em cada pedido."
              availability="Todos os planos"
            />
            <div className="mx-auto w-full max-w-[15rem] rotate-[1.5deg]">
              <OrderTicket
                title="Pedido #1042"
                meta="19:42"
                lines={[
                  { label: "1x Açaí 500 ml", value: "22,00" },
                  { label: "+ Granola", value: "2,00", sub: true },
                ]}
                details={[{ label: "Pagamento", value: "Pix" }]}
                total="R$ 24,00"
              />
            </div>
          </article>

          <article className="flex flex-col gap-6 rounded-3xl bg-card p-6 sm:p-8 lg:col-span-4">
            <Caption
              title="WhatsApp e automação"
              text="Avisos de status e agente de IA respondendo seus clientes."
              availability="Pro e Elite"
            />
            <div className="flex flex-col gap-2">
              <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-sm">
                Vocês entregam no Centro?
              </div>
              <div className="flex max-w-[85%] flex-col gap-1 self-end">
                <span className="flex items-center gap-1 self-end text-[11px] font-semibold text-accent">
                  <Bot className="size-3" aria-hidden="true" />
                  Agente de IA
                </span>
                <div className="rounded-2xl rounded-br-sm bg-primary/20 px-3.5 py-2.5 text-sm">
                  Entregamos sim! Taxa de R$ 5,00.
                  <CheckCheck className="ml-1 inline size-3 text-primary" aria-hidden="true" />
                </div>
              </div>
              <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MessageCircle className="size-3.5 text-primary" aria-hidden="true" />
                Pedido confirmado: aviso enviado ao cliente
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
