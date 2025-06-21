import { Home } from "@/components/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veyla - Bouppteckning digitalt för 1999kr | AI-guidning",
  description:
    "Trygg, transparent och kostnadseffektiv bouppteckning med AI-guidning. 10% av traditionell kostnad. Endast 1999kr för hela familjen.",
  keywords: [
    "bouppteckning",
    "digitalt",
    "AI-jurist",
    "Skatteverket",
    "dödsbo",
    "arvskifte",
    "juridisk hjälp",
    "1999kr",
    "transparent pris",
  ],
  authors: [{ name: "Veyla" }],
  creator: "Veyla",
  publisher: "Veyla",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://veyla.nu"),
  alternates: {
    canonical: "/",
    languages: {
      "sv-SE": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://veyla.nu",
    title: "Veyla - Bouppteckning digitalt för 1999kr",
    description:
      "Trygg, transparent och kostnadseffektiv bouppteckning med AI-guidning. 10% av traditionell kostnad.",
    siteName: "Veyla",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veyla - Bouppteckning digitalt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyla - Bouppteckning digitalt för 1999kr",
    description:
      "Trygg, transparent och kostnadseffektiv bouppteckning med AI-guidning. 10% av traditionell kostnad.",
    images: ["/images/og-image.jpg"],
    creator: "@veyla_se",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default Home;
