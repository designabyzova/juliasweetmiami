"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { FAQ_ITEMS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

const ui = {
  sectionLabel: { ru: "Вопросы и ответы", en: "Got Questions?" },
  title: { ru: "Частые вопросы", en: "Frequently Asked Questions" },
  cta: {
    ru: "Не нашли ответ? Напишите нам или оформите заказ — мы всё обсудим!",
    en: "Didn't find your answer? Reach out or place an order — we'll sort everything out!",
  },
  ctaButton: { ru: "Собрать торт", en: "Build Your Cake" },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-14 sm:py-20 lg:py-28 bg-gradient-cream"
    >
      <div className="max-w-[800px] mx-auto px-5 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              {t(ui.sectionLabel)}
            </p>
            <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal">
              {t(ui.title)}
            </h2>
          </div>
        </ScrollReveal>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div
                  className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
                    isOpen
                      ? "border-coral/20 shadow-md"
                      : "border-border hover:border-coral/10 hover:shadow"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-[family-name:var(--font-display)] font-semibold text-sm sm:text-base lg:text-lg text-charcoal pr-2">
                      {t(item.question)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-coral/10 flex items-center justify-center text-coral"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="8" y1="2" x2="8" y2="14" />
                        <line x1="2" y1="8" x2="14" y2="8" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.2, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          <div className="w-8 h-px bg-coral/30 mb-3 sm:mb-4" />
                          <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                            {t(item.answer)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10 sm:mt-14">
            <p className="text-gray text-sm sm:text-base font-[family-name:var(--font-body)] mb-4">
              {t(ui.cta)}
            </p>
            <a
              href="#order"
              className="inline-block bg-coral hover:bg-coral-dark active:scale-[0.97] text-white py-3 px-8 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
            >
              {t(ui.ctaButton)}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
