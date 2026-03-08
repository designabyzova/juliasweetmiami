"use client";

import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const uiText = {
  sectionLabel: { ru: "Как заказать", en: "How It Works" },
  title: { ru: "Четыре простых шага", en: "Four Simple Steps" },
};

const STEPS = [
  {
    number: "01",
    title: { ru: "Выберите", en: "Choose" },
    desc: {
      ru: "Подберите начинку и размер торта из нашей коллекции",
      en: "Pick your filling and cake size from our collection",
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
        <path d="M12 8v4l3 3" />
        <path d="M2 12h4" />
        <path d="M12 2v4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: { ru: "Настройте", en: "Customize" },
    desc: {
      ru: "Выберите цвет, покрытие и украшения для вашего торта",
      en: "Select color, coating, and decorations for your cake",
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="19" cy="11.5" r="2.5" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17" cy="18.5" r="2.5" />
        <circle cx="8.5" cy="14.5" r="2.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: { ru: "Закажите", en: "Order" },
    desc: {
      ru: "Заполните форму — мы свяжемся для подтверждения",
      en: "Fill out the form — we'll reach out to confirm",
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    number: "04",
    title: { ru: "Наслаждайтесь", en: "Enjoy" },
    desc: {
      ru: "Заберите торт в Майами и удивите близких",
      en: "Pick up in Miami and delight your guests",
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-warm">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              {t(uiText.sectionLabel)}
            </p>
            <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal">
              {t(uiText.title)}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-[24px] p-6 sm:p-7 border border-white/60 shadow-md shadow-charcoal/4 h-full">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-coral/15">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg text-charcoal mb-2">
                  {t(step.title)}
                </h3>
                <p className="text-gray text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-body)]">
                  {t(step.desc)}
                </p>

                {/* Connector line (hidden on last item and on mobile single-col) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-coral/20" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
