"use client";

import { useEffect, useState } from "react";
import { PHONE_MAX_WIDTH, TABLET_MAX_WIDTH, type ViewportTier } from "@/lib/referenceMobile";

function getViewportTierFromWidth(
  width: number,
  phoneMaxWidth: number,
  tabletMaxWidth: number,
): ViewportTier {
  if (width <= phoneMaxWidth) {
    return "phone";
  }

  if (width <= tabletMaxWidth) {
    return "tablet";
  }

  return "desktop";
}

export function useVisualViewportTier(
  phoneMaxWidth = PHONE_MAX_WIDTH,
  tabletMaxWidth = TABLET_MAX_WIDTH,
) {
  const [tier, setTier] = useState<ViewportTier>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const update = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      setTier(getViewportTierFromWidth(viewportWidth, phoneMaxWidth, tabletMaxWidth));
    };

    update();

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);

    return () => {
      visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, [phoneMaxWidth, tabletMaxWidth]);

  return tier;
}
