"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAVORS, WEIGHTS, COATINGS, DECORATIONS, BOXES } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

type OrderStep = 1 | 2 | 3;

export default function OrderForm() {
  const [step, setStep] = useState<OrderStep>(1);
  const [submitted, setSubmitted] = useState(false);

  const [weight, setWeight] = useState("");
  const [filling, setFilling] = useState("");
  const [coating, setCoating] = useState("");
  const [box, setBox] = useState("");
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
  const canSubmit = name && phone;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-lighter via-white to-[#fef0f5]" />
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl text-center"
            data-testid="order-success"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-charcoal mb-3">
              Заявка отправлена!
            </h3>
            <p className="text-gray font-[family-name:var(--font-body)] text-base">
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
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-lighter via-white to-[#fef0f5]" />
      <div className="absolute top-20 left-[-100px] w-[300px] h-[300px] bg-coral/5 rounded-full blur-3xl" />

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-coral font-semibold text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Конструктор торта
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[28px] sm:text-[36px] lg:text-[48px] tracking-tight text-charcoal mb-4">
              Собери свой торт
            </h2>
            <p className="text-gray text-base sm:text-lg font-[family-name:var(--font-body)]">
              Ответьте на 3 простых вопроса
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 max-w-[400px] mx-auto">
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 border border-border">
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
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-charcoal mb-6">
                    1. Выберите основу
                  </h3>

                  {/* Weight */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Вес
                  </label>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-weight"
                  >
                    <option value="">Выберите вес</option>
                    <optgroup label="Торты">
                      {WEIGHTS.cakes.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Пирожные">
                      {WEIGHTS.pastries.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </optgroup>
                  </select>

                  {/* Filling */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Начинка
                  </label>
                  <select
                    value={filling}
                    onChange={(e) => setFilling(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
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
                    className="w-full bg-coral hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold transition-all duration-200 font-[family-name:var(--font-body)]"
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
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-charcoal mb-6">
                    2. Оформление
                  </h3>

                  {/* Coating */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Покрытие
                  </label>
                  <select
                    value={coating}
                    onChange={(e) => setCoating(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-coating"
                  >
                    <option value="">Выберите покрытие</option>
                    {COATINGS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Box */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Коробка
                  </label>
                  <select
                    value={box}
                    onChange={(e) => setBox(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="select-box"
                  >
                    <option value="">Выберите коробку</option>
                    {BOXES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>

                  {/* Decorations */}
                  <label className="block mb-3 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Декор
                  </label>
                  <div className="space-y-2 mb-6">
                    {DECORATIONS.map((dec) => (
                      <label
                        key={dec}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
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
                        <span className="text-charcoal text-sm font-[family-name:var(--font-body)]">
                          {dec}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-border text-charcoal py-3 rounded-full font-semibold transition-all duration-200 hover:border-charcoal font-[family-name:var(--font-body)]"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      disabled={!canProceedStep2}
                      onClick={() => setStep(3)}
                      className="flex-1 bg-coral hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold transition-all duration-200 font-[family-name:var(--font-body)]"
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
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-charcoal mb-6">
                    3. Контактные данные
                  </h3>

                  {/* Date */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Дата
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                    data-testid="input-date"
                  />

                  {/* Name */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Имя *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    required
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/60"
                    data-testid="input-name"
                  />

                  {/* Phone */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Контактный телефон *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (786) 200-1234"
                    required
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all placeholder:text-gray-light/60"
                    data-testid="input-phone"
                  />

                  {/* Comment */}
                  <label className="block mb-2 text-sm font-medium text-charcoal font-[family-name:var(--font-body)]">
                    Комментарий
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Пожелания к заказу..."
                    rows={3}
                    className="w-full border border-border rounded-xl px-4 py-3 text-charcoal font-[family-name:var(--font-body)] text-base mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none placeholder:text-gray-light/60"
                    data-testid="input-comment"
                  />

                  {/* Order rules info */}
                  <div className="bg-bg rounded-xl p-4 mb-6">
                    <p className="text-gray text-xs sm:text-sm font-[family-name:var(--font-body)] leading-relaxed">
                      Заказ оформляется за 2–3 дня. Срочный заказ — +25% к стоимости.
                      Заявка будет отправлена на WhatsApp / email.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-border text-charcoal py-3 rounded-full font-semibold transition-all duration-200 hover:border-charcoal font-[family-name:var(--font-body)]"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex-1 bg-coral hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-full font-semibold transition-all duration-200 font-[family-name:var(--font-body)]"
                      data-testid="submit-order"
                    >
                      Отправить
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
