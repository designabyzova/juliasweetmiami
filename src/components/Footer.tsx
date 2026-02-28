"use client";

import { NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="footer" className="bg-charcoal text-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => handleNavClick("#hero")}
              className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-white hover:text-coral transition-colors mb-3 sm:mb-4 block"
            >
              Juliia Sweet
            </button>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-body)]">
              Премиальные европейские муссовые десерты в Майами.
              Минимум сахара, максимум вкуса.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-3 sm:mb-4">
              Навигация
            </h4>
            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-white/70 hover:text-coral text-xs sm:text-sm transition-colors font-[family-name:var(--font-body)] min-h-[32px] sm:min-h-0 flex items-center"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-3 sm:mb-4">
              Контакты
            </h4>
            <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70 font-[family-name:var(--font-body)]">
              <a href="tel:+17862001234" className="hover:text-coral transition-colors">
                +1 (786) 200-1234
              </a>
              <a href="https://wa.me/17862001234" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
                WhatsApp
              </a>
              <a href="https://t.me/juliiasweet" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
                Telegram
              </a>
              <a href="https://instagram.com/juliiasweet" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
                Instagram
              </a>
              <p className="text-white/40 mt-1 sm:mt-2">Miami, Florida</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-3 sm:mb-4">
              Часы работы
            </h4>
            <p className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-body)]">
              Каждый день
            </p>
            <p className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-body)]">
              9:00 — 21:00
            </p>
            <p className="text-xs sm:text-sm text-white/40 font-[family-name:var(--font-body)] mt-2 sm:mt-3">
              Заказ за 2–3 дня
            </p>
            <p className="text-xs sm:text-sm text-white/40 font-[family-name:var(--font-body)]">
              Срочный заказ: +25%
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-white/40 text-[10px] sm:text-xs font-[family-name:var(--font-body)]">
            &copy; {new Date().getFullYear()} Juliia Sweet. Все права защищены.
          </p>
          <p className="text-white/30 text-[10px] sm:text-xs font-[family-name:var(--font-body)]">
            Premium cakes in Miami
          </p>
        </div>
      </div>
    </footer>
  );
}
