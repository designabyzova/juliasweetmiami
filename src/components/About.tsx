"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-warm"
    >
      {/* Decorative blobs — smaller on mobile */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-pink-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Обо мне
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-tight text-charcoal">
              Моя история
            </h2>
          </div>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              Мой профессиональный опыт научил меня ценить качество и внимание к деталям.
              Именно поэтому в своих десертах я использую только отборные ингредиенты.
              Я создаю европейские муссовые десерты с минимальным содержанием сахара —
              без заменителей, только натуральный вкус и баланс, где сахар есть лишь в шоколаде.
            </p>
          </div>
        </ScrollReveal>

        {/* "Чем я отличаюсь" — HERO CARD with dessert image */}
        <ScrollReveal delay={0.2}>
          <div
            className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-visible mb-5 sm:mb-6 lg:mb-8 min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]"
            style={{
              background: "linear-gradient(135deg, #fef5f0 0%, #fdf0f5 50%, #fce8ee 100%)",
            }}
          >
            <div className="relative flex flex-col-reverse md:flex-row items-center min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]">
              {/* Image side — tilted dessert cubes */}
              <div className="relative flex-shrink-0 w-full md:w-auto flex items-center justify-center p-5 sm:p-6 md:p-8 lg:p-12">
                <motion.div
                  className="relative w-[180px] sm:w-[220px] lg:w-[300px] aspect-square"
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 2, scale: 1.05, y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                >
                  {/* Soft glow behind */}
                  <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] bg-pink-light/40 blur-2xl scale-110" />

                  {/* Decorative diagonal accent line */}
                  <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-coral/20 rounded-tl-2xl" />
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-coral/20 rounded-br-2xl" />

                  <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-2xl shadow-charcoal/8 rotate-[-3deg]">
                    <Image
                      src="/desserts/desserts-4.png"
                      alt="Минималистичные муссовые десерты-кубики"
                      fill
                      className="object-cover scale-105"
                      sizes="(max-width: 640px) 180px, (max-width: 960px) 220px, 300px"
                    />
                  </div>

                  {/* Floating sparkle badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1.5 -right-1.5 sm:-top-3 sm:-right-3 bg-white rounded-lg sm:rounded-xl shadow-lg px-2.5 py-1.5 sm:px-3 sm:py-2"
                  >
                    <span className="text-base sm:text-lg">&#10024;</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Text side */}
              <div className="relative z-10 flex-1 p-5 sm:p-8 lg:p-14 pb-2 md:pb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-black text-[22px] sm:text-[28px] lg:text-[40px] leading-[1.1] text-charcoal mb-3 sm:mb-4">
                  Чем я{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">отличаюсь</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/15"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  </span>{" "}
                  от других
                </h3>
                <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed font-[family-name:var(--font-body)] mb-4 sm:mb-5">
                  Мои десерты не утомляют. Они лёгкие, сбалансированные и оставляют ощущение
                  удовольствия, а не тяжести.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Без заменителей", "Лёгкость", "Баланс вкуса"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* "Для кого мои торты" — HERO CARD with image */}
        <ScrollReveal delay={0.3}>
          <div
            className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-visible min-h-[340px] sm:min-h-[400px] lg:min-h-[480px]"
            style={{
              background: "linear-gradient(145deg, #fdf0f5 0%, #fce4ec 40%, #f8d7e3 100%)",
            }}
          >
            <div className="relative flex flex-col md:flex-row items-center md:items-center min-h-[340px] sm:min-h-[400px] lg:min-h-[480px]">
              {/* Text side */}
              <div className="relative z-10 flex-1 p-5 sm:p-8 lg:p-14 pb-3 md:pb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[44px] leading-[1.1] text-charcoal mb-3 sm:mb-4">
                  Для кого{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">мои торты</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/15"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </h3>
                <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed font-[family-name:var(--font-body)] mb-5 sm:mb-6">
                  Создаю десерты для тех, кто ценит вкус, а не просто сладость.
                  Для тех, кто выбирает качество, осознанность и удовольствие без перегруза.
                </p>

                {/* Small feature pills */}
                <div className="flex flex-wrap gap-2">
                  {["Натуральные ингредиенты", "Минимум сахара", "Европейские рецепты"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image side — beautiful white cake on pink */}
              <div className="relative flex-1 w-full md:w-auto flex items-center justify-center md:justify-end p-5 sm:p-6 md:p-8 lg:p-12">
                <motion.div
                  className="relative w-[200px] sm:w-[260px] lg:w-[360px] aspect-square"
                  whileHover={{ rotate: -2, scale: 1.03, y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {/* Decorative ring behind the image */}
                  <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-white/40 opacity-60" />
                  <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-white/20 opacity-40" />

                  <div className="relative w-full h-full rounded-[24px] sm:rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl shadow-charcoal/10">
                    <Image
                      src="/cakes/cake-7.png"
                      alt="Элегантный белый муссовый торт с жемчужинами"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 200px, (max-width: 960px) 260px, 360px"
                    />
                  </div>

                  {/* Floating tag */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-xl px-3 py-2 sm:px-4 sm:py-2.5"
                  >
                    <p className="font-[family-name:var(--font-display)] font-bold text-coral text-xs sm:text-sm">Premium</p>
                    <p className="text-[9px] sm:text-[10px] text-gray font-[family-name:var(--font-body)]">quality</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
