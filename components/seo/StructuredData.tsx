export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veyla",
    description: "Digitala bouppteckningar med AI-guidning",
    url: "https://veyla.nu",
    logo: "https://veyla.nu/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+46-8-123456",
      contactType: "customer service",
      email: "support@veyla.se",
      availableLanguage: ["Swedish", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressLocality: "Stockholm",
    },
    sameAs: ["https://www.linkedin.com/company/veyla"],
    foundingDate: "2024",
    founder: {
      "@type": "Organization",
      name: "KTH Innovation",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Veyla Bouppteckning",
    description: "Digital bouppteckning med AI-guidning för 1999kr",
    provider: {
      "@type": "Organization",
      name: "Veyla",
    },
    areaServed: {
      "@type": "Country",
      name: "Sweden",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bouppteckningsservice",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Komplett bouppteckning",
            description: "AI-guidning genom hela bouppteckningsprocessen",
          },
          price: "1999",
          priceCurrency: "SEK",
          priceValidUntil: "2025-12-31",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Vad kostar en bouppteckning med Veyla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Veyla erbjuder komplett bouppteckning för 1999 kr för hela familjen. Detta är cirka 10% av vad traditionell juridisk hjälp kostar.",
        },
      },
      {
        "@type": "Question",
        name: "Hur fungerar AI-juristen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vår AI-jurist analyserar ditt specifika ärende och ger personliga råd baserat på din situation. Den guidar dig genom hela processen från start till mål.",
        },
      },
      {
        "@type": "Question",
        name: "Är det säkert att använda Veyla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, vi använder end-to-end kryptering, svenska servrar och GDPR-kompatibel hantering. BankID-inloggning är under utveckling.",
        },
      },
      {
        "@type": "Question",
        name: "Hur lång tid tar processen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Processen är uppdelad i tre enkla steg: Svara på frågor, få skräddarsydda rekommendationer, och signera & skicka in till Skatteverket.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://veyla.nu",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bouppteckning",
        item: "https://veyla.nu#pricing",
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
