"use client"

import { useEffect, useId, useRef } from "react"
import { animate, motion, useAnimationFrame, useMotionValue, type AnimationPlaybackControls } from "motion/react"

type TextRingProps = {
  words: string[]
  separator?: string
  size?: number
  idleSeconds?: number
  hoverSeconds?: number
  children?: React.ReactNode
  className?: string
}

const VIEWBOX = 200
const RADIUS = 84

export function TextRing({
  words,
  separator = "•",
  size = 176,
  idleSeconds = 22,
  hoverSeconds = 7,
  children,
  className,
}: TextRingProps) {
  const pathId = useId()
  const rotation = useMotionValue(0)
  const scale = useMotionValue(1)
  const rateRef = useRef(360 / idleSeconds)
  const runningRef = useRef(false)
  const scaleAnim = useRef<AnimationPlaybackControls | null>(null)

  const label = words.join(" · ")
  const segment = `${words.join(` ${separator} `)} ${separator} `
  const content = segment
  const circumference = 2 * Math.PI * RADIUS

  useEffect(() => {
    runningRef.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    rateRef.current = 360 / idleSeconds
    return () => scaleAnim.current?.stop()
  }, [idleSeconds])

  useAnimationFrame((_, delta) => {
    if (!runningRef.current) return
    const dt = Math.min(delta, 64) / 1000
    rotation.set((rotation.get() + rateRef.current * dt) % 360)
  })

  const setActive = (active: boolean) => {
    if (!runningRef.current) return
    rateRef.current = 360 / (active ? hoverSeconds : idleSeconds)
    scaleAnim.current?.stop()
    scaleAnim.current = animate(scale, active ? 0.94 : 1, { type: "spring", damping: 20, stiffness: 300 })
  }

  return (
    <div
      className={`relative grid shrink-0 place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <span className="sr-only">{label}</span>
      <motion.svg
        aria-hidden="true"
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="absolute inset-0 size-full overflow-visible text-muted-foreground"
        style={{ rotate: rotation, scale }}
      >
        <defs>
          <path
            id={pathId}
            d={`M ${VIEWBOX / 2} ${VIEWBOX / 2} m -${RADIUS} 0 a ${RADIUS} ${RADIUS} 0 1 1 ${RADIUS * 2} 0 a ${RADIUS} ${RADIUS} 0 1 1 -${RADIUS * 2} 0`}
          />
        </defs>
        <text className="fill-current font-sans text-[13px] font-bold uppercase" style={{ letterSpacing: "0.08em" }}>
          <textPath href={`#${pathId}`} textLength={circumference - 2} lengthAdjust="spacing">
            {content}
          </textPath>
        </text>
      </motion.svg>
      <div className="relative">{children}</div>
    </div>
  )
}
