"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type StageState = "idle" | "armed" | "playing"

export function ChatStage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<StageState>("idle")

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    setState("armed")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("playing")
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-state={state} className={`chat-stage ${className ?? ""}`}>
      {children}
    </div>
  )
}
