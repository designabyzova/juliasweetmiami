"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden pt-[50px] lg:pt-[70px]"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-[-100px] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-pink-light rounded-full opacity-40 blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-[-50px] w-[200px] h-[200px] bg-coral/10 rounded-full blur-2xl animate-float" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-coral font-semibold text-sm sm:text-base tracking-widest uppercase mb-4 font-[family-name:var(--font-body)]"
            >
              Miami, Florida
            </motion.p>

            <h1 className="font-[family-name:var(--font-display)] font-black text-[32px] xs:text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[64px] leading-[1.05] tracking-tight text-charcoal mb-6">
              Премиальные
              <br />
              торты
              <span className="text-coral"> в Майами</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8 font-[family-name:var(--font-body)] leading-relaxed"
            >
              Кондитер Juliia Sweet. Европейские муссовые десерты
              с минимальным содержанием сахара — только натуральный вкус и баланс.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => handleScroll("#order")}
                className="bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-coral/25 font-[family-name:var(--font-body)]"
              >
                Заказать торт
              </button>
              <button
                onClick={() => handleScroll("#flavors")}
                className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 font-[family-name:var(--font-body)]"
              >
                Смотреть начинки
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
            <div className="relative w-full aspect-[3/4] sm:aspect-square lg:aspect-[4/5] max-w-[500px] mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-4 bg-pink-light rounded-[30px] rotate-3 transform" />
              <div className="absolute inset-0 rounded-[30px] overflow-hidden shadow-2xl">
                <Image
                  src="/hero-juliia.jpg"
                  alt="Juliia Sweet — Кондитер в Майами"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 960px) 60vw, 500px"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4"
              >
                <p className="font-[family-name:var(--font-display)] font-bold text-coral text-xl sm:text-2xl">10+</p>
                <p className="text-xs text-gray font-[family-name:var(--font-body)]">лет опыта</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
