"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const PORTFOLIO_ITEMS = [
  { title: "Свадебный торт", category: "Свадебные", color: "#ffe5fb" },
  { title: "Бенто-торт", category: "Бенто", color: "#fceabb" },
  { title: "Муссовый десерт", category: "Муссовые", color: "#f5e6c8" },
  { title: "Торт на юбилей", category: "Юбилейные", color: "#d4f0d4" },
  { title: "Детский торт", category: "Детские", color: "#fdd9b5" },
  { title: "Корпоративный торт", category: "Корпоративные", color: "#f5c6c6" },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Портфолио
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[28px] sm:text-[36px] lg:text-[48px] tracking-tight text-charcoal mb-4">
              Наши работы
            </h2>
            <p className="text-gray text-base sm:text-lg max-w-lg mx-auto font-[family-name:var(--font-body)]">
              Каждый торт — уникальное произведение кондитерского искусства
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer"
                data-testid={`portfolio-item-${i}`}
              >
                {/* Placeholder gradient background */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, #fff 50%, ${item.color}88 100%)`,
                  }}
                />

                {/* Decorative cake icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff8576"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sm:w-12 sm:h-12"
                    >
                      <path d="M2 18h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z" />
                      <path d="M4 18v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                      <path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
                      <path d="M12 2v4" />
                      <path d="M9 6c0-1 .5-3 3-3s3 2 3 3" />
                    </svg>
                  </div>
                </div>

                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                  <div>
                    <p className="text-white/70 text-xs sm:text-sm font-[family-name:var(--font-body)]">
                      {item.category}
                    </p>
                    <h3 className="text-white font-[family-name:var(--font-display)] font-bold text-sm sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
