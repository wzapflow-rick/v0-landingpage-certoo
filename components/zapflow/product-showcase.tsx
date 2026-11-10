import { OrderTicket } from "./order-ticket"
import { PhoneFrame } from "./phone-frame"

const steps = [
  "Cliente acessa o cardápio pelo link ou QR Code.",
  "Escolhe produtos e adicionais.",
  "Finaliza o pedido.",
  "A loja recebe o pedido organizado no painel.",
]

const board = [
  { column: "Recebidos", orders: [{ id: "#1043", items: "1x Açaí 500 ml", fresh: true }, { id: "#1041", items: "2x Smash duplo" }] },
  { column: "Em preparo", orders: [{ id: "#1040", items: "1x Pizza grande" }] },
  { column: "Saiu", orders: [{ id: "#1038", items: "6x Brigadeiro" }] },
]

export function ProductShowcase() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2
            id="como-funciona-titulo"
            className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
          >
            Do pedido à cozinha. <span className="text-flash italic">Tudo organizado.</span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Seu cliente escolhe, envia o pedido e sua equipe recebe tudo pronto para preparar.
          </p>
        </div>

        <figure className="mt-12 overflow-hidden rounded-3xl bg-card p-5 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.4fr)] lg:gap-10">
            <div className="mx-auto w-full max-w-[15rem] sm:max-w-[16rem]">
              <PhoneFrame
                src="/images/landing/menu-real-mobile.png"
                alt="Cardápio digital real criado na ZapFlash, aberto no celular do cliente"
              />
            </div>

            <div className="mx-auto w-full max-w-[16rem] rotate-[1.5deg] lg:w-60">
              <OrderTicket
                title="Pedido #1043"
                meta="19:42"
                lines={[
                  { label: "1x Açaí 500 ml", value: "22,00" },
                  { label: "+ Granola", value: "2,00", sub: true },
                  { label: "+ Leite em pó", value: "2,50", sub: true },
                ]}
                details={[{ label: "Pagamento", value: "Pix" }]}
                total="R$ 26,50"
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-muted-foreground">Painel da loja</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Exemplo do painel de pedidos">
                {board.map((col) => (
                  <div key={col.column} className="flex flex-col gap-2 rounded-2xl bg-background p-2.5 sm:p-3">
                    <p className="flex items-center justify-between text-xs font-bold">
                      {col.column}
                      <span className="text-muted-foreground">{col.orders.length}</span>
                    </p>
                    {col.orders.map((order) => (
                      <div
                        key={order.id}
                        className={
                          "fresh" in order
                            ? "rounded-xl bg-primary/10 p-2.5 ring-1 ring-primary/50"
                            : "rounded-xl bg-card p-2.5 ring-1 ring-border/80"
                        }
                      >
                        <p className="text-xs font-bold text-primary">{order.id}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{order.items}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <figcaption className="mt-10 border-t border-border/60 pt-8">
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-pretty text-sm font-medium leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
