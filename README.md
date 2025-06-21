# Veyla Landing Page

En modern, prestanda-optimerad landing page för Veyla's digitala boupptecknings-tjänst. Byggt med Next.js 14, TypeScript, och optimerat för Core Web Vitals.

## Features

- ✅ **SEO-optimerad** med strukturerad data och meta-tags
- ✅ **Analytics tracking** med Plausible för KPI-mätning
- ✅ **Performance monitoring** med Core Web Vitals tracking
- ✅ **Internationalization** (Svenska/Engelska)
- ✅ **Responsive design** med Tailwind CSS
- ✅ **Accessibility** enligt WCAG riktlinjer
- ✅ **GDPR-compliant** cookie hantering

## Performance Optimizations

- **Image optimization**: WebP/AVIF format, lazy loading, blur placeholders
- **Font optimization**: Preloading, font-display swap
- **Bundle optimization**: Code splitting, tree shaking
- **Core Web Vitals**: FCP < 1.8s, LCP < 2.5s, CLS < 0.1

## Getting Started

Installera dependencies:

```bash
npm install
```

Starta development server:

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) för att se sidan.

## Available Scripts

```bash
# Development
npm run dev          # Starta development server med Turbopack
npm run build        # Bygg för production
npm run start        # Starta production server
npm run lint         # Kör ESLint

# Performance & Analytics
npm run analyze      # Analysera bundle size
npm run lighthouse   # Kör Lighthouse performance test
npm run perf         # Bygg och starta för performance testing
```

## Performance Testing

För att testa prestanda:

1. **Lighthouse**: `npm run lighthouse` (kräver att servern körs)
2. **Bundle Analysis**: `npm run analyze`
3. **Web Vitals**: Öppna browser console under development
4. **Plausible**: Performance metrics skickas automatiskt

## Documentation

- [`ANALYTICS.md`](./ANALYTICS.md) - Analytics setup och event tracking
- [`PERFORMANCE.md`](./PERFORMANCE.md) - Prestanda-optimeringar och Core Web Vitals

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
