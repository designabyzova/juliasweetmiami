"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
      <div className="absolute top-20 -right-20 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-16 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] bg-pink-light/30 rounded-full blur-3xl" />

      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
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

        {/* Split layout: Image + Pricing */}
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Image column */}
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, rotate: -3, scale: 0.95 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto lg:mx-0 max-w-[380px] sm:max-w-[420px] lg:max-w-none lg:sticky lg:top-28"
            >
              {/* Decorative pink shape behind image */}
              <div className="absolute -inset-3 sm:-inset-4 bg-pink-light/50 rounded-[28px] sm:rounded-[32px] rotate-3 transform" />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 bg-coral/10 rounded-full blur-xl" />

              {/* Image */}
              <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src="/pricing.webp"
                  alt="Подарочный набор муссовых десертов Juliia Sweet"
                  width={597}
                  height={800}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 640px) 340px, (max-width: 960px) 400px, 440px"
                />
                {/* Soft gradient overlay at bottom for depth */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Floating pastry badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-4 bg-white rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-lg shadow-black/8 border border-border/50"
              >
                <p className="font-[family-name:var(--font-display)] font-bold text-coral text-sm sm:text-base">
                  от $15
                </p>
                <p className="text-gray text-[10px] sm:text-xs font-[family-name:var(--font-body)]">
                  за пирожное
                </p>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Pricing menu column */}
          <div className="space-y-5 sm:space-y-6">
            {/* Cakes card */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-border/80">
                <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-border/60">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg">🎂</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg text-charcoal">
                    Торты
                  </h3>
                </div>

                <div className="space-y-0">
                  {WEIGHTS.cakes.map((item, i) => (
                    <div
                      key={item.label}
                      className={`group flex items-baseline justify-between gap-2 py-2.5 sm:py-3 ${
                        i < WEIGHTS.cakes.length - 1
                          ? "border-b border-border/40"
                          : ""
                      }`}
                    >
                      <span className="text-charcoal text-sm sm:text-[15px] font-[family-name:var(--font-body)] font-medium group-hover:text-coral transition-colors duration-200">
                        {item.label}
                      </span>
                      <span className="flex-1 border-b border-dotted border-gray-light/25 min-w-[30px] mb-[3px]" />
                      <span className="text-coral font-[family-name:var(--font-display)] font-bold text-[15px] sm:text-base whitespace-nowrap">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Rush order notice */}
            <ScrollReveal>
              <div className="bg-coral/5 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 sm:py-5 border border-coral/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <p className="text-gray text-xs sm:text-sm font-[family-name:var(--font-body)] leading-relaxed">
                    <span className="text-charcoal font-semibold">Заказ за 2–3 дня.</span>{" "}
                    Срочный заказ (менее 2 дней) — <span className="font-semibold text-coral">+25%</span> к стоимости
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
