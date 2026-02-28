"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-warm"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Обо мне
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[28px] sm:text-[36px] lg:text-[48px] tracking-tight text-charcoal">
              Моя история
            </h2>
          </div>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16 lg:mb-20">
            <p className="text-gray text-base sm:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              Мой профессиональный опыт научил меня ценить качество и внимание к деталям.
              Именно поэтому в своих десертах я использую только отборные ингредиенты.
              Я создаю европейские муссовые десерты с минимальным содержанием сахара —
              без заменителей, только натуральный вкус и баланс, где сахар есть лишь в шоколаде.
            </p>
          </div>
        </ScrollReveal>

        {/* What makes me different — compact card */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:shadow-coral/5 transition-shadow duration-300 mb-6 lg:mb-8 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-pink-light flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-charcoal mb-4">
              Чем я отличаюсь от других
            </h3>
            <p className="text-gray text-base leading-relaxed font-[family-name:var(--font-body)]">
              Мои десерты не утомляют. Они лёгкие, сбалансированные и оставляют ощущение
              удовольствия, а не тяжести.
            </p>
          </div>
        </ScrollReveal>

        {/* "Для кого мои торты" — HERO CARD with image */}
        <ScrollReveal delay={0.3}>
          <div
            className="relative rounded-[28px] lg:rounded-[36px] overflow-visible min-h-[380px] sm:min-h-[420px] lg:min-h-[480px]"
            style={{
              background: "linear-gradient(145deg, #fdf0f5 0%, #fce4ec 40%, #f8d7e3 100%)",
            }}
          >
            <div className="relative flex flex-col md:flex-row items-center md:items-center min-h-[380px] sm:min-h-[420px] lg:min-h-[480px]">
              {/* Text side */}
              <div className="relative z-10 flex-1 p-7 sm:p-10 lg:p-14 pb-4 md:pb-10">
                <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-charcoal mb-4">
                  Для кого{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">мои торты</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-3 w-full rounded-full bg-coral/15"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </h3>
                <p className="text-charcoal/60 text-base sm:text-lg max-w-md leading-relaxed font-[family-name:var(--font-body)] mb-6">
                  Создаю десерты для тех, кто ценит вкус, а не просто сладость.
                  Для тех, кто выбирает качество, осознанность и удовольствие без перегруза.
                </p>

                {/* Small feature pills */}
                <div className="flex flex-wrap gap-2">
                  {["Натуральные ингредиенты", "Минимум сахара", "Европейские рецепты"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-4 py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image side — beautiful white cake on pink */}
              <div className="relative flex-1 w-full md:w-auto flex items-center justify-center md:justify-end p-6 md:p-8 lg:p-12">
                <motion.div
                  className="relative w-[260px] sm:w-[300px] lg:w-[360px] aspect-square"
                  whileHover={{ rotate: -2, scale: 1.03, y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {/* Decorative ring behind the image */}
                  <div className="absolute -inset-4 rounded-full border-2 border-white/40 opacity-60" />
                  <div className="absolute -inset-8 rounded-full border border-white/20 opacity-40" />

                  <div className="relative w-full h-full rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl shadow-charcoal/10">
                    <Image
                      src="/cakes/cake-7.png"
                      alt="Элегантный белый муссовый торт с жемчужинами"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 260px, (max-width: 960px) 300px, 360px"
                    />
                  </div>

                  {/* Floating tag */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white rounded-2xl shadow-xl px-4 py-2.5"
                  >
                    <p className="font-[family-name:var(--font-display)] font-bold text-coral text-sm">Premium</p>
                    <p className="text-[10px] text-gray font-[family-name:var(--font-body)]">quality</p>
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
