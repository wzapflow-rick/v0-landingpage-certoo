"use client"

import { useId, useRef, useState } from "react"
import { trackEvent } from "@/lib/analytics"

const MONTHLY_FEE = 29.9
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

function toNumber(value: string) {
  const parsed = Number(value.replace(",", "."))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

export function CommissionCalculator() {
  const id = useId()
  const [orders, setOrders] = useState("300")
  const [ticket, setTicket] = useState("40")
  const [rate, setRate] = useState("12")
  const tracked = useRef(false)

  const commission = toNumber(orders) * toNumber(ticket) * (Math.min(toNumber(rate), 100) / 100)
  const difference = commission - MONTHLY_FEE

  const onEdit = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value)
    if (!tracked.current) {
      tracked.current = true
      trackEvent("calculator_used", { position: "parceria" })
    }
  }

  const fields = [
    { key: "orders", label: "Pedidos por mês", value: orders, set: setOrders, suffix: "pedidos", mode: "numeric" },
    { key: "ticket", label: "Ticket médio", value: ticket, set: setTicket, suffix: "R$", mode: "decimal" },
    { key: "rate", label: "Comissão do seu app", value: rate, set: setRate, suffix: "%", mode: "decimal" },
  ] as const

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-background/60 p-6 ring-1 ring-border sm:p-8">
      <div>
        <h3 className="text-xl font-extrabold tracking-tight">Faça a conta com os seus números</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Os valores abaixo são só um exemplo. Troque pelos dados da sua loja.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {fields.map((field) => (
          <label key={field.key} htmlFor={`${id}-${field.key}`} className="flex flex-col gap-2 text-sm font-semibold">
            {field.label}
            <span className="flex h-12 items-center gap-2 rounded-xl bg-card px-4 ring-1 ring-border focus-within:ring-2 focus-within:ring-primary">
              {field.suffix === "R$" ? <span className="text-muted-foreground">R$</span> : null}
              <input
                id={`${id}-${field.key}`}
                type="text"
                inputMode={field.mode}
                value={field.value}
                onChange={onEdit(field.set)}
                className="w-full min-w-0 bg-transparent text-base font-bold tabular-nums outline-none"
              />
              {field.suffix !== "R$" ? <span className="text-xs text-muted-foreground">{field.suffix}</span> : null}
            </span>
          </label>
        ))}
      </div>

      <dl className="flex flex-col gap-3 border-t border-border/60 pt-6" aria-live="polite">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-sm text-muted-foreground">Comissão paga ao app por mês</dt>
          <dd className="font-display text-lg font-black tabular-nums">{brl.format(commission)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-sm text-muted-foreground">ZapFlash Parceria por mês</dt>
          <dd className="font-display text-lg font-black tabular-nums">{brl.format(MONTHLY_FEE)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 rounded-2xl bg-primary/10 px-4 py-3 ring-1 ring-primary/30">
          <dt className="text-sm font-bold">{difference > 0 ? "Fica no seu caixa" : "Diferença"}</dt>
          <dd className="font-display text-2xl font-black tabular-nums text-primary">
            {brl.format(Math.max(difference, 0))}
          </dd>
        </div>
      </dl>
    </div>
  )
}
