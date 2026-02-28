"use client";

import { motion } from "framer-motion";
import { REVIEWS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function Reviews() {
  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="py-16 sm:py-20 lg:py-28 bg-bg relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              Отзывы
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-black text-[28px] sm:text-[36px] lg:text-[48px] tracking-tight text-charcoal mb-4">
              Что говорят клиенты
            </h2>
          </div>
        </ScrollReveal>

        {/* Single responsive container: horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-4 w-max lg:w-auto lg:grid lg:grid-cols-2 lg:gap-6">
            {REVIEWS.map((review, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <ReviewCard review={review} index={i} />
              </ScrollReveal>
            ))}
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-md shadow-black/5 border border-border w-[300px] lg:w-auto flex-shrink-0"
      data-testid={`review-card-${index}`}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#ff8576"
            stroke="none"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-charcoal text-base leading-relaxed mb-6 font-[family-name:var(--font-body)]">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center">
          <span className="font-[family-name:var(--font-display)] font-bold text-coral text-sm">
            {review.name.charAt(0)}
          </span>
        </div>
        <p className="font-[family-name:var(--font-body)] font-medium text-charcoal text-sm">
          {review.name}
        </p>
      </div>
    </motion.div>
  );
}
