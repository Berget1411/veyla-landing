"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    // Simple performance monitoring using native Performance API
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor page load performance
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance entries in development
          if (process.env.NODE_ENV === "development") {
            console.log("Performance Entry:", {
              name: entry.name,
              type: entry.entryType,
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }

          // Send to analytics if available
          try {
            if ("plausible" in window) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).plausible("Performance Entry", {
                props: {
                  entry_type: entry.entryType,
                  entry_name: entry.name,
                  duration: Math.round(entry.duration),
                },
              });
            }
          } catch {
            // Silently fail
          }
        }
      });

      // Observe different types of performance entries
      try {
        observer.observe({
          entryTypes: ["navigation", "paint", "largest-contentful-paint"],
        });
      } catch {
        // Fallback for browsers that don't support all entry types
        try {
          observer.observe({ entryTypes: ["navigation", "paint"] });
        } catch {
          // Silently fail if performance observer is not supported
        }
      }

      // Cleanup observer on unmount
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
