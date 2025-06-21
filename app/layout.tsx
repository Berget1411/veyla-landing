import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Provider } from "@/components/provider";
import PlausibleProvider from "next-plausible";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Veyla - Bouppteckning digitalt för 1999kr",
    template: "%s | Veyla",
  },
  description:
    "Trygg, transparent och kostnadseffektiv bouppteckning med AI-guidning. 10% av traditionell kostnad.",
  generator: "Next.js",
  applicationName: "Veyla",
  referrer: "origin-when-cross-origin",
  keywords: [
    "bouppteckning",
    "digitalt",
    "AI-jurist",
    "Skatteverket",
    "dödsbo",
  ],
  authors: [{ name: "Veyla", url: "https://veyla.nu" }],
  creator: "Veyla",
  publisher: "Veyla",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Legal Services",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />
        <meta name='theme-color' content='#0ea47a' />
        <meta name='color-scheme' content='light' />
        <link rel='canonical' href='https://veyla.nu' />
        <link rel='alternate' hrefLang='sv' href='https://veyla.nu' />
        <link rel='alternate' hrefLang='en' href='https://veyla.nu/en' />
        <link rel='alternate' hrefLang='x-default' href='https://veyla.nu' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlausibleProvider domain='veyla-landing.vercel.app'>
          <NextIntlClientProvider messages={messages}>
            <Provider>{children}</Provider>
          </NextIntlClientProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
