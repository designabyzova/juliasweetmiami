import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sweet Balance — Luxurious Mousse Desserts in Miami",
    short_name: "Sweet Balance",
    description:
      "Luxurious European mousse desserts with minimal sugar. Custom cakes for birthdays, weddings & celebrations.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F5",
    theme_color: "#D4756A",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
