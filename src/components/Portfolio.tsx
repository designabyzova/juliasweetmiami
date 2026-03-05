"use client";

import Image from "next/image";

/* ---------- data ---------- */

const CAKES = [
  { src: "/cakes/cake-1.webp", alt: "Торт Happy Birthday с шоколадными медальонами" },
  { src: "/cakes/cake-2.webp", alt: "Фисташковый торт с виноградом" },
  { src: "/cakes/cake-3.webp", alt: "Розовый торт с шоколадным декором" },
  { src: "/cakes/cake-4.webp", alt: "Торт с надписью" },
  { src: "/cakes/cake-5.webp", alt: "Медовый торт с пчёлками" },
  { src: "/cakes/cake-6.webp", alt: "Фисташковый торт с голубикой" },
  { src: "/cakes/cake-7.webp", alt: "Зелёный торт с ягодами и эвкалиптом" },
  { src: "/cakes/cake-8.webp", alt: "Белый муссовый торт с жемчугом" },
  { src: "/cakes/cake-9.webp", alt: "Розово-фисташковый торт" },
  { src: "/cakes/cake-10.webp", alt: "Красный торт из сфер" },
];

const DESSERTS = [
  { src: "/desserts/dessert-1.webp", alt: "Авторский десерт с персиковым муссом" },
  { src: "/desserts/dessert-2.webp", alt: "Коллекция муссовых десертов" },
  { src: "/desserts/dessert-3.webp", alt: "Зелёные и красные десерты" },
  { src: "/desserts/dessert-4.webp", alt: "Лаймовые кубические десерты" },
  { src: "/desserts/dessert-5.webp", alt: "Оранжевый купольный десерт" },
  { src: "/desserts/dessert-6.webp", alt: "Розовые сферические трюфели" },
];

/* ---------- component ---------- */

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
            Портфолио
          </p>
          <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal mb-3 sm:mb-4">
            Наши работы
          </h2>
          <p className="text-gray text-sm sm:text-base lg:text-lg max-w-lg mx-auto font-[family-name:var(--font-body)]">
            Каждый торт — уникальное произведение кондитерского искусства
          </p>
        </div>

        {/* Торты — section label */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg lg:text-xl text-charcoal">
            Торты
          </h3>
        </div>

        {/* Cakes grid: 2 cols mobile, 5 cols desktop (10 items = 2 rows of 5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12 lg:mb-16">
          {CAKES.map((item, i) => (
            <div
              key={item.src}
              className="relative aspect-square rounded-2xl sm:rounded-[20px] lg:rounded-3xl overflow-hidden shadow-sm"
              data-testid={`portfolio-item-${i}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 20vw"
              />
            </div>
          ))}
        </div>

        {/* Десерты — section label */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg lg:text-xl text-charcoal">
            Десерты
          </h3>
        </div>

        {/* Desserts grid: 2 cols mobile, 3 cols tablet, 6 cols desktop (6 items = 1 row) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {DESSERTS.map((item, i) => (
            <div
              key={item.src}
              className="relative aspect-square rounded-2xl sm:rounded-[20px] lg:rounded-3xl overflow-hidden shadow-sm"
              data-testid={`portfolio-item-${CAKES.length + i}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 17vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
