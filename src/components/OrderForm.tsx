"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAVORS, WEIGHTS, COATINGS, CAKE_COLORS, DECORATIONS, BOXES } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

const EMAIL_WORKER_URL = "https://email-service.anton-abyzov.workers.dev";

type OrderStep = 1 | 2 | 3;

export default function OrderForm() {
  const [step, setStep] = useState<OrderStep>(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [weight, setWeight] = useState("");
  const [filling, setFilling] = useState("");
  const [coating, setCoating] = useState("");
  const [box, setBox] = useState("");
  const [color, setColor] = useState("");
  const [decorations, setDecorations] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const toggleDecoration = (dec: string) => {
    setDecorations((prev) =>
      prev.includes(dec) ? prev.filter((d) => d !== dec) : [...prev, dec]
    );
  };

  const canProceedStep1 = weight && filling;
  const canProceedStep2 = coating;
  const canSubmit = name && phone && !sending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSending(true);
    setError("");

    const orderHtml = buildEmailHtml({
      weight, filling, coating, color, box, decorations, date, name, phone, comment,
    });

    try {
      const res = await fetch(`${EMAIL_WORKER_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "designabyzova@gmail.com",
          from: { email: "admin@easychamp.com", name: "Juliia Sweet" },
          subject: `Новый заказ: ${filling} ${weight} — ${name}`,
          html: orderHtml,
          replyTo: "designabyzova@gmail.com",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Не удалось отправить заказ. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setSending(false);
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  if (submitted) {
    return (
      <section
        id="order"
        data-testid="order-section"
        className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-lighter via-white to-[#fef0f5]" />
        <div className="max-w-[600px] mx-auto px-5 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl text-center"
            data-testid="order-success"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-10 sm:h-10">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-charcoal mb-2 sm:mb-3">
              Заявка отправлена!
            </h3>
            <p className="text-gray font-[family-name:var(--font-body)] text-sm sm:text-base">
              Спасибо, {name}! Мы свяжемся с вами в ближайшее время для подтверждения заказа.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="order"
      data-testid="order-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-lighter via-white to-[#fef0f5]" />
      <div className="absolute top-10 sm:top-20 -left-12 sm:left-[-100px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-coral/5 rounded-full blur-3xl" />

      <div className="max-w-[700px] mx-auto px-5 sm:px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Конструктор торта
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-tight text-charcoal mb-3 sm:mb-4">
              Собери свой торт
            </h2>
            <p className="text-gray text-sm sm:text-base lg:text-lg font-[family-name:var(--font-body)]">
              Ответьте на 3 простых вопроса
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6 sm:mb-8 max-w-[400px] mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: step >= s ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-coral rounded-full"
              />
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-black/5 border border-border">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  data-testid="order-step-1"
                >
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-charcoal mb-5 sm:mb-6">
                    1. Выберите основу
                  </h3>

                  {/* Weight */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Вес
                  </label>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-5 sm:mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-weight"
                  >
                    <option value="">Выберите вес</option>
                    <optgroup label="Торты">
                      {WEIGHTS.cakes.map((w) => (
                        <option key={w.label} value={w.label}>{w.label} — ${w.price}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Пирожные">
                      {WEIGHTS.pastries.map((w) => (
                        <option key={w.label} value={w.label}>{w.label} — ${w.price} (от 4 шт)</option>
                      ))}
                    </optgroup>
                  </select>

                  {/* Filling */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Начинка
                  </label>
                  <select
                    value={filling}
                    onChange={(e) => setFilling(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-5 sm:mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-filling"
                  >
                    <option value="">Выберите начинку</option>
                    {FLAVORS.map((f) => (
                      <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className="w-full bg-coral hover:bg-coral-dark active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
                    data-testid="next-step-1"
                  >
                    Далее
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  data-testid="order-step-2"
                >
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-charcoal mb-5 sm:mb-6">
                    2. Оформление
                  </h3>

                  {/* Coating */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Покрытие
                  </label>
                  <select
                    value={coating}
                    onChange={(e) => setCoating(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-5 sm:mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-coating"
                  >
                    <option value="">Выберите покрытие</option>
                    {COATINGS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Color */}
                  <label className="block mb-3 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Цвет торта
                  </label>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-2" data-testid="color-picker">
                    {CAKE_COLORS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        title={c.name}
                        onClick={() => setColor(color === c.name ? "" : c.name)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-200 flex-shrink-0 ${
                          color === c.name
                            ? "ring-2 ring-offset-2 ring-coral scale-110"
                            : "hover:scale-110"
                        } ${c.hex === "#FFFFFF" ? "border border-border" : ""}`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                  {color && (
                    <p className="text-gray text-xs font-[family-name:var(--font-body)] mb-1">
                      Выбран: <span className="text-charcoal font-medium">{color}</span>
                    </p>
                  )}
                  <p className="text-charcoal/40 text-[11px] sm:text-xs font-[family-name:var(--font-body)] mb-5 sm:mb-6">
                    Другой цвет? Напишите в комментарии на следующем шаге.
                  </p>

                  {/* Box */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Коробка
                  </label>
                  <select
                    value={box}
                    onChange={(e) => setBox(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-5 sm:mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-box"
                  >
                    <option value="">Выберите коробку</option>
                    {BOXES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>

                  {/* Decorations */}
                  <label className="block mb-3 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Декор
                  </label>
                  <div className="space-y-2 mb-5 sm:mb-6">
                    {DECORATIONS.map((dec) => (
                      <label
                        key={dec}
                        className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                            decorations.includes(dec)
                              ? "bg-coral border-coral"
                              : "border-border group-hover:border-coral/50"
                          }`}
                        >
                          {decorations.includes(dec) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={decorations.includes(dec)}
                          onChange={() => toggleDecoration(dec)}
                          className="sr-only"
                          data-testid={`checkbox-${dec}`}
                        />
                        <span className="text-charcoal text-xs sm:text-sm font-[family-name:var(--font-body)]">
                          {dec}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-border text-charcoal py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:border-charcoal active:scale-[0.97] font-[family-name:var(--font-body)]"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      disabled={!canProceedStep2}
                      onClick={() => setStep(3)}
                      className="flex-1 bg-coral hover:bg-coral-dark active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
                      data-testid="next-step-2"
                    >
                      Далее
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  data-testid="order-step-3"
                >
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-charcoal mb-5 sm:mb-6">
                    3. Контактные данные
                  </h3>

                  {/* Date */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Дата
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="input-date"
                  />

                  {/* Name */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Имя <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    required
                    aria-required="true"
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/70"
                    data-testid="input-name"
                  />

                  {/* Phone */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Контактный телефон <span className="text-coral">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (786) 200-1234"
                    required
                    aria-required="true"
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/70"
                    data-testid="input-phone"
                  />

                  {/* Comment */}
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Комментарий
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Пожелания к заказу..."
                    rows={3}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none placeholder:text-gray-light/70"
                    data-testid="input-comment"
                  />

                  {/* Order rules info */}
                  <div className="bg-bg rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6">
                    <p className="text-gray text-[11px] sm:text-sm font-[family-name:var(--font-body)] leading-relaxed">
                      Заказ оформляется за 2–3 дня. Срочный заказ — +25% к стоимости.
                      Заявка будет отправлена на WhatsApp / email.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-4 text-red-600 text-sm font-[family-name:var(--font-body)]">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={sending}
                      className="flex-1 border-2 border-border text-charcoal py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:border-charcoal active:scale-[0.97] disabled:opacity-40 font-[family-name:var(--font-body)]"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex-1 bg-coral hover:bg-coral-dark active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
                      data-testid="submit-order"
                    >
                      {sending ? "Отправка..." : "Отправить"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}

function buildEmailHtml(order: {
  weight: string;
  filling: string;
  coating: string;
  color: string;
  box: string;
  decorations: string[];
  date: string;
  name: string;
  phone: string;
  comment: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#888;font-size:14px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#212529;font-size:14px">${value}</td></tr>`
      : "";

  const formattedDate = order.date
    ? new Date(order.date + "T00:00:00").toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Не указана";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9f5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
      <div style="background:linear-gradient(135deg,#ff8576,#ff6b6b);padding:28px 24px;text-align:center">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">Новый заказ</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Juliia Sweet — yuliia-sweet.vercel.app</p>
      </div>
      <div style="padding:24px">
        <h2 style="margin:0 0 4px;color:#212529;font-size:16px;font-weight:600">Клиент</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          ${row("Имя", order.name)}
          ${row("Телефон", order.phone)}
          ${row("Дата", formattedDate)}
        </table>
        <h2 style="margin:0 0 4px;color:#212529;font-size:16px;font-weight:600">Торт</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          ${row("Вес", order.weight)}
          ${row("Начинка", order.filling)}
          ${row("Покрытие", order.coating)}
          ${row("Цвет", order.color || "Не выбран")}
          ${row("Коробка", order.box || "Не выбрана")}
          ${row("Декор", order.decorations.length > 0 ? order.decorations.join(", ") : "Без декора")}
        </table>
        ${order.comment ? `<h2 style="margin:0 0 4px;color:#212529;font-size:16px;font-weight:600">Комментарий</h2><p style="margin:0;padding:12px;background:#f9f5f2;border-radius:8px;color:#212529;font-size:14px;line-height:1.5">${order.comment.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>` : ""}
      </div>
      <div style="padding:16px 24px;border-top:1px solid #f0ebe6;text-align:center">
        <p style="margin:0;color:#aaa;font-size:12px">Отправлено ${new Date().toLocaleString("ru-RU", { timeZone: "America/New_York" })}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}
