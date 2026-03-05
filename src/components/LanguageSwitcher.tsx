"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center gap-1.5 font-[family-name:var(--font-display)] ${className}`}>
      <button
        onClick={() => setLocale("ru")}
        className={`text-xs font-bold transition-colors duration-200 ${
          locale === "ru" ? "text-coral" : "text-charcoal/40 hover:text-charcoal/60"
        }`}
        aria-label="Русский"
      >
        RU
      </button>
      <span className="text-charcoal/20 text-xs select-none">/</span>
      <button
        onClick={() => setLocale("en")}
        className={`text-xs font-bold transition-colors duration-200 ${
          locale === "en" ? "text-coral" : "text-charcoal/40 hover:text-charcoal/60"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
