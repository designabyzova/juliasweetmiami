"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        data-testid="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-[60px] lg:h-[70px]">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#hero")}
              className="flex-shrink-0 hover:scale-[1.03] transition-transform duration-200"
            >
              <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl lg:text-[22px] font-black tracking-tight leading-none">
                <span className="text-charcoal">Juliia</span>
                {" "}
                <span className="text-coral">Sweet</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6" data-testid="desktop-nav">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-gray hover:text-coral transition-colors duration-200 font-[family-name:var(--font-body)]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://wa.me/17862001234"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-coral transition-colors"
              >
                WhatsApp
              </a>
              <button
                onClick={() => handleNavClick("#order")}
                className="bg-coral hover:bg-coral-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              >
                Заказать торт
              </button>
            </div>

            {/* Mobile Hamburger — 44px minimum touch target */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 -mr-1.5"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              data-testid="mobile-menu-toggle"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-charcoal"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 bg-charcoal"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-charcoal"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu onClose={() => setMobileOpen(false)} onNavClick={handleNavClick} />
        )}
      </AnimatePresence>
    </>
  );
}
