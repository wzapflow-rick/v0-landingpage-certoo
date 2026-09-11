"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronRight, Signal, BatteryFull } from "lucide-react";
export const rocketUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1%20%281%29-ePAqdPm41ih5QKKHvtkU5C6Bp1YtW2.png";
export function RestaurantBrand() {
  return (
    <a href="#inicio" className="restaurant-brand">
      <img src={rocketUrl} alt="" width={52} height={48} />
      <span>
        Cardápio<strong>wZapFlow</strong>
      </span>
    </a>
  );
}
export function RocketEntrance() {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const image = ref.current;
    if (!image) return;
    const rect = image.getBoundingClientRect();
    const animation = image.animate(
      [
        {
          transform: `translate(${innerWidth / 2 - rect.left - rect.width / 2}px, ${innerHeight / 2 - rect.top - rect.height / 2}px) rotate(-18deg) scale(.7)`,
          opacity: 0.2,
        },
        { transform: `translate(${innerWidth / 2 - rect.left - rect.width / 2}px, ${innerHeight / 2 - rect.top - rect.height / 2}px) rotate(-12deg) scale(.82)`, opacity: 1, filter: "brightness(1.25) saturate(1.15)", offset: .3 },
        { transform: "translate(0,0) rotate(0) scale(1)", opacity: 1, filter: "brightness(1.04) saturate(1.12)" },
      ],
      { duration: 2100, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    const cancel = () => animation.cancel();
    window.addEventListener("resize", cancel);
    return () => {
      animation.cancel();
      window.removeEventListener("resize", cancel);
    };
  }, []);
  return (
    <img
      ref={ref}
      src={rocketUrl}
      className="restaurant-rocket"
      width={1344}
      height={1200}
      alt="Pizza-foguete wZapFlow com queijo dourado e pepperoni"
      fetchPriority="high"
    />
  );
}
export function MenuPhone({ burger = false }: { burger?: boolean }) {
  return (
    <div className="menu-phone" aria-label="Prévia ilustrativa de cardápio">
      <div className="phone-status">
        <span>9:41</span>
        <span className="flex gap-1">
          <Signal size={14} />
          <BatteryFull size={16} />
        </span>
      </div>
      <div className="phone-heading">
        <span className="text-primary">
          {burger ? "Burger House" : "Pizzaria Sabor & Arte"}
        </span>
        <small>Feito com sabor. Pedido com carinho.</small>
      </div>
      <div className={`phone-cover menu-photo food-${burger ? 1 : 0}`} role="img" aria-label={burger ? "Cheeseburger artesanal" : "Pizza de pepperoni"} />
      <div className="phone-menu">
        {["Pizzas", "Hambúrgueres", "Combos", "Bebidas"].map((name, i) => (
          <div className="phone-row" key={name}>
            <span className={`category-photo menu-photo food-${i}`} aria-hidden="true" />
            <span>
              {name}
              <small>
                {
                  [
                    "Tradicionais e especiais",
                    "Suculentos e artesanais",
                    "O melhor por menos",
                    "Seu refresco favorito",
                  ][i]
                }
              </small>
            </span>
            <ChevronRight size={15} />
          </div>
        ))}
      </div>
      <span className="phone-demo">
        Demonstração visual <ArrowUpRight size={14} />
      </span>
    </div>
  );
}
