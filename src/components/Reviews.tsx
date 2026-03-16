"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { REVIEWS } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const uiText = {
  sectionLabel: { ru: "Отзывы", en: "Reviews" },
  titlePart1: { ru: "Сохраняем", en: "Keeping the" },
  titleAccent: { ru: "WOW-эффект", en: "WOW Effect" },
  titlePart2: { ru: "до последней крошки", en: "Down to the Last Crumb" },
  ratingOutOf: { ru: "из 5", en: "of 5" },
  ratingLabel: { ru: "оценка клиентов Sweet Balance", en: "Sweet Balance client rating" },
  clientWords: { ru: "Слова наших клиентов", en: "Words from Our Clients" },
  moreReviews: { ru: "Смотреть все отзывы в Instagram", en: "See all reviews on Instagram" },
  prevReview: { ru: "Предыдущий отзыв", en: "Previous review" },
  nextReview: { ru: "Следующий отзыв", en: "Next review" },
  reviewN: { ru: "Отзыв", en: "Review" },
  clientReview: { ru: "Отзыв клиента", en: "Client review" },
};

const CHAT_BUBBLES = [
  { text: { ru: "Торт просто космос!", en: "The cake is out of this world!" }, emoji: "\uD83C\uDF82" },
  { text: { ru: "Лучший десерт в жизни!", en: "Best dessert ever!" }, emoji: "\uD83D\uDE0D" },
];

const REVIEW_IMAGES = [
  { src: "/reviews/review-1.webp", alt: { ru: "Отзыв клиента о торте Sweet Balance в Майами", en: "Client review for Sweet Balance custom cake in Miami" } },
  { src: "/reviews/review-2.webp", alt: { ru: "Отзыв клиента о праздничном торте Sweet Balance", en: "Client review for Sweet Balance celebration cake" } },
  { src: "/reviews/review-3.webp", alt: { ru: "Отзыв клиента о муссовом десерте Sweet Balance", en: "Client review for Sweet Balance mousse dessert" } },
  { src: "/reviews/review-4.webp", alt: { ru: "Отзыв клиента о торте на заказ Sweet Balance", en: "Client testimonial for custom Sweet Balance cake" } },
  { src: "/reviews/review-5.webp", alt: { ru: "Отзыв клиента о свадебном торте Sweet Balance", en: "Client review for Sweet Balance wedding cake" } },
  { src: "/reviews/review-6.webp", alt: { ru: "Отзыв клиента о бенто-торте Sweet Balance", en: "Client review for Sweet Balance bento cake" } },
  { src: "/reviews/review-7.webp", alt: { ru: "Отзыв клиента о премиальном десерте Sweet Balance", en: "Client review for premium Sweet Balance dessert" } },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px] rounded-full bg-coral/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] rounded-full bg-pink-light/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] -translate-y-1/2 rounded-full bg-coral/3 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* --- Hero area: heading left + carousel right --- */}
        <div className="mb-12 sm:mb-16 grid items-center gap-8 sm:gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div>
                <p className="mb-3 sm:mb-4 font-[family-name:var(--font-body)] text-xs sm:text-sm font-semibold uppercase tracking-widest text-coral">
                  {t(uiText.sectionLabel)}
                </p>
                <h2 className="heading-wide font-[family-name:var(--font-display)] text-[26px] sm:text-[36px] lg:text-[52px] font-black leading-[1.1] tracking-normal text-charcoal">
                  {t(uiText.titlePart1)}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t(uiText.titleAccent)}</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/20"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  </span>{" "}
                  {t(uiText.titlePart2)}
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none" className="sm:w-7 sm:h-7">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black text-charcoal">
                    4.9{" "}
                    <span className="text-sm sm:text-base font-medium text-gray-light">
                      {t(uiText.ratingOutOf)}
                    </span>
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-gray">
                    {t(uiText.ratingLabel)}
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
              <div className="relative aspect-[3/4] w-full">
                <div className="absolute -inset-2 sm:-inset-3 rotate-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-coral/10 to-pink-light/40" />
                <div className="absolute -inset-1 sm:-inset-1.5 -rotate-3 rounded-2xl sm:rounded-3xl bg-white/50" />

                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-2xl shadow-charcoal/10">
                  <div aria-hidden className="absolute inset-0 pointer-events-none invisible">
                    {REVIEW_IMAGES.map((img, i) => (
                      <Image
                        key={img.src}
                        src={img.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 360px, 440px"
                        priority={i < 3}
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                    ))}
                  </div>

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
                        src={REVIEW_IMAGES[currentIndex].src}
                        alt={t(REVIEW_IMAGES[currentIndex].alt)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 360px, 440px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 rounded-full bg-white/80 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
                    <p className="font-[family-name:var(--font-body)] text-[10px] sm:text-xs font-semibold text-charcoal">
                      {currentIndex + 1} / {REVIEW_IMAGES.length}
                    </p>
                  </div>
                </div>

                {/* Chat bubbles */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-6 z-20 max-w-[170px] sm:max-w-[200px] rounded-xl sm:rounded-2xl rounded-bl-sm bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-lg shadow-charcoal/8"
                >
                  <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm font-medium text-charcoal">
                    {CHAT_BUBBLES[0].emoji} {t(CHAT_BUBBLES[0].text)}
                  </p>
                  <div className="mt-1 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="8" height="8" viewBox="0 0 24 24" fill="#D4756A" className="sm:w-2.5 sm:h-2.5">
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
                    {CHAT_BUBBLES[1].emoji} {t(CHAT_BUBBLES[1].text)}
                  </p>
                </motion.div>
              </div>

              {/* Navigation buttons */}
              <div className="mt-14 sm:mt-16 lg:mt-20 flex items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goPrev}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-coral text-white shadow-lg shadow-coral/25 transition-colors hover:bg-coral-dark"
                  aria-label={t(uiText.prevReview)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <div className="flex gap-1.5">
                  {REVIEW_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={`h-6 flex items-center transition-all duration-300 ${
                        i === currentIndex ? "w-6" : "w-6"
                      }`}
                      aria-label={`${t(uiText.reviewN)} ${i + 1}`}
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
                  aria-label={t(uiText.nextReview)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- Text review cards --- */}
        <div className="relative">
          <ScrollReveal>
            <div className="mb-8 sm:mb-10 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl lg:text-2xl font-bold text-charcoal">
                {t(uiText.clientWords)}
              </h3>
            </div>
          </ScrollReveal>

          <div className="overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:overflow-visible">
            <div className="flex gap-3 sm:gap-4 w-max lg:w-auto lg:grid lg:grid-cols-4 lg:gap-5">
              {REVIEWS.map((review, i) => (
                <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                  <ReviewCard review={review} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Instagram reviews link */}
          <ScrollReveal delay={0.5}>
            <div className="mt-8 sm:mt-10 text-center">
              <a
                href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTcwMTg1MjQ2Nzk4MDcz?igsh=MXdhNmtjeGF6M3l2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-coral hover:text-coral-dark transition-colors font-[family-name:var(--font-body)] group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="sm:w-5 sm:h-5">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z" />
                </svg>
                <span className="group-hover:underline">{t(uiText.moreReviews)}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
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
  const { t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full w-[250px] sm:w-[280px] flex-shrink-0 flex-col rounded-xl sm:rounded-2xl border border-border bg-white/90 p-5 sm:p-6 shadow-md shadow-charcoal/4 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-coral/8 lg:w-auto"
      data-testid={`review-card-${index}`}
    >
      <div className="absolute top-0 left-5 right-5 sm:left-6 sm:right-6 h-[3px] rounded-b-full bg-gradient-to-r from-coral/60 via-coral to-coral/60 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-3 sm:mb-4 flex gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D4756A" stroke="none" className="sm:w-4 sm:h-4">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>

      <p className="mb-5 sm:mb-6 flex-1 font-[family-name:var(--font-body)] text-xs sm:text-sm leading-relaxed text-charcoal/85">
        &ldquo;{t(review.text)}&rdquo;
      </p>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-light to-coral/15">
          <span className="font-[family-name:var(--font-display)] text-[10px] sm:text-xs font-bold text-coral">
            {t(review.name).charAt(0)}
          </span>
        </div>
        <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm font-semibold text-charcoal">
          {t(review.name)}
        </p>
      </div>
    </motion.div>
  );
}
