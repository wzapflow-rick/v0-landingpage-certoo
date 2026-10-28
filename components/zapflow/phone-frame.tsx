import Image from "next/image"
import { cn } from "@/lib/utils"

type PhoneFrameProps = {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export function PhoneFrame({ src, alt, priority = false, className }: PhoneFrameProps) {
  return (
    <figure className={cn("device relative aspect-[390/820] w-full rounded-[2.75rem] p-[0.55rem]", className)}>
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.25rem] bg-background">
        {/* Status bar strip keeps the camera island off the real menu content */}
        <div aria-hidden="true" className="relative h-7 shrink-0 bg-background">
          <span className="absolute left-1/2 top-1.5 h-[1.1rem] w-[4.5rem] -translate-x-1/2 rounded-full bg-[#050506] ring-1 ring-foreground/10" />
        </div>
        <div className="relative flex-1">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 320px, 72vw"
            className="object-cover object-top"
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-foreground/5"
        />
      </div>
    </figure>
  )
}
