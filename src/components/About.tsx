"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/LanguageContext";

const text = {
  sectionLabel: { ru: "Обо мне", en: "About Me" },
  title: { ru: "Моя история", en: "My Story" },
  story1: {
    ru: "Мой профессиональный опыт научил меня ценить качество и внимание к деталям.",
    en: "My professional experience taught me to value quality and attention to detail.",
  },
  story2: {
    ru: "Именно поэтому в своих десертах я использую только отборные ингредиенты.",
    en: "That's why I only use premium ingredients in my desserts.",
  },
  story3: {
    ru: "Я создаю европейские муссовые десерты с минимальным содержанием сахара — без заменителей, только натуральный вкус и баланс, где сахар есть лишь в шоколаде.",
    en: "I create European mousse desserts with minimal sugar — no substitutes, only natural flavor and balance, where sugar is only in the chocolate.",
  },
  diffTitle1: { ru: "Чем я", en: "What Makes Me" },
  diffTitleAccent: { ru: "отличаюсь", en: "Different" },
  diffTitle2: { ru: "от других", en: "from Others" },
  diffText1: { ru: "Мои десерты не утомляют.", en: "My desserts never overwhelm." },
  diffText2: {
    ru: "Они лёгкие, сбалансированные и оставляют ощущение удовольствия, а не тяжести.",
    en: "They are light, balanced, and leave a feeling of pleasure, not heaviness.",
  },
  diffTags: [
    { ru: "Без заменителей", en: "No Substitutes" },
    { ru: "Лёгкость", en: "Lightness" },
    { ru: "Баланс вкуса", en: "Flavor Balance" },
  ],
  forWhomTitle1: { ru: "Для кого", en: "Who Are" },
  forWhomTitleAccent: { ru: "мои торты", en: "My Cakes For" },
  forWhomText1: {
    ru: "Создаю десерты для тех, кто ценит вкус, а не просто сладость.",
    en: "I create desserts for those who appreciate flavor, not just sweetness.",
  },
  forWhomText2: {
    ru: "Для тех, кто выбирает качество, осознанность и удовольствие без перегруза.",
    en: "For those who choose quality, mindfulness, and pleasure without overload.",
  },
  forWhomTags: [
    { ru: "Натуральные ингредиенты", en: "Natural Ingredients" },
    { ru: "Минимум сахара", en: "Minimal Sugar" },
    { ru: "Европейские рецепты", en: "European Recipes" },
  ],
  diffImageAlt: { ru: "Авторские муссовые десерты", en: "Signature mousse desserts" },
  forWhomImageAlt: {
    ru: "Муссовый торт в форме сердца — Juliia Sweet",
    en: "Heart-shaped mousse cake — Juliia Sweet",
  },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-warm"
    >
      <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-pink-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              {t(text.sectionLabel)}
            </p>
            <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal">
              {t(text.title)}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-5">
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story1)}
            </p>
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story2)}
            </p>
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story3)}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-hidden mb-5 sm:mb-6 lg:mb-8"
            style={{
              background: "linear-gradient(135deg, #fef5f0 0%, #fdf0f5 50%, #fce8ee 100%)",
            }}
          >
            <div className="relative flex flex-col-reverse md:flex-row items-center">
              <div className="relative flex-shrink-0 w-full md:w-[48%] flex items-center justify-center p-5 sm:p-7 md:p-8 lg:p-12">
                <div className="relative w-[260px] sm:w-[300px] lg:w-[380px]">
                  <div className="absolute -inset-2 sm:-inset-3 bg-pink-light/50 rounded-[22px] sm:rounded-[26px] lg:rounded-[30px] rotate-[-3deg]" />
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-l-2 border-coral/25 rounded-tl-2xl" />
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-r-2 border-coral/25 rounded-br-2xl" />
                  <div className="relative rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden shadow-2xl shadow-charcoal/10">
                    <Image
                      src="/desserts/what-different.webp"
                      alt={t(text.diffImageAlt)}
                      width={754}
                      height={800}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 260px, (max-width: 960px) 300px, 380px"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white rounded-lg sm:rounded-xl shadow-lg px-2.5 py-1.5 sm:px-3 sm:py-2 z-10">
                    <span className="text-base sm:text-lg">&#10024;</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex-1 p-5 sm:p-8 lg:p-14 pb-2 md:pb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="heading-wide font-[family-name:var(--font-display)] font-black text-[22px] sm:text-[28px] lg:text-[40px] leading-[1.1] text-charcoal mb-3 sm:mb-4">
                  {t(text.diffTitle1)}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t(text.diffTitleAccent)}</span>
                    <span className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/15" />
                  </span>{" "}
                  {t(text.diffTitle2)}
                </h3>
                <div className="max-w-md mb-4 sm:mb-5 space-y-3">
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.diffText1)}
                  </p>
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.diffText2)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {text.diffTags.map((tag) => (
                    <span
                      key={tag.ru}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div
            className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #fdf0f5 0%, #fce4ec 40%, #f8d7e3 100%)",
            }}
          >
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="relative z-10 flex-1 p-6 sm:p-8 lg:p-14 pb-4 md:pb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[44px] leading-[1.1] text-charcoal mb-3 sm:mb-4">
                  {t(text.forWhomTitle1)}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t(text.forWhomTitleAccent)}</span>
                    <span className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/15" />
                  </span>
                </h3>
                <div className="max-w-md mb-5 sm:mb-6 space-y-3">
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.forWhomText1)}
                  </p>
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.forWhomText2)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {text.forWhomTags.map((tag) => (
                    <span
                      key={tag.ru}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex-shrink-0 w-full md:w-[45%] flex items-center justify-center p-5 sm:p-7 md:p-8 lg:p-10">
                <div className="relative w-[220px] sm:w-[270px] lg:w-[340px]">
                  <div className="absolute -inset-2 sm:-inset-3 bg-white/40 rounded-[22px] sm:rounded-[26px] lg:rounded-[30px] rotate-[3deg]" />
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-l-2 border-coral/25 rounded-tl-2xl" />
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-r-2 border-coral/25 rounded-br-2xl" />
                  <div className="relative rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden shadow-2xl shadow-charcoal/10">
                    <Image
                      src="/for-whom-cake.webp"
                      alt={t(text.forWhomImageAlt)}
                      width={600}
                      height={561}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 220px, (max-width: 960px) 270px, 340px"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white rounded-lg sm:rounded-xl shadow-lg px-2.5 py-1.5 sm:px-3 sm:py-2 z-10">
                    <span className="text-base sm:text-lg">&#x1F90D;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
