import { usePlausible } from "next-plausible";

// Define event types for type safety
export type AnalyticsEvent =
  | "CTA_Primary_Click"
  | "CTA_Secondary_Click"
  | "Blog_Article_Click"
  | "Pricing_Details_Toggle"
  | "Navigation_Click"
  | "Scroll_Depth"
  | "Page_View_Duration";

// Analytics hook for tracking events
export function useAnalytics() {
  const plausible = usePlausible();

  const trackEvent = (
    eventName: AnalyticsEvent,
    props?: Record<string, string | number>
  ) => {
    try {
      plausible(eventName, { props });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  // Specific tracking functions for key KPIs
  const trackPrimaryCTA = (location: string) => {
    trackEvent("CTA_Primary_Click", {
      location,
      timestamp: new Date().toISOString(),
    });
  };

  const trackSecondaryCTA = (action: string, location: string) => {
    trackEvent("CTA_Secondary_Click", {
      action,
      location,
      timestamp: new Date().toISOString(),
    });
  };

  const trackBlogClick = (articleTitle: string, position: number) => {
    trackEvent("Blog_Article_Click", {
      article_title: articleTitle,
      position,
      timestamp: new Date().toISOString(),
    });
  };

  const trackScrollDepth = (depth: number, maxDepth: number) => {
    const percentage = Math.round((depth / maxDepth) * 100);

    // Track at key milestones
    if (percentage >= 25 && percentage < 50) {
      trackEvent("Scroll_Depth", { depth: "25%", pixel_depth: depth });
    } else if (percentage >= 50 && percentage < 75) {
      trackEvent("Scroll_Depth", { depth: "50%", pixel_depth: depth });
    } else if (percentage >= 75 && percentage < 90) {
      trackEvent("Scroll_Depth", { depth: "75%", pixel_depth: depth });
    } else if (percentage >= 90) {
      trackEvent("Scroll_Depth", { depth: "90%+", pixel_depth: depth });
    }
  };

  const trackPricingToggle = (action: "show" | "hide") => {
    trackEvent("Pricing_Details_Toggle", {
      action,
      timestamp: new Date().toISOString(),
    });
  };

  const trackNavigation = (section: string, method: "click" | "scroll") => {
    trackEvent("Navigation_Click", {
      section,
      method,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackEvent,
    trackPrimaryCTA,
    trackSecondaryCTA,
    trackBlogClick,
    trackScrollDepth,
    trackPricingToggle,
    trackNavigation,
  };
}
