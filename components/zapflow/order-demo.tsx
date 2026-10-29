"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { ArrowRight, Check, Minus, Plus, RotateCcw } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { cn } from "@/lib/utils"
import { brl, OrderTicket } from "./order-ticket"

type Addon = { name: string; price: number }
type Segment = {
  id: string
  tab: string
  store: string
  image: string
  product: string
  description: string
  price: number
  addons: Addon[]
}

const segments: Segment[] = [
  {
    id: "hamburgueria",
    tab: "Hamburgueria",
    store: "Brasa Burger",
    image: "/images/landing/seg-burger.png",
    product: "Smash duplo",
    description: "Dois blends de 90 g, cheddar e pão brioche.",
    price: 32,
    addons: [
      { name: "Cheddar extra", price: 4 },
      { name: "Bacon crocante", price: 5 },
      { name: "Molho da casa", price: 2 },
    ],
  },
  {
    id: "pizzaria",
    tab: "Pizzaria",
    store: "Forno da Vila",
    image: "/images/landing/seg-pizza.png",
    product: "Pizza grande de calabresa",
    description: "8 fatias, mussarela e cebola roxa.",
    price: 59.9,
    addons: [
      { name: "Borda de catupiry", price: 10 },
      { name: "Azeitonas", price: 3 },
      { name: "Refrigerante 2 L", price: 12 },
    ],
  },
  {
    id: "acai",
    tab: "Açaí e sorvetes",
    store: "Tropical Açaí",
    image: "/images/landing/seg-acai.png",
    product: "Açaí 500 ml",
    description: "Com banana e leite condensado.",
    price: 22,
    addons: [
      { name: "Granola", price: 2 },
      { name: "Leite em pó", price: 2.5 },
      { name: "Morangos", price: 4 },
    ],
  },
  {
    id: "doceria",
    tab: "Doceria",
    store: "Doce Ateliê",
    image: "/images/landing/seg-doces.png",
    product: "Caixa com 12 brigadeiros",
    description: "Tradicional, ninho e meio amargo.",
    price: 36,
    addons: [
      { name: "Fatia de bolo", price: 14 },
      { name: "Embalagem para presente", price: 6 },
      { name: "Cartão com mensagem", price: 3 },
    ],
  },
  {
    id: "marmitaria",
    tab: "Restaurante e marmitaria",
    store: "Cozinha da Lu",
    image: "/images/landing/seg-marmita.png",
    product: "Marmita de frango grelhado",
    description: "Arroz, feijão, farofa e salada.",
    price: 24.9,
    addons: [
      { name: "Ovo frito", price: 3 },
      { name: "Porção extra de farofa", price: 2 },
      { name: "Suco natural", price: 7 },
    ],
  },
]

const statuses = ["Recebido", "Em preparo", "Saiu para entrega"] as const
const statusDelays = [0, 1400, 2800]

export function OrderDemo() {
  const [segmentIndex, setSegmentIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [statusIndex, setStatusIndex] = useState(-1)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const segment = segments[segmentIndex]
  const chosen = segment.addons.filter((addon) => selected.includes(addon.name))
  const unitPrice = segment.price + chosen.reduce((sum, addon) => sum + addon.price, 0)
  const total = unitPrice * quantity
  const sent = statusIndex >= 0

  useEffect(() => {
    if (statusIndex < 0 || statusIndex >= statuses.length - 1) return
    const timer = window.setTimeout(
      () => setStatusIndex((value) => value + 1),
      statusDelays[statusIndex + 1] - statusDelays[statusIndex],
    )
    return () => window.clearTimeout(timer)
  }, [statusIndex])

  const reset = () => {
    setQuantity(1)
    setSelected([])
    setStatusIndex(-1)
  }

  const selectSegment = (index: number) => {
    setSegmentIndex(index)
    reset()
  }

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!offset) return
    event.preventDefault()
    const next = (index + offset + segments.length) % segments.length
    selectSegment(next)
    tabRefs.current[next]?.focus()
  }

  const toggleAddon = (name: string) => {
    if (sent) return
    setSelected((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]))
  }

  return (
    <section id="demo" aria-labelledby="demo-titulo" className="relative border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="demo-titulo" className="text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
              Monte um pedido e veja como ele chega até você.
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Escolha um tipo de delivery, adicione itens e envie. As lojas são fictícias e nenhum pedido é enviado de
              verdade: é uma demonstração do fluxo.
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Tipo de delivery"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0"
        >
          {segments.map((item, index) => {
            const active = index === segmentIndex
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={active}
                aria-controls="demo-painel"
                tabIndex={active ? 0 : -1}
                onClick={() => selectSegment(index)}
                onKeyDown={(event) => onTabKey(event, index)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground ring-1 ring-foreground/10 hover:text-foreground hover:ring-foreground/25",
                )}
              >
                <Image src={item.image} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
                {item.tab}
              </button>
            )
          })}
        </div>

        <div
          id="demo-painel"
          role="tabpanel"
          aria-labelledby={`tab-${segment.id}`}
          className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16"
        >
          <div className="overflow-hidden rounded-3xl border border-border/80 bg-background">
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-3.5">
              <p className="font-bold">{segment.store}</p>
              <p className="text-xs font-semibold text-primary">Aberto agora</p>
            </div>

            <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-full">
                <Image
                  key={segment.image}
                  src={segment.image}
                  alt={`${segment.product}, item de exemplo do cardápio`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-5 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{segment.product}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{segment.description}</p>
                  <p className="mt-2 text-lg font-bold tabular-nums">{brl(segment.price)}</p>
                </div>

                <fieldset disabled={sent} className="flex flex-col gap-2">
                  <legend className="mb-2 text-sm font-semibold">Adicionais</legend>
                  {segment.addons.map((addon) => {
                    const checked = selected.includes(addon.name)
                    return (
                      <label
                        key={addon.name}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                          checked ? "bg-accent/10 ring-accent/50" : "ring-foreground/10 hover:ring-foreground/25",
                          sent && "cursor-not-allowed opacity-60",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddon(addon.name)}
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex size-5 items-center justify-center rounded-md ring-1",
                              checked ? "bg-accent text-accent-foreground ring-accent" : "ring-foreground/25",
                            )}
                          >
                            {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
                          </span>
                          {addon.name}
                        </span>
                        <span className="tabular-nums text-muted-foreground">+ {brl(addon.price)}</span>
                      </label>
                    )
                  })}
                </fieldset>

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center rounded-full ring-1 ring-foreground/15">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      disabled={sent || quantity <= 1}
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="flex size-11 items-center justify-center rounded-full disabled:opacity-40"
                    >
                      <Minus className="size-4" aria-hidden="true" />
                    </button>
                    <output aria-live="polite" aria-label="Quantidade" className="w-6 text-center font-bold tabular-nums">
                      {quantity}
                    </output>
                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      disabled={sent || quantity >= 9}
                      onClick={() => setQuantity((value) => Math.min(9, value + 1))}
                      className="flex size-11 items-center justify-center rounded-full disabled:opacity-40"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                  </div>

                  {sent ? (
                    <button
                      type="button"
                      onClick={reset}
                      className="btn-quiet inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold"
                    >
                      <RotateCcw className="size-4" aria-hidden="true" />
                      Montar outro pedido
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStatusIndex(0)}
                      className="btn-glow inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold text-primary-foreground"
                    >
                      Enviar pedido · {brl(total)}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold text-muted-foreground">Como o pedido chega na sua loja</p>
            <OrderTicket
              key={`${segment.id}-${selected.join()}-${quantity}`}
              animateLines
              title={segment.store}
              meta={sent ? "#1043 · agora" : "Rascunho"}
              lines={[
                { label: `${quantity}x ${segment.product}`, value: brl(segment.price * quantity).replace("R$", "").trim() },
                ...chosen.map((addon) => ({
                  label: `+ ${addon.name}`,
                  value: brl(addon.price * quantity).replace("R$", "").trim(),
                  sub: true,
                })),
              ]}
              details={[
                { label: "Entrega", value: "Endereço do cliente" },
                { label: "Pagamento", value: "Pix ou cartão" },
              ]}
              total={brl(total)}
              footer={<p className="ticket-muted text-xs">Comissão ZapFlash: R$ 0,00</p>}
            />

            <ol aria-label="Status do pedido" aria-live="polite" className="mt-2 flex flex-col gap-3">
              {statuses.map((status, index) => {
                const done = index <= statusIndex
                return (
                  <li key={status} className={cn("flex items-center gap-3 text-sm", done ? "text-foreground" : "text-muted-foreground")}>
                    <span
                      data-done={done}
                      className="status-dot size-2.5 shrink-0 rounded-full bg-foreground/20 transition-[background-color,box-shadow] duration-300"
                    />
                    <span className={cn(done && "font-semibold")}>{status}</span>
                    {done && index === 0 ? (
                      <span className="text-muted-foreground">aparece no Kanban da loja</span>
                    ) : null}
                    {done && index === 2 ? (
                      <span className="text-muted-foreground">cliente avisado no WhatsApp (Pro e Elite)</span>
                    ) : null}
                  </li>
                )
              })}
            </ol>

            <a
              href={landingLinks.partnership}
              className="inline-flex items-center gap-2 self-start font-semibold text-primary hover:underline"
            >
              Quero esse fluxo no meu delivery
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
