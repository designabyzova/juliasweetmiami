"use client";

import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAVORS, WEIGHTS, COATINGS, CAKE_COLORS, DECORATIONS, BOXES } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";
import CustomSelect from "./CustomSelect";
import type { SelectOption, SelectGroup } from "./CustomSelect";

const EMAIL_WORKER_URL = "https://email-service.anton-abyzov.workers.dev";

const ui = {
  sectionLabel: { ru: "Конструктор торта", en: "Cake Builder" },
  title: { ru: "Собери свой торт", en: "Build Your Cake" },
  subtitle: { ru: "Ответьте на 3 простых вопроса", en: "Answer 3 simple questions" },
  step1Title: { ru: "1. Выберите основу", en: "1. Choose the Base" },
  weightLabel: { ru: "Вес", en: "Weight" },
  weightPlaceholder: { ru: "Выберите вес", en: "Select weight" },
  fillingLabel: { ru: "Начинка", en: "Filling" },
  fillingPlaceholder: { ru: "Выберите начинку", en: "Select filling" },
  next: { ru: "Далее", en: "Next" },
  back: { ru: "Назад", en: "Back" },
  step2Title: { ru: "2. Оформление", en: "2. Design" },
  coatingLabel: { ru: "Покрытие", en: "Coating" },
  coatingPlaceholder: { ru: "Выберите покрытие", en: "Select coating" },
  colorLabel: { ru: "Цвет торта", en: "Cake Color" },
  colorHint: { ru: "Другой цвет? Укажите в комментарии.", en: "Different color? Specify in comment." },
  boxLabel: { ru: "Коробка", en: "Box" },
  boxPlaceholder: { ru: "Выберите коробку", en: "Select box" },
  decorLabel: { ru: "Декор", en: "Decorations" },
  step3Title: { ru: "3. Контактные данные", en: "3. Contact Details" },
  dateLabel: { ru: "Дата", en: "Date" },
  nameLabel: { ru: "Имя", en: "Name" },
  namePlaceholder: { ru: "Ваше имя", en: "Your name" },
  phoneLabel: { ru: "Контактный телефон", en: "Phone Number" },
  commentLabel: { ru: "Комментарий", en: "Comment" },
  commentPlaceholder: { ru: "Пожелания к заказу...", en: "Order preferences..." },
  orderRules: {
    ru: "Заказ оформляется за 2–3 дня. Срочный заказ — +25% к стоимости. Заявка будет отправлена на WhatsApp / email.",
    en: "Orders are placed 2–3 days in advance. Rush orders: +25% surcharge. Your request will be sent via WhatsApp / email.",
  },
  sending: { ru: "Отправка...", en: "Sending..." },
  submit: { ru: "Отправить", en: "Submit" },
  successTitle: { ru: "Заявка отправлена!", en: "Request Sent!" },
  successMsg: {
    ru: "Спасибо, {name}! Мы свяжемся с вами в ближайшее время для подтверждения заказа.",
    en: "Thank you, {name}! We will contact you soon to confirm your order.",
  },
  errorSend: { ru: "Не удалось отправить заказ. Попробуйте ещё раз.", en: "Failed to send order. Please try again." },
  errorConnection: { ru: "Ошибка соединения. Проверьте интернет и попробуйте снова.", en: "Connection error. Check your internet and try again." },
  cakesGroup: { ru: "Торты", en: "Cakes" },
  pastriesGroup: { ru: "Пирожные", en: "Pastries" },
  pastriesMin: { ru: "от 4 шт", en: "min 4 pcs" },
};

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

  const { t } = useLanguage();

  const toggleDecoration = (dec: string) => {
    setDecorations((prev) =>
      prev.includes(dec) ? prev.filter((d) => d !== dec) : [...prev, dec]
    );
  };

  /* Memoised option lists for CustomSelect */
  const weightGroups: SelectGroup[] = useMemo(
    () => [
      {
        label: t(ui.cakesGroup),
        options: WEIGHTS.cakes.map((w) => ({
          value: w.label.ru,
          label: `${t(w.label)} — $${w.price}`,
        })),
      },
      {
        label: t(ui.pastriesGroup),
        options: WEIGHTS.pastries.map((w) => ({
          value: w.label.ru,
          label: `${t(w.label)} — $${w.price} (${t(ui.pastriesMin)})`,
        })),
      },
    ],
    [t]
  );
  const fillingOptions: SelectOption[] = useMemo(
    () => FLAVORS.map((f) => ({ value: f.name.ru, label: t(f.name) })),
    [t]
  );
  const coatingOptions: SelectOption[] = useMemo(
    () => COATINGS.map((c) => ({ value: c.ru, label: t(c) })),
    [t]
  );
  const boxOptions: SelectOption[] = useMemo(
    () => BOXES.map((b) => ({ value: b.ru, label: t(b) })),
    [t]
  );

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
        setError(t(ui.errorSend));
      }
    } catch {
      setError(t(ui.errorConnection));
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
        className="py-14 sm:py-20 lg:py-28 relative"
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
              {t(ui.successTitle)}
            </h3>
            <p className="text-gray font-[family-name:var(--font-body)] text-sm sm:text-base">
              {t(ui.successMsg).replace("{name}", name)}
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
      className="py-14 sm:py-20 lg:py-28 relative"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-lighter via-white to-[#fef0f5]" />
        <div className="absolute top-10 sm:top-20 -left-12 sm:left-[-100px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-coral/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[700px] mx-auto px-5 sm:px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              {t(ui.sectionLabel)}
            </p>
            <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal mb-3 sm:mb-4">
              {t(ui.title)}
            </h2>
            <p className="text-gray text-sm sm:text-base lg:text-lg font-[family-name:var(--font-body)]">
              {t(ui.subtitle)}
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
                    {t(ui.step1Title)}
                  </h3>

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.weightLabel)}
                  </label>
                  <div className="mb-5 sm:mb-6">
                    <CustomSelect
                      value={weight}
                      onChange={setWeight}
                      placeholder={t(ui.weightPlaceholder)}
                      groups={weightGroups}
                      testId="select-weight"
                    />
                  </div>

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.fillingLabel)}
                  </label>
                  <div className="mb-5 sm:mb-6">
                    <CustomSelect
                      value={filling}
                      onChange={setFilling}
                      placeholder={t(ui.fillingPlaceholder)}
                      options={fillingOptions}
                      testId="select-filling"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className="w-full bg-coral hover:bg-coral-dark active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
                    data-testid="next-step-1"
                  >
                    {t(ui.next)}
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
                    {t(ui.step2Title)}
                  </h3>

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.coatingLabel)}
                  </label>
                  <div className="mb-5 sm:mb-6">
                    <CustomSelect
                      value={coating}
                      onChange={setCoating}
                      placeholder={t(ui.coatingPlaceholder)}
                      options={coatingOptions}
                      testId="select-coating"
                    />
                  </div>

                  <label className="block mb-3 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.colorLabel)}
                  </label>
                  <div className="grid grid-cols-7 gap-y-2.5 gap-x-0 sm:gap-y-3 mb-3" data-testid="color-picker">
                    {CAKE_COLORS.map((c) => (
                      <button
                        key={c.name.ru}
                        type="button"
                        title={t(c.name)}
                        onClick={() => setColor(color === c.name.ru ? "" : c.name.ru)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full transition-all duration-200 mx-auto ${
                          color === c.name.ru
                            ? "ring-2 ring-offset-2 ring-coral scale-110"
                            : "hover:scale-110"
                        } ${c.hex === "#FFFFFF" ? "border border-border" : ""}`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <p className="text-charcoal/40 text-[11px] sm:text-xs font-[family-name:var(--font-body)]">
                      {t(ui.colorHint)}
                    </p>
                    {color && (
                      <span className="flex items-center gap-1.5 text-xs font-[family-name:var(--font-body)]">
                        <span
                          className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                          style={{ backgroundColor: CAKE_COLORS.find((c) => c.name.ru === color)?.hex }}
                        />
                        <span className="text-charcoal font-medium">
                          {t(CAKE_COLORS.find((c) => c.name.ru === color)?.name ?? { ru: color, en: color })}
                        </span>
                      </span>
                    )}
                  </div>

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.boxLabel)}
                  </label>
                  <div className="mb-5 sm:mb-6">
                    <CustomSelect
                      value={box}
                      onChange={setBox}
                      placeholder={t(ui.boxPlaceholder)}
                      options={boxOptions}
                      testId="select-box"
                    />
                  </div>

                  <label className="block mb-3 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.decorLabel)}
                  </label>
                  <div className="space-y-2 mb-5 sm:mb-6">
                    {DECORATIONS.map((dec) => (
                      <label
                        key={dec.ru}
                        className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                            decorations.includes(dec.ru)
                              ? "bg-coral border-coral"
                              : "border-border group-hover:border-coral/50"
                          }`}
                        >
                          {decorations.includes(dec.ru) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={decorations.includes(dec.ru)}
                          onChange={() => toggleDecoration(dec.ru)}
                          className="sr-only"
                          data-testid={`checkbox-${dec.ru}`}
                        />
                        <span className="text-charcoal text-xs sm:text-sm font-[family-name:var(--font-body)]">
                          {t(dec)}
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
                      {t(ui.back)}
                    </button>
                    <button
                      type="button"
                      disabled={!canProceedStep2}
                      onClick={() => setStep(3)}
                      className="flex-1 bg-coral hover:bg-coral-dark active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
                      data-testid="next-step-2"
                    >
                      {t(ui.next)}
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
                    {t(ui.step3Title)}
                  </h3>

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.dateLabel)}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="input-date"
                  />

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.nameLabel)} <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t(ui.namePlaceholder)}
                    required
                    aria-required="true"
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/70"
                    data-testid="input-name"
                  />

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.phoneLabel)} <span className="text-coral">*</span>
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

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.commentLabel)}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t(ui.commentPlaceholder)}
                    rows={3}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none placeholder:text-gray-light/70"
                    data-testid="input-comment"
                  />

                  <div className="bg-bg rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6">
                    <p className="text-gray text-[11px] sm:text-sm font-[family-name:var(--font-body)] leading-relaxed">
                      {t(ui.orderRules)}
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
                      {t(ui.back)}
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex-1 bg-coral hover:bg-coral-dark active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 font-[family-name:var(--font-body)]"
                      data-testid="submit-order"
                    >
                      {sending ? t(ui.sending) : t(ui.submit)}
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
