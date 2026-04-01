"use client";

import { Fragment, type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { type PastPerformance, pastModalFrameSources, pastModalPosterImageSources } from "./pastShared";
import { PastFrameStack } from "./PastFrameStack";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { wrapTextForMobile } from "@/lib/mobileTextWrap";

type PastModalProps = {
  performance: PastPerformance | null;
  onClose: () => void;
};

function renderPastSynopsis(synopsis: ReactNode, isMobileLayout: boolean) {
  if (!isMobileLayout || typeof synopsis !== "string") {
    return synopsis;
  }

  const paragraphs = wrapTextForMobile(synopsis, 20, 5, true);

  return (
    <div className="wf-past-modal-mobile-body">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`${paragraphIndex}-${paragraph[0] ?? "paragraph"}`} className="wf-past-modal-mobile-paragraph">
          {paragraph.map((line, lineIndex) => (
            <Fragment key={`${paragraphIndex}-${lineIndex}`}>
              <span className="wf-past-modal-mobile-line">{line}</span>
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

export function PastModal({ performance, onClose }: PastModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isMobileLayout = useVisualViewportMobile();

  useEffect(() => {
    if (!performance) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [performance, onClose]);

  useEffect(() => {
    if (!performance || !rootRef.current || isMobileLayout) {
      return;
    }

    const content = rootRef.current.querySelector<HTMLElement>(".js-past-modal-content");
    if (!content) {
      return;
    }

    let scrollTimer: number | null = null;

    const handleScroll = () => {
      content.classList.add("is-scrolling");

      if (scrollTimer !== null) {
        window.clearTimeout(scrollTimer);
      }

      scrollTimer = window.setTimeout(() => {
        content.classList.remove("is-scrolling");
        scrollTimer = null;
      }, 420);
    };

    content.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      content.removeEventListener("scroll", handleScroll);
      if (scrollTimer !== null) {
        window.clearTimeout(scrollTimer);
      }
      content.classList.remove("is-scrolling");
    };
  }, [performance, isMobileLayout]);

  useGSAP(
    () => {
      if (!performance || !rootRef.current) {
        return;
      }

      const reduceMotion = prefersReducedMotion();
      const overlay = rootRef.current.querySelector<HTMLElement>(".js-past-modal-overlay");
      const panel = rootRef.current.querySelector<HTMLElement>(".js-past-modal-panel");
      const frames = gsap.utils.toArray<HTMLElement>(".js-past-modal-frame", rootRef.current);
      const content = rootRef.current.querySelector<HTMLElement>(".js-past-modal-content");

      if (!overlay || !panel || !content) {
        return;
      }

      if (isMobileLayout) {
        gsap.set(content, { autoAlpha: 0, y: 16 });

        if (reduceMotion) {
          gsap.set([overlay, panel], { autoAlpha: 1 });
          gsap.set(content, { autoAlpha: 1, y: 0 });
          return;
        }

        const timeline = gsap.timeline();

        timeline.fromTo(
          overlay,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.18,
            ease: "power1.out",
          },
        );

        timeline.to(
          content,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: "power2.out",
          },
          0.08,
        );

        return;
      }

      if (frames.length === 0) {
        return;
      }

      hideFlipbookFrames(frames);
      gsap.set(content, { autoAlpha: 0, y: 18 });

      if (reduceMotion) {
        gsap.set([overlay, panel], { autoAlpha: 1 });
        showLastFlipbookFrame(frames);
        gsap.set(content, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline();

      timeline.fromTo(
        overlay,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.22,
          ease: "power1.out",
        },
      );

      timeline.fromTo(
        panel,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0,
      );

      appendFlipbookFrames(timeline, frames, {
        startAt: 0.08,
        staggerDelay: 0.14,
        frameDuration: 0.02,
      });

      timeline.to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        ">",
      );

      timeline.set(panel, { clearProps: "transform" });
    },
    { dependencies: [performance, isMobileLayout], scope: rootRef, revertOnUpdate: true },
  );

  if (!performance || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div ref={rootRef} className={`wf-past-modal-root${isMobileLayout ? " wf-past-modal-root--mobile" : ""}`}>
      <button
        type="button"
        className="js-past-modal-overlay wf-past-modal-overlay"
        onClick={onClose}
        aria-label="モーダルを閉じる"
      />

      <button type="button" className="wf-past-modal-close wf-maki-title" onClick={onClose} aria-label="閉じる">
        ×
      </button>

      <div className="js-past-modal-panel wf-past-modal-panel" role="dialog" aria-modal="true">
        <div className="wf-past-modal-stage">
          {!isMobileLayout ? (
            <div className="wf-past-modal-frames" aria-hidden>
              <PastFrameStack
                performanceId={performance.id}
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 40px), 1040px"
                className="js-past-modal-frame wf-past-modal-image"
                frameSources={pastModalFrameSources}
              />
              <PastFrameStack
                performanceId={performance.id}
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 40px), 1040px"
                className="js-past-modal-frame wf-past-modal-poster-image"
                frameSources={[pastModalPosterImageSources[performance.key]]}
              />
            </div>
          ) : null}

          <div className="js-past-modal-content wf-past-modal-content">
            <h2 className="wf-past-modal-title wf-maki-title">{performance.title}</h2>
            <div className="wf-past-modal-text">{renderPastSynopsis(performance.synopsis, isMobileLayout)}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
