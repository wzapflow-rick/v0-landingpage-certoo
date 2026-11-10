import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

const dashes = ["45%", "80%", "100%", "62%"]

export function SpeedLines({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("speed-lines", className)}>
      {dashes.map((width, index) => (
        <span key={width} style={{ width, "--i": index } as CSSProperties} />
      ))}
    </span>
  )
}
