"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center rounded-full bg-charcoal/5 p-1 font-[family-name:var(--font-body)] ${className}`}
    >
      {/* Sliding active indicator */}
      <div
        className={`absolute top-1 bottom-1 rounded-full bg-charcoal shadow-sm transition-all duration-300 ease-out ${
          locale === "en"
            ? "left-1 w-[calc(50%-2px)]"
            : "left-[calc(50%+2px)] w-[calc(50%-2px)]"
        }`}
      />

      <button
        onClick={() => setLocale("en")}
        className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
          locale === "en"
            ? "text-white"
            : "text-charcoal/60 hover:text-charcoal"
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="8" r="6.5" />
          <ellipse cx="8" cy="8" rx="3" ry="6.5" />
          <path d="M1.5 8h13" />
        </svg>
        English
      </button>

      <button
        onClick={() => setLocale("ru")}
        className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
          locale === "ru"
            ? "text-white"
            : "text-charcoal/60 hover:text-charcoal"
        }`}
        aria-label="Переключить на русский"
        aria-pressed={locale === "ru"}
      >
        Русский
      </button>
    </div>
  );
}
