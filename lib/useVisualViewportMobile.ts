"use client";

import { useEffect, useState } from "react";

export function useVisualViewportMobile(maxWidth = 700) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const update = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      setIsMobile(viewportWidth <= maxWidth);
    };

    update();

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);

    return () => {
      visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, [maxWidth]);

  return isMobile;
}
