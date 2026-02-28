"use client";

import { motion } from "framer-motion";
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
            <h2 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-tight text-charcoal mb-3 sm:mb-4">
              Наши вкусы
            </h2>
            <p className="text-gray text-sm sm:text-base lg:text-lg max-w-lg mx-auto font-[family-name:var(--font-body)]">
              Авторские начинки из премиальных ингредиентов
            </p>
          </div>
        </ScrollReveal>

        {/* Single responsive container: horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0 -mx-5 px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <div className="flex gap-3 sm:gap-4 w-max lg:w-auto lg:grid lg:grid-cols-4 lg:gap-6">
            {FLAVORS.map((flavor, i) => (
              <ScrollReveal key={flavor.name} delay={i * 0.08}>
                <FlavorCard flavor={flavor} index={i} />
              </ScrollReveal>
            ))}
          </div>
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
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl p-5 sm:p-6 shadow-md shadow-black/5 border border-border hover:shadow-xl hover:shadow-coral/10 transition-shadow duration-300 w-[230px] xs:w-[250px] sm:w-[260px] lg:w-auto flex-shrink-0"
      data-testid={`flavor-card-${index}`}
    >
      <div
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4"
        style={{ backgroundColor: flavor.accent }}
      >
        {flavor.emoji}
      </div>
      <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg text-charcoal mb-1.5 sm:mb-2 group-hover:text-coral transition-colors">
        {flavor.name}
      </h3>
      <p className="text-gray text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-body)]">
        {flavor.description}
      </p>
    </motion.div>
  );
}
