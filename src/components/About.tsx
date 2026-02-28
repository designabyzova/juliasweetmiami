"use client";

import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

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

        {/* Two Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* What makes me different */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:shadow-coral/5 transition-shadow duration-300 h-full">
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

          {/* Target audience */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:shadow-coral/5 transition-shadow duration-300 h-full">
              <div className="w-14 h-14 rounded-2xl bg-pink-light flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-charcoal mb-4">
                Для кого мои торты
              </h3>
              <p className="text-gray text-base leading-relaxed font-[family-name:var(--font-body)]">
                Создаю десерты для тех, кто ценит вкус, а не просто сладость.
                Для тех, кто выбирает качество, осознанность и удовольствие без перегруза.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
