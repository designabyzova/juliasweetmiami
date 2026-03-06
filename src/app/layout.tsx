import type { Metadata } from "next";
import { Unbounded, Cormorant_Garamond } from "next/font/google";
import ProgressBar from "@/components/ProgressBar";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const SITE_URL = "https://yuliia-sweet.vercel.app";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      "Sweet Balance — Luxurious Mousse Desserts in Miami | Роскошные муссовые десерты в Майами",
    template: "%s | Sweet Balance",
  },
  description:
    "Sweet Balance — luxurious European mousse desserts with minimal sugar by Juliia Sweet in Miami. European recipes, pure flavor, custom cakes for birthdays, weddings & celebrations. From $75. Роскошные муссовые десерты в Майами — европейские рецепты, минимум сахара, чистый вкус.",
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
    "Sweet Balance",
  ],
  authors: [{ name: "Sweet Balance" }],
  creator: "Sweet Balance",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: SITE_URL,
    siteName: "Sweet Balance",
    title: "Sweet Balance — Luxurious Mousse Desserts in Miami",
    description:
      "Luxurious European mousse desserts with minimal sugar. European recipes, pure flavor. Custom cakes for birthdays, weddings & celebrations. From $75.",
    images: [
      {
        url: "/hero-juliia.webp",
        width: 800,
        height: 1067,
        alt: "Sweet Balance — Luxurious Mousse Desserts in Miami",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Balance — Luxurious Mousse Desserts in Miami",
    description:
      "Sweet Balance — European mousse desserts with minimal sugar. European recipes, pure flavor. Custom cakes from $75.",
    images: ["/hero-juliia.webp"],
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
    <html lang="en">
      <body className={`${unbounded.variable} ${cormorant.variable} antialiased`}>
        <LanguageProvider>
          <ProgressBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
