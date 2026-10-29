import { RotatingWord } from "./rotating-word"

const segments = ["pizzarias", "hamburguerias", "açaiterias", "lanchonetes", "docerias", "restaurantes"]

export function SegmentsBand() {
  return (
    <section aria-label="Para quem é o ZapFlash" className="border-y border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-balance text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
          Feito para <RotatingWord words={segments} />
        </p>
        <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Qualquer delivery que vende pelo WhatsApp monta o cardápio em minutos, sem precisar de técnico.
        </p>
      </div>
    </section>
  )
}
