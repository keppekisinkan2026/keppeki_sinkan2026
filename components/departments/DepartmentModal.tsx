"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { withBasePath } from "@/lib/withBasePath";
import { type DepartmentConfig } from "@/app/maintenance/departments/content";
import { pastCardFrameSources } from "@/components/maintenance/past/pastShared";

type DepartmentModalProps = {
  department: DepartmentConfig | null;
  onClose: () => void;
};

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!department) {
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
  }, [department, onClose]);

  useGSAP(
    () => {
      if (!department || !rootRef.current) {
        return;
      }

      const reduceMotion = prefersReducedMotion();
      const overlay = rootRef.current.querySelector<HTMLElement>(".js-dept-modal-overlay");
      const panel = rootRef.current.querySelector<HTMLElement>(".js-dept-modal-panel");
      const frames = gsap.utils.toArray<HTMLElement>(".js-dept-modal-frame", rootRef.current);
      const content = rootRef.current.querySelector<HTMLElement>(".js-dept-modal-content");

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
    { dependencies: [department], scope: rootRef, revertOnUpdate: true },
  );

  if (!department || !isMounted) {
    return null;
  }

  return createPortal(
    <div ref={rootRef} className="wf-dept-modal-root">
      <button
        type="button"
        className="js-dept-modal-overlay wf-dept-modal-overlay"
        onClick={onClose}
        aria-label="モーダルを閉じる"
      />

      <button type="button" className="wf-dept-modal-close wf-maki-title" onClick={onClose} aria-label="閉じる">
        ×
      </button>

      <div className="js-dept-modal-panel wf-dept-modal-panel" role="dialog" aria-modal="true" aria-labelledby="wf-dept-modal-title">
        <div className="wf-dept-modal-stage">
          <div className="wf-dept-modal-frames" aria-hidden>
            {pastCardFrameSources.map((frameSrc) => (
              <Image
                key={`${department.name}-${frameSrc}`}
                src={withBasePath(frameSrc)}
                alt=""
                fill
                quality={100}
                unoptimized
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 40px), 1040px"
                className="js-dept-modal-frame wf-dept-modal-image"
              />
            ))}
          </div>

          <div className="js-dept-modal-content wf-dept-modal-content">
            <h2 id="wf-dept-modal-title" className="wf-dept-modal-title wf-maki-title">
              {department.name}
            </h2>
            <div className="wf-dept-modal-text">{department.description}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
