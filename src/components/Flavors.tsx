"use client";

import Image from "next/image";
import { FLAVORS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function Flavors() {
  return (
    <section
      id="flavors"
      data-testid="flavors-section"
      className="py-14 sm:py-20 lg:py-28 bg-gradient-cream relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-pink-light/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Начинки
            </p>
            <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal mb-3 sm:mb-4">
              Наши вкусы
            </h2>
            <p className="text-gray text-sm sm:text-base lg:text-lg max-w-lg mx-auto font-[family-name:var(--font-body)]">
              Авторские начинки из премиальных ингредиентов
            </p>
          </div>
        </ScrollReveal>

        {/* Grid: 2 cols on mobile, 5 cols on desktop — perfect 2×5 for 10 items */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {FLAVORS.map((flavor, i) => (
            <ScrollReveal key={flavor.name} delay={i * 0.05}>
              <FlavorCard flavor={flavor} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlavorCard({
  flavor,
  index,
}: {
  flavor: (typeof FLAVORS)[number];
  index: number;
}) {
  return (
    <div
      className="group relative rounded-2xl sm:rounded-[20px] overflow-hidden cursor-pointer select-none h-full transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
      style={{ backgroundColor: flavor.accent }}
      data-testid={`flavor-card-${index}`}
    >
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col items-center text-center">
        {/* Circular dessert image — always visible, centered */}
        <div
          className="relative w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] lg:w-[125px] lg:h-[125px] rounded-full overflow-hidden shadow-lg ring-[3px] ring-white/80 mb-3 sm:mb-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        >
          <Image
            src={flavor.image}
            alt={`${flavor.name} — начинка`}
            fill
            className="object-cover"
            style={{ objectPosition: "center center" }}
            sizes="(max-width: 640px) 90px, (max-width: 768px) 105px, 125px"
          />
        </div>

        {/* Flavor name */}
        <h3 className="font-[family-name:var(--font-display)] font-bold text-[11px] sm:text-xs lg:text-sm text-charcoal leading-tight mb-1 sm:mb-1.5">
          {flavor.name}
        </h3>

        {/* Description */}
        <p className="text-charcoal/45 text-[9px] sm:text-[10px] lg:text-[11px] leading-relaxed font-[family-name:var(--font-body)] line-clamp-3">
          {flavor.description}
        </p>
      </div>
    </div>
  );
}
