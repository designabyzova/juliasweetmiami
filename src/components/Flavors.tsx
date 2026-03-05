"use client";

import { useState } from "react";
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

        {/* Grid: 2 cols on mobile, 4 cols on desktop — all same size */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {FLAVORS.map((flavor, i) => (
            <ScrollReveal key={flavor.name} delay={i * 0.06}>
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
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="group relative rounded-2xl sm:rounded-[20px] overflow-hidden cursor-pointer select-none h-full"
      style={{ backgroundColor: flavor.accent }}
      data-testid={`flavor-card-${index}`}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={() => setRevealed((v) => !v)}
    >
      {/* Always-visible content: triangle + name + description */}
      <div className="relative p-4 sm:p-5 lg:p-6">
        {/* Small triangle accent */}
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 mb-4 sm:mb-6 lg:mb-8"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backgroundColor: "rgba(0,0,0,0.12)",
          }}
        />
        <h3 className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-base lg:text-lg text-charcoal leading-tight mb-2">
          {flavor.name}
        </h3>
        <p className="text-charcoal/55 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-[family-name:var(--font-body)]">
          {flavor.description}
        </p>
      </div>

      {/* Hover/tap overlay: circular photo */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-black/5" />
        <div
          className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden shadow-2xl ring-4 ring-white/80 transition-transform duration-500"
          style={{ transform: revealed ? "scale(1)" : "scale(0.5)" }}
        >
          <Image
            src={flavor.image}
            alt={`${flavor.name} — начинка`}
            fill
            className="object-cover"
            sizes="180px"
          />
        </div>
      </div>
    </div>
  );
}
