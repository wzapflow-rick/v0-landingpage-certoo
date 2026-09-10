"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  CreditCardIcon,
  MapPinnedIcon,
  PanelsTopLeftIcon,
  ShoppingBagIcon,
  type LucideIcon,
} from "lucide-react"
import { m, useScroll, useTransform, type MotionValue } from "motion/react"

import { useReducedMotionPreference } from "@/components/landing/motion-primitives"
import { flowSteps } from "@/lib/landing-content"
import { cn } from "@/lib/utils"

const flowIcons: readonly LucideIcon[] = [
  PanelsTopLeftIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  MapPinnedIcon,
]

const positions = [
  "left-[4%] top-[16%]",
  "right-[4%] top-[18%]",
  "bottom-[18%] left-[6%]",
  "bottom-[14%] right-[5%]",
] as const

const movement = [
  { x: -112, y: -12, rotate: -8 },
  { x: 112, y: -12, rotate: 7 },
  { x: -112, y: 12, rotate: 6 },
  { x: 112, y: 12, rotate: -7 },
] as const

function FlowNode({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const item = flowSteps[index]
  const Icon = flowIcons[index]
  const initial = movement[index]
  const x = useTransform(progress, [0, 0.46, 0.66], [initial.x, initial.x * 0.24, 0])
  const y = useTransform(progress, [0, 0.46, 0.66], [initial.y, initial.y * 0.24, 0])
  const rotate = useTransform(progress, [0, 0.5, 0.66], [initial.rotate, initial.rotate * 0.28, 0])
  const opacity = useTransform(progress, [0, 0.28, 0.58, 1], [0, 0.15, 1, 1])

  return (
    <m.article
      className={cn("flow-node absolute w-64 rounded-2xl border border-background/15 bg-foreground/78 p-5 backdrop-blur-md", positions[index])}
      style={{ x, y, rotate, opacity }}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.label}</p>
          <h3 className="mt-2 text-lg font-bold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-background/62">{item.description}</p>
        </div>
      </div>
    </m.article>
  )
}

function StaticFlow({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative mx-auto mb-10 aspect-square max-w-sm overflow-hidden rounded-full border border-background/15">
        <Image
          src="/images/landing/pizza-hero.png"
          alt="Pizza artesanal representando o fluxo do pedido"
          fill
          sizes="(min-width: 768px) 384px, 90vw"
          className="object-cover object-[72%_58%]"
        />
      </div>
      <div className="mx-auto flex max-w-4xl flex-col">
        {flowSteps.map((item, index) => {
          const Icon = flowIcons[index]

          return (
            <article key={item.label} className="border-t border-background/14 py-6">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.label}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/64">{item.description}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export function FlowScene() {
  const target = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotionPreference()
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  })
  const pizzaScale = useTransform(scrollYProgress, [0, 0.4, 0.66], [0.82, 1.04, 0.94])
  const pizzaRotate = useTransform(scrollYProgress, [0, 0.4, 0.66], [-6, 2, 0])
  const orbitScale = useTransform(scrollYProgress, [0.08, 0.62], [0.82, 1])
  const orbitOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.52, 1],
    [0.12, 0.12, 0.52, 0.52],
  )

  if (shouldReduceMotion) {
    return <StaticFlow />
  }

  return (
    <>
      <div
        ref={target}
        className="relative hidden min-h-[220svh] md:[@media(min-height:36rem)]:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-svh">
          <div aria-hidden="true" className="flow-grid absolute inset-0 opacity-30" />
          <m.div
            aria-hidden="true"
            className="motion-orbit absolute left-1/2 top-1/2 size-[min(56vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-background/14"
            style={{ scale: orbitScale, opacity: orbitOpacity }}
          />
          <m.div
            className="motion-object absolute left-1/2 top-1/2 size-[min(18rem,52svh)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-background/15 bg-secondary shadow-2xl shadow-primary/10 lg:size-[min(24rem,60svh)]"
            style={{ scale: pizzaScale, rotate: pizzaRotate }}
          >
            <Image
              src="/images/landing/pizza-hero.png"
              alt="Pizza artesanal representando o pedido conectado pelo ZapFlow"
              fill
              sizes="(min-width: 1024px) 384px, 288px"
              className="object-cover object-[72%_58%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-foreground/82 px-5 py-4 text-center backdrop-blur-md">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-accent">Um só fluxo</p>
            </div>
          </m.div>

          {flowSteps.map((item, index) => (
            <FlowNode key={item.label} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      <StaticFlow className="md:[@media(min-height:36rem)]:hidden" />
    </>
  )
}
