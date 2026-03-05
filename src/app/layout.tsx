import type { Metadata } from "next";
import { Unbounded, DM_Sans } from "next/font/google";
import ProgressBar from "@/components/ProgressBar";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juliia Sweet — Премиальные торты в Майами",
  description:
    "Авторские европейские муссовые десерты с минимальным содержанием сахара. Кондитер Juliia Sweet в Майами.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${dmSans.variable} antialiased`}>
        <LanguageProvider>
          <ProgressBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
