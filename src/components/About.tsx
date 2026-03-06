"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/LanguageContext";

const text = {
  sectionLabel: { ru: "Обо мне", en: "About Me" },
  title: {
    ru: "Искусство кондитерской точности",
    en: "The Art of Confectionery Precision",
  },
  story1: {
    ru: "Настоящая роскошь — это внимание к деталям.",
    en: "True luxury lies in attention to detail.",
  },
  story2: {
    ru: "Мой профессиональный путь сформировал принцип: в десерте важна не громкость сладости, а глубина вкуса и безупречный баланс.",
    en: "My professional journey shaped a guiding principle: in a dessert, what matters is not how loud the sweetness, but the depth of flavor and impeccable balance.",
  },
  story3: {
    ru: "Я работаю только с отборными ингредиентами премиального качества — натуральные сливки, свежие ягоды, благородный шоколад.",
    en: "I work exclusively with hand-selected, premium-quality ingredients — natural cream, fresh berries, and fine chocolate.",
  },
  story4: {
    ru: "В моих десертах нет искусственных подсластителей и заменителей. Сахар присутствует лишь как естественная часть шоколада — не больше.",
    en: "My desserts contain no artificial sweeteners or substitutes. Sugar is present only as a natural part of the chocolate — nothing more.",
  },
  story5: {
    ru: "Это современная европейская кондитерская философия: чистота вкуса, лёгкость текстуры и утончённая подача.",
    en: "This is the modern European confectionery philosophy: purity of flavor, lightness of texture, and refined presentation.",
  },
  diffTitle1: { ru: "Десерт как", en: "Dessert as an" },
  diffTitleAccent: { ru: "эстетическое", en: "Aesthetic" },
  diffTitle2: { ru: "наслаждение", en: "Experience" },
  diffIntro1: {
    ru: "Мои десерты не перегружают.",
    en: "My desserts never overwhelm.",
  },
  diffIntro2: {
    ru: "Они раскрываются постепенно.",
    en: "They reveal themselves layer by layer.",
  },
  diffSteps: [
    {
      ru: "Сначала — воздушная муссовая текстура.",
      en: "First — an airy mousse texture.",
    },
    {
      ru: "Затем — тонкий ягодный акцент.",
      en: "Then — a subtle berry accent.",
    },
    {
      ru: "И в финале — благородная шоколадная глубина.",
      en: "And finally — the rich depth of fine chocolate.",
    },
  ],
  diffAfter: {
    ru: "После них остаётся лёгкость, приятное послевкусие и желание повторить этот момент.",
    en: "What stays with you is lightness, a delicate aftertaste, and the desire to relive the moment.",
  },
  diffClosing1: {
    ru: "Это не просто торт для события.",
    en: "It's not just a cake for an event.",
  },
  diffClosing2: {
    ru: "Это часть атмосферы, которую запоминают.",
    en: "It's part of the atmosphere people remember.",
  },
  diffTags: [
    { ru: "Воздушная текстура", en: "Airy Texture" },
    { ru: "Лёгкое послевкусие", en: "Delicate Aftertaste" },
    { ru: "Незабываемый момент", en: "Memorable Experience" },
  ],
  forWhomTitle1: { ru: "Для тех, кто выбирает", en: "For Those Who Choose" },
  forWhomTitleAccent: { ru: "исключительное", en: "the Exceptional" },
  forWhomIntro: {
    ru: "Я создаю десерты для клиентов, которые ценят:",
    en: "I create desserts for clients who value:",
  },
  forWhomValues: [
    { ru: "Эстетику и минимализм", en: "Aesthetics and minimalism" },
    {
      ru: "Натуральность без компромиссов",
      en: "All-natural ingredients, no compromises",
    },
    { ru: "Лёгкость вместо избыточности", en: "Lightness over excess" },
    {
      ru: "Качество, которое чувствуется с первого укуса",
      en: "Quality you taste from the very first bite",
    },
  ],
  forWhomOccasions: {
    ru: "Частные мероприятия. Камерные ужины. Элегантные праздники. И особенные моменты, где важна каждая деталь.",
    en: "Private events. Intimate dinners. Elegant celebrations. And special moments where every detail matters.",
  },
  forWhomCta: {
    ru: "Если вы ищете в Майами десерт, соответствующий уровню high-end — вы его нашли.",
    en: "If you're looking for a high-end dessert in Miami — you've found it.",
  },
  forWhomTags: [
    { ru: "High-end десерты", en: "High-End Desserts" },
    { ru: "Частные мероприятия", en: "Private Events" },
    { ru: "100% натуральность", en: "All Natural" },
  ],
  diffImageAlt: { ru: "Авторские муссовые десерты", en: "Signature mousse desserts" },
  forWhomImageAlt: {
    ru: "Муссовый торт в форме сердца — Juliia Sweet",
    en: "Heart-shaped mousse cake — Juliia Sweet",
  },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-warm"
    >
      <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-pink-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <p className="text-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 font-[family-name:var(--font-body)]">
              {t(text.sectionLabel)}
            </p>
            <h2 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[48px] tracking-normal text-charcoal">
              {t(text.title)}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-5">
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story1)}
            </p>
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story2)}
            </p>
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story3)}
            </p>
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story4)}
            </p>
            <p className="text-gray text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] text-center">
              {t(text.story5)}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-hidden mb-5 sm:mb-6 lg:mb-8"
            style={{
              background: "linear-gradient(135deg, #fef5f0 0%, #fdf0f5 50%, #fce8ee 100%)",
            }}
          >
            <div className="relative flex flex-col-reverse md:flex-row items-center">
              <div className="relative flex-shrink-0 w-full md:w-[48%] flex items-center justify-center p-5 sm:p-7 md:p-8 lg:p-12">
                <div className="relative w-[260px] sm:w-[300px] lg:w-[380px]">
                  <div className="absolute -inset-2 sm:-inset-3 bg-pink-light/50 rounded-[22px] sm:rounded-[26px] lg:rounded-[30px] rotate-[-3deg]" />
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-l-2 border-coral/25 rounded-tl-2xl" />
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-r-2 border-coral/25 rounded-br-2xl" />
                  <div className="relative rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden shadow-2xl shadow-charcoal/10">
                    <Image
                      src="/desserts/what-different.webp"
                      alt={t(text.diffImageAlt)}
                      width={754}
                      height={800}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 260px, (max-width: 960px) 300px, 380px"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white rounded-lg sm:rounded-xl shadow-lg px-2.5 py-1.5 sm:px-3 sm:py-2 z-10">
                    <span className="text-base sm:text-lg">&#10024;</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex-1 p-5 sm:p-8 lg:p-14 pb-2 md:pb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="heading-wide font-[family-name:var(--font-display)] font-black text-[22px] sm:text-[28px] lg:text-[40px] leading-[1.1] text-charcoal mb-3 sm:mb-4">
                  {t(text.diffTitle1)}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t(text.diffTitleAccent)}</span>
                    <span className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/15" />
                  </span>{" "}
                  {t(text.diffTitle2)}
                </h3>
                <div className="max-w-md mb-4 sm:mb-5 space-y-3">
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.diffIntro1)}
                  </p>
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.diffIntro2)}
                  </p>
                  <div className="space-y-1.5 pl-1">
                    {text.diffSteps.map((step) => (
                      <p
                        key={step.ru}
                        className="text-charcoal/70 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] font-medium"
                      >
                        {t(step)}
                      </p>
                    ))}
                  </div>
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.diffAfter)}
                  </p>
                  <div className="pt-1">
                    <p className="text-charcoal/50 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] italic">
                      {t(text.diffClosing1)}
                    </p>
                    <p className="text-charcoal/80 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] font-semibold italic">
                      {t(text.diffClosing2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {text.diffTags.map((tag) => (
                    <span
                      key={tag.ru}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div
            className="relative rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #fdf0f5 0%, #fce4ec 40%, #f8d7e3 100%)",
            }}
          >
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="relative z-10 flex-1 p-6 sm:p-8 lg:p-14 pb-4 md:pb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8576" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="heading-wide font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[32px] lg:text-[44px] leading-[1.1] text-charcoal mb-3 sm:mb-4">
                  {t(text.forWhomTitle1)}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t(text.forWhomTitleAccent)}</span>
                    <span className="absolute -bottom-1 left-0 h-2.5 sm:h-3 w-full rounded-full bg-coral/15" />
                  </span>
                </h3>
                <div className="max-w-md mb-5 sm:mb-6 space-y-4">
                  <p className="text-charcoal/60 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    {t(text.forWhomIntro)}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {text.forWhomValues.map((value) => (
                      <li
                        key={value.ru}
                        className="text-charcoal/70 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] flex items-start gap-2.5"
                      >
                        <span className="text-coral/70 flex-shrink-0">—</span>
                        <span>{t(value)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-charcoal/50 text-xs sm:text-sm lg:text-base leading-relaxed font-[family-name:var(--font-body)] italic">
                    {t(text.forWhomOccasions)}
                  </p>
                  <p className="text-charcoal/80 text-sm sm:text-base lg:text-lg leading-relaxed font-[family-name:var(--font-body)] font-semibold">
                    {t(text.forWhomCta)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {text.forWhomTags.map((tag) => (
                    <span
                      key={tag.ru}
                      className="bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-body)]"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex-shrink-0 w-full md:w-[45%] flex items-center justify-center p-5 sm:p-7 md:p-8 lg:p-10">
                <div className="relative w-[220px] sm:w-[270px] lg:w-[340px]">
                  <div className="absolute -inset-2 sm:-inset-3 bg-white/40 rounded-[22px] sm:rounded-[26px] lg:rounded-[30px] rotate-[3deg]" />
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-l-2 border-coral/25 rounded-tl-2xl" />
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-r-2 border-coral/25 rounded-br-2xl" />
                  <div className="relative rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden shadow-2xl shadow-charcoal/10">
                    <Image
                      src="/for-whom-cake.webp"
                      alt={t(text.forWhomImageAlt)}
                      width={600}
                      height={561}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 220px, (max-width: 960px) 270px, 340px"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white rounded-lg sm:rounded-xl shadow-lg px-2.5 py-1.5 sm:px-3 sm:py-2 z-10">
                    <span className="text-base sm:text-lg">&#x1F90D;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
