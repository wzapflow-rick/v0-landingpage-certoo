import { proofPoints } from "@/lib/landing-content";

export function ProofSection() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="bg-secondary text-secondary-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="proof-heading"
            className="max-w-xl text-balance text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl"
          >
            Mais controle na operação.
            <br />
            Mais do seu lado.
          </h2>
          <p className="max-w-xs leading-relaxed text-secondary-foreground/70">
            Uma estrutura para o seu negócio, sem comissão sobre cada pedido.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {proofPoints.map((point) => (
            <article
              key={point.label}
              className="flex flex-col gap-3 border-t border-secondary-foreground/25 pt-8"
            >
              <p className="text-6xl font-medium tracking-[-0.055em] text-accent">
                {point.value}
              </p>
              <h3 className="text-xl">{point.label}</h3>
              <p className="max-w-xs leading-relaxed text-secondary-foreground/70">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
