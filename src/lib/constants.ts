export const NAV_ITEMS = [
  { label: { ru: "Обо мне", en: "About" }, href: "#about" },
  { label: { ru: "Начинки", en: "Fillings" }, href: "#flavors" },
  { label: { ru: "Галерея", en: "Gallery" }, href: "#portfolio" },
  { label: { ru: "Отзывы", en: "Reviews" }, href: "#reviews" },
  { label: { ru: "Заказать", en: "Order" }, href: "#order" },
  { label: { ru: "Контакты", en: "Contact" }, href: "#contact" },
] as const;

export const FLAVORS = [
  {
    name: { ru: "Сливочная груша", en: "Creamy Pear" },
    description: {
      ru: "Центр из груши, ванили и лимона, брауни с тёмным шоколадом, слой солёной карамели, мусс на основе маскарпоне",
      en: "Pear, vanilla & lemon center, dark chocolate brownie, salted caramel layer, mascarpone mousse",
    },
    accent: "#f5e6c8",
    emoji: "🍐",
    image: "/fillings/filling-0.webp",
  },
  {
    name: { ru: "Вишня в шоколаде", en: "Cherry in Chocolate" },
    description: {
      ru: "Вишнёвое конфи, мусс на молочном шоколаде, брауни",
      en: "Cherry confit, milk chocolate mousse, brownie",
    },
    accent: "#f5c6c6",
    emoji: "🍒",
    image: "/fillings/filling-1.webp",
  },
  {
    name: { ru: "Шоколадный мандарин", en: "Chocolate Mandarin" },
    description: {
      ru: "Начинка из мандарина, кремю из маракуйи, мусс на тёмном бельгийском шоколаде, брауни",
      en: "Mandarin filling, passion fruit crémeux, dark Belgian chocolate mousse, brownie",
    },
    accent: "#f5d5b0",
    emoji: "🍊",
    image: "/fillings/filling-2.webp",
  },
  {
    name: { ru: "Манго-маракуйя-кокос", en: "Mango-Passion Fruit-Coconut" },
    description: {
      ru: "Центр из манго и маракуйи, кокосовый мусс, воздушный миндальный бисквит",
      en: "Mango & passion fruit center, coconut mousse, airy almond sponge",
    },
    accent: "#fceabb",
    emoji: "🥥",
    image: "/fillings/filling-3.webp",
  },
  {
    name: { ru: "Фрэш", en: "Fresh" },
    description: {
      ru: "Конфитюр из клубники, кремю с лаймом и базиликом, мусс с лаймом и чаем Эрл Грей, миндальный бисквит",
      en: "Strawberry confiture, lime & basil crémeux, lime & Earl Grey mousse, almond sponge",
    },
    accent: "#d4f0d4",
    emoji: "🍓",
    image: "/fillings/filling-4.webp",
  },
  {
    name: { ru: "Кофе / Бейлиз / Шоколад", en: "Coffee / Baileys / Chocolate" },
    description: {
      ru: "Брауни, кофейная начинка с ликёром Bailey's, шоколадный мусс",
      en: "Brownie, coffee filling with Baileys liqueur, chocolate mousse",
    },
    accent: "#d4c4b0",
    emoji: "☕",
    image: "/fillings/filling-5.webp",
  },
  {
    name: { ru: "Апероль", en: "Aperol" },
    description: {
      ru: "Начинка апельсин/Апероль, кремю с лаймом и мятой, мусс на белом бельгийском шоколаде с шампанским, миндальный бисквит",
      en: "Orange/Aperol filling, lime & mint crémeux, white Belgian chocolate mousse with champagne, almond sponge",
    },
    accent: "#fdd9b5",
    emoji: "🍹",
    image: "/fillings/filling-6.webp",
  },
  {
    name: { ru: "Малиновый Мохито", en: "Raspberry Mojito" },
    description: {
      ru: "Конфитюр из малины, кремю с лаймом и мятой, мусс с чаем тимьян, миндальный бисквит",
      en: "Raspberry confiture, lime & mint crémeux, thyme tea mousse, almond sponge",
    },
    accent: "#f0c6d8",
    emoji: "🫐",
    image: "/fillings/filling-7.webp",
  },
  {
    name: { ru: "Фисташка-малина", en: "Pistachio-Raspberry" },
    description: {
      ru: "Конфитюр из малины, фисташковый мусс, хрустящий слой с фисташкой, миндальный бисквит",
      en: "Raspberry confiture, pistachio mousse, crunchy pistachio layer, almond sponge",
    },
    accent: "#d6e6c4",
    emoji: "🌿",
    image: "/fillings/filling-8.png",
  },
  {
    name: { ru: "Виски-яблоко", en: "Whiskey-Apple" },
    description: {
      ru: "Яблочное конфи с виски, карамельный мусс с орехами, бисквит с корицей",
      en: "Apple & whiskey confit, caramel mousse with nuts, cinnamon sponge",
    },
    accent: "#e5d4b0",
    emoji: "🍏",
    image: "/fillings/filling-9.jpeg",
  },
] as const;

export const WEIGHTS = {
  cakes: [
    { label: { ru: "0.5 кг", en: "0.5 kg" }, price: 75 },
    { label: { ru: "0.7 кг", en: "0.7 kg" }, price: 105 },
    { label: { ru: "1 кг", en: "1 kg" }, price: 150 },
    { label: { ru: "1.5 кг", en: "1.5 kg" }, price: 225 },
    { label: { ru: "2 кг", en: "2 kg" }, price: 280 },
    { label: { ru: "2.5 кг", en: "2.5 kg" }, price: 355 },
    { label: { ru: "2-ярусный", en: "2-tier" }, price: 300 },
    { label: { ru: "3-ярусный", en: "3-tier" }, price: 380 },
  ],
  pastries: [
    { label: { ru: "Пирожное", en: "Pastry" }, price: 15 },
  ],
} as const;

export const BOXES = [
  { ru: "Белый картон (маленький / средний / большой)", en: "White cardboard (small / medium / large)" },
  { ru: "Золотой картон (0.5 кг)", en: "Gold cardboard (0.5 kg)" },
  { ru: "Большая прозрачная (от 2.5 кг)", en: "Large transparent (from 2.5 kg)" },
] as const;

export const COATINGS = [
  { ru: "Велюр", en: "Velvet" },
  { ru: "Глянец", en: "Glaze" },
] as const;

export const CAKE_COLORS = [
  { name: { ru: "Белый", en: "White" }, hex: "#FFFFFF" },
  { name: { ru: "Чёрный", en: "Black" }, hex: "#1a1a1a" },
  { name: { ru: "Нежно-розовый", en: "Soft Pink" }, hex: "#F8BBD0" },
  { name: { ru: "Ярко-розовый", en: "Hot Pink" }, hex: "#EC407A" },
  { name: { ru: "Красный", en: "Red" }, hex: "#E53935" },
  { name: { ru: "Оранжевый", en: "Orange" }, hex: "#FF7043" },
  { name: { ru: "Жёлтый", en: "Yellow" }, hex: "#FDD835" },
  { name: { ru: "Зелёный", en: "Green" }, hex: "#66BB6A" },
  { name: { ru: "Голубой", en: "Light Blue" }, hex: "#42A5F5" },
  { name: { ru: "Синий", en: "Blue" }, hex: "#5C6BC0" },
  { name: { ru: "Фиолетовый", en: "Purple" }, hex: "#AB47BC" },
  { name: { ru: "Лаймовый", en: "Lime" }, hex: "#CDDC39" },
  { name: { ru: "Хаки", en: "Khaki" }, hex: "#8D6E63" },
  { name: { ru: "Бордовый", en: "Burgundy" }, hex: "#880E4F" },
] as const;

export const DECORATIONS = [
  { ru: "Рисунок по договорённости", en: "Custom drawing (by arrangement)" },
  { ru: "Надпись", en: "Inscription" },
  { ru: "Украшение топперами", en: "Topper decorations" },
  { ru: "Украшение ягодами и цветами", en: "Berry & flower decorations" },
] as const;

export const REVIEWS = [
  {
    name: { ru: "Анна М.", en: "Anna M." },
    text: {
      ru: "Заказывала торт на день рождения мужа — все гости были в восторге! Лёгкий, нежный, совсем не приторный. Juliia — настоящий мастер своего дела.",
      en: "I ordered a cake for my husband's birthday — all the guests were delighted! Light, delicate, and not overly sweet at all. Juliia is a true master of her craft.",
    },
    rating: 5,
  },
  {
    name: { ru: "Мария К.", en: "Maria K." },
    text: {
      ru: "Торт «Сливочная груша» — это что-то невероятное. Никогда не думала, что десерт может быть таким изысканным и при этом не перегружать сладостью.",
      en: "The 'Creamy Pear' cake is something incredible. I never thought a dessert could be so refined while not being overwhelmingly sweet.",
    },
    rating: 5,
  },
  {
    name: { ru: "Дмитрий С.", en: "Dmitry S." },
    text: {
      ru: "Заказывали свадебный торт — получился произведением искусства. Вкус и оформление на высшем уровне. Рекомендую всем!",
      en: "We ordered a wedding cake — it was a true work of art. Taste and design at the highest level. Highly recommend!",
    },
    rating: 5,
  },
  {
    name: { ru: "Елена В.", en: "Elena V." },
    text: {
      ru: "Уже третий раз заказываю у Juliia. Каждый торт — новый вкусовой опыт. Особенно люблю Апероль — невероятное сочетание!",
      en: "This is my third time ordering from Juliia. Every cake is a new taste experience. I especially love the Aperol — an incredible combination!",
    },
    rating: 5,
  },
] as const;
