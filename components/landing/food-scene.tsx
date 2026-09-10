"use client";

import Image from "next/image";
import { m, useTransform, type MotionValue } from "motion/react";

const burgerLayers = [
  { top: 0, bottom: 72, shift: 14, turn: -9 },
  { top: 28, bottom: 59, shift: 8, turn: 8 },
  { top: 41, bottom: 49, shift: 3, turn: -12 },
  { top: 51, bottom: 35, shift: 0, turn: 5 },
  { top: 65, bottom: 24, shift: -3, turn: -8 },
  { top: 76, bottom: 0, shift: -8, turn: 7 },
];

function BurgerLayer({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const layer = burgerLayers[index];
  const y = useTransform(
    progress,
    [0, 0.4, 0.58, 0.84, 1],
    [
      `${layer.shift}%`,
      `${layer.shift}%`,
      "0%",
      `${layer.shift}%`,
      `${layer.shift}%`,
    ],
  );
  const x = useTransform(
    progress,
    [0, 0.4, 0.58, 0.84, 1],
    [index % 2 ? -60 : 60, index % 2 ? -60 : 60, 0, 0, 0],
  );
  const rotate = useTransform(
    progress,
    [0.38, 0.58, 0.84, 1],
    [layer.turn, 0, 0, 0],
  );
  const opacity = useTransform(progress, [0.34, 0.45, 1], [0, 1, 1]);
  return (
    <m.div
      className="food-layer"
      style={{
        x,
        y,
        rotate,
        opacity,
        zIndex: 10 - index,
        clipPath: `inset(${layer.top}% 0 ${layer.bottom}% 0)`,
      }}
    >
      <Image
        src="/images/landing/burger-cutout.webp"
        fill
        sizes="(min-width: 1024px) 48vw, 90vw"
        alt=""
      />
    </m.div>
  );
}

export function FoodScene({ progress }: { progress: MotionValue<number> }) {
  const pizzaOpacity = useTransform(progress, [0, 0.27, 0.4, 1], [1, 1, 0, 0]);
  const pizzaScale = useTransform(
    progress,
    [0, 0.27, 0.4, 1],
    [1, 0.9, 0.65, 0.65],
  );
  const sliceY = useTransform(
    progress,
    [0, 0.2, 0.4, 1],
    ["0%", "-9%", "-20%", "-20%"],
  );
  const sliceX = useTransform(
    progress,
    [0, 0.2, 0.4, 1],
    ["0%", "5%", "14%", "14%"],
  );
  const sliceRotate = useTransform(progress, [0, 0.4, 1], [0, 12, 12]);
  const baseRotate = useTransform(progress, [0, 0.4, 1], [0, -12, -12]);
  return (
    <div className="food-stage" aria-hidden="true">
      <m.div
        className="food-layer"
        style={{
          opacity: pizzaOpacity,
          scale: pizzaScale,
          rotate: baseRotate,
          clipPath:
            "polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, 62% 21%, 77% 22%, 90% 31%, 88% 36%, 77% 42%, 66% 48%, 52% 50%, 51% 46%, 54% 39%, 58% 32%, 61% 27%, 62% 21%, 0 0)",
        }}
      >
        <Image
          src="/images/landing/pizza-cutout.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 48vw, 90vw"
        />
      </m.div>
      <m.div
        className="food-layer"
        style={{
          opacity: pizzaOpacity,
          x: sliceX,
          y: sliceY,
          rotate: sliceRotate,
          clipPath:
            "polygon(62% 21%, 77% 22%, 90% 31%, 88% 36%, 77% 42%, 66% 48%, 52% 50%, 51% 46%, 54% 39%, 58% 32%, 61% 27%)",
        }}
      >
        <Image
          src="/images/landing/pizza-cutout.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 48vw, 90vw"
        />
      </m.div>
      {burgerLayers.map((_, index) => (
        <BurgerLayer key={index} index={index} progress={progress} />
      ))}
    </div>
  );
}
