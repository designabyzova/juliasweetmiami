"use client";

import { motion } from "framer-motion";
import { WEIGHTS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-cream"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 -right-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -left-16 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-pink-light/40 rounded-full blur-3xl" />

      <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Прозрачные цены
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-tight text-charcoal mb-3 sm:mb-4">
              Стоимость
            </h2>
            <p className="text-gray text-sm sm:text-base lg:text-lg font-[family-name:var(--font-body)] max-w-md mx-auto">
              Фиксированные цены без скрытых доплат
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1fr_auto] gap-5 sm:gap-6 lg:gap-8">
          {/* Cakes pricing card */}
          <ScrollReveal>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 border border-border"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg sm:text-xl">🎂</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-charcoal">
                  Торты
                </h3>
              </div>

              <div className="space-y-0">
                {WEIGHTS.cakes.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-baseline justify-between gap-3 py-3.5 sm:py-4 ${
                      i < WEIGHTS.cakes.length - 1 ? "border-b border-border/60" : ""
                    }`}
                  >
                    <span className="text-charcoal text-sm sm:text-base font-[family-name:var(--font-body)] font-medium">
                      {item.label}
                    </span>
                    <span className="flex-1 border-b border-dotted border-gray-light/30 min-w-[40px] mb-1" />
                    <span className="text-coral font-[family-name:var(--font-display)] font-bold text-base sm:text-lg whitespace-nowrap">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Pastries pricing card */}
          <ScrollReveal>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 border border-border md:self-start"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-light/60 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg sm:text-xl">🧁</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-charcoal">
                  Пирожные
                </h3>
              </div>

              {WEIGHTS.pastries.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span className="text-charcoal text-sm sm:text-base font-[family-name:var(--font-body)] font-medium">
                    {item.label}
                  </span>
                  <span className="flex-1 border-b border-dotted border-gray-light/30 min-w-[40px] mb-1" />
                  <span className="text-coral font-[family-name:var(--font-display)] font-bold text-base sm:text-lg whitespace-nowrap">
                    ${item.price}
                    <span className="text-gray-light text-xs sm:text-sm font-normal ml-1">/ шт</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Rush order notice */}
        <ScrollReveal>
          <div className="mt-6 sm:mt-8 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 sm:py-5 border border-border/50 text-center">
            <p className="text-gray text-xs sm:text-sm font-[family-name:var(--font-body)] leading-relaxed">
              <span className="text-coral font-semibold">Заказ за 2–3 дня.</span>{" "}
              Срочный заказ (менее 2 дней) — <span className="font-semibold text-charcoal">+25%</span> к стоимости
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
