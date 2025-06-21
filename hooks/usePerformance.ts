"use client";

import { useEffect, useCallback } from "react";

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function usePerformance() {
  const trackMetric = useCallback(
    (name: string, value: number, rating?: string) => {
      // Send to analytics
      try {
        if (typeof window !== "undefined" && "plausible" in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).plausible("Performance Metric", {
            props: {
              metric_name: name,
              metric_value: Math.round(value),
              metric_rating: rating || "unknown",
            },
          });
        }
      } catch {
        // Silently fail
      }

      // Log in development
      if (process.env.NODE_ENV === "development") {
        console.log(`Performance Metric: ${name}`, {
          value: Math.round(value),
          rating,
        });
      }
    },
    []
  );

  const measurePageLoad = useCallback(() => {
    if (typeof window === "undefined" || !("performance" in window)) {
      return;
    }

    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (!navigation) return;

    const metrics: PerformanceMetrics = {
      ttfb: navigation.responseStart - navigation.fetchStart,
      fcp: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      lcp: navigation.loadEventEnd - navigation.fetchStart,
    };

    // Track each metric
    Object.entries(metrics).forEach(([name, value]) => {
      if (value && value > 0) {
        let rating = "good";

        // Basic rating thresholds
        switch (name) {
          case "fcp":
            rating =
              value <= 1800
                ? "good"
                : value <= 3000
                ? "needs-improvement"
                : "poor";
            break;
          case "lcp":
            rating =
              value <= 2500
                ? "good"
                : value <= 4000
                ? "needs-improvement"
                : "poor";
            break;
          case "ttfb":
            rating =
              value <= 800
                ? "good"
                : value <= 1800
                ? "needs-improvement"
                : "poor";
            break;
        }

        trackMetric(name.toUpperCase(), value, rating);
      }
    });
  }, [trackMetric]);

  const measureResourceTiming = useCallback(() => {
    if (typeof window === "undefined" || !("performance" in window)) {
      return;
    }

    // Measure resource loading times
    const resources = performance.getEntriesByType("resource");
    const imageResources = resources.filter(
      (resource) =>
        resource.name.includes(".jpg") ||
        resource.name.includes(".png") ||
        resource.name.includes(".webp") ||
        resource.name.includes(".svg")
    );

    if (imageResources.length > 0) {
      const avgImageLoadTime =
        imageResources.reduce((sum, resource) => sum + resource.duration, 0) /
        imageResources.length;

      trackMetric("AVG_IMAGE_LOAD", avgImageLoadTime);
    }

    // Measure font loading
    const fontResources = resources.filter(
      (resource) =>
        resource.name.includes("font") || resource.name.includes(".woff")
    );

    if (fontResources.length > 0) {
      const avgFontLoadTime =
        fontResources.reduce((sum, resource) => sum + resource.duration, 0) /
        fontResources.length;

      trackMetric("AVG_FONT_LOAD", avgFontLoadTime);
    }
  }, [trackMetric]);

  useEffect(() => {
    // Measure performance on page load
    if (document.readyState === "complete") {
      measurePageLoad();
      measureResourceTiming();
    } else {
      window.addEventListener("load", () => {
        // Small delay to ensure all metrics are available
        setTimeout(() => {
          measurePageLoad();
          measureResourceTiming();
        }, 100);
      });
    }

    // Cleanup
    return () => {
      // No cleanup needed for one-time measurements
    };
  }, [measurePageLoad, measureResourceTiming]);

  return {
    trackMetric,
    measurePageLoad,
    measureResourceTiming,
  };
}
