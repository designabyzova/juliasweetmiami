"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

/* ---------- data ---------- */

const PORTFOLIO_ITEMS = [
  {
    title: "Торт с золотым декором",
    category: "Торты",
    src: "/cakes/cake-1.jpeg",
    span: true,
  },
  {
    title: "Муссовые десерты",
    category: "Десерты",
    src: "/desserts/desserts-1.jpeg",
    span: false,
  },
  {
    title: "Матча торт",
    category: "Торты",
    src: "/cakes/cake-3.jpeg",
    span: false,
  },
  {
    title: "Авторские десерты",
    category: "Десерты",
    src: "/desserts/desserts-2.png",
    span: true,
  },
  {
    title: "Медовый торт",
    category: "Торты",
    src: "/cakes/cake-5.png",
    span: false,
  },
  {
    title: "Минималистичные десерты",
    category: "Десерты",
    src: "/desserts/desserts-4.png",
    span: false,
  },
];

/* ---------- component ---------- */

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* -------- header -------- */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 lg:mb-20">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Портфолио
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-tight text-charcoal mb-3 sm:mb-4">
              Наши работы
            </h2>
            <p className="text-gray text-sm sm:text-base lg:text-lg max-w-lg mx-auto font-[family-name:var(--font-body)]">
              Каждый торт — уникальное произведение кондитерского искусства
            </p>
          </div>
        </ScrollReveal>

        {/* ============================================================
            CATEGORY CARDS — asymmetric layout
            ============================================================ */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-14 lg:mb-20">
          {/* ---- LARGE CARD: Торты (full width) ---- */}
          <ScrollReveal>
            <div className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-visible"
                 style={{ background: "linear-gradient(135deg, #fceabb 0%, #f8e4a0 50%, #fef0c7 100%)" }}>
              <div className="relative flex flex-col md:flex-row items-center md:items-end min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
                {/* text side */}
                <div className="relative z-10 flex-1 p-5 sm:p-8 lg:p-14 pb-3 md:pb-10 lg:pb-14">
                  <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-amber-800/60 mb-2 sm:mb-3 font-[family-name:var(--font-body)]">
                    Категория
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-black text-[28px] sm:text-[36px] lg:text-[56px] leading-[1.1] text-charcoal mb-2 sm:mb-3">
                    Торты
                  </h3>
                  <p className="text-charcoal/60 text-xs sm:text-sm lg:text-base max-w-xs mb-4 sm:mb-6 font-[family-name:var(--font-body)]">
                    Авторские торты на любой праздник — от классики до смелых решений
                  </p>
                  <button className="btn-pill bg-charcoal text-white text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 hover:bg-charcoal/85 transition-colors font-[family-name:var(--font-body)]">
                    Смотреть все
                    <svg className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* image side — two cake images overlapping */}
                <div className="relative flex-1 w-full md:w-auto min-h-[200px] sm:min-h-[260px] lg:min-h-[360px] flex items-end justify-center md:justify-end pr-0 md:pr-6 lg:pr-10">
                  {/* back cake */}
                  <motion.div
                    className="absolute bottom-0 right-[38%] sm:right-[42%] md:right-[40%] lg:right-[45%] w-[120px] sm:w-[180px] lg:w-[260px] aspect-[3/4] z-[1]"
                    style={{ transform: "rotate(-6deg)" }}
                    whileHover={{ rotate: -2, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                      <Image
                        src="/cakes/cake-2.jpeg"
                        alt="Бирюзовый торт"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 120px, (max-width: 768px) 180px, 260px"
                      />
                    </div>
                  </motion.div>

                  {/* front cake */}
                  <motion.div
                    className="relative w-[140px] sm:w-[200px] lg:w-[280px] aspect-[3/4] z-[2] -mb-3 sm:-mb-6 lg:-mb-8 mr-3 sm:mr-6 md:mr-0"
                    style={{ transform: "rotate(4deg)" }}
                    whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src="/cakes/cake-1.jpeg"
                        alt="Фиолетовый торт с золотом"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, 280px"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ---- TWO SMALLER CARDS side-by-side ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {/* LEFT: Десерты */}
            <ScrollReveal delay={0.1}>
              <div
                className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-visible min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] flex flex-col justify-end"
                style={{ background: "#ffe5fb" }}
              >
                {/* overflowing image */}
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 sm:-translate-y-8 lg:-translate-y-10 w-[160px] sm:w-[200px] lg:w-[260px] aspect-square z-[2]"
                  whileHover={{ y: -14, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/desserts/desserts-2.png"
                      alt="Авторские десерты"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 260px"
                    />
                  </div>
                </motion.div>

                {/* text */}
                <div className="relative z-10 p-5 sm:p-8 lg:p-10 pt-[170px] sm:pt-[200px] lg:pt-[240px]">
                  <h3 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[28px] lg:text-[40px] leading-[1.1] text-charcoal mb-1.5 sm:mb-2">
                    Десерты
                  </h3>
                  <p className="text-charcoal/50 text-xs sm:text-sm max-w-[200px] mb-4 sm:mb-5 font-[family-name:var(--font-body)]">
                    Муссовые, шоколадные и авторские мини-десерты
                  </p>
                  <button className="btn-pill bg-charcoal text-white text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 hover:bg-charcoal/85 transition-colors font-[family-name:var(--font-body)]">
                    Перейти
                    <svg className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT: Бенто торты */}
            <ScrollReveal delay={0.2}>
              <div
                className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-visible min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] flex flex-col justify-end"
                style={{ background: "#d4e8f7" }}
              >
                {/* overflowing image */}
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 sm:-translate-y-8 lg:-translate-y-10 w-[160px] sm:w-[200px] lg:w-[260px] aspect-square z-[2]"
                  style={{ transform: "translateX(-50%) rotate(5deg)" }}
                  whileHover={{ rotate: 0, y: -14, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/cakes/cake-7.png"
                      alt="Бенто торт"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 260px"
                    />
                  </div>
                </motion.div>

                {/* text */}
                <div className="relative z-10 p-5 sm:p-8 lg:p-10 pt-[170px] sm:pt-[200px] lg:pt-[240px]">
                  <h3 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[28px] lg:text-[40px] leading-[1.1] text-charcoal mb-1.5 sm:mb-2">
                    Бенто торты
                  </h3>
                  <p className="text-charcoal/50 text-xs sm:text-sm max-w-[200px] mb-4 sm:mb-5 font-[family-name:var(--font-body)]">
                    Мини-торты с индивидуальным дизайном для одного
                  </p>
                  <button className="btn-pill bg-charcoal text-white text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 hover:bg-charcoal/85 transition-colors font-[family-name:var(--font-body)]">
                    Перейти
                    <svg className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ============================================================
            MASONRY GRID — mobile-first with consistent breakpoints
            ============================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 auto-rows-[160px] xs:auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px]">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer h-full ${
                  item.span ? "col-span-2 row-span-1" : "col-span-1 row-span-1"
                }`}
                data-testid={`portfolio-item-${i}`}
                style={{ gridColumn: item.span ? "span 2" : "span 1" }}
              >
                {/* image */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes={item.span ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                  />
                </div>

                {/* subtle dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
                  <span className="text-white/60 text-[10px] sm:text-xs font-medium tracking-wider uppercase font-[family-name:var(--font-body)]">
                    {item.category}
                  </span>
                  <h4 className="text-white font-[family-name:var(--font-display)] font-bold text-xs sm:text-sm lg:text-base mt-0.5">
                    {item.title}
                  </h4>
                </div>

                {/* top-right pill tag */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 backdrop-blur-sm text-charcoal text-[9px] sm:text-[10px] lg:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full font-[family-name:var(--font-body)]">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
