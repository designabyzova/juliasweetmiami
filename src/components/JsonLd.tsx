import { FAQ_ITEMS } from "@/lib/constants";

const SITE_URL = "https://www.sweetbalancemiami.com";

export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_URL}/#business`,
    name: "Sweet Balance",
    description:
      "Luxurious European mousse desserts with minimal sugar by pastry chef Juliia Sweet in Miami. Custom cakes for birthdays, weddings, and celebrations.",
    url: SITE_URL,
    telephone: "+13054815910",
    image: `${SITE_URL}/hero-juliia.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.7617,
      longitude: -80.1918,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    priceRange: "$75\u2013$380",
    currenciesAccepted: "USD",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "150",
    },
    sameAs: [
      "https://www.instagram.com/julia_sweet_miami?igsh=MWV2ZjZ4NnNjZnhqMg==",
      "https://t.me/imjasestra",
      "https://wa.me/13054815910",
    ],
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom Mousse Cake",
    description:
      "Premium European mousse cake with minimal sugar. Available in 10 signature flavors including Creamy Pear, Cherry in Chocolate, Aperol, and Pistachio-Raspberry.",
    brand: {
      "@type": "Brand",
      name: "Sweet Balance",
    },
    image: `${SITE_URL}/hero-juliia.webp`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "75",
      highPrice: "380",
      offerCount: "10",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "150",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.en,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
