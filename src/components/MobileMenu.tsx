"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
  onNavClick: (href: string) => void;
}

export default function MobileMenu({ onClose, onNavClick }: MobileMenuProps) {
  const firstItemRef = useRef<HTMLButtonElement>(null);

  // Focus first nav item when menu opens
  useEffect(() => {
    const timer = setTimeout(() => {
      firstItemRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
        data-testid="mobile-menu-overlay"
      />

      {/* Menu Panel — responsive width */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[300px] bg-white z-[70] lg:hidden shadow-2xl"
        data-testid="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Меню навигации"
      >
        <div className="flex flex-col h-full pt-16 sm:pt-20 px-5 sm:px-6 pb-6 sm:pb-8">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                ref={i === 0 ? firstItemRef : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => onNavClick(item.href)}
                className="text-left text-base sm:text-lg font-medium text-charcoal hover:text-coral active:text-coral-dark transition-colors py-3 border-b border-border font-[family-name:var(--font-body)] min-h-[44px] flex items-center"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <button
              onClick={() => onNavClick("#order")}
              className="w-full bg-coral hover:bg-coral-dark active:scale-[0.97] text-white py-3.5 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              Заказать торт
            </button>

            <div className="flex gap-4 justify-center">
              <a
                href="https://wa.me/17862001234"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors py-2"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/juliiasweet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors py-2"
              >
                Telegram
              </a>
              <a
                href="https://instagram.com/juliiasweet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors py-2"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
