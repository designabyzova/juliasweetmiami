const SITE_URL = "https://yuliia-sweet.vercel.app";

export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_URL}/#business`,
    name: "Juliia Sweet",
    description:
      "Premium European mousse desserts with minimal sugar by pastry chef Juliia Sweet in Miami. Custom cakes for birthdays, weddings, and celebrations.",
    url: SITE_URL,
    telephone: "+17862001234",
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
      "https://instagram.com/juliiasweet",
      "https://t.me/juliiasweet",
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
      name: "Juliia Sweet",
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
    </>
  );
}
