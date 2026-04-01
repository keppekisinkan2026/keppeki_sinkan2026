"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { joinClassNames } from "@/lib/joinClassNames";

type ReferenceMobileCanvasProps = {
  children: ReactNode;
  referenceWidth: number;
  mobileMaxWidth?: number;
  wrapperClassName?: string;
  canvasClassName?: string;
};

export function ReferenceMobileCanvas({
  children,
  referenceWidth,
  mobileMaxWidth = 700,
  wrapperClassName,
  canvasClassName,
}: ReferenceMobileCanvasProps) {
  const isMobileLayout = useVisualViewportMobile(mobileMaxWidth);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const resolvedScale = isMobileLayout ? scale : 1;

  useEffect(() => {
    if (!isMobileLayout || typeof window === "undefined") {
      return;
    }

    const updateScale = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
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
  }, [isMobileLayout, referenceWidth]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const rootStyle = document.documentElement.style;

    if (!isMobileLayout) {
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
  }, [isMobileLayout, referenceWidth, resolvedScale]);

  useEffect(() => {
    if (!isMobileLayout || !canvasRef.current || typeof ResizeObserver === "undefined") {
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
  }, [isMobileLayout, scale]);

  const wrapperStyle = useMemo(
    () => (isMobileLayout && scaledHeight !== null ? { height: `${scaledHeight}px` } : undefined),
    [isMobileLayout, scaledHeight],
  );

  const canvasStyle = useMemo(
    () =>
      isMobileLayout
        ? {
            width: `${referenceWidth}px`,
            transform: `scale(${resolvedScale})`,
            transformOrigin: "top center",
          }
        : undefined,
    [isMobileLayout, referenceWidth, resolvedScale],
  );

  if (!isMobileLayout) {
    return <>{children}</>;
  }

  return (
    <div className={joinClassNames("wf-reference-canvas-wrapper", wrapperClassName)} style={wrapperStyle}>
      <div ref={canvasRef} className={joinClassNames("wf-reference-canvas", canvasClassName)} style={canvasStyle}>
        {children}
      </div>
    </div>
  );
}
