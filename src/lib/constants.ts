export const NAV_ITEMS = [
  { label: "Обо мне", href: "#about" },
  { label: "Начинки", href: "#flavors" },
  { label: "Галерея", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Заказать", href: "#order" },
  { label: "Контакты", href: "#contact" },
] as const;

export const FLAVORS = [
  {
    name: "Сливочная груша",
    description:
      "Центр из груши, ванили и лимона, брауни с тёмным шоколадом, слой солёной карамели, мусс на основе маскарпоне",
    accent: "#f5e6c8",
    emoji: "🍐",
    image: "/fillings/filling-0.webp",
  },
  {
    name: "Вишня в шоколаде",
    description:
      "Вишнёвое конфи, мусс на молочном шоколаде, брауни",
    accent: "#f5c6c6",
    emoji: "🍒",
    image: "/fillings/filling-1.webp",
  },
  {
    name: "Шоколадный мандарин",
    description:
      "Начинка из мандарина, кремю из маракуйи, мусс на тёмном бельгийском шоколаде, брауни",
    accent: "#f5d5b0",
    emoji: "🍊",
    image: "/fillings/filling-2.webp",
  },
  {
    name: "Манго-маракуйя-кокос",
    description:
      "Центр из манго и маракуйи, кокосовый мусс, воздушный миндальный бисквит",
    accent: "#fceabb",
    emoji: "🥥",
    image: "/fillings/filling-3.webp",
  },
  {
    name: "Фрэш",
    description:
      "Конфитюр из клубники, кремю с лаймом и базиликом, мусс с лаймом и чаем Эрл Грей, миндальный бисквит",
    accent: "#d4f0d4",
    emoji: "🍓",
    image: "/fillings/filling-4.webp",
  },
  {
    name: "Кофе / Бейлиз / Шоколад",
    description:
      "Брауни, кофейная начинка с ликёром Bailey's, шоколадный мусс",
    accent: "#d4c4b0",
    emoji: "☕",
    image: "/fillings/filling-5.webp",
  },
  {
    name: "Апероль",
    description:
      "Начинка апельсин/Апероль, кремю с лаймом и мятой, мусс на белом бельгийском шоколаде с шампанским, миндальный бисквит",
    accent: "#fdd9b5",
    emoji: "🍹",
    image: "/fillings/filling-6.webp",
  },
  {
    name: "Малиновый Мохито",
    description:
      "Конфитюр из малины, кремю с лаймом и мятой, мусс с чаем тимьян, миндальный бисквит",
    accent: "#f0c6d8",
    emoji: "🫐",
    image: "/fillings/filling-7.webp",
  },
  {
    name: "Фисташка-малина",
    description:
      "Конфитюр из малины, фисташковый мусс, хрустящий слой с фисташкой, миндальный бисквит",
    accent: "#d6e6c4",
    emoji: "🌿",
    image: "/fillings/filling-8.png",
  },
  {
    name: "Виски-яблоко",
    description:
      "Яблочное конфи с виски, карамельный мусс с орехами, бисквит с корицей",
    accent: "#e5d4b0",
    emoji: "🍏",
    image: "/fillings/filling-9.jpeg",
  },
] as const;

export const WEIGHTS = {
  cakes: [
    { label: "0.5 кг", price: 75 },
    { label: "0.7 кг", price: 105 },
    { label: "1 кг", price: 150 },
    { label: "1.5 кг", price: 225 },
    { label: "2 кг", price: 280 },
    { label: "2.5 кг", price: 355 },
    { label: "2-ярусный", price: 300 },
    { label: "3-ярусный", price: 380 },
  ],
  pastries: [
    { label: "Пирожное", price: 15 },
  ],
} as const;

export const BOXES = [
  "Белый картон (маленький / средний / большой)",
  "Золотой картон (0.5 кг)",
  "Большая прозрачная (от 2.5 кг)",
] as const;

export const COATINGS = ["Велюр", "Глянец"] as const;

export const CAKE_COLORS = [
  { name: "Белый", hex: "#FFFFFF" },
  { name: "Чёрный", hex: "#1a1a1a" },
  { name: "Нежно-розовый", hex: "#F8BBD0" },
  { name: "Ярко-розовый", hex: "#EC407A" },
  { name: "Красный", hex: "#E53935" },
  { name: "Оранжевый", hex: "#FF7043" },
  { name: "Жёлтый", hex: "#FDD835" },
  { name: "Зелёный", hex: "#66BB6A" },
  { name: "Голубой", hex: "#42A5F5" },
  { name: "Синий", hex: "#5C6BC0" },
  { name: "Фиолетовый", hex: "#AB47BC" },
  { name: "Лаймовый", hex: "#CDDC39" },
  { name: "Хаки", hex: "#8D6E63" },
  { name: "Бордовый", hex: "#880E4F" },
] as const;

export const DECORATIONS = [
  "Рисунок по договорённости",
  "Надпись",
  "Украшение топперами",
  "Украшение ягодами и цветами",
] as const;

export const REVIEWS = [
  {
    name: "Анна М.",
    text: "Заказывала торт на день рождения мужа — все гости были в восторге! Лёгкий, нежный, совсем не приторный. Juliia — настоящий мастер своего дела.",
    rating: 5,
  },
  {
    name: "Мария К.",
    text: "Торт «Сливочная груша» — это что-то невероятное. Никогда не думала, что десерт может быть таким изысканным и при этом не перегружать сладостью.",
    rating: 5,
  },
  {
    name: "Дмитрий С.",
    text: "Заказывали свадебный торт — получился произведением искусства. Вкус и оформление на высшем уровне. Рекомендую всем!",
    rating: 5,
  },
  {
    name: "Елена В.",
    text: "Уже третий раз заказываю у Juliia. Каждый торт — новый вкусовой опыт. Особенно люблю Апероль — невероятное сочетание!",
    rating: 5,
  },
] as const;
