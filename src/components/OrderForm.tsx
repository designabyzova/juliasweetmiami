"use client";

import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAVORS, WEIGHTS, COATINGS, CAKE_COLORS, DECORATIONS, BOXES } from "@/lib/constants";
import { useLanguage, type Locale } from "@/lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";
import { trackFormStep, trackFormSubmit } from "@/lib/gtag";
import CustomSelect from "./CustomSelect";
import type { SelectOption, SelectGroup } from "./CustomSelect";

const SEND_ORDER_URL = "/api/send-order";

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
  emailLabel: { ru: "Email", en: "Email" },
  emailPlaceholder: { ru: "your@email.com", en: "your@email.com" },
  commentLabel: { ru: "Комментарий", en: "Comment" },
  commentPlaceholder: { ru: "Пожелания к заказу...", en: "Order preferences..." },
  orderRules: {
    ru: "Заказ оформляется за 2–3 дня. Срочный заказ — +25% к стоимости. Заявка будет отправлена на WhatsApp / email.",
    en: "Orders are placed 2–3 days in advance. Rush orders: +25% surcharge. Your request will be sent via WhatsApp / email.",
  },
  sending: { ru: "Отправка...", en: "Sending..." },
  submit: { ru: "Отправить", en: "Submit" },
  successTitle: { ru: "Заявка отправлена!", en: "Request Sent!" },
  successThank: {
    ru: "Спасибо, {name}!",
    en: "Thank you, {name}!",
  },
  successContact: {
    ru: "Мы свяжемся с вами в ближайшее время для подтверждения заказа.",
    en: "We will contact you soon to confirm your order.",
  },
  successEmailSent: {
    ru: "Подтверждение заказа отправлено на {email}",
    en: "Order confirmation sent to {email}",
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
  const [email, setEmail] = useState("");

  const { t, locale } = useLanguage();

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }, []);

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
      weight, filling, coating, color, box, decorations, date, name, phone, email, comment,
    });

    // DISABLED: Customer confirmation email — admin contacts customer directly by phone/message
    // const customerHtml = email
    //   ? buildConfirmationEmailHtml({
    //       weight, filling, coating, color, box, decorations, date, name, comment,
    //     }, locale)
    //   : undefined;

    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Новый заказ: ${filling} ${weight} — ${name}`,
          html: orderHtml,
          replyTo: "Uralevaulia@gmail.com",
          // DISABLED: customer email fields — no confirmation email sent to customer
          // customerEmail: email || undefined,
          // customerSubject: email
          //   ? (locale === "ru"
          //     ? "Ваш заказ принят — Sweet Balance"
          //     : "Your order has been received — Sweet Balance")
          //   : undefined,
          // customerHtml,
        }),
      });

      const data = await res.json();
      if (data.success) {
        trackFormSubmit(filling, weight);
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
            <p className="text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base font-medium">
              {t(ui.successThank).replace("{name}", name)}
            </p>
            <p className="text-gray font-[family-name:var(--font-body)] text-sm sm:text-base mt-2">
              {t(ui.successContact)}
            </p>
            {/* DISABLED: "Confirmation sent to email" message — no customer emails sent */}
            {/* {email && (
              <p className="text-coral font-[family-name:var(--font-body)] text-xs sm:text-sm mt-3 flex items-center justify-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {t(ui.successEmailSent).replace("{email}", email)}
              </p>
            )} */}
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
                    onClick={() => { trackFormStep(2); setStep(2); }}
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
                      onClick={() => { trackFormStep(3); setStep(3); }}
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
                    min={minDate}
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
                    placeholder="+1 (305) 481-5910"
                    required
                    aria-required="true"
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/70"
                    data-testid="input-phone"
                  />

                  <label className="block mb-2 text-xs sm:text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    {t(ui.emailLabel)}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t(ui.emailPlaceholder)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-sm sm:text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/70"
                    data-testid="input-email"
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
  email: string;
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
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Sweet Balance — sweetbalancemiami.com</p>
      </div>
      <div style="padding:24px">
        <h2 style="margin:0 0 4px;color:#212529;font-size:16px;font-weight:600">Клиент</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          ${row("Имя", order.name)}
          ${row("Телефон", order.phone)}
          ${row("Email", order.email)}
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

/* ── Customer order confirmation email ── */

function buildConfirmationEmailHtml(
  order: {
    weight: string;
    filling: string;
    coating: string;
    color: string;
    box: string;
    decorations: string[];
    date: string;
    name: string;
    comment: string;
  },
  locale: Locale
) {
  const isRu = locale === "ru";

  // Look up price from weight
  const allWeights = [...WEIGHTS.cakes, ...WEIGHTS.pastries];
  const selectedWeight = allWeights.find((w) => w.label.ru === order.weight);
  const price = selectedWeight ? `$${selectedWeight.price}` : "";
  const weightLabel = selectedWeight
    ? selectedWeight.label[locale]
    : order.weight;

  // Look up filling in current locale
  const selectedFilling = FLAVORS.find((f) => f.name.ru === order.filling);
  const fillingLabel = selectedFilling
    ? selectedFilling.name[locale]
    : order.filling;

  // Look up coating
  const selectedCoating = COATINGS.find((c) => c.ru === order.coating);
  const coatingLabel = selectedCoating ? selectedCoating[locale] : order.coating;

  // Look up color
  const selectedColor = CAKE_COLORS.find((c) => c.name.ru === order.color);
  const colorLabel = selectedColor ? selectedColor.name[locale] : order.color;
  const colorHex = selectedColor?.hex || "";

  // Look up box
  const selectedBox = BOXES.find((b) => b.ru === order.box);
  const boxLabel = selectedBox ? selectedBox[locale] : order.box;

  // Look up decorations
  const decorLabels = order.decorations.map((d) => {
    const found = DECORATIONS.find((dec) => dec.ru === d);
    return found ? found[locale] : d;
  });

  const formattedDate = order.date
    ? new Date(order.date + "T00:00:00").toLocaleDateString(
        isRu ? "ru-RU" : "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : "";

  const L = {
    headerSubtitle: isRu ? "Майами • Муссовые торты на заказ" : "Miami • Custom Mousse Cakes",
    greeting: isRu ? `${order.name}, спасибо за ваш заказ!` : `${order.name}, thank you for your order!`,
    subtitle: isRu
      ? "Мы получили вашу заявку и свяжемся с вами в ближайшее время для подтверждения деталей."
      : "We have received your request and will contact you shortly to confirm the details.",
    orderSummary: isRu ? "Ваш заказ" : "Your Order",
    weight: isRu ? "Размер" : "Size",
    filling: isRu ? "Начинка" : "Filling",
    coating: isRu ? "Покрытие" : "Coating",
    color: isRu ? "Цвет" : "Color",
    box: isRu ? "Коробка" : "Box",
    decor: isRu ? "Декор" : "Decorations",
    date: isRu ? "Дата" : "Date",
    comment: isRu ? "Комментарий" : "Comment",
    price: isRu ? "Стоимость" : "Price",
    noColor: isRu ? "Не выбран" : "Not selected",
    noBox: isRu ? "Не выбрана" : "Not selected",
    noDecor: isRu ? "Без декора" : "No decorations",
    nextSteps: isRu ? "Что дальше?" : "What\u2019s Next?",
    nextStep1: isRu
      ? "Мы свяжемся с вами по телефону или WhatsApp для подтверждения заказа."
      : "We will contact you by phone or WhatsApp to confirm your order.",
    nextStep2: isRu
      ? "Заказы оформляются за 2–3 дня. Срочные заказы — +25% к стоимости."
      : "Orders are placed 2\u20133 days in advance. Rush orders: +25% surcharge.",
    nextStep3: isRu
      ? "Окончательная стоимость будет подтверждена с учётом декора и пожеланий."
      : "Final price will be confirmed based on decorations and preferences.",
    questions: isRu
      ? "Есть вопросы? Свяжитесь с нами:"
      : "Have questions? Reach out:",
    footer: isRu
      ? "Это автоматическое подтверждение заказа. Вы получили это письмо, потому что оформили заказ на сайте Sweet Balance."
      : "This is an automated order confirmation. You received this email because you placed an order on the Sweet Balance website.",
  };

  const detailRow = (label: string, value: string, accent?: string) => {
    if (!value) return "";
    const colorDot = accent
      ? `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${accent};vertical-align:middle;margin-right:6px;border:1px solid #e0d6cf"></span>`
      : "";
    return `
      <tr>
        <td style="padding:10px 16px;color:#9a8e85;font-size:13px;font-weight:500;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f5f0ec">${label}</td>
        <td style="padding:10px 16px;color:#2d2926;font-size:14px;border-bottom:1px solid #f5f0ec">${colorDot}${value}</td>
      </tr>`;
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
        <div style="width:56px;height:56px;background:#f0fdf4;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center">
          <div style="width:56px;height:56px;background:#f0fdf4;border-radius:50%;text-align:center;line-height:56px;font-size:26px">&#10003;</div>
        </div>
        <h1 style="margin:0 0 8px;color:#2d2926;font-size:20px;font-weight:700">${L.greeting}</h1>
        <p style="margin:0;color:#7a6f66;font-size:14px;line-height:1.6">${L.subtitle}</p>
      </div>

      <!-- Order details -->
      <div style="padding:24px 32px">
        <h2 style="margin:0 0 16px;color:#2d2926;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${L.orderSummary}</h2>
        <table style="width:100%;border-collapse:collapse">
          ${detailRow(L.weight, `${weightLabel}${price ? ` — ${price}` : ""}`)}
          ${detailRow(L.filling, fillingLabel)}
          ${detailRow(L.coating, coatingLabel)}
          ${detailRow(L.color, colorLabel || L.noColor, colorHex || undefined)}
          ${detailRow(L.box, boxLabel || L.noBox)}
          ${detailRow(L.decor, decorLabels.length > 0 ? decorLabels.join(", ") : L.noDecor)}
          ${detailRow(L.date, formattedDate)}
          ${order.comment ? detailRow(L.comment, order.comment.replace(/</g, "&lt;").replace(/>/g, "&gt;")) : ""}
        </table>
      </div>

      ${price ? `
      <!-- Price highlight -->
      <div style="margin:0 32px 24px;background:linear-gradient(135deg,#fff5f3,#fff0ed);border-radius:12px;padding:16px 20px;text-align:center">
        <span style="color:#9a8e85;font-size:13px;font-weight:500">${L.price}:&nbsp;</span>
        <span style="color:#e8636a;font-size:22px;font-weight:800">${price}</span>
      </div>` : ""}

      <!-- Next steps -->
      <div style="padding:0 32px 28px">
        <h2 style="margin:0 0 12px;color:#2d2926;font-size:15px;font-weight:700">${L.nextSteps}</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:6px 0;vertical-align:top;width:24px">
              <div style="width:20px;height:20px;background:#fff5f3;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#e8636a;font-weight:700">1</div>
            </td>
            <td style="padding:6px 0 6px 8px;color:#7a6f66;font-size:13px;line-height:1.5">${L.nextStep1}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top">
              <div style="width:20px;height:20px;background:#fff5f3;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#e8636a;font-weight:700">2</div>
            </td>
            <td style="padding:6px 0 6px 8px;color:#7a6f66;font-size:13px;line-height:1.5">${L.nextStep2}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top">
              <div style="width:20px;height:20px;background:#fff5f3;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#e8636a;font-weight:700">3</div>
            </td>
            <td style="padding:6px 0 6px 8px;color:#7a6f66;font-size:13px;line-height:1.5">${L.nextStep3}</td>
          </tr>
        </table>
      </div>

      <!-- Contact -->
      <div style="padding:20px 32px;background:#faf7f5;text-align:center">
        <p style="margin:0 0 10px;color:#9a8e85;font-size:13px;font-weight:500">${L.questions}</p>
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
