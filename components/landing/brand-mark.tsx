import { ZapIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <a
      href="#inicio"
      aria-label="wZapFlow — voltar ao início"
      className={cn("inline-flex items-center gap-2.5 font-sans", className)}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ZapIcon aria-hidden="true" className="size-4" fill="currentColor" />
      </span>
      <span className="text-lg font-extrabold tracking-[-0.04em]">wZapFlow</span>
    </a>
  )
}
