"use client"

import { useState } from "react"
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
const ROTATE_MS = 2200

export function SegmentsBand() {
  const [active, setActive] = useState(0)

  return (
    <section aria-label="Para quem é o ZapFlash" className="ambient ambient-band border-y border-border/60">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-7 px-5 py-12 md:py-14">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <p className="text-balance text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Feito para <RotatingWord words={words} index={active} onIndexChange={setActive} interval={ROTATE_MS} />
          </p>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Qualquer delivery que vende pelo WhatsApp monta o cardápio em minutos, sem precisar de técnico.
          </p>
        </div>
      </div>
    </section>
  )
}
