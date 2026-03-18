"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { trackOrderClick } from "@/lib/gtag";

export default function FloatingOrderButton() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const orderSection = document.getElementById("order");
    let orderInView = false;

    // Hide when #order section is visible
    const observer = orderSection
      ? new IntersectionObserver(
          ([entry]) => {
            orderInView = entry.isIntersecting;
            setVisible(window.scrollY > 500 && !orderInView);
          },
          { threshold: 0.1 }
        )
      : null;

    if (observer && orderSection) observer.observe(orderSection);

    // Show after scrolling past the hero
    const onScroll = () => setVisible(window.scrollY > 500 && !orderInView);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const scrollToOrder = () => { trackOrderClick("floating");
    const el = document.getElementById("order");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="floating-order"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToOrder}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-coral hover:bg-coral-dark active:scale-[0.96] text-white pl-5 pr-6 py-3 sm:py-3.5 rounded-full shadow-lg shadow-coral/30 hover:shadow-xl hover:shadow-coral/40 transition-all duration-200 cursor-pointer animate-pulse-glow font-[family-name:var(--font-body)]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
            {t({ ru: "Заказать торт", en: "Order Cake" })}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
