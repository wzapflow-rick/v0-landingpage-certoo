import Image from "next/image"

const steps = [
  "O cliente abre seu cardápio pelo link ou QR Code.",
  "Escolhe os produtos e finaliza o pedido.",
  "O pedido cai organizado no seu painel, com o WhatsApp conectado.",
]

export function ProductShowcase() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2
            id="como-funciona-titulo"
            className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
          >
            Do link ao painel. <span className="text-flash italic">Tudo num só lugar.</span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Telas reais da VR Pizza Show, de Aracaju, que usa a ZapFlash para receber pedidos.
          </p>
        </div>

        <figure className="mt-12 flex flex-col gap-8 rounded-3xl bg-card p-4 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-3 lg:w-[30%] lg:shrink-0">
              <p className="text-sm font-bold text-muted-foreground">O que o cliente vê</p>
              <Image
                src="/images/landing/vr-pizza-mobile-itens.png"
                alt="Cardápio da VR Pizza Show no celular, com ofertas do dia, macarronadas e botão Quero essa"
                width={492}
                height={746}
                sizes="(min-width: 1024px) 340px, 92vw"
                className="mx-auto w-full max-w-sm rounded-2xl ring-1 ring-border"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <p className="text-sm font-bold text-muted-foreground">O que a sua loja vê</p>
              <Image
                src="/images/landing/painel-real.png"
                alt="Painel da ZapFlash da VR Pizza Show com faturamento, pedidos, WhatsApp conectado, bot de saudação e campanhas"
                width={1900}
                height={901}
                sizes="(min-width: 1024px) 820px, 92vw"
                className="w-full rounded-2xl ring-1 ring-border"
              />
            </div>
          </div>

          <figcaption className="border-t border-border/60 pt-8">
            <ol className="grid gap-5 sm:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-pretty text-sm font-medium leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
