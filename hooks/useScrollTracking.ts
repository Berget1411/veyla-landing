import { useEffect, useRef } from "react";
import { useAnalytics } from "@/lib/analytics";

export function useScrollTracking() {
  const { trackScrollDepth } = useAnalytics();
  const trackedDepths = useRef(new Set<string>());

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.round((scrollTop / docHeight) * 100);

          // Track major milestones only once
          const milestones = [25, 50, 75, 90];

          milestones.forEach((milestone) => {
            if (
              scrollPercent >= milestone &&
              !trackedDepths.current.has(`${milestone}%`)
            ) {
              trackedDepths.current.add(`${milestone}%`);
              trackScrollDepth(scrollTop, docHeight + window.innerHeight);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [trackScrollDepth]);

  // Reset tracking when component unmounts or page changes
  const resetTracking = () => {
    trackedDepths.current.clear();
  };

  return { resetTracking };
}
