"use client"

import { useId, useState } from "react"

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

export function Savings() {
  const [revenue, setRevenue] = useState(20000)
  const [rate, setRate] = useState(12)
  const revenueId = useId()
  const rateId = useId()

  const monthly = (revenue * rate) / 100
  const yearly = monthly * 12

  return (
    <section id="economia" aria-labelledby="economia-titulo" className="relative">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
        <div>
          <h2 id="economia-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Comissão por pedido é dinheiro que sai do seu caixa todo mês.
          </h2>
          <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            No ZapFlash a comissão por pedido é 0%. Você paga só a mensalidade do plano, a partir de R$ 29,90 depois dos
            7 dias grátis. Faça a conta com os números do seu delivery.
          </p>

          <p className="mt-12 text-sm text-muted-foreground" aria-live="polite">
            Com {rate}% de comissão, saem por ano
          </p>
          <p className="mt-1 text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-none tracking-[-0.05em] text-accent tabular-nums">
            {money(yearly)}
          </p>
          <p className="mt-3 text-muted-foreground">
            ou <strong className="font-bold text-foreground">{money(monthly)} por mês</strong> que ficariam com você.
          </p>
        </div>

        <form className="flex flex-col gap-10 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={revenueId} className="font-semibold">
                Vendas por mês no delivery
              </label>
              <output htmlFor={revenueId} className="text-lg font-bold tabular-nums">
                {money(revenue)}
              </output>
            </div>
            <input
              id={revenueId}
              type="range"
              min={2000}
              max={150000}
              step={1000}
              value={revenue}
              onChange={(event) => setRevenue(Number(event.target.value))}
              className="range h-2 w-full cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={rateId} className="font-semibold">
                Comissão que você paga hoje
              </label>
              <output htmlFor={rateId} className="text-lg font-bold tabular-nums">
                {rate}%
              </output>
            </div>
            <input
              id={rateId}
              type="range"
              min={0}
              max={30}
              step={1}
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
              className="range h-2 w-full cursor-pointer"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Use o percentual que aparece no seu contrato ou extrato atual.
            </p>
          </div>

          <dl className="flex flex-col gap-3 border-t border-border/80 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Comissão por pedido no ZapFlash</dt>
              <dd className="font-bold text-primary">R$ 0</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Mensalidade</dt>
              <dd className="text-right font-semibold">de R$ 29,90 a R$ 297,90, conforme o plano</dd>
            </div>
          </dl>
        </form>
      </div>
    </section>
  )
}
