"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 320;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      frameId = 0;
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`wf-scroll-top-button${isVisible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="ページ上部へ戻る"
    >
      <span className="wf-scroll-top-bubble" aria-hidden>
        <span className="wf-scroll-top-arrow">↑</span>
        <span className="wf-scroll-top-label wf-maki-title">TOP</span>
      </span>
    </button>
  );
}
