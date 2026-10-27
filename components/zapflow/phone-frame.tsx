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
    <figure
      className={cn(
        "relative aspect-[390/800] w-full rounded-[2.6rem] border border-border bg-card p-2.5 shadow-2xl shadow-background ring-1 ring-foreground/5",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-background">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 300px, 70vw"
          className="object-cover object-top"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-background ring-1 ring-foreground/10"
        />
      </div>
    </figure>
  )
}
