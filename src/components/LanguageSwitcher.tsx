"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-charcoal/15 bg-white/80 p-0.5 font-[family-name:var(--font-body)] ${className}`}
    >
      <button
        onClick={() => setLocale("en")}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
          locale === "en"
            ? "bg-coral text-white shadow-sm"
            : "text-charcoal/50 hover:text-charcoal/80"
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        English
      </button>
      <button
        onClick={() => setLocale("ru")}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
          locale === "ru"
            ? "bg-coral text-white shadow-sm"
            : "text-charcoal/50 hover:text-charcoal/80"
        }`}
        aria-label="Переключить на русский"
        aria-pressed={locale === "ru"}
      >
        Русский
      </button>
    </div>
  );
}
