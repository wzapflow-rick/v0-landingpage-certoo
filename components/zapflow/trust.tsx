import { guarantees } from "@/lib/landing-content"
import { PhoneFrame } from "./phone-frame"

export function Trust() {
  return (
    <section id="confianca" aria-labelledby="confianca-titulo" className="relative border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20">
        <figure className="mx-auto w-full max-w-[17rem] lg:mx-0">
          <PhoneFrame
            src="/images/landing/menu-product-mobile.png"
            alt="Tela real de um cardápio em operação na ZapFlash, com escolha de tamanho de produto"
          />
          <figcaption className="mt-5 text-center text-sm text-muted-foreground">
            Tela real de um cardápio em operação na ZapFlash.
          </figcaption>
        </figure>

        <div>
          <h2
            id="confianca-titulo"
            className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
          >
            Condições claras, <span className="text-flash italic">sem letra miúda.</span>
          </h2>
          <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            O que você vê aqui é o que está no seu cadastro. Sem promessa de resultado, sem taxa escondida.
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-border/80 ring-1 ring-border/80 sm:grid-cols-2">
            {guarantees.map((item) => (
              <div key={item.title} className="bg-background p-6">
                <dt className="font-display text-lg font-extrabold tracking-tight">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
