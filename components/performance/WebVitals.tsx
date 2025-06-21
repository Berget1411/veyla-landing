"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";

// Extend Window interface for Plausible
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number> }
    ) => void;
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only report in production and for important metrics
    if (process.env.NODE_ENV === "production") {
      // Report to analytics service (Plausible in this case)
      if (typeof window !== "undefined" && window.plausible) {
        window.plausible("Web Vitals", {
          props: {
            metric_name: metric.name,
            metric_value: Math.round(metric.value),
            metric_rating: metric.rating,
          },
        });
      }

      // Log critical performance issues
      if (metric.rating === "poor") {
        console.warn(`Poor ${metric.name} score:`, metric.value);
      }
    }
  });

  // Performance optimizations for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Preload critical resources
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = "/images/innovation.png";
      link.as = "image";
      document.head.appendChild(link);

      // Enable performance monitoring
      if ("performance" in window && "measure" in window.performance) {
        window.performance.mark("app-start");
      }
    }
  }, []);

  return null;
}
