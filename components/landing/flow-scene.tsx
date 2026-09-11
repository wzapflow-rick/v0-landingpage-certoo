"use client";

import { useRef } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { m, useScroll, useTransform, useMotionValue, useReducedMotion } from "motion/react";
import { FoodScene } from "@/components/landing/food-scene";
import { flowSteps } from "@/lib/landing-content";

const chapters = [
  {
    label: "A escolha",
    title: "Um pedido.\nMuitas partes.",
    description:
      "A escolha, o pagamento, o preparo e a entrega. Uma boa experiência depende de tudo isso se conectar.",
    phase: 0,
  },
  {
    label: "O desencontro",
    title: "Separado,\ntudo pesa mais.",
    description:
      "Uma mensagem aqui. Um pedido ali. Quando a informação se espalha, sua equipe precisa juntar as peças.",
    phase: 0.55,
  },
  {
    label: "A conexão",
    title: "É aqui que\nentra o wZapFlow.",
    description:
      "Cardápio por link ou QR Code, pedidos no Kanban, Pix e cartões. Cada parte encontra o seu lugar.",
    phase: 0.7,
  },
  {
    label: "O fluxo",
    title: "Muda o pedido.\nO fluxo continua.",
    description:
      "Pizza, hambúrguer ou a especialidade da casa. Da escolha à entrega, sua operação fala a mesma língua.",
    phase: 1,
  },
];

function ChapterFood({ phase }: { phase: number }) {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const still = useMotionValue(phase);
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const progress = useTransform(scrollYProgress, [0, 0.8], [Math.max(0, phase - 0.3), Math.min(1, phase + 0.25)]);
  return (
    <div ref={target} className="chapter-food">
      <FoodScene progress={reduced ? still : progress} />
    </div>
  );
}

export function FlowScene() {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={target} className="story-layout">
      <div className="story-visual">
        <div className="story-sticky">
          <FoodScene progress={scrollYProgress} />
          <div className="story-track">
            <m.div style={{ scaleX }} />
          </div>
          <p className="eyebrow text-background/60">
            Partes diferentes. Um só fluxo.
          </p>
        </div>
      </div>
      <div className="story-chapters">
        {chapters.map((chapter, index) => (
          <article className="story-chapter" key={chapter.label}>
            <p className="eyebrow text-accent">
              {String(index + 1).padStart(2, "0")} / {chapter.label}
            </p>
            <h2 className="chapter-title text-balance">{chapter.title}</h2>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-background/65">
              {chapter.description}
            </p>
            <ChapterFood phase={chapter.phase} />
            {index === 2 && (
              <ul className="flex flex-wrap gap-2">
                {flowSteps.map((step) => (
                  <li
                    key={step.label}
                    className="rounded-full border border-background/20 px-4 py-2 text-sm"
                  >
                    {step.label}
                  </li>
                ))}
              </ul>
            )}
            {index === 3 && (
              <a
                href="#produto"
                className="inline-flex items-center gap-2 text-base font-semibold text-accent underline underline-offset-8"
              >
                Veja o sistema por trás do pedido{" "}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
