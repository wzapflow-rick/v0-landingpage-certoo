"use client"

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "motion/react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

const wordVariants: Variants = {
  show: { transition: { staggerChildren: 0.03 } },
  exit: { transition: { staggerChildren: 0.02 } },
}

const charVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.42, ease } },
  exit: { y: "-120%", opacity: 0, transition: { duration: 0.32, ease } },
}

type RotatingWordProps = {
  words: string[]
  interval?: number
  className?: string
  index?: number
  onIndexChange?: (index: number) => void
}

export function RotatingWord({
  words,
  interval = 2200,
  className,
  index: controlledIndex,
  onIndexChange,
}: RotatingWordProps) {
  const [ownIndex, setOwnIndex] = useState(0)
  const index = controlledIndex ?? ownIndex
  const [width, setWidth] = useState<number>()
  const rootRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(rootRef, { margin: "-10% 0px" })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || reduceMotion || words.length < 2) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      const next = (index + 1) % words.length
      if (controlledIndex === undefined) setOwnIndex(next)
      onIndexChange?.(next)
    }, interval)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion, words.length, interval, index, controlledIndex, onIndexChange])

  useLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return
    const observer = new ResizeObserver(() => setWidth(content.offsetWidth))
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  const word = words[index] ?? ""

  return (
    <span ref={rootRef} className="inline-block align-baseline">
      <span className="sr-only">{words.join(", ")}</span>
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={width === undefined ? undefined : { width }}
        transition={{ duration: 0.45, ease }}
        className={cn(
          "box-content inline-flex justify-center overflow-hidden whitespace-nowrap rounded-xl bg-accent px-[0.35em] py-[0.04em] align-baseline text-accent-foreground",
          className,
        )}
      >
        <span ref={contentRef} className="inline-flex">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={word}
              variants={wordVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="inline-flex"
            >
              {Array.from(word).map((char, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block will-change-transform">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  )
}
