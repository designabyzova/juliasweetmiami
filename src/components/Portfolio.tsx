"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

/* ---------- translations ---------- */

const uiText = {
  sectionLabel: { ru: "Портфолио", en: "Portfolio" },
  title: { ru: "Наши работы", en: "Our Works" },
  subtitle: {
    ru: "Каждый торт — уникальное произведение кондитерского искусства",
    en: "Each cake is a unique masterpiece of confectionery art",
  },
  bentoTitle: { ru: "Бенто Муссовые", en: "Bento Mousse" },
  bentoSubtitle: {
    ru: "Изысканные муссовые десерты из натуральных ингредиентов",
    en: "Exquisite mousse desserts from natural ingredients",
  },
  celebrationTitle: { ru: "Праздничные Торты", en: "Celebration Cakes" },
  celebrationSubtitle: {
    ru: "Для настоящих сладкоежек — создаются по индивидуальному запросу",
    en: "For true sweet lovers — made to individual order",
  },
  dessertsTitle: { ru: "Десерты", en: "Desserts" },
};

/* ---------- data ---------- */

type T = { readonly ru: string; readonly en: string };
type CakeItem = { src: string; alt: T };

const BENTO_CAKES: CakeItem[] = [
  { src: "/cakes-bento/CakeBento_1.png", alt: { ru: "Фисташковый бенто-торт с шоколадными кубиками", en: "Pistachio bento cake with chocolate cubes" } },
  { src: "/cakes-bento/CakeBento_5.jpeg", alt: { ru: "Белый велюровый бенто-торт с шоколадной надписью", en: "White velvet bento cake with chocolate inscription" } },
  { src: "/cakes-bento/CakeBento_8.png", alt: { ru: "Белый муссовый бенто-торт с жемчужинами", en: "White mousse bento cake with pearls" } },
  { src: "/cakes-bento/CakeBento_10.png", alt: { ru: "Красный глянцевый бенто-торт из сфер", en: "Red glossy sphere bento cake" } },
  { src: "/cakes-bento/CakeBento_11.png", alt: { ru: "Красно-белый бенто-торт с серебряным декором", en: "Red and white bento cake with silver decor" } },
];

const CELEBRATION_CAKES: CakeItem[] = [
  { src: "/cakes-celebration/Cake_2.png", alt: { ru: "Бирюзовый торт с фиолетовым кремом и золотыми подтёками", en: "Teal cake with purple cream and gold drips" } },
  { src: "/cakes-celebration/Cake_3.jpeg", alt: { ru: "Розовый торт с золотыми подтёками и шоколадными медальонами", en: "Pink cake with gold drips and chocolate medallions" } },
  { src: "/cakes-celebration/Cake_4.png", alt: { ru: "Фисташковый торт с голубикой и золотой надписью", en: "Pistachio cake with blueberries and gold inscription" } },
  { src: "/cakes-celebration/Cake_6.jpeg", alt: { ru: "Медовый торт с сотами и пчёлками", en: "Honey cake with honeycombs and bees" } },
  { src: "/cakes-celebration/Cake_7.jpeg", alt: { ru: "Фисташковый торт с голубикой и эвкалиптом", en: "Pistachio cake with blueberries and eucalyptus" } },
];

const DESSERTS: CakeItem[] = [
  { src: "/desserts/dessert-1.webp", alt: { ru: "Авторский десерт с персиковым муссом", en: "Signature dessert with peach mousse" } },
  { src: "/desserts/dessert-2.webp", alt: { ru: "Коллекция муссовых десертов", en: "Mousse dessert collection" } },
  { src: "/desserts/dessert-3.webp", alt: { ru: "Зелёные и красные десерты", en: "Green and red desserts" } },
  { src: "/desserts/dessert-4.webp", alt: { ru: "Лаймовые кубические десерты", en: "Lime cube desserts" } },
  { src: "/desserts/dessert-5.webp", alt: { ru: "Оранжевый купольный десерт", en: "Orange dome dessert" } },
  { src: "/desserts/dessert-6.webp", alt: { ru: "Розовые сферические трюфели", en: "Pink spherical truffles" } },
];

/* ---------- component ---------- */

export default function Portfolio() {
  const { t } = useLanguage();
  let itemIndex = 0;

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
            {t(uiText.sectionLabel)}
          </p>
          <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal mb-3 sm:mb-4">
            {t(uiText.title)}
          </h2>
          <p className="text-gray text-sm sm:text-base lg:text-lg max-w-lg mx-auto font-[family-name:var(--font-body)]">
            {t(uiText.subtitle)}
          </p>
        </div>

        {/* ──── Бенто Муссовые ──── */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg lg:text-xl text-charcoal">
            {t(uiText.bentoTitle)}
          </h3>
          <p className="text-gray text-xs sm:text-sm font-[family-name:var(--font-body)] mt-1">
            {t(uiText.bentoSubtitle)}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12 lg:mb-16">
          {BENTO_CAKES.map((item) => {
            const idx = itemIndex++;
            return (
              <div
                key={item.src}
                className="relative aspect-square rounded-2xl sm:rounded-[20px] lg:rounded-3xl overflow-hidden shadow-sm"
                data-testid={`portfolio-item-${idx}`}
              >
                <Image
                  src={item.src}
                  alt={t(item.alt)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 20vw"
                />
              </div>
            );
          })}
        </div>

        {/* ──── Праздничные Торты ──── */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg lg:text-xl text-charcoal">
            {t(uiText.celebrationTitle)}
          </h3>
          <p className="text-gray text-xs sm:text-sm font-[family-name:var(--font-body)] mt-1">
            {t(uiText.celebrationSubtitle)}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12 lg:mb-16">
          {CELEBRATION_CAKES.map((item) => {
            const idx = itemIndex++;
            return (
              <div
                key={item.src}
                className="relative aspect-square rounded-2xl sm:rounded-[20px] lg:rounded-3xl overflow-hidden shadow-sm"
                data-testid={`portfolio-item-${idx}`}
              >
                <Image
                  src={item.src}
                  alt={t(item.alt)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 20vw"
                />
              </div>
            );
          })}
        </div>

        {/* ──── Десерты ──── */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg lg:text-xl text-charcoal">
            {t(uiText.dessertsTitle)}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {DESSERTS.map((item) => {
            const idx = itemIndex++;
            return (
              <div
                key={item.src}
                className="relative aspect-square rounded-2xl sm:rounded-[20px] lg:rounded-3xl overflow-hidden shadow-sm"
                data-testid={`portfolio-item-${idx}`}
              >
                <Image
                  src={item.src}
                  alt={t(item.alt)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 17vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
