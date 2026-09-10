"use client"

import type { PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react"
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { Button } from "@/components/ui/button"
import { landingLinks } from "@/lib/landing-content"

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const imageX = useSpring(x, { stiffness: 90, damping: 24 })
  const imageY = useSpring(y, { stiffness: 90, damping: 24 })

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (
      shouldReduceMotion ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * -0.018)
    y.set((event.clientY - bounds.top - bounds.height / 2) * -0.018)
  }

  function resetImage() {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative min-h-svh overflow-hidden bg-foreground text-background"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetImage}
    >
      <m.div
        aria-hidden="true"
        className="motion-object absolute -inset-4 motion-reduce:!transform-none"
        style={{ x: imageX, y: imageY, scale: 1.035 }}
      >
        <Image
          src="/images/landing/pizza-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
      </m.div>
      <div aria-hidden="true" className="absolute inset-0 bg-foreground/55" />

      <div className="relative mx-auto flex min-h-svh max-w-7xl items-end px-5 pb-14 pt-32 sm:px-8 sm:pb-16 lg:items-center lg:pb-0">
        <m.div
          className="hero-reveal max-w-4xl"
          initial={false}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          <m.p
            className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent motion-reduce:!translate-y-0 motion-reduce:!opacity-100 sm:text-sm"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            Cardápio digital • pedidos • operação
          </m.p>
          <m.h1
            id="hero-title"
            className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 sm:text-7xl lg:text-8xl xl:text-9xl"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
          >
            Do cardápio ao pedido. Tudo flui.
          </m.h1>
          <m.p
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-background/76 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 sm:text-lg"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            Conecte seu cardápio digital à operação, receba pedidos online e pague zero comissão por venda.
          </m.p>
          <m.div
            className="mt-8 flex flex-col gap-3 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 sm:flex-row"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button asChild size="lg" className="h-12 rounded-full px-6">
              <a href="#fluxo">
                Conhecer o fluxo
                <ArrowDownIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6">
              <a href={landingLinks.partnership}>
                Começar 7 dias grátis
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </Button>
          </m.div>
        </m.div>

        <a
          href="#fluxo"
          className="absolute bottom-8 right-8 hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-background/60 transition-colors hover:text-background md:flex"
        >
          Role para descobrir
          <span className="flex size-9 items-center justify-center rounded-full border border-background/25">
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
