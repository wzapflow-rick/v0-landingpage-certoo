"use client"

import { useEffect } from "react"
import { captureAttribution, trackEvent, withAttribution, type AnalyticsEvent } from "@/lib/analytics"

const SIGNUP_PATH = "cardapio.wzapflow.com.br/signup"

export function ConversionTracker() {
  useEffect(() => {
    captureAttribution()

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-track]")
      if (!link) return
      const name = link.dataset.track as AnalyticsEvent
      const params = { position: link.dataset.position, plan: link.dataset.plan }
      trackEvent(name, params)

      if (link.href.includes(SIGNUP_PATH)) {
        link.href = withAttribution(link.href)
        trackEvent("signup_redirect", params)
      }
    }
    document.addEventListener("click", onClick, { capture: true })

    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const plan = (entry.target as HTMLElement).dataset.planView
          if (!entry.isIntersecting || !plan || seen.has(plan)) continue
          seen.add(plan)
          trackEvent("plan_view", { plan })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 },
    )
    document.querySelectorAll("[data-plan-view]").forEach((element) => observer.observe(element))

    return () => {
      document.removeEventListener("click", onClick, { capture: true })
      observer.disconnect()
    }
  }, [])

  return null
}
