"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlowStep } from "@/components/flow/FlowStep";
import { flowFrameSources, flowPhotos, flowSteps, getFlowPhotoLayout, getFlowTriggerStart } from "@/components/flow/flowData";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { MAINTENANCE_MOBILE_MAX_WIDTH, REFERENCE_PHONE_WIDTH } from "@/lib/referenceMobile";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FlowWireframePage() {
  const rootRef = useRef<HTMLElement>(null);
  const isMobileLayout = useVisualViewportMobile(MAINTENANCE_MOBILE_MAX_WIDTH);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();
      const steps = gsap.utils.toArray<HTMLElement>(".js-flow-step", rootRef.current);
      const refresh = () => ScrollTrigger.refresh();

      steps.forEach((step, index) => {
        const stepData = flowSteps[index];
        const frames = gsap.utils.toArray<HTMLElement>(".js-flow-frame", step);
        const visual = step.querySelector<HTMLElement>(".js-flow-step-visual");
        const content = step.querySelector<HTMLElement>(".js-flow-step-content");
        const ownArrow = step.querySelector<HTMLElement>(".js-flow-arrow");

        if (frames.length === 0 || !content || !visual || !stepData) {
          return;
        }

        hideFlipbookFrames(frames);
        gsap.set(visual, { autoAlpha: 0, y: isMobileLayout ? 20 : 28 });
        gsap.set(content, { autoAlpha: 0, y: isMobileLayout ? 14 : 20 });
        if (ownArrow) {
          gsap.set(ownArrow, {
            autoAlpha: 0,
            "--wf-flow-arrow-anim-y": isMobileLayout ? "-4px" : "-8px",
          });
        }

        if (reduceMotion) {
          gsap.set(visual, { autoAlpha: 1, y: 0 });
          showLastFlipbookFrame(frames);
          gsap.set(content, { autoAlpha: 1, y: 0 });
          if (ownArrow) {
            gsap.set(ownArrow, {
              autoAlpha: 1,
              "--wf-flow-arrow-anim-y": "0px",
            });
          }
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: visual,
            start: getFlowTriggerStart(stepData, isMobileLayout),
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        timeline.to(
          visual,
          {
            autoAlpha: 1,
            y: 0,
            duration: isMobileLayout ? 0.42 : 0.48,
            ease: "power2.out",
          },
          0,
        );

        const flipbookStart = isMobileLayout ? 0.06 : 0.08;
        const flipbookStagger = isMobileLayout ? 0.11 : 0.13;
        const flipbookDuration = isMobileLayout ? 0.03 : 0.035;
        const flipbookEnd =
          flipbookStart + flipbookStagger * Math.max(0, frames.length - 1) + flipbookDuration;

        appendFlipbookFrames(timeline, frames, {
          startAt: flipbookStart,
          staggerDelay: flipbookStagger,
          frameDuration: flipbookDuration,
        });

        timeline.to(
          content,
          {
            autoAlpha: 1,
            y: 0,
            duration: isMobileLayout ? 0.34 : 0.4,
            ease: "power2.out",
          },
          flipbookEnd + 0.04,
        );

        if (index < steps.length - 1 && ownArrow) {
          timeline.to(
            ownArrow,
            {
              autoAlpha: 1,
              "--wf-flow-arrow-anim-y": "0px",
              duration: isMobileLayout ? 0.24 : 0.3,
              ease: "power2.out",
            },
            flipbookEnd + 0.12,
          );
        }
      });

      window.addEventListener("load", refresh);
      requestAnimationFrame(refresh);

      return () => {
        window.removeEventListener("load", refresh);
      };
    },
    { scope: rootRef, dependencies: [isMobileLayout], revertOnUpdate: true },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      frameClassName="wf-frame--flow"
      innerClassName="wf-frame-inner--flow"
      mobileReferenceWidth={REFERENCE_PHONE_WIDTH}
      mobileMaxWidth={MAINTENANCE_MOBILE_MAX_WIDTH}
    >
      <section className={`wf-flow-page${isMobileLayout ? " wf-flow-page--mobile" : ""}`}>
        <header className="wf-flow-page-header">
          <h1 className="wf-flow-page-title wf-maki-title">公演ができるまで</h1>
        </header>

        <div className="wf-flow-photo-layer" aria-hidden>
          {flowPhotos.map((photo) => {
            const photoLayout = getFlowPhotoLayout(photo, isMobileLayout);
            const photoWidth =
              photoLayout.scale && photoLayout.scale !== 1
                ? `calc(${photoLayout.width} * ${photoLayout.scale})`
                : photoLayout.width;
            const photoOffsetX = photoLayout.offsetX ?? "0px";
            const photoOffsetY = photoLayout.offsetY ?? "0px";

            return (
              <figure
                key={photo.id}
                className={`wf-flow-floating-photo wf-flow-floating-photo--${photo.id}`}
                style={{
                  position: "absolute",
                  top: photoLayout.top,
                  left: photoLayout.left,
                  transform: `translate(${photoOffsetX}, ${photoOffsetY}) rotate(${photoLayout.rotation}deg)`,
                  width: photoWidth,
                  zIndex: photoLayout.zIndex ?? 1,
                }}
              >
                <div className="wf-dept-photo-paper">
                  <Image
                    src={withBasePath(photo.src)}
                    alt={photo.alt}
                    width={photo.imageWidth}
                    height={photo.imageHeight}
                    quality={100}
                    unoptimized
                    sizes="(max-width: 700px) 66vw, 220px"
                    className="wf-dept-photo-image"
                  />
                </div>
              </figure>
            );
          })}
        </div>

        <div className="wf-flow-step-list">
          {flowSteps.map((step, index) => (
            <FlowStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === flowSteps.length - 1}
              isMobileLayout={isMobileLayout}
              frameSources={flowFrameSources}
            />
          ))}
        </div>
      </section>
    </WireframeShell>
  );
}
