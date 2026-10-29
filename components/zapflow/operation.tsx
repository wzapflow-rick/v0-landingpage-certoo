import type { CSSProperties, ReactNode } from "react"
import { Bot, CheckCheck } from "lucide-react"
import { ChatStage } from "./chat-stage"

const board = [
  {
    column: "Recebidos",
    orders: [
      { id: "#1046", items: "2x Smash duplo", time: "agora" },
      { id: "#1045", items: "1x Açaí 500 ml", time: "2 min" },
    ],
  },
  {
    column: "Em preparo",
    orders: [
      { id: "#1044", items: "1x Pizza grande", time: "9 min" },
      { id: "#1043", items: "3x Marmita", time: "12 min" },
    ],
  },
  {
    column: "Saiu para entrega",
    orders: [{ id: "#1042", items: "1x Caixa de brigadeiros", time: "18 min" }],
  },
]

const delivery = [
  { feature: "Taxa fixa por bairro", plans: "Todos os planos" },
  { feature: "Taxa calculada pelo Google Maps", plans: "Pro e Elite" },
  { feature: "App para entregadores", plans: "Elite" },
]

function Bubble({ index, side, ai = false, children }: { index: number; side: "in" | "out"; ai?: boolean; children: ReactNode }) {
  const isOut = side === "out"
  return (
    <div
      className={`chat-bubble flex max-w-[85%] flex-col gap-1 ${isOut ? "self-end" : "self-start"}`}
      style={{ "--i": index } as CSSProperties}
    >
      {ai ? (
        <span className="flex items-center gap-1 px-1 text-[11px] font-semibold text-accent">
          <Bot className="size-3" aria-hidden="true" />
          Resposta do agente de IA
        </span>
      ) : null}
      <div
        className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isOut ? "rounded-br-sm bg-primary/20" : "rounded-bl-sm bg-secondary"
        }`}
      >
        {children}
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
          19:4{index + 2}
          {isOut ? <CheckCheck className="size-3 text-primary" aria-hidden="true" /> : null}
        </span>
      </div>
    </div>
  )
}

export function Operation() {
  return (
    <section id="operacao" aria-labelledby="operacao-titulo" className="relative border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="operacao-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            A cozinha vê o que fazer. O cliente sabe onde está o pedido.
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Cada pedido entra no Kanban com itens, endereço e pagamento. Nos planos Pro e Elite, o WhatsApp avisa o cliente
            e um agente de IA responde as dúvidas.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <figure className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 rounded-3xl border border-border/80 bg-background p-3 sm:grid-cols-3">
              {board.map((lane, laneIndex) => (
                <div key={lane.column} className="flex flex-col gap-2 rounded-2xl bg-card/70 p-3">
                  <p className="flex items-center justify-between px-1 text-sm font-bold">
                    {lane.column}
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">{lane.orders.length}</span>
                  </p>
                  {lane.orders.map((order, orderIndex) => (
                    <div
                      key={order.id}
                      className={`rounded-xl border bg-background p-3 text-sm ${
                        laneIndex === 0 && orderIndex === 0 ? "border-accent/60" : "border-border/80"
                      }`}
                    >
                      <p className="flex justify-between font-bold">
                        {order.id}
                        <span className="font-normal text-muted-foreground">{order.time}</span>
                      </p>
                      <p className="mt-1 text-muted-foreground">{order.items}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <figcaption className="text-sm text-muted-foreground">Kanban de pedidos, em todos os planos. Pedidos de exemplo.</figcaption>
          </figure>

          <figure className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-background">
              <div className="flex items-center gap-3 border-b border-border/80 bg-card px-4 py-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
                  TA
                </span>
                <div>
                  <p className="text-sm font-bold">Tropical Açaí</p>
                  <p className="text-xs text-primary">WhatsApp</p>
                </div>
              </div>
              <ChatStage className="flex min-h-[20rem] flex-col gap-3 p-4 sm:p-5">
                <Bubble index={0} side="in">
                  <strong className="font-bold">Pedido #1045 recebido</strong>
                  <br />
                  1x Açaí 500 ml, total R$ 26,50
                </Bubble>
                <Bubble index={1} side="out">
                  Consegue mandar sem banana?
                </Bubble>
                <Bubble index={2} side="in" ai>
                  Claro! Anotei: sem banana. Previsão de entrega em 35 min.
                </Bubble>
                <Bubble index={3} side="in">
                  Seu pedido saiu para entrega!
                </Bubble>
              </ChatStage>
            </div>
            <figcaption className="text-sm text-muted-foreground">
              Avisos no WhatsApp e agente de IA nos planos Pro e Elite. Conversa de exemplo.
            </figcaption>
          </figure>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border/60 pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <h3 className="text-2xl font-extrabold tracking-tight">A entrega cresce junto com o plano.</h3>
          <dl className="grid gap-6 sm:grid-cols-3">
            {delivery.map((item) => (
              <div key={item.feature}>
                <dt className="font-semibold">{item.feature}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{item.plans}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
