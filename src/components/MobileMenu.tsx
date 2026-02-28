"use client";

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
  onNavClick: (href: string) => void;
}

export default function MobileMenu({ onClose, onNavClick }: MobileMenuProps) {
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

      {/* Menu Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] lg:hidden shadow-2xl"
        data-testid="mobile-menu"
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => onNavClick(item.href)}
                className="text-left text-lg font-medium text-charcoal hover:text-coral transition-colors py-3 border-b border-border font-[family-name:var(--font-body)]"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <button
              onClick={() => onNavClick("#order")}
              className="w-full bg-coral hover:bg-coral-dark text-white py-3 rounded-full font-semibold transition-all duration-200"
            >
              Заказать торт
            </button>

            <div className="flex gap-4 justify-center">
              <a
                href="https://wa.me/17862001234"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/juliiasweet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://instagram.com/juliiasweet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors"
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
