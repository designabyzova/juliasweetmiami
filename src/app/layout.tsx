import type { Metadata } from "next";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import ProgressBar from "@/components/ProgressBar";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const SITE_URL = "https://sweetbalancemiami.com";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Sweet Balance Miami — Artisan Mousse Cakes & Custom Desserts",
    template: "%s | Sweet Balance Miami",
  },
  description:
    "Sweet Balance Miami — handcrafted European mousse cakes. Less sugar, elegant design, unforgettable taste. Custom bento cakes, celebration cakes & pastries for every special moment. | Sweet Balance Miami — авторские муссовые торты европейского уровня. Минимум сахара, изысканный дизайн, незабываемый вкус. Бенто-торты и праздничные десерты для особенных моментов.",
  keywords: [
    "custom cakes Miami",
    "mousse desserts Miami",
    "premium cakes Miami",
    "pastry chef Miami",
    "birthday cake Miami",
    "wedding cake Miami",
    "bento cake Miami",
    "low sugar desserts",
    "European mousse cake",
    "торты на заказ Майами",
    "муссовые десерты",
    "кондитер Майами",
    "торт на день рождения Майами",
    "свадебный торт Майами",
    "Sweet Balance Miami",
    "SweetBalanceMiami",
  ],
  authors: [{ name: "Sweet Balance Miami" }],
  creator: "Sweet Balance Miami",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: SITE_URL,
    siteName: "Sweet Balance Miami",
    title: "Artisan Mousse Cakes & Desserts in Miami",
    description:
      "Handcrafted European mousse cakes in Miami. Less sugar, elegant design, unforgettable taste. Custom bento cakes & celebration desserts for every special moment.",
    images: [
      {
        url: "/og-sweet-balance.jpg",
        width: 1200,
        height: 630,
        alt: "Sweet Balance Miami — Artisan mousse heart cake on marble table with ocean view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisan Mousse Cakes & Desserts in Miami",
    description:
      "Handcrafted European mousse cakes in Miami. Less sugar, elegant design, unforgettable taste. Custom cakes & desserts for every special moment.",
    images: ["/og-sweet-balance.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      ru: SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`${playfair.variable} ${lato.variable} ${cormorant.variable} antialiased`}>
        <LanguageProvider>
          <ProgressBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
