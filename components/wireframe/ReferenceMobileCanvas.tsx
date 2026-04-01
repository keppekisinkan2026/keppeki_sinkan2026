"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { joinClassNames } from "@/lib/joinClassNames";
import { PHONE_MAX_WIDTH, REFERENCE_TABLET_WIDTH, TABLET_MAX_WIDTH } from "@/lib/referenceMobile";
import { useVisualViewportTier } from "@/lib/useVisualViewportTier";

type ReferenceMobileCanvasProps = {
  children: ReactNode;
  referenceWidth: number;
  tabletReferenceWidth?: number;
  phoneMaxWidth?: number;
  tabletMaxWidth?: number;
  wrapperClassName?: string;
  canvasClassName?: string;
};

export function ReferenceMobileCanvas({
  children,
  referenceWidth,
  tabletReferenceWidth = REFERENCE_TABLET_WIDTH,
  phoneMaxWidth = PHONE_MAX_WIDTH,
  tabletMaxWidth = TABLET_MAX_WIDTH,
  wrapperClassName,
  canvasClassName,
}: ReferenceMobileCanvasProps) {
  const viewportTier = useVisualViewportTier(phoneMaxWidth, tabletMaxWidth);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const isCompactLayout = viewportTier !== "desktop";
  const resolvedScale = isCompactLayout ? scale : 1;

  useEffect(() => {
    if (!isCompactLayout || typeof window === "undefined") {
      return;
    }

    const updateScale = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      if (viewportTier === "tablet") {
        const targetWidth = Math.min(viewportWidth, tabletReferenceWidth);
        setScale(targetWidth / referenceWidth);
        return;
      }

      setScale(Math.min(1, viewportWidth / referenceWidth));
    };

    const visualViewport = window.visualViewport;
    const frameId = window.requestAnimationFrame(updateScale);
    visualViewport?.addEventListener("resize", updateScale);
    window.addEventListener("resize", updateScale);

    return () => {
      window.cancelAnimationFrame(frameId);
      visualViewport?.removeEventListener("resize", updateScale);
      window.removeEventListener("resize", updateScale);
    };
  }, [isCompactLayout, viewportTier, referenceWidth, tabletReferenceWidth]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const rootStyle = document.documentElement.style;

    if (!isCompactLayout) {
      rootStyle.removeProperty("--wf-reference-mobile-scale");
      rootStyle.removeProperty("--wf-reference-mobile-width");
      return;
    }

    rootStyle.setProperty("--wf-reference-mobile-scale", String(resolvedScale));
    rootStyle.setProperty("--wf-reference-mobile-width", `${referenceWidth}px`);

    return () => {
      rootStyle.removeProperty("--wf-reference-mobile-scale");
      rootStyle.removeProperty("--wf-reference-mobile-width");
    };
  }, [isCompactLayout, referenceWidth, resolvedScale]);

  useEffect(() => {
    if (!isCompactLayout || !canvasRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const node = canvasRef.current;

    const updateHeight = () => {
      setScaledHeight(node.offsetHeight * scale);
    };

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    const frameId = window.requestAnimationFrame(updateHeight);
    observer.observe(node);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [isCompactLayout, scale]);

  const wrapperStyle = useMemo(
    () => (isCompactLayout && scaledHeight !== null ? { height: `${scaledHeight}px` } : undefined),
    [isCompactLayout, scaledHeight],
  );

  const canvasStyle = useMemo(
    () =>
      isCompactLayout
        ? {
            width: `${referenceWidth}px`,
            transform: `scale(${resolvedScale})`,
            transformOrigin: "top center",
          }
        : undefined,
    [isCompactLayout, referenceWidth, resolvedScale],
  );

  return (
    <div className={joinClassNames("wf-reference-canvas-wrapper", wrapperClassName)} style={wrapperStyle}>
      <div ref={canvasRef} className={joinClassNames("wf-reference-canvas", canvasClassName)} style={canvasStyle}>
        {children}
      </div>
    </div>
  );
}
