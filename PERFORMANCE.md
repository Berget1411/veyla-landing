# Performance Optimization Guide

Detta dokument beskriver de prestanda-optimeringar som implementerats för att förbättra Core Web Vitals och användarupplevelsen på Veyla landing page.

## Implementerade Optimeringar

### 1. Next.js Konfiguration (`next.config.ts`)

#### Image Optimization

- **WebP/AVIF format**: Automatisk konvertering till moderna bildformat
- **Cache TTL**: 60 sekunder minimum cache för bilder
- **SVG säkerhet**: Säker hantering av SVG-filer med CSP

#### Bundle Optimization

- **Package optimization**: Optimering av stora paket som Lucide React, Framer Motion
- **CSS optimization**: Experimentell CSS-optimering aktiverad
- **Compression**: Gzip/Brotli komprimering aktiverad

#### Security Headers

- **X-Frame-Options**: Förhindrar clickjacking
- **X-Content-Type-Options**: Förhindrar MIME-sniffing
- **Referrer-Policy**: Kontrollerad referrer-information
- **Cache-Control**: Långvarig cache för statiska resurser

### 2. Font Optimization

#### Preloading Strategy

- **Font preconnect**: Tidiga DNS/TCP-anslutningar till Google Fonts
- **Font display**: `swap` för snabb textvisning
- **Critical fonts**: Roboto laddas prioriterat

#### Implementation

```tsx
// I layout.tsx
<link rel='preconnect' href='https://fonts.googleapis.com' />
<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
<link
  href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
  rel='stylesheet'
/>
```

### 3. Image Optimization

#### OptimizedImage Component

- **Progressive loading**: Blur-to-sharp övergång
- **Error handling**: Fallback för trasiga bilder
- **Responsive sizes**: Automatisk storleksanpassning
- **Quality control**: Anpassningsbar bildkvalitet

#### Features

- Lazy loading som standard
- Priority loading för kritiska bilder
- WebP/AVIF format support
- Blur placeholder under laddning

#### Usage

```tsx
<OptimizedImage
  src='/images/innovation.png'
  alt='KTH Innovation'
  width={600}
  height={600}
  priority={false}
  quality={90}
  sizes='(max-width: 768px) 100vw, 600px'
/>
```

### 4. Performance Monitoring

#### WebVitals Component (`components/performance/WebVitals.tsx`)

- **Performance Observer**: Nativ prestanda-mätning
- **Entry Types**: Navigation, Paint, LCP mätningar
- **Analytics Integration**: Automatisk rapportering till Plausible
- **Development Logging**: Console logging för debugging

#### Tracked Metrics

- **Navigation timing**: Sidladdningstider
- **Paint timing**: First Paint, First Contentful Paint
- **Largest Contentful Paint**: LCP mätningar

#### usePerformance Hook (`hooks/usePerformance.ts`)

- **Core Web Vitals**: FCP, LCP, FID, CLS, TTFB
- **Resource Timing**: Bild- och font-laddningstider
- **Rating System**: Good/Needs Improvement/Poor klassificering
- **Analytics Integration**: Automatisk spårning till Plausible

### 5. Resource Preloading

#### Critical Resources

```tsx
{/* Preload critical resources */}
<link rel='preload' href='/images/innovation.png' as='image' />
<link rel='dns-prefetch' href='https://plausible.io' />
```

#### Benefits

- **Faster loading**: Kritiska resurser laddas tidigare
- **DNS prefetch**: Snabbare anslutningar till externa tjänster
- **Reduced TTFB**: Kortare tid till första byte

## Core Web Vitals Targets

### Largest Contentful Paint (LCP)

- **Target**: < 2.5s
- **Optimizations**: Image optimization, preloading, font optimization

### First Input Delay (FID)

- **Target**: < 100ms
- **Optimizations**: Code splitting, lazy loading, performance monitoring

### Cumulative Layout Shift (CLS)

- **Target**: < 0.1
- **Optimizations**: Fixed image dimensions, font display swap

### First Contentful Paint (FCP)

- **Target**: < 1.8s
- **Optimizations**: Font preloading, critical CSS, resource hints

## Analytics & Monitoring

### Performance Events

Alla prestanda-mätvärden skickas automatiskt till Plausible:

```typescript
// Exempel på events som trackas
plausible("Performance Metric", {
  props: {
    metric_name: "LCP",
    metric_value: 1250,
    metric_rating: "good",
  },
});
```

### Development Monitoring

I utvecklingsläge loggas alla mätvärden till console:

```typescript
console.log("Performance Metric: LCP", {
  value: 1250,
  rating: "good",
});
```

## Best Practices

### 1. Image Guidelines

- Använd `OptimizedImage` för alla bilder
- Sätt `priority={true}` för above-the-fold bilder
- Använd korrekta `sizes` attribut
- Optimera bildkvalitet (85-90% för de flesta fall)

### 2. Font Loading

- Preload kritiska fonts
- Använd `font-display: swap`
- Minimera antal font-varianter

### 3. Bundle Optimization

- Använd dynamic imports för stora komponenter
- Optimera package imports i next.config.ts
- Övervaka bundle size regelbundet

### 4. Performance Monitoring

- `WebVitals` komponenten laddas automatiskt
- `usePerformance` hook för custom mätningar
- Regelbunden granskning av Plausible data

## Verktyg för Prestanda-testning

### Rekommenderade verktyg:

1. **Lighthouse**: Chrome DevTools eller web.dev/measure
2. **PageSpeed Insights**: Google's officiella verktyg
3. **WebPageTest**: Detaljerad prestanda-analys
4. **Core Web Vitals Extension**: Real-time mätningar

### Testning:

```bash
# Bygg och analysera bundle
npm run build
npm run analyze  # Om ANALYZE=true är satt

# Lokal prestanda-testning
npm run dev
# Öppna Chrome DevTools > Lighthouse
```

## Framtida Förbättringar

### Planerade optimeringar:

1. **Service Worker**: Offline support och caching
2. **Critical CSS**: Inline kritisk CSS
3. **Brotli Compression**: Förbättrad komprimering
4. **Image CDN**: Cloudinary eller liknande
5. **Progressive Web App**: PWA funktionalitet

### Övervakning:

- Månadsvis granskning av Core Web Vitals
- A/B testning av prestanda-förbättringar
- Kontinuerlig optimering baserat på analytics data
