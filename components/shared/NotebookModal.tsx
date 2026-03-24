"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { NotebookFlipbookFrames } from "@/components/shared/NotebookFlipbookFrames";

type NotebookModalProps = {
  modalKey: string;
  title: ReactNode;
  body: ReactNode;
  titleId: string;
  onClose: () => void;
  frameSources: readonly string[];
};

export function NotebookModal({ modalKey, title, body, titleId, onClose, frameSources }: NotebookModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [onClose]);

  useGSAP(
    () => {
      if (!rootRef.current) {
        return;
      }

      const reduceMotion = prefersReducedMotion();
      const overlay = rootRef.current.querySelector<HTMLElement>(".js-notebook-modal-overlay");
      const panel = rootRef.current.querySelector<HTMLElement>(".js-notebook-modal-panel");
      const frames = gsap.utils.toArray<HTMLElement>(".js-notebook-modal-frame", rootRef.current);
      const content = rootRef.current.querySelector<HTMLElement>(".js-notebook-modal-content");

      if (!overlay || !panel || !content || frames.length === 0) {
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
    { dependencies: [modalKey], scope: rootRef, revertOnUpdate: true },
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div ref={rootRef} className="wf-notebook-modal-root">
      <button
        type="button"
        className="js-notebook-modal-overlay wf-notebook-modal-overlay"
        onClick={onClose}
        aria-label="モーダルを閉じる"
      />

      <button type="button" className="wf-notebook-modal-close wf-maki-title" onClick={onClose} aria-label="閉じる">
        ×
      </button>

      <div
        className="js-notebook-modal-panel wf-notebook-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="wf-notebook-modal-stage">
          <NotebookFlipbookFrames
            frameSources={frameSources}
            frameKeyPrefix={modalKey}
            frameLayerClassName="wf-notebook-modal-frames"
            frameClassName="js-notebook-modal-frame wf-notebook-modal-image"
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 40px), 1040px"
          />

          <div className="js-notebook-modal-content wf-notebook-modal-content">
            <h2 id={titleId} className="wf-notebook-modal-title wf-maki-title">
              {title}
            </h2>
            <div className="wf-notebook-modal-text">{body}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
