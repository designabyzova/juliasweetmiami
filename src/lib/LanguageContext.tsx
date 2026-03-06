"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "ru" | "en";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (text: { readonly ru: string; readonly en: string }) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (text) => text.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "ru" || saved === "en") {
      setLocaleState(saved);
    } else {
      // Auto-detect browser language for first-time visitors
      const browserLang =
        navigator.language || navigator.languages?.[0] || "";
      if (browserLang.startsWith("ru")) {
        setLocaleState("ru");
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const t = useCallback(
    (text: { readonly ru: string; readonly en: string }) => text[locale],
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
