"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { REVIEWS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

const REVIEW_IMAGES = [
  "/reviews/review-1.jpeg",
  "/reviews/review-2.jpeg",
  "/reviews/review-3.jpeg",
  "/reviews/review-4.jpeg",
  "/reviews/review-5.jpeg",
  "/reviews/review-6.jpeg",
  "/reviews/review-7.jpeg",
];

const CHAT_BUBBLES = [
  { text: "Торт просто космос!", emoji: "\uD83C\uDF82" },
  { text: "Лучший десерт в жизни!", emoji: "\uD83D\uDE0D" },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % REVIEW_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + REVIEW_IMAGES.length) % REVIEW_IMAGES.length
    );
  }, []);

  // Auto-advance carousel — pauses on hover/focus
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotate: dir > 0 ? 8 : -8,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 3,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      rotate: dir < 0 ? 8 : -8,
      scale: 0.9,
    }),
  };

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-36"
      style={{
        background:
          "linear-gradient(165deg, #fff5f3 0%, #ffe5fb 30%, #fff0f6 60%, #ffffff 100%)",
      }}
    >
      {/* Decorative blobs — scaled for mobile */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px] rounded-full bg-coral/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] rounded-full bg-pink-light/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] -translate-y-1/2 rounded-full bg-coral/3 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* --- Hero area: heading left + carousel right --- */}
        <div className="mb-12 sm:mb-16 grid items-center gap-8 sm:gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-16">
          {/* Left column -- heading + rating card */}
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div>
                <p className="mb-3 sm:mb-4 font-[family-name:var(--font-body)] text-xs sm:text-sm font-semibold uppercase tracking-widest text-coral">
                  Отзывы
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-[26px] sm:text-[36px] lg:text-[52px] font-black leading-[1.1] tracking-tight text-charcoal">
                  Сохраняем{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">WOW-эффект</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/20"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  </span>{" "}
                  до последней крошки
                </h2>
              </div>

              {/* Rating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex w-fit items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-border bg-white/80 px-4 sm:px-6 py-3 sm:py-4 shadow-lg shadow-coral/5 backdrop-blur-sm"
              >
                <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-md shadow-amber-400/30">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="none"
                    className="sm:w-7 sm:h-7"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black text-charcoal">
                    4.9{" "}
                    <span className="text-sm sm:text-base font-medium text-gray-light">
                      из 5
                    </span>
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-gray">
                    оценка клиентов Juliia Sweet
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right column -- image carousel */}
          <ScrollReveal direction="right">
            <div
              ref={carouselRef}
              className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:mx-0 lg:ml-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              {/* Carousel container */}
              <div className="relative aspect-[3/4] w-full">
                {/* Background decorative frame */}
                <div className="absolute -inset-2 sm:-inset-3 rotate-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-coral/10 to-pink-light/40" />
                <div className="absolute -inset-1 sm:-inset-1.5 -rotate-3 rounded-2xl sm:rounded-3xl bg-white/50" />

                {/* Main image carousel */}
                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-2xl shadow-charcoal/10">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                        rotate: { duration: 0.4 },
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={REVIEW_IMAGES[currentIndex]}
                        alt={`Отзыв клиента ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 360px, 440px"
                        priority={currentIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image counter badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 rounded-full bg-white/80 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
                    <p className="font-[family-name:var(--font-body)] text-[10px] sm:text-xs font-semibold text-charcoal">
                      {currentIndex + 1} / {REVIEW_IMAGES.length}
                    </p>
                  </div>
                </div>

                {/* Chat bubbles overlapping the image */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-6 z-20 max-w-[170px] sm:max-w-[200px] rounded-xl sm:rounded-2xl rounded-bl-sm bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-lg shadow-charcoal/8"
                >
                  <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm font-medium text-charcoal">
                    {CHAT_BUBBLES[0].emoji} {CHAT_BUBBLES[0].text}
                  </p>
                  <div className="mt-1 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="#ff8576"
                        className="sm:w-2.5 sm:h-2.5"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -right-2 -bottom-8 sm:-right-6 sm:-bottom-10 z-20 max-w-[150px] sm:max-w-[180px] rounded-xl sm:rounded-2xl rounded-br-sm bg-coral px-3 sm:px-4 py-2 sm:py-3 shadow-lg shadow-coral/20"
                >
                  <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm font-medium text-white">
                    {CHAT_BUBBLES[1].emoji} {CHAT_BUBBLES[1].text}
                  </p>
                </motion.div>
              </div>

              {/* Navigation buttons — 44px minimum touch target */}
              <div className="mt-14 sm:mt-16 lg:mt-20 flex items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goPrev}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-coral text-white shadow-lg shadow-coral/25 transition-colors hover:bg-coral-dark"
                  aria-label="Предыдущий отзыв"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                {/* Dots indicator — larger touch targets */}
                <div className="flex gap-1.5">
                  {REVIEW_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={`h-6 flex items-center transition-all duration-300 ${
                        i === currentIndex
                          ? "w-6"
                          : "w-6"
                      }`}
                      aria-label={`Отзыв ${i + 1}`}
                    >
                      <span className={`block h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "w-6 bg-coral"
                          : "w-2 bg-coral/25 hover:bg-coral/50"
                      }`} />
                    </button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goNext}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-coral text-white shadow-lg shadow-coral/25 transition-colors hover:bg-coral-dark"
                  aria-label="Следующий отзыв"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- Text review cards (required for tests) --- */}
        <div className="relative">
          <ScrollReveal>
            <div className="mb-8 sm:mb-10 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl lg:text-2xl font-bold text-charcoal">
                Слова наших клиентов
              </h3>
            </div>
          </ScrollReveal>

          <div className="overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:overflow-visible">
            <div className="flex gap-3 sm:gap-4 w-max lg:w-auto lg:grid lg:grid-cols-4 lg:gap-5">
              {REVIEWS.map((review, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <ReviewCard review={review} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[number];
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex w-[250px] sm:w-[280px] flex-shrink-0 flex-col rounded-xl sm:rounded-2xl border border-border bg-white/90 p-5 sm:p-6 shadow-md shadow-charcoal/4 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-coral/8 lg:w-auto"
      data-testid={`review-card-${index}`}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-5 right-5 sm:left-6 sm:right-6 h-[3px] rounded-b-full bg-gradient-to-r from-coral/60 via-coral to-coral/60 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Stars */}
      <div className="mb-3 sm:mb-4 flex gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#ff8576"
            stroke="none"
            className="sm:w-4 sm:h-4"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="mb-5 sm:mb-6 flex-1 font-[family-name:var(--font-body)] text-xs sm:text-sm leading-relaxed text-charcoal/85">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-light to-coral/15">
          <span className="font-[family-name:var(--font-display)] text-[10px] sm:text-xs font-bold text-coral">
            {review.name.charAt(0)}
          </span>
        </div>
        <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm font-semibold text-charcoal">
          {review.name}
        </p>
      </div>
    </motion.div>
  );
}
