"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const text = {
  tagline: { ru: "Sweet Balance", en: "Sweet Balance" },
  title1: { ru: "Роскошные муссовые", en: "Luxurious Mousse" },
  title2: { ru: "десерты от Juliia Sweet", en: "Desserts by Juliia Sweet" },
  titleAccent: { ru: "в Майами", en: "in Miami" },
  usp: {
    ru: "Европейские рецепты • Минимум сахара • Чистый вкус",
    en: "European Recipes • Minimal Sugar • Pure Flavor",
  },
  ctaOrder: { ru: "Заказать торт", en: "Order Cake" },
  ctaFlavors: { ru: "Смотреть начинки", en: "See Fillings" },
  imageAlt: {
    ru: "Sweet Balance — роскошные муссовые десерты в Майами",
    en: "Sweet Balance — Luxurious Mousse Desserts in Miami",
  },
};

export default function Hero() {
  const { t } = useLanguage();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-14 pb-8 sm:pt-16 sm:pb-12 md:pt-[70px] lg:pt-[80px] bg-gradient-peach"
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 -right-16 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-pink-light rounded-full opacity-40 blur-3xl animate-float-reverse pointer-events-none" />
      <div className="absolute bottom-10 -left-8 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] bg-coral/10 rounded-full blur-2xl animate-float pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Tagline with decorative lines */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-coral font-[family-name:var(--font-ui)] font-bold text-xs tracking-[0.25em] uppercase flex items-center gap-2 mb-5 sm:mb-6 justify-center lg:justify-start"
            >
              <span className="inline-block w-8 h-px bg-coral opacity-60" />
              {t(text.tagline)}
              <span className="inline-block w-8 h-px bg-coral opacity-60" />
            </motion.p>

            <h1 className="font-[family-name:var(--font-display)] font-bold text-[30px] xs:text-[34px] sm:text-[42px] md:text-[50px] lg:text-[58px] xl:text-[66px] leading-[1.08] tracking-tight mb-5 sm:mb-7 text-charcoal">
              {t(text.title1)}
              <br />
              <em className="not-italic">{t(text.title2)}</em>
              <br />
              <span
                className="italic font-[family-name:var(--font-display)]"
                style={{
                  background: "linear-gradient(135deg, var(--color-coral) 0%, var(--color-gold) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >{t(text.titleAccent)}</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-[family-name:var(--font-ui)] text-sm sm:text-base lg:text-[17px] font-light tracking-wide mb-7 sm:mb-9 leading-relaxed text-gray"
            >
              {t(text.usp)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => handleScroll("#order")}
                className="bg-coral hover:bg-coral-dark active:scale-[0.97] text-white px-8 py-4 rounded-full font-[family-name:var(--font-ui)] font-bold text-sm sm:text-base transition-all duration-300 tracking-wide hover:shadow-lg hover:shadow-coral/25"
              >
                {t(text.ctaOrder)}
              </button>
              <button
                onClick={() => handleScroll("#flavors")}
                className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white active:scale-[0.97] px-8 py-4 rounded-full font-[family-name:var(--font-ui)] font-bold text-sm sm:text-base transition-all duration-300 tracking-wide"
              >
                {t(text.ctaFlavors)}
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] mx-auto aspect-[3/4] sm:aspect-square lg:aspect-[4/5]">
              {/* Decorative frame */}
              <div className="absolute inset-3 sm:inset-5 rounded-[28px] sm:rounded-[36px] rotate-3 transform bg-pink-light/50" />
              <div className="absolute inset-1 sm:inset-2 rounded-[28px] sm:rounded-[36px] -rotate-1 transform bg-coral/10" />
              {/* Image container */}
              <div
                className="absolute inset-0 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl shadow-charcoal/15"
              >
                <Image
                  src="/hero-juliia.webp"
                  alt={t(text.imageAlt)}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 960px) 400px, 500px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
