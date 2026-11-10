"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-mobile-cta]")
    if (targets.length === 0) {
      setVisible(true)
      return
    }
    const onScreen = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target)
        else onScreen.delete(entry.target)
      }
      setVisible(onScreen.size === 0)
    })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/85 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={landingLinks.partnership}
        className="btn-glow flex h-12 w-full items-center justify-center gap-2 rounded-full font-bold text-primary-foreground"
      >
        Criar meu cardápio grátis
        <ArrowRight className="size-5" aria-hidden="true" />
      </a>
    </div>
  )
}
