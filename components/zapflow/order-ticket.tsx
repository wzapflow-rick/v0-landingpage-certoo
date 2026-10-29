import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type TicketLine = { label: string; value: string; sub?: boolean }

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 })

export function OrderTicket({
  title,
  meta,
  lines,
  details,
  totalLabel = "Total",
  total,
  footer,
  className,
  animateLines = false,
}: {
  title: string
  meta: string
  lines: TicketLine[]
  details?: TicketLine[]
  totalLabel?: string
  total: string
  footer?: ReactNode
  className?: string
  animateLines?: boolean
}) {
  return (
    <div className={cn("ticket rounded-t-md px-5 pb-6 pt-5 font-mono text-[13px] leading-relaxed", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-sans text-base font-extrabold tracking-tight">{title}</p>
        <p className="ticket-muted shrink-0 text-xs">{meta}</p>
      </div>

      <ul className="ticket-rule mt-3 flex flex-col gap-1 pt-3">
        {lines.map((line) => (
          <li
            key={line.label}
            className={cn("flex justify-between gap-4", line.sub && "ticket-muted pl-3", animateLines && "ticket-line-in")}
          >
            <span>{line.label}</span>
            <span className="shrink-0 tabular-nums">{line.value}</span>
          </li>
        ))}
      </ul>

      {details && details.length > 0 ? (
        <dl className="ticket-rule mt-3 flex flex-col gap-1 pt-3">
          {details.map((detail) => (
            <div key={detail.label} className="flex justify-between gap-4">
              <dt className="ticket-muted">{detail.label}</dt>
              <dd className="text-right">{detail.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <p className="ticket-rule mt-3 flex items-baseline justify-between gap-4 pt-3 font-sans">
        <span className="font-bold">{totalLabel}</span>
        <span className="text-xl font-extrabold tabular-nums">{total}</span>
      </p>

      {footer ? <div className="mt-3">{footer}</div> : null}
    </div>
  )
}
