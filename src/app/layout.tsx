import type { Metadata } from "next";
import { Unbounded, Cormorant_Garamond } from "next/font/google";
import ProgressBar from "@/components/ProgressBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const SITE_URL = "https://www.sweetbalancemiami.com";

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
      "Sweet Balance — Luxurious Mousse Desserts in Miami | Custom Cakes from $75",
    template: "%s | Sweet Balance",
  },
  description:
    "Sweet Balance by Juliia Sweet — luxurious European mousse desserts in Miami. Minimal sugar, pure flavor. Custom bento cakes, celebration cakes & pastries for birthdays, weddings & events. From $75.",
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
        url: "/og-sweet-balance.webp",
        width: 1200,
        height: 630,
        alt: "Sweet Balance — Luxurious Mousse Desserts in Miami",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Balance — Luxurious Mousse Desserts in Miami",
    description:
      "Sweet Balance — European mousse desserts with minimal sugar. European recipes, pure flavor. Custom cakes from $75.",
    images: ["/og-sweet-balance.webp"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
        <GoogleAnalytics />
        <LanguageProvider>
          <ProgressBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
