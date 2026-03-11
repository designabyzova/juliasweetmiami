"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const text = {
  tagline: { ru: "Упс, страница потерялась", en: "Oops, page not found" },
  title: { ru: "404", en: "404" },
  subtitle: {
    ru: "Похоже, этот десерт ещё не создан",
    en: "Looks like this dessert hasn\u2019t been created yet",
  },
  description: {
    ru: "Страница, которую вы ищете, не существует или была перемещена. Но у нас есть множество сладких шедевров, которые ждут вас.",
    en: "The page you\u2019re looking for doesn\u2019t exist or has been moved. But we have plenty of sweet masterpieces waiting for you.",
  },
  cta: { ru: "На главную", en: "Back to Home" },
  ctaGallery: { ru: "Смотреть галерею", en: "View Gallery" },
};

/* ── Floating decoration shapes ── */
const decorations = [
  { size: 320, x: "8%", y: "10%", color: "var(--color-pink-light)", blur: 80, delay: 0, depth: 15 },
  { size: 220, x: "75%", y: "5%", color: "var(--color-coral)", blur: 90, delay: 0.3, opacity: 0.12, depth: 25 },
  { size: 160, x: "85%", y: "65%", color: "var(--color-pink-light)", blur: 60, delay: 0.6, depth: 20 },
  { size: 100, x: "5%", y: "75%", color: "var(--color-coral)", blur: 50, delay: 0.9, opacity: 0.15, depth: 30 },
  { size: 80, x: "45%", y: "85%", color: "var(--color-pink-muted)", blur: 40, delay: 1.2, depth: 35 },
  { size: 200, x: "55%", y: "15%", color: "var(--color-pink-lighter)", blur: 70, delay: 0.4, depth: 18 },
];

/* ── Small floating orbs ── */
const orbs = [
  { size: 12, x: "20%", y: "25%", delay: 0 },
  { size: 8, x: "70%", y: "30%", delay: 0.5 },
  { size: 10, x: "15%", y: "60%", delay: 1.0 },
  { size: 6, x: "80%", y: "70%", delay: 1.5 },
  { size: 14, x: "50%", y: "20%", delay: 0.8 },
  { size: 9, x: "35%", y: "80%", delay: 1.3 },
  { size: 7, x: "90%", y: "45%", delay: 0.2 },
  { size: 11, x: "60%", y: "90%", delay: 0.7 },
];

function ParallaxBlob({ d, index }: { d: (typeof decorations)[number]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const offsetX = useTransform(springX, [-1, 1], [-d.depth, d.depth]);
  const offsetY = useTransform(springY, [-1, 1], [-d.depth, d.depth]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: d.opacity ?? 0.25, scale: 1 }}
      transition={{ duration: 1.4, delay: d.delay, ease }}
      style={{
        position: "absolute",
        left: d.x,
        top: d.y,
        width: d.size,
        height: d.size,
        borderRadius: "50%",
        background: d.color,
        filter: `blur(${d.blur}px)`,
        x: offsetX,
        y: offsetY,
        pointerEvents: "none",
        zIndex: 1,
      }}
      className={index % 2 === 0 ? "animate-float" : "animate-float-reverse"}
    />
  );
}

export default function NotFound() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-warm grain">
      {/* ── Background decorations with parallax ── */}
      {mounted &&
        decorations.map((d, i) => (
          <ParallaxBlob key={i} d={d} index={i} />
        ))}

      {/* ── Small floating orbs ── */}
      {mounted &&
        orbs.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 + orb.delay, ease }}
            style={{
              position: "absolute",
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: "var(--color-coral)",
              pointerEvents: "none",
              zIndex: 1,
            }}
            className={i % 2 === 0 ? "animate-float" : "animate-float-reverse"}
          />
        ))}

      {/* ── Subtle rings ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease }}
        className="absolute animate-gentle-spin"
        style={{
          width: 600,
          height: 600,
          border: "1.5px solid var(--color-coral)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease }}
        className="absolute"
        style={{
          width: 800,
          height: 800,
          border: "1px solid var(--color-pink-light)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
          animation: "gentle-spin 45s linear infinite reverse",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-2xl mx-auto">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-coral font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 sm:mb-8 font-[family-name:var(--font-body)]"
        >
          {t(text.tagline)}
        </motion.p>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mb-4 sm:mb-6"
        >
          {/* Shadow layer */}
          <span
            className="absolute inset-0 font-[family-name:var(--font-display)] font-black text-[120px] xs:text-[150px] sm:text-[200px] md:text-[240px] lg:text-[280px] leading-none select-none"
            style={{
              background: "linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-pink-muted) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transform: "translate(4px, 4px)",
            }}
            aria-hidden="true"
          >
            404
          </span>
          {/* Main layer */}
          <h1
            className="relative font-[family-name:var(--font-display)] font-black text-[120px] xs:text-[150px] sm:text-[200px] md:text-[240px] lg:text-[280px] leading-none select-none"
            style={{
              background: "linear-gradient(135deg, var(--color-coral) 0%, var(--color-coral-dark) 50%, var(--color-coral) 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 6s ease-in-out infinite",
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mx-auto mb-6 sm:mb-8"
          style={{
            width: 60,
            height: 3,
            background: "var(--color-coral)",
            borderRadius: 2,
            transformOrigin: "center",
          }}
        />

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl md:text-2xl text-charcoal mb-4 sm:mb-5"
        >
          {t(text.subtitle)}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="font-[family-name:var(--font-body)] text-gray text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto"
        >
          {t(text.description)}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="btn-pill bg-coral text-white px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-[family-name:var(--font-display)] hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/20 transition-all duration-300 animate-pulse-glow"
          >
            {t(text.cta)}
          </Link>
          <Link
            href="/#portfolio"
            className="btn-pill bg-white/70 backdrop-blur-sm text-charcoal border border-border px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-[family-name:var(--font-display)] hover:bg-white hover:border-coral/30 hover:shadow-lg transition-all duration-300"
          >
            {t(text.ctaGallery)}
          </Link>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex justify-center gap-2 mt-10 sm:mt-14"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="dot-decoration relative"
              style={{
                position: "relative",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Gradient fade at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to top, rgba(255,245,240,0.8) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
