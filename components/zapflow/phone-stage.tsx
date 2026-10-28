"use client"

import { useEffect, useRef, type ReactNode } from "react"

const TILT_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)"
const MAX_TILT_X = 3.5
const MAX_TILT_Y = 5

export function PhoneStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const media = window.matchMedia(TILT_QUERY)
    let frame = 0

    const reset = () => {
      stage.style.setProperty("--tilt-x", "0deg")
      stage.style.setProperty("--tilt-y", "0deg")
    }

    const onMove = (event: PointerEvent) => {
      if (!media.matches) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect()
        const dx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth
        const dy = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight
        const clamp = (value: number) => Math.max(-1, Math.min(1, value * 2))
        stage.style.setProperty("--tilt-y", `${(clamp(dx) * MAX_TILT_Y).toFixed(2)}deg`)
        stage.style.setProperty("--tilt-x", `${(-clamp(dy) * MAX_TILT_X).toFixed(2)}deg`)
      })
    }

    const onMediaChange = () => {
      if (!media.matches) reset()
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", reset)
    media.addEventListener("change", onMediaChange)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", reset)
      media.removeEventListener("change", onMediaChange)
    }
  }, [])

  return (
    <div className="phone-perspective">
      <div ref={stageRef} className="phone-tilt relative">
        {children}
      </div>
    </div>
  )
}
