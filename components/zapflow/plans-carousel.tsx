"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { plans } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

const EASE = "cubic-bezier(0.4,0,0.2,1)"
const DURATION = 650

const figures = {
  Parceria: {
    src: "/brand/figures/chef-parceria.png",
    width: 245,
    height: 729,
    bg: "var(--plan-parceria)",
    alt: "Chef Parceria, cozinheira de cabelo cacheado e avental roxo piscando e apontando para você",
  },
  Start: {
    src: "/brand/figures/chef-start.png",
    width: 228,
    height: 708,
    bg: "var(--plan-start)",
    alt: "Chef Start, jovem cozinheiro de avental azul com os braços cruzados",
  },
  Pro: {
    src: "/brand/figures/chef-pro.png",
    width: 407,
    height: 720,
    bg: "var(--primary)",
    alt: "Chef Pro, cozinheiro barbudo de avental preto e verde apontando para você",
  },
  Elite: {
    src: "/brand/figures/chef-elite.png",
    width: 279,
    height: 700,
    bg: "var(--plan-elite)",
    alt: "Chef Elite, mestre cozinheiro de óculos e barba branca com detalhes dourados",
  },
} as const

const items = plans.map((plan) => ({ plan, figure: figures[plan.name as keyof typeof figures] }))
const total = items.length

type Role = "center" | "left" | "right" | "hidden"

function roleFor(index: number, active: number): Role {
  if (index === active) return "center"
  if (index === (active + total - 1) % total) return "left"
  if (index === (active + 1) % total) return "right"
  return "hidden"
}

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/></svg>\")"

export function PlansCarousel() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const lock = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)")
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const goTo = useCallback((next: number) => {
    if (lock.current) return
    lock.current = true
    setActive(((next % total) + total) % total)
    window.setTimeout(() => {
      lock.current = false
    }, DURATION)
  }, [])

  const navigate = useCallback(
    (direction: "next" | "prev") => goTo(active + (direction === "next" ? 1 : -1)),
    [active, goTo],
  )

  const current = items[active]
  const slug = current.plan.name.toLowerCase()

  const center = isMobile ? "50%" : "64%"

  const figureStyle = (role: Role, ratio: number): CSSProperties => {
    const base: CSSProperties = {
      position: "absolute",
      aspectRatio: `${ratio}`,
      height: isMobile ? "44%" : "82%",
      bottom: isMobile ? "40%" : "0",
      transformOrigin: "bottom center",
      transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}`,
      willChange: "transform, filter, opacity",
    }
    if (role === "center") {
      return { ...base, left: center, transform: "translateX(-50%) scale(1)", filter: "blur(0px)", opacity: 1, zIndex: 20 }
    }
    if (role === "hidden") {
      return {
        ...base,
        left: center,
        transform: `translateX(-50%) translateY(${isMobile ? "-8%" : "-22%"}) scale(0.25)`,
        filter: "blur(4px)",
        opacity: 0,
        zIndex: 5,
        pointerEvents: "none",
      }
    }
    const side = role === "left" ? (isMobile ? "16%" : "42%") : isMobile ? "84%" : "84%"
    return {
      ...base,
      left: side,
      transform: `translateX(-50%) translateY(${isMobile ? "-4%" : "-14%"}) scale(${isMobile ? 0.42 : 0.4})`,
      filter: "blur(2px)",
      opacity: 0.85,
      zIndex: 10,
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Planos da ZapFlash"
      tabIndex={0}
      data-hide-mobile-cta
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") navigate("next")
        if (event.key === "ArrowLeft") navigate("prev")
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        touchStart.current = null
        if (!start) return
        const touch = event.changedTouches[0]
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) navigate(dx < 0 ? "next" : "prev")
      }}
      className="relative w-full touch-pan-y overflow-hidden text-paper-foreground outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-paper-foreground/40"
      style={{ backgroundColor: current.figure.bg, transition: `background-color ${DURATION}ms ${EASE}` }}
    >
      <div className="relative h-[100svh] max-h-[980px] min-h-[680px] w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-50 opacity-40"
          style={{ backgroundImage: grain, backgroundSize: "200px 200px", backgroundRepeat: "repeat" }}
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[16%] z-[2] select-none sm:top-[12%]">
          {items.map((item, index) => (
            <p
              key={item.plan.name}
              className="absolute inset-x-0 text-center font-display font-black uppercase italic leading-none text-paper"
              style={{
                fontSize: `clamp(56px, ${Math.min(27, 150 / item.plan.name.length).toFixed(2)}vw, 400px)`,
                letterSpacing: "-0.04em",
                whiteSpace: "nowrap",
                opacity: index === active ? 1 : 0,
                transform: index === active ? "translateY(0)" : "translateY(6%)",
                transition: `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`,
              }}
            >
              {item.plan.name}
            </p>
          ))}
        </div>

        <div className="absolute left-4 right-4 top-5 z-[60] flex items-center justify-end sm:left-8 sm:right-8 sm:top-6">
          <div
            role="tablist"
            aria-label="Escolha um plano"
            className="flex w-full gap-1 rounded-full bg-paper-foreground/10 p-1 sm:w-auto"
          >
            {items.map((item, index) => (
              <button
                key={item.plan.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => goTo(index)}
                className={cn(
                  "h-10 flex-1 rounded-full px-2 text-xs font-bold uppercase tracking-wider transition-colors sm:h-auto sm:flex-none sm:px-4 sm:py-1.5",
                  index === active ? "bg-paper-foreground text-paper" : "hover:bg-paper-foreground/10",
                )}
              >
                {item.plan.name}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 z-[3]">
          {items.map((item, index) => {
            const role = roleFor(index, active)
            return (
              <div
                key={item.plan.name}
                style={figureStyle(role, item.figure.width / item.figure.height)}
                className={cn(role !== "center" && "cursor-pointer")}
                onClick={role === "center" ? undefined : () => goTo(index)}
                aria-hidden={role !== "center"}
              >
                <Image
                  src={item.figure.src}
                  alt={role === "center" ? item.figure.alt : ""}
                  width={item.figure.width}
                  height={item.figure.height}
                  priority={index === 0}
                  draggable={false}
                  sizes="(max-width: 640px) 60vw, 40vw"
                  className="h-full w-full select-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(9,11,13,0.35)]"
                />
              </div>
            )
          })}
        </div>

        <div
          data-plan-view={slug}
          aria-live="polite"
          className="absolute bottom-4 left-4 right-4 z-[60] rounded-3xl bg-paper-foreground/92 p-5 text-paper shadow-[0_24px_60px_rgba(9,11,13,0.35)] backdrop-blur-md sm:bottom-12 sm:left-8 sm:right-auto sm:w-[min(400px,34vw)] sm:p-7 lg:left-14"
        >
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-paper/75">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ backgroundColor: current.figure.bg, transition: `background-color ${DURATION}ms ${EASE}` }}
            />
            Plano {current.plan.name} · para {current.plan.stage.toLowerCase()}
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-black tabular-nums sm:text-4xl">{current.plan.price}</span>
            <span className="text-sm font-semibold text-paper/75">{current.plan.cadence}</span>
          </p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-paper/90 sm:text-base">{current.plan.description}</p>
          <ul
            className="mt-4 hidden flex-col gap-2 border-t border-paper/15 pt-4 text-sm text-paper/90 sm:flex"
            aria-label={`Incluso no plano ${current.plan.name}`}
          >
            {current.plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 leading-snug">
                <Check
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: current.figure.bg, transition: `color ${DURATION}ms ${EASE}` }}
                  strokeWidth={3}
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <NavButton label="Plano anterior" onClick={() => navigate("prev")}>
              <ArrowLeft className="size-6" strokeWidth={2.25} aria-hidden="true" />
            </NavButton>
            <NavButton label="Próximo plano" onClick={() => navigate("next")}>
              <ArrowRight className="size-6" strokeWidth={2.25} aria-hidden="true" />
            </NavButton>
            <a
              href={current.plan.href}
              data-track="cta_click"
              data-position="planos_carrossel"
              data-plan={slug}
              className="group ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-paper px-5 text-sm font-bold text-paper-foreground transition-transform hover:scale-[1.03] sm:h-14 sm:px-6 sm:text-base"
            >
              {current.plan.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-paper/40 text-paper transition-[transform,background-color,border-color] duration-150 hover:scale-105 hover:border-paper hover:bg-paper/10 sm:size-14"
    >
      {children}
    </button>
  )
}
