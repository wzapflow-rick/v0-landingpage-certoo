"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RotatingWord } from "./rotating-word"

const segments = [
  { word: "pizzarias", label: "Pizzarias" },
  { word: "hamburguerias", label: "Hamburguerias" },
  { word: "açaiterias", label: "Açaí e sorvetes" },
  { word: "lanchonetes", label: "Lanchonetes" },
  { word: "restaurantes", label: "Restaurantes e marmitarias" },
  { word: "docerias", label: "Docerias" },
]

const words = segments.map((segment) => segment.word)

export function SegmentsBand() {
  const [active, setActive] = useState(0)

  return (
    <section aria-label="Para quem é o ZapFlash" className="ambient ambient-band border-y border-border/60">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-7 px-5 py-12 md:py-14">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <p className="text-balance text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Feito para <RotatingWord words={words} index={active} onIndexChange={setActive} interval={2600} />
          </p>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Qualquer delivery que vende pelo WhatsApp monta o cardápio em minutos, sem precisar de técnico.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
          {segments.map((segment, index) => {
            const isActive = index === active
            return (
              <li key={segment.word}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(index)}
                  className={cn(
                    "segment-chip h-10 rounded-full px-4 text-sm font-semibold transition-[color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-accent/12 text-foreground ring-1 ring-accent/45"
                      : "text-muted-foreground ring-1 ring-foreground/10 hover:text-foreground hover:ring-foreground/25",
                  )}
                >
                  {segment.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
