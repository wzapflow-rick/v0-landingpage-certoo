"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const BriocheAloft = dynamic(() => import("./brioche-aloft"), { ssr: false })

const layers = [
  { kind: "crown", label: "Pão brioche", note: "Selado na manteiga" },
  { kind: "sauce", label: "Molho da casa", note: "+ R$ 2,00" },
  { kind: "onion", label: "Cebola roxa", note: "+ R$ 1,50" },
  { kind: "cheddar", label: "Cheddar duplo", note: "+ R$ 4,00" },
  { kind: "beef", label: "Blend 180g", note: "Ponto: ao ponto" },
  { kind: "tomato", label: "Tomate", note: "Incluso" },
  { kind: "lettuce", label: "Alface", note: "Incluso" },
  { kind: "heel", label: "Pão brioche", note: "Base do lanche" },
]

const labelFont = {
  fontFamily: "var(--font-manrope), system-ui, sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.01em",
}

export function BurgerStage() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Hambúrguer 3D que se separa em camadas, cada uma identificada como um adicional do cardápio com seu preço"
      className="relative aspect-square w-full touch-manipulation sm:aspect-[3/2] overflow-hidden rounded-3xl border border-border bg-background"
    >
      {visible ? (
        <BriocheAloft
          layers={layers}
          background="#09090b"
          textColor="#fafafa"
          font={labelFont}
          explode="hover"
          spacing={5}
          scale={92}
          parallax={4}
          spin={3}
        />
      ) : null}
    </div>
  )
}
