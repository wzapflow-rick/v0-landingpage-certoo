"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [intro, setIntro] = useState(false);
  const logo = useRef<HTMLImageElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setIntro(true);
  }, []);
  useEffect(() => {
    if (!intro) return;
    const image = logo.current;
    const background = backdrop.current;
    const target = document.querySelector('.restaurant-header .restaurant-brand img');
    if (!image || !background || !target) return;
    const rect = image.getBoundingClientRect();
    const destination = target.getBoundingClientRect();
    const dx = destination.x + destination.width / 2 - rect.x - rect.width / 2;
    const dy = destination.y + destination.height / 2 - rect.y - rect.height / 2;
    const scale = destination.width / rect.width;
    const animation = image.animate([
      { transform: 'perspective(900px) rotateY(-100deg) scale(.65)', opacity: 0, filter: 'brightness(.6)', offset: 0 },
      { transform: 'perspective(900px) rotateY(0deg) scale(1)', opacity: 1, filter: 'brightness(1)', offset: .3 },
      { transform: 'perspective(900px) rotateY(360deg) scale(1)', opacity: 1, filter: 'brightness(1.5)', offset: .57 },
      { transform: 'perspective(900px) rotateY(360deg) scale(1)', opacity: 1, filter: 'brightness(1)', offset: .7 },
      { transform: `perspective(900px) translate(${dx}px, ${dy}px) rotateY(360deg) scale(${scale})`, opacity: 1, filter: 'brightness(1)', offset: 1 },
    ], { duration: 2600, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    const fade = background.animate([{ opacity: 1 }, { opacity: 1, offset: .65 }, { opacity: 0 }], { duration: 2600, fill: 'forwards' });
    const finish = () => setIntro(false);
    animation.onfinish = finish;
    const timeout = window.setTimeout(finish, 3000);
    window.addEventListener('resize', finish);
    window.addEventListener('scroll', finish, { passive: true });
    return () => { animation.cancel(); fade.cancel(); clearTimeout(timeout); window.removeEventListener('resize', finish); window.removeEventListener('scroll', finish); };
  }, [intro]);
  return <>
    <img src={rocketUrl} className="restaurant-rocket" width={1344} height={1200} alt="Pizza-foguete wZapFlow com queijo dourado e pepperoni" fetchPriority="high" />
    {intro && createPortal(<div className="brand-intro" aria-hidden="true"><div ref={backdrop} className="brand-intro-backdrop" /><img ref={logo} src={rocketUrl} alt="" width={300} height={268} /></div>, document.body)}
  </>;
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
