"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlowStep } from "@/components/maintenance/flow/FlowStep";
import { flowFrameSources, flowPhotos, flowSteps, getFlowTriggerStart } from "@/components/maintenance/flow/flowData";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FlowWireframePage() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();
      const steps = gsap.utils.toArray<HTMLElement>(".js-flow-step", rootRef.current);
      const refresh = () => ScrollTrigger.refresh();

      steps.forEach((step, index) => {
        const frames = gsap.utils.toArray<HTMLElement>(".js-flow-frame", step);
        const visual = step.querySelector<HTMLElement>(".js-flow-step-visual");
        const content = step.querySelector<HTMLElement>(".js-flow-step-content");
        const ownArrow = step.querySelector<HTMLElement>(".js-flow-arrow");
        const ownArrowPaths = gsap.utils.toArray<SVGPathElement>(".js-flow-arrow-path", step);

        if (frames.length === 0 || !content || !visual) {
          return;
        }

        hideFlipbookFrames(frames);
        gsap.set(visual, { autoAlpha: 0, y: 30 });
        gsap.set(content, { autoAlpha: 0, y: 22 });
        if (ownArrow) {
          gsap.set(ownArrow, { autoAlpha: 0 });
        }

        ownArrowPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        });

        if (reduceMotion) {
          gsap.set(visual, { autoAlpha: 1, y: 0 });
          showLastFlipbookFrame(frames);
          gsap.set(content, { autoAlpha: 1, y: 0 });
          if (ownArrow) {
            gsap.set(ownArrow, { autoAlpha: 1 });
          }
          gsap.set(ownArrowPaths, { strokeDashoffset: 0 });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: getFlowTriggerStart(index),
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        const flipbookStart = 0.04;
        const flipbookStagger = 0.16;
        const flipbookDuration = 0.03;
        const flipbookEnd =
          flipbookStart + flipbookStagger * Math.max(0, frames.length - 1) + flipbookDuration;

        timeline.to(
          visual,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
          },
          0,
        );

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
            duration: 0.52,
            ease: "power2.out",
          },
          flipbookEnd + 0.08,
        );

        if (index < steps.length - 1 && ownArrow && ownArrowPaths.length > 0) {
          timeline.set(ownArrow, { autoAlpha: 1 }, ">");
          timeline.to(
            ownArrowPaths,
            {
              strokeDashoffset: 0,
              duration: 0.82,
              ease: "power1.out",
              stagger: 0.05,
            },
            ">",
          );
        }
      });

      window.addEventListener("load", refresh);
      requestAnimationFrame(refresh);

      return () => {
        window.removeEventListener("load", refresh);
      };
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      frameClassName="wf-frame--flow"
      innerClassName="wf-frame-inner--flow"
    >
      <section className="wf-flow-page">
        <header className="wf-flow-page-header">
          <h1 className="wf-flow-page-title wf-maki-title">公演ができるまで</h1>
        </header>

        <div className="wf-flow-photo-layer" aria-hidden>
          {flowPhotos.map((photo) => (
            <figure
              key={photo.id}
              className="wf-flow-floating-photo"
              style={{
                position: "absolute",
                top: photo.top,
                left: photo.left,
                transform: `rotate(${photo.rotation}deg)`,
                width: photo.width,
                zIndex: 1,
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
                  sizes="(max-width: 700px) 34vw, 220px"
                  className="wf-dept-photo-image"
                />
              </div>
            </figure>
          ))}
        </div>

        <div className="wf-flow-step-list">
          {flowSteps.map((step, index) => (
            <FlowStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === flowSteps.length - 1}
              frameSources={flowFrameSources}
            />
          ))}
        </div>
      </section>
    </WireframeShell>
  );
}
