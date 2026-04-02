"use client";

import { useState } from "react";
import { useLanguage, type Locale } from "@/lib/LanguageContext";
import { trackEmailSubscribe } from "@/lib/gtag";
import ScrollReveal from "./ScrollReveal";

const SUBSCRIBE_URL = "/api/subscribe";

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
    ru: "Готово! Вы подписаны на рассылку. Проверьте почту — мы отправили вам приветственное письмо!",
    en: "Done! You're subscribed. Check your inbox — we sent you a welcome email!",
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
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriberEmail: email,
          locale,
          welcomeHtml: buildWelcomeEmailHtml(locale),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        trackEmailSubscribe();
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

function buildWelcomeEmailHtml(locale: Locale) {
  const isRu = locale === "ru";

  const L = {
    headerSubtitle: isRu ? "Майами • Муссовые торты на заказ" : "Miami • Custom Mousse Cakes",
    greeting: isRu ? "Добро пожаловать в Sweet Balance!" : "Welcome to Sweet Balance!",
    subtitle: isRu
      ? "Мы рады, что вы с нами! Теперь вы первыми узнаете о новых вкусах, специальных предложениях и сезонных коллекциях."
      : "We're so glad you're here! You'll be the first to know about new flavors, special offers, and seasonal collections.",
    aboutTitle: isRu ? "Что нас делает особенными" : "What Makes Us Special",
    point1: isRu
      ? "Каждый торт — авторский, создан с любовью и вниманием к деталям"
      : "Every cake is handcrafted with love and attention to detail",
    point2: isRu
      ? "Используем только натуральные ингредиенты высочайшего качества"
      : "We use only the finest natural ingredients",
    point3: isRu
      ? "Муссовые торты, бенто-кейки и изысканные десерты для любого события"
      : "Mousse cakes, bento cakes, and exquisite desserts for every occasion",
    point4: isRu
      ? "Доставка по всему Майами — свежесть и красота гарантированы"
      : "Delivery across Miami — freshness and beauty guaranteed",
    ctaTitle: isRu ? "Готовы заказать?" : "Ready to Order?",
    ctaText: isRu
      ? "Посетите наш сайт и соберите свой идеальный торт с помощью конструктора заказов!"
      : "Visit our website and build your perfect cake with our cake builder!",
    ctaButton: isRu ? "Перейти на сайт" : "Visit Our Website",
    followUs: isRu ? "Подписывайтесь на нас:" : "Follow us:",
    footer: isRu
      ? "Вы получили это письмо, потому что подписались на рассылку Sweet Balance. Спасибо, что вы с нами!"
      : "You received this email because you subscribed to Sweet Balance updates. Thank you for joining us!",
  };

  return `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#faf7f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif;-webkit-font-smoothing:antialiased">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#ff8576 0%,#e8636a 50%,#d4505a 100%);border-radius:20px 20px 0 0;padding:40px 32px;text-align:center">
      <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;margin-bottom:4px">Sweet Balance</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase">${L.headerSubtitle}</div>
    </div>

    <!-- Main card -->
    <div style="background:#ffffff;border-radius:0 0 20px 20px;box-shadow:0 4px 24px rgba(0,0,0,0.06);overflow:hidden">

      <!-- Greeting -->
      <div style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #f5f0ec">
        <div style="font-size:42px;margin-bottom:12px">🎂</div>
        <h1 style="margin:0 0 12px;color:#2d2926;font-size:22px;font-weight:700">${L.greeting}</h1>
        <p style="margin:0;color:#7a6f66;font-size:14px;line-height:1.7">${L.subtitle}</p>
      </div>

      <!-- What makes us special -->
      <div style="padding:28px 32px">
        <h2 style="margin:0 0 16px;color:#2d2926;font-size:16px;font-weight:700">${L.aboutTitle}</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;vertical-align:top;width:28px;font-size:16px">✨</td>
            <td style="padding:8px 0 8px 8px;color:#7a6f66;font-size:14px;line-height:1.5">${L.point1}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;vertical-align:top;font-size:16px">🌿</td>
            <td style="padding:8px 0 8px 8px;color:#7a6f66;font-size:14px;line-height:1.5">${L.point2}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;vertical-align:top;font-size:16px">🍰</td>
            <td style="padding:8px 0 8px 8px;color:#7a6f66;font-size:14px;line-height:1.5">${L.point3}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;vertical-align:top;font-size:16px">🚗</td>
            <td style="padding:8px 0 8px 8px;color:#7a6f66;font-size:14px;line-height:1.5">${L.point4}</td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="padding:0 32px 32px;text-align:center">
        <div style="background:linear-gradient(135deg,#fff5f0 0%,#fce8e0 50%,#fdf0f5 100%);border-radius:16px;padding:28px 24px">
          <h3 style="margin:0 0 8px;color:#2d2926;font-size:18px;font-weight:700">${L.ctaTitle}</h3>
          <p style="margin:0 0 20px;color:#7a6f66;font-size:14px;line-height:1.6">${L.ctaText}</p>
          <a href="https://www.sweetbalancemiami.com/#order" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#ff8576,#e8636a);color:#fff;text-decoration:none;border-radius:25px;font-size:14px;font-weight:700;letter-spacing:0.3px">${L.ctaButton}</a>
        </div>
      </div>

      <!-- Social -->
      <div style="padding:20px 32px;background:#faf7f5;text-align:center">
        <p style="margin:0 0 10px;color:#9a8e85;font-size:13px;font-weight:500">${L.followUs}</p>
        <div>
          <a href="https://wa.me/13054815910" style="display:inline-block;margin:0 6px;padding:8px 16px;background:#25d366;color:#fff;text-decoration:none;border-radius:20px;font-size:12px;font-weight:600">WhatsApp</a>
          <a href="https://t.me/imjasestra" style="display:inline-block;margin:0 6px;padding:8px 16px;background:#229ED9;color:#fff;text-decoration:none;border-radius:20px;font-size:12px;font-weight:600">Telegram</a>
          <a href="https://www.instagram.com/julia_sweet_miami?igsh=MWV2ZjZ4NnNjZnhqMg==" style="display:inline-block;margin:0 6px;padding:8px 16px;background:#E4405F;color:#fff;text-decoration:none;border-radius:20px;font-size:12px;font-weight:600">Instagram</a>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 16px">
      <p style="margin:0;color:#c4b8ad;font-size:11px;line-height:1.5">${L.footer}</p>
    </div>

  </div>
</body>
</html>`;
}
