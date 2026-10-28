import { BurgerStage } from "./burger-stage"

const orderLines = [
  { item: "1x Burger da casa", price: "R$ 32,00" },
  { item: "+ Cheddar duplo", price: "R$ 4,00" },
  { item: "+ Molho da casa", price: "R$ 2,00" },
  { item: "+ Cebola roxa", price: "R$ 1,50" },
]

export function Addons() {
  return (
    <section id="adicionais" aria-labelledby="adicionais-titulo" className="reveal px-5 py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
        <div data-reveal className="flex flex-col gap-6 lg:w-2/5">
          <p className="text-sm font-semibold text-accent">Adicionais e complementos</p>
          <h2 id="adicionais-titulo" data-wipe className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Cada camada vira venda a mais
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            O cliente monta o lanche do jeito dele: escolhe o ponto, tira a cebola, dobra o cheddar. Cada adicional
            tem preço próprio e o ticket médio sobe sem você precisar oferecer nada.
          </p>

          <div className="surface rounded-2xl p-5">
            <p className="text-sm font-semibold">Como o pedido chega no seu WhatsApp</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {orderLines.map((line) => (
                <li key={line.item} className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{line.item}</span>
                  <span className="tabular-nums">{line.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-bold">
              <span>Total</span>
              <span className="tabular-nums text-primary">R$ 39,50</span>
            </div>
          </div>
        </div>

        <figure className="flex flex-col gap-3 lg:w-3/5">
          <BurgerStage />
          <figcaption className="text-center text-sm text-muted-foreground">
            <span className="sm:hidden">Toque no lanche para ver as camadas.</span>
            <span className="hidden sm:inline">Passe o mouse ou toque no lanche para ver as camadas.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
