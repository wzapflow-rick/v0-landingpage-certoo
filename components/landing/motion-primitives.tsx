"use client"

import type { PropsWithChildren, PointerEvent as ReactPointerEvent } from "react"
import { useRef, useSyncExternalStore } from "react"
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery)
  mediaQuery.addEventListener("change", onStoreChange)

  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export function useReducedMotionPreference() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
}

export function LandingMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 24,
    mass: 0.2,
  })

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      style={{ scaleX }}
    />
  )
}

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("motion-reveal", className)}>{children}</div>
}

function ScrollWord({
  children,
  progress,
  range,
}: PropsWithChildren<{
  progress: MotionValue<number>
  range: [number, number]
}>) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const y = useTransform(progress, range, [10, 0])

  return (
    <m.span aria-hidden="true" className="scroll-word inline-block" style={{ opacity, y }}>
      {children}
    </m.span>
  )
}

export function ScrollText({ text, className }: { text: string; className?: string }) {
  const target = useRef<HTMLHeadingElement>(null)
  const shouldReduceMotion = useReducedMotionPreference()
  const words = text.split(" ")
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 82%", "end 82%"],
  })

  if (shouldReduceMotion) {
    return <h2 className={cn("text-balance", className)}>{text}</h2>
  }

  return (
    <h2 ref={target} aria-label={text} className={cn("text-balance", className)}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = Math.min(start + 0.14, 1)

        return (
          <span key={`${word}-${index}`} className="inline-block">
            <ScrollWord progress={scrollYProgress} range={[start, end]}>
              {word}
            </ScrollWord>
            {index < words.length - 1 ? "\u00a0" : null}
          </span>
        )
      })}
    </h2>
  )
}

export function MagneticButton({
  href,
  children,
  className,
}: PropsWithChildren<{ href: string; className?: string }>) {
  const shouldReduceMotion = useReducedMotionPreference()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.35 })

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      shouldReduceMotion ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18)
  }

  function resetPosition() {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      className={cn("inline-flex", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      style={{ x: springX, y: springY }}
    >
      <Button asChild size="lg" className="h-14 rounded-full px-7 text-base sm:h-16 sm:px-9">
        <a href={href}>
          {children}
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      </Button>
    </m.div>
  )
}
