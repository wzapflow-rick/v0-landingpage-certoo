import type { Metadata } from "next";
import Image from "next/image";
import { BrandMark } from "@/components/landing/brand-mark";
import { Button } from "@/components/ui/button";
import { landingLinks } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "ZapFlow — Style tile",
  robots: { index: false, follow: false },
};
const colors = [
  ["Floresta", "bg-foreground text-background", "#061C16"],
  ["Esmeralda", "bg-secondary text-secondary-foreground", "#164E3D"],
  ["Lima", "bg-accent text-accent-foreground", "#C5E98A"],
  ["Névoa", "bg-background text-foreground", "#F3F5EF"],
  ["Sálvia", "bg-muted-foreground text-background", "#597069"],
];

export default function StyleTile() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 font-sans">
      <header className="flex items-center justify-between">
        <BrandMark />
        <a href="/" className="underline underline-offset-4">
          Voltar à landing
        </a>
      </header>
      <div className="flex flex-col gap-5">
        <p className="eyebrow text-secondary">Direção de arte / ZapFlow</p>
        <h1 className="text-6xl font-medium tracking-[-0.055em]">
          A receita de um bom fluxo.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Fotografia tátil, floresta profunda, luz quente nos alimentos e
          tipografia aberta. Movimento a serviço da explicação, com pausas para
          leitura.
        </p>
      </div>
      <section aria-label="Paleta" className="grid gap-4 sm:grid-cols-5">
        {colors.map(([name, classes, hex]) => (
          <div key={name} className="flex flex-col gap-3">
            <div className={`style-swatch flex items-end p-4 ${classes}`}>
              {name}
            </div>
            <p className="font-mono text-sm">{hex}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="eyebrow">Manrope / títulos e corpo</p>
          <h2 className="text-5xl font-medium tracking-[-0.05em]">
            Tudo encontra
            <br />
            seu lugar.
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Texto corrido com entrelinha confortável. Geist Mono é reservado a
            legendas e informações técnicas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={landingLinks.partnership}>Testar 7 dias</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/#produto">Conhecer o produto</a>
            </Button>
          </div>
        </div>
        <figure className="rounded-3xl bg-foreground p-6 text-background">
          <Image
            src="/images/landing/pizza-cutout.webp"
            alt="Direção de imagem: pizza com luz quente e fundo verde profundo"
            width={1024}
            height={1024}
          />
          <figcaption className="font-mono text-sm">
            Arte original gerada · composição em camadas
          </figcaption>
        </figure>
      </section>
      <section className="flex flex-col gap-4 rounded-3xl bg-secondary p-8 text-secondary-foreground">
        <h2 className="text-3xl">Editar a experiência</h2>
        <p className="leading-relaxed">
          Cores e composição: app/globals.css. Textos comerciais:
          lib/landing-content.ts. Capítulos e ritmo: flow-scene.tsx. Recortes e
          movimentos: food-scene.tsx. Originais e derivados:
          public/images/landing.
        </p>
        <p className="leading-relaxed">
          A transformação é uma coreografia 2.5D de recortes, não uma simulação
          física 3D. Em telas curtas e com movimento reduzido, a história usa
          capítulos em fluxo normal.
        </p>
      </section>
    </main>
  );
}
