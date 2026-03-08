"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const EMAIL_WORKER_URL = "https://email-service.anton-abyzov.workers.dev";

const uiText = {
  title: {
    ru: "Узнавайте первыми о новых вкусах и акциях",
    en: "Be the First to Know About New Flavors & Specials",
  },
  subtitle: {
    ru: "Подпишитесь — без спама, только самое интересное",
    en: "Subscribe — no spam, just the good stuff",
  },
  placeholder: { ru: "Ваш email", en: "Your email" },
  button: { ru: "Подписаться", en: "Subscribe" },
  success: {
    ru: "Готово! Вы подписаны на рассылку.",
    en: "Done! You're subscribed to updates.",
  },
  error: {
    ru: "Что-то пошло не так. Попробуйте ещё раз.",
    en: "Something went wrong. Please try again.",
  },
};

export default function EmailCapture() {
  const { t, locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch(`${EMAIL_WORKER_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "designabyzova@gmail.com",
          subject: `New subscriber: ${email}`,
          html: `<p>New email subscriber: <strong>${email}</strong></p><p>Language: ${locale}</p>`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div
            className="relative rounded-2xl sm:rounded-[28px] p-8 sm:p-10 lg:p-14 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #fff5f0 0%, #fce8e0 50%, #fdf0f5 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <h2 className="font-[family-name:var(--font-display)] font-black text-[20px] sm:text-[26px] lg:text-[34px] tracking-normal text-charcoal mb-2 sm:mb-3">
                {t(uiText.title)}
              </h2>
              <p className="text-gray text-sm sm:text-base font-[family-name:var(--font-body)] mb-6 sm:mb-8">
                {t(uiText.subtitle)}
              </p>

              {status === "success" ? (
                <p className="text-coral font-semibold text-sm sm:text-base font-[family-name:var(--font-body)]">
                  {t(uiText.success)}
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t(uiText.placeholder)}
                    className="flex-1 px-4 py-3 rounded-full border border-charcoal/10 bg-white text-sm font-[family-name:var(--font-body)] text-charcoal placeholder:text-gray/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral/30"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 font-[family-name:var(--font-body)]"
                  >
                    {status === "loading" ? "..." : t(uiText.button)}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="text-red-500 text-xs mt-2 font-[family-name:var(--font-body)]">
                  {t(uiText.error)}
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
