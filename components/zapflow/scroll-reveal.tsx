"use client"

import { useEffect } from "react"

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-visible", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    )

    for (const target of targets) {
      const rect = target.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.88) target.setAttribute("data-visible", "")
      else observer.observe(target)
    }
    root.setAttribute("data-reveal", "on")

    return () => observer.disconnect()
  }, [])

  return null
}
