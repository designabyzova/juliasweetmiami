"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

/* ---------- translations ---------- */

const uiText = {
  sectionLabel: { ru: "Портфолио", en: "Portfolio" },
  title: { ru: "Наши работы", en: "Our Creations" },
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
  dessertsSubtitle: {
    ru: "Авторские муссовые пирожные — маленькие шедевры",
    en: "Signature mousse pastries — little masterpieces",
  },
  showMore: { ru: "Показать ещё", en: "Show More" },
  showLess: { ru: "Свернуть", en: "Show Less" },
  close: { ru: "Закрыть", en: "Close" },
  prev: { ru: "Предыдущее", en: "Previous" },
  next: { ru: "Следующее", en: "Next" },
  zoomHint: { ru: "Нажмите для увеличения", en: "Click to zoom" },
};

/* ---------- data ---------- */

type T = { readonly ru: string; readonly en: string };
type CakeItem = { src: string; alt: T; aspect?: "portrait" };

const BENTO_CAKES: CakeItem[] = [
  { src: "/cakes-bento/bento-pistachio-chocolate-mousse.png", alt: { ru: "Фисташковый бенто-торт с шоколадными кубиками — авторский муссовый десерт", en: "Pistachio bento cake with chocolate cubes — signature mousse dessert" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-red-velvet-heart.png", alt: { ru: "Красный велюровый бенто-торт в форме сердца — десерт на заказ", en: "Red velvet heart-shaped bento cake — custom dessert" } },
  { src: "/cakes-bento/bento-navy-gold-birthday.png", alt: { ru: "Тёмно-синий бенто-торт с золотой надписью Happy Birthday — торт на заказ", en: "Navy blue bento cake with gold Happy Birthday lettering — custom order" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-white-gold-elegant.png", alt: { ru: "Белый элегантный бенто-торт с золотым логотипом — авторский дизайн", en: "White elegant bento cake with gold lettering — luxury design" } },
  { src: "/cakes-bento/bento-red-glossy-spheres.png", alt: { ru: "Красный глянцевый бенто-торт из муссовых сфер — авторский дизайн", en: "Red glossy sphere bento cake — signature textured design" } },
  { src: "/cakes-bento/bento-pink-baby-shower.png", alt: { ru: "Нежный розовый бенто-торт на рождение малыша с фигуркой — ручная работа", en: "Delicate pink baby shower bento cake with figurine — handcrafted" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-red-velvet-birthday.png", alt: { ru: "Красный велюровый бенто-торт с золотым топпером Happy Birthday", en: "Red velvet bento cake with gold Happy Birthday topper" } },
  { src: "/cakes-bento/bento-purple-velvet-pearls.png", alt: { ru: "Фиолетовый велюровый бенто-торт с жемчужными бусинами — авторский дизайн", en: "Purple velvet bento cake with pearl bead decorations — signature design" } },
  { src: "/cakes-bento/bento-white-chocolate-lotus.png", alt: { ru: "Белый бенто-торт с шоколадным рисунком лотоса — элегантный десерт", en: "White bento cake with chocolate lotus design — elegant dessert" } },
  { src: "/cakes-bento/bento-pink-heart-mom.png", alt: { ru: "Розовый бенто-торт в форме сердца с надписью «С днём рождения, мама!»", en: "Pink heart-shaped bento cake with Happy Birthday Mom inscription" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-orange-halloween.png", alt: { ru: "Оранжевый бенто-торт на Хэллоуин с шоколадными черепами — креативный дизайн", en: "Orange Halloween bento cake with chocolate skulls — creative design" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-white-pearl-minimal.png", alt: { ru: "Белый минималистичный бенто-торт с жемчужным декором — элегантный десерт", en: "White minimalist bento cake with pearl decoration — elegant dessert" } },
  { src: "/cakes-bento/bento-blue-bubble-spheres.png", alt: { ru: "Синий бенто-торт из муссовых сфер с серебряными буквами — уникальный дизайн", en: "Blue bubble sphere bento cake with silver letters — unique design" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-green-thanksgiving.png", alt: { ru: "Зелёный фисташковый бенто-торт с надписью Happy Thanksgiving", en: "Green pistachio bento cake with Happy Thanksgiving inscription" } },
  { src: "/cakes-bento/bento-red-love-gold-hearts.png", alt: { ru: "Красный бенто-торт «Love you, baby!» с золотыми сердечками", en: "Red bento cake with Love you baby and gold hearts" } },
  { src: "/cakes-bento/bento-white-photo-print.png", alt: { ru: "Белый бенто-торт с фото-принтом и чёрной лентой — персональный десерт", en: "White bento cake with photo print and black ribbon — personalized dessert" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-amber-thanksgiving.png", alt: { ru: "Янтарный бенто-торт с надписью Happy Thanksgiving — осенний десерт", en: "Amber bento cake with Happy Thanksgiving script — autumn dessert" } },
  { src: "/cakes-bento/bento-red-heart-pearls.png", alt: { ru: "Красный бенто-торт в форме сердца с жемчужинами на фигурной тарелке", en: "Red heart bento cake with pearl dots on scalloped plate" } },
  { src: "/cakes-bento/bento-green-matcha.png", alt: { ru: "Зелёный бенто-торт матча с золотым топпером Happy Birthday", en: "Green matcha bento cake with gold Happy Birthday topper" }, aspect: "portrait" },
  { src: "/cakes-bento/bento-white-velvet-custom.jpeg", alt: { ru: "Белый велюровый бенто-торт с шоколадной надписью на заказ", en: "White velvet bento cake with custom chocolate lettering" } },
  { src: "/cakes-bento/bento-red-heart-berries.png", alt: { ru: "Красный бенто-торт в форме сердца с ягодами и жемчужным декором", en: "Red heart bento cake with berry accents and pearl decorations" } },
  { src: "/cakes-bento/bento-green-georgian.png", alt: { ru: "Зелёный бенто-торт с надписью на грузинском языке — торт на заказ", en: "Green bento cake with Georgian script inscription — custom order" } },
  { src: "/cakes-bento/bento-red-white-silver.png", alt: { ru: "Красно-белый бенто-торт с серебряным акцентом — авторский дизайн", en: "Red and white bento cake with silver accent — signature design" } },
  { src: "/cakes-bento/bento-two-tier-festive.png", alt: { ru: "Двухъярусный красно-белый праздничный торт с золотыми звёздами", en: "Two-tier red and white festive cake with gold stars and coconut" }, aspect: "portrait" },
];

const CELEBRATION_CAKES: CakeItem[] = [
  { src: "/cakes-celebration/celebration-pink-raspberry-two-tier.png", alt: { ru: "Двухъярусный розовый торт со свежей малиной и золотыми акцентами — торт на заказ", en: "Two-tier pink raspberry celebration cake with gold accents — custom order" } },
  { src: "/cakes-celebration/celebration-honey-honeycomb.jpeg", alt: { ru: "Медовый торт ручной работы с натуральными сотами, мёдом и пчёлками из шоколада", en: "Handcrafted honey cake with real honeycomb, honey drips and chocolate bees" } },
  { src: "/cakes-celebration/celebration-turquoise-gold-drip.png", alt: { ru: "Бирюзовый праздничный торт на заказ с фиолетовым кремом и золотыми подтёками", en: "Turquoise birthday cake with purple cream border and gold drip decoration" } },
  { src: "/cakes-celebration/celebration-pistachio-blueberry.jpeg", alt: { ru: "Фисташковый велюровый торт с голубикой и эвкалиптом — авторский дизайн", en: "Pistachio velvet cake with fresh blueberries and eucalyptus — signature design" } },
  { src: "/cakes-celebration/celebration-pistachio-birthday.png", alt: { ru: "Фисташковый торт на день рождения с голубикой и золотой надписью Happy Birthday", en: "Pistachio birthday cake with blueberries and gold Happy Birthday inscription" } },
];

const DESSERTS: CakeItem[] = [
  { src: "/desserts/mousse-dessert-rainbow-shells.png", alt: { ru: "Разноцветные авторские муссовые десерты-ракушки ручной работы", en: "Rainbow handcrafted mousse shell desserts — signature collection" } },
  { src: "/desserts/mousse-dessert-geometric-collection.jpeg", alt: { ru: "Коллекция авторских муссовых десертов с геометрическим дизайном на заказ", en: "Signature geometric mousse dessert collection — custom order" }, aspect: "portrait" },
  { src: "/desserts/mousse-dessert-pink-berry-sphere.png", alt: { ru: "Розовый сферический муссовый десерт из ягод — авторская кондитерская", en: "Pink spherical berry mousse dessert — artisan confectionery" }, aspect: "portrait" },
  { src: "/desserts/mousse-dessert-pistachio-red-geometric.png", alt: { ru: "Фисташковые и красные геометрические муссовые десерты — авторский дизайн", en: "Pistachio and red geometric mousse desserts — signature design" } },
  { src: "/desserts/mousse-dessert-chocolate-lemon.png", alt: { ru: "Шоколадный и лимонный муссовые десерты ручной работы на тарелке", en: "Handcrafted chocolate and lemon mousse desserts" } },
  { src: "/desserts/mousse-dessert-pistachio-spirals.png", alt: { ru: "Фисташковые муссовые спирали и персиковые десерты — авторская коллекция", en: "Pistachio mousse spirals and peach desserts — artisan collection" }, aspect: "portrait" },
  { src: "/desserts/mousse-dessert-red-white-geometric.png", alt: { ru: "Красно-белые геометрические муссовые десерты на заказ", en: "Red and white geometric mousse desserts — custom order" } },
  { src: "/desserts/mousse-dessert-lemon-heart-cube.png", alt: { ru: "Лимонные муссовые десерты в форме сердца и куба — ручная работа", en: "Lemon mousse heart and cube desserts — handcrafted" } },
  { src: "/desserts/mousse-dessert-berries-hearts.png", alt: { ru: "Ассорти авторских муссовых десертов с ягодами и сердечками", en: "Assorted mousse desserts with berries and hearts — pastry art" } },
  { src: "/desserts/mousse-dessert-orange-dome.png", alt: { ru: "Оранжевый купольный муссовый десерт ручной работы", en: "Orange dome mousse dessert — handcrafted pastry" } },
  { src: "/desserts/mousse-dessert-chocolate-rose.png", alt: { ru: "Шоколадные муссовые десерты с лепестками роз — авторская подача", en: "Chocolate mousse desserts with rose petals — signature presentation" } },
  { src: "/desserts/mousse-dessert-trio-lavender.png", alt: { ru: "Трио муссовых десертов: красный, белый и лавандовый — кондитерское искусство", en: "Mousse dessert trio: red, white and lavender — confectionery art" } },
  { src: "/desserts/mousse-dessert-orange-domes.png", alt: { ru: "Апельсиновые купольные десерты — авторские муссовые пирожные на заказ", en: "Orange dome desserts — signature mousse pastries to order" } },
  { src: "/desserts/mousse-dessert-red-orange.png", alt: { ru: "Красно-оранжевые авторские муссовые десерты — коллекция ручной работы", en: "Red and orange signature mousse desserts — handcrafted collection" } },
  { src: "/desserts/mousse-dessert-pistachio-heart.png", alt: { ru: "Фисташковый муссовый десерт в форме сердца — авторское пирожное", en: "Pistachio mousse heart dessert — artisan pastry" } },
];

const ALL_ITEMS: CakeItem[] = [
  ...BENTO_CAKES,
  ...CELEBRATION_CAKES,
  ...DESSERTS,
];

/* ---------- Lightbox with zoom ---------- */

function Lightbox({
  items,
  initialIndex,
  onClose,
  t,
}: {
  items: CakeItem[];
  initialIndex: number;
  onClose: () => void;
  t: (text: T) => string;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const current = items[currentIndex];
  const total = items.length;

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (dir: -1 | 1) => {
      resetZoom();
      setCurrentIndex((i) => (i + dir + total) % total);
    },
    [total, resetZoom]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) resetZoom();
        else onClose();
      }
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, isZoomed, resetZoom, goTo]);

  const handleImageClick = (e: React.MouseEvent) => {
    if (isDragging.current) return;

    if (isZoomed) {
      resetZoom();
    } else {
      const rect = imageContainerRef.current?.getBoundingClientRect();
      if (rect) {
        const clickX = e.clientX - rect.left - rect.width / 2;
        const clickY = e.clientY - rect.top - rect.height / 2;
        setPan({ x: -clickX * 0.5, y: -clickY * 0.5 });
      }
      setIsZoomed(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isZoomed) return;
    isDragging.current = false;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isZoomed) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      isDragging.current = true;
    }
    lastPointer.current = { x: e.clientX, y: e.clientY };
    if (isDragging.current) {
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  };

  const handlePointerUp = () => {
    setTimeout(() => {
      isDragging.current = false;
    }, 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={() => {
          if (isZoomed) resetZoom();
          else onClose();
        }}
      />

      {/* Nav: Previous */}
      <button
        onClick={() => goTo(-1)}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white"
        aria-label={t(uiText.prev)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Nav: Next */}
      <button
        onClick={() => goTo(1)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white"
        aria-label={t(uiText.next)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white"
        aria-label={t(uiText.close)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm font-[family-name:var(--font-body)] tabular-nums">
        {currentIndex + 1} / {total}
      </div>

      {/* Zoom hint */}
      <AnimatePresence>
        {!isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs font-[family-name:var(--font-body)] flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            {t(uiText.zoomHint)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      <motion.div
        key={current.src}
        ref={imageContainerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-[88vw] h-[75vh] sm:w-[80vw] sm:h-[80vh] max-w-[900px] max-h-[900px] overflow-hidden select-none"
        style={{
          cursor: isZoomed ? "grab" : "zoom-in",
        }}
        onClick={handleImageClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="relative w-full h-full transition-transform"
          style={{
            transform: isZoomed
              ? `scale(2.2) translate(${pan.x / 2.2}px, ${pan.y / 2.2}px)`
              : "scale(1)",
            transitionDuration: isDragging.current ? "0ms" : "300ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Image
            src={current.src}
            alt={t(current.alt)}
            fill
            className="object-contain pointer-events-none"
            sizes="(max-width: 640px) 88vw, 80vw"
            priority
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Uniform Gallery Grid ---------- */

function UniformGrid({
  items,
  onImageClick,
  t,
  startIndex,
}: {
  items: CakeItem[];
  onImageClick: (globalIndex: number) => void;
  t: (text: T) => string;
  startIndex: number;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {items.map((item, i) => (
        <div
          key={item.src}
          className="group cursor-pointer"
          onClick={() => onImageClick(startIndex + i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onImageClick(startIndex + i);
          }}
          aria-label={t(item.alt)}
          data-testid={`portfolio-item-${startIndex + i}`}
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[20px] lg:rounded-3xl aspect-[4/5]">
            <Image
              src={item.src}
              alt={t(item.alt)}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 20vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjVlZWU4Ii8+PC9zdmc+"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Main Portfolio ---------- */

export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllBento, setShowAllBento] = useState(false);
  const [showAllDesserts, setShowAllDesserts] = useState(false);

  const INITIAL_COUNT = 10;

  const openLightbox = useCallback((globalIndex: number) => {
    setLightboxIndex(globalIndex);
  }, []);

  const visibleBento = showAllBento ? BENTO_CAKES : BENTO_CAKES.slice(0, INITIAL_COUNT);
  const visibleDesserts = showAllDesserts ? DESSERTS : DESSERTS.slice(0, INITIAL_COUNT);

  const bentoStart = 0;
  const celebrationStart = BENTO_CAKES.length;
  const dessertsStart = BENTO_CAKES.length + CELEBRATION_CAKES.length;

  return (
    <>
      <section
        id="portfolio"
        data-testid="portfolio-section"
        className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
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
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="mb-5 sm:mb-6">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl lg:text-2xl text-charcoal">
                {t(uiText.bentoTitle)}
              </h3>
              <p className="text-gray text-sm sm:text-base font-[family-name:var(--font-body)] mt-1.5 max-w-md">
                {t(uiText.bentoSubtitle)}
              </p>
            </div>
            <UniformGrid
              items={visibleBento}
              onImageClick={openLightbox}
              t={t}
              startIndex={bentoStart}
            />
            {BENTO_CAKES.length > INITIAL_COUNT && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllBento(!showAllBento)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-coral-dark transition-colors font-[family-name:var(--font-body)] border border-coral/20 hover:border-coral/40 px-5 py-2.5 rounded-full"
                >
                  {t(showAllBento ? uiText.showLess : uiText.showMore)}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${showAllBento ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ──── Праздничные Торты ──── */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="mb-5 sm:mb-6">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl lg:text-2xl text-charcoal">
                {t(uiText.celebrationTitle)}
              </h3>
              <p className="text-gray text-sm sm:text-base font-[family-name:var(--font-body)] mt-1.5 max-w-md">
                {t(uiText.celebrationSubtitle)}
              </p>
            </div>
            <UniformGrid
              items={CELEBRATION_CAKES}
              onImageClick={openLightbox}
              t={t}
              startIndex={celebrationStart}
            />
          </div>

          {/* ──── Десерты ──── */}
          <div>
            <div className="mb-5 sm:mb-6">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl lg:text-2xl text-charcoal">
                {t(uiText.dessertsTitle)}
              </h3>
              <p className="text-gray text-sm sm:text-base font-[family-name:var(--font-body)] mt-1.5 max-w-md">
                {t(uiText.dessertsSubtitle)}
              </p>
            </div>
            <UniformGrid
              items={visibleDesserts}
              onImageClick={openLightbox}
              t={t}
              startIndex={dessertsStart}
            />
            {DESSERTS.length > INITIAL_COUNT && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllDesserts(!showAllDesserts)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-coral-dark transition-colors font-[family-name:var(--font-body)] border border-coral/20 hover:border-coral/40 px-5 py-2.5 rounded-full"
                >
                  {t(showAllDesserts ? uiText.showLess : uiText.showMore)}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${showAllDesserts ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={ALL_ITEMS}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
}
