# Analytics Implementation - Veyla

## Overview

Veyla använder **Plausible Analytics** för privacy-vänlig webbanalys enligt GDPR. Denna implementation trackar viktiga KPI:er enligt kravspecifikationen.

## KPI:er som trackas

### Primär KPI: CTA-klick

- **Event**: `CTA_Primary_Click`
- **Beskrivning**: Klick på "Starta bouppteckning" knappen
- **Platser**: Hero-sektion, Start Now-sektion, Mobile navbar
- **Properties**: `location` (hero/start_now/navbar)

### Sekundär KPI: Scroll Depth

- **Event**: `Scroll_Depth`
- **Beskrivning**: Mäter hur djupt användare scrollar på sidan
- **Milestones**: 25%, 50%, 75%, 90%+
- **Properties**: `depth` (percentage), `pixel_depth` (absolut position)

### Sekundär KPI: Blogg-klick

- **Event**: `Blog_Article_Click`
- **Beskrivning**: Klick på blogg-artiklar för SEO-trafik
- **Properties**: `article_title`, `position` (1-3)

## Övriga trackade events

### Pricing Interactions

- **Event**: `Pricing_Details_Toggle`
- **Properties**: `action` (show/hide)

### Navigation

- **Event**: `Navigation_Click`
- **Properties**: `section`, `method` (click/scroll)

### Secondary CTAs

- **Event**: `CTA_Secondary_Click`
- **Properties**: `action`, `location`

## Setup

### 1. Plausible Configuration

```tsx
// app/layout.tsx
<PlausibleProvider domain='veyla-landing.vercel.app'>
  {children}
</PlausibleProvider>
```

### 2. Analytics Hook

```tsx
import { useAnalytics } from "@/lib/analytics";

const { trackPrimaryCTA, trackScrollDepth, trackBlogClick } = useAnalytics();
```

### 3. Event Tracking Examples

```tsx
// Primär CTA
onClick={() => trackPrimaryCTA("hero")}

// Blogg-klick
onClick={() => trackBlogClick(post.title, index + 1)}

// Scroll tracking (automatisk)
useScrollTracking() // i Home-komponenten
```

## Privacy & GDPR

### Cookie Banner

- Visas efter 2 sekunder för nya användare
- Sparar användarens val i localStorage
- Förklarar Plausible's privacy-vänliga approach

### Plausible Benefits

- ✅ Ingen personlig data samlas in
- ✅ Inga cookies för spårning
- ✅ GDPR-kompatibel by design
- ✅ Lightweight script (< 1KB)
- ✅ Svenska servrar möjligt

## Dashboard Access

### Plausible Dashboard

- URL: `https://plausible.io/veyla-landing.vercel.app`
- Visa real-time data och historik
- Exportera data för rapporter

### Viktiga Metrics att följa

1. **Conversion Rate**: CTA_Primary_Click / Unique Visitors
2. **Engagement**: Scroll_Depth distribution
3. **Content Performance**: Blog_Article_Click per artikel
4. **User Journey**: Navigation_Click patterns

## Implementation Files

```
lib/
  analytics.ts          # Analytics hook och event definitions
hooks/
  useScrollTracking.ts  # Scroll depth tracking
components/
  ui/cookie-banner.tsx  # GDPR cookie banner
  home/home.tsx         # Event tracking implementation
```

## Future Enhancements

### A/B Testing

- Testa olika CTA-texter
- Optimera placering av knappar
- Testa olika pricing presentations

### Advanced Tracking

- Time on page per sektion
- Heatmap integration (Hotjar/Microsoft Clarity)
- Conversion funnel analysis

### Goals Setup

- Sätt upp mål i Plausible för konverteringar
- E-commerce tracking när betalning implementeras
- Lead generation tracking

## Troubleshooting

### Events visas inte i Plausible

1. Kontrollera att domänen är korrekt konfigurerad
2. Verifiera att Plausible script laddas
3. Kolla browser console för fel

### Cookie Banner visas inte

1. Rensa localStorage: `localStorage.removeItem("veyla-cookie-consent")`
2. Kontrollera att komponenten är mounted

### Scroll tracking fungerar inte

1. Kontrollera att `useScrollTracking()` kallas i Home-komponenten
2. Verifiera att scroll events registreras i browser dev tools
