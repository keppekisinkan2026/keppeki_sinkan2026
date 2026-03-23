"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { withBasePath } from "@/lib/withBasePath";
import { type WelcomeEvent, welcomeEventFrameSources } from "@/app/maintenance/events/content";

type WelcomeEventModalProps = {
  event: WelcomeEvent | null;
  onClose: () => void;
};

export function WelcomeEventModal({ event, onClose }: WelcomeEventModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!event) {
      return;
    }

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
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
  }, [event, onClose]);

  useGSAP(
    () => {
      if (!event || !rootRef.current) {
        return;
      }

      const reduceMotion = prefersReducedMotion();
      const overlay = rootRef.current.querySelector<HTMLElement>(".js-events-modal-overlay");
      const panel = rootRef.current.querySelector<HTMLElement>(".js-events-modal-panel");
      const frames = gsap.utils.toArray<HTMLElement>(".js-events-modal-frame", rootRef.current);
      const content = rootRef.current.querySelector<HTMLElement>(".js-events-modal-content");

      if (!overlay || !panel || frames.length === 0 || !content) {
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
          duration: 0.38,
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
          duration: 0.48,
          ease: "power2.out",
        },
        ">",
      );

      timeline.set(panel, { clearProps: "transform" });
    },
    { dependencies: [event], scope: rootRef, revertOnUpdate: true },
  );

  if (!event || !isMounted) {
    return null;
  }

  const dialogTitleId = `wf-events-modal-title-${event.id}`;

  return createPortal(
    <div ref={rootRef} className="wf-events-modal-root">
      <button
        type="button"
        className="js-events-modal-overlay wf-events-modal-overlay"
        onClick={onClose}
        aria-label="モーダルを閉じる"
      />

      <button type="button" className="wf-events-modal-close wf-maki-title" onClick={onClose} aria-label="閉じる">
        ×
      </button>

      <div className="js-events-modal-panel wf-events-modal-panel" role="dialog" aria-modal="true" aria-labelledby={dialogTitleId}>
        <div className="wf-events-modal-stage">
          <div className="wf-events-modal-frames" aria-hidden>
            {welcomeEventFrameSources.map((frameSrc) => (
              <Image
                key={`${event.id}-${frameSrc}`}
                src={withBasePath(frameSrc)}
                alt=""
                fill
                quality={100}
                unoptimized
                sizes="(max-width: 900px) calc(100vw - 32px), 560px"
                className="js-events-modal-frame wf-events-modal-frame-image"
              />
            ))}
          </div>

          <div className="js-events-modal-content wf-events-modal-content">
            <p className="wf-events-modal-date">{event.date}</p>
            <h2 id={dialogTitleId} className="wf-events-modal-title wf-maki-title">
              {event.title}
            </h2>
            <div className="wf-events-modal-description">{event.description}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
