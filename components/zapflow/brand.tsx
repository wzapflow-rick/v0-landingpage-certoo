import Image from "next/image"
import { cn } from "@/lib/utils"

export function Brand({ className }: { className?: string }) {
  return (
    <a href="#inicio" className={cn("flex shrink-0 items-center", className)} aria-label="ZapFlash, voltar ao início">
      <Image
        src="/brand/logo-horizontal.png"
        alt=""
        width={374}
        height={90}
        priority
        className="logo-blend h-9 w-auto sm:h-10"
      />
    </a>
  )
}
