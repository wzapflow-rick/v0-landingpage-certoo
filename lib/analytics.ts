import { track as vercelTrack } from "@vercel/analytics"

export type AnalyticsEvent =
  | "cta_click"
  | "signup_redirect"
  | "whatsapp_click"
  | "plan_view"
  | "calculator_used"
  | "login_click"

type EventParams = Record<string, string | number | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const ATTRIBUTION_KEY = "zf_attribution"
const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const

export const GA_LINKER_DOMAINS = ["wzapflow.com.br", "www.wzapflow.com.br", "cardapio.wzapflow.com.br"]

export function trackEvent(event: AnalyticsEvent, params: EventParams = {}) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)) as Record<
    string,
    string | number
  >
  window.gtag?.("event", event, clean)
  try {
    vercelTrack(event, clean)
  } catch {
    // Vercel custom events are unavailable outside production; GA still receives the event.
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const found: Record<string, string> = {}
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 200)
  }
  if (Object.keys(found).length > 0) {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(found))
  }
}

export function withAttribution(href: string) {
  let stored: Record<string, string> = {}
  try {
    stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}")
  } catch {
    stored = {}
  }
  const url = new URL(href, window.location.href)
  for (const [key, value] of Object.entries(stored)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value)
  }
  if (!url.searchParams.has("utm_source")) {
    url.searchParams.set("utm_source", "landing")
    url.searchParams.set("utm_medium", "site")
  }
  return url.toString()
}
