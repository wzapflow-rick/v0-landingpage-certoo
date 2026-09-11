import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DarkGradientBg({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-foreground text-background", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(100% 100% at 0% 0%, var(--secondary), var(--foreground))" }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="absolute inset-0 opacity-20" style={{
            background: "linear-gradient(var(--primary), transparent)",
            maskImage: `linear-gradient(90deg, transparent ${index * 3}%, black ${17 + index * 5}%, transparent ${36 + index * 5}%, black 78%, transparent 97%)`,
            transform: `skewX(45deg) translateX(${index * 3}%)`,
          }} />
        ))}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--background) 1px, transparent 0)", backgroundSize: "20px 20px" }} />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
