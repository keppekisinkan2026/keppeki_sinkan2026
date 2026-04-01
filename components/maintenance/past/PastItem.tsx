"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { withBasePath } from "@/lib/withBasePath";
import { MAINTENANCE_MOBILE_MAX_WIDTH } from "@/lib/referenceMobile";
import { type PastPerformance } from "./pastShared";
import { PastGalleryScatter } from "./PastGalleryScatter";
import { PastFrameStack } from "./PastFrameStack";

type PastItemProps = {
  performance: PastPerformance;
  onOpen: () => void;
};

const SHOW_PAST_SCATTER_DEBUG_IDS = false;

const warmedPastImageSources = new Set<string>();

function warmPastImageSources(imageSources: readonly string[]) {
  if (typeof window === "undefined") {
    return;
  }

  imageSources.forEach((imageSource) => {
    const resolvedSource = withBasePath(imageSource);

    if (warmedPastImageSources.has(resolvedSource)) {
      return;
    }

    const image = new window.Image();
    image.decoding = "async";
    image.src = resolvedSource;
    warmedPastImageSources.add(resolvedSource);
  });
}

type ScatterTarget = {
  x: number;
  y: number;
  rotation: number;
};

function getScatterTarget({
  slot,
  cardWidth,
  shellWidth,
  shellHeight,
  scatterLayouts,
}: {
  slot: number;
  cardWidth: number;
  shellWidth: number;
  shellHeight: number;
  scatterLayouts?: PastPerformance["scatterOffsets"];
}): ScatterTarget {
  const gap = Math.max(38, shellWidth * 0.08);

  let target: ScatterTarget = { x: 0, y: 0, rotation: 0 };

  switch (slot) {
    case 0:
      target = {
        x: -(shellWidth * 0.5 + cardWidth * 0.42 + gap),
        y: -(shellHeight * 0.3 + cardWidth * 0.1),
        rotation: -13,
      };
      break;
    case 1:
      target = {
        x: shellWidth * 0.5 + cardWidth * 0.44 + gap,
        y: -(shellHeight * 0.26 + cardWidth * 0.08),
        rotation: 10,
      };
      break;
    case 2:
      target = {
        x: shellWidth * 0.52 + cardWidth * 0.46 + gap,
        y: shellHeight * 0.22 + cardWidth * 0.08,
        rotation: 15,
      };
      break;
    case 3:
      target = {
        x: -(shellWidth * 0.5 + cardWidth * 0.42 + gap),
        y: shellHeight * 0.28 + cardWidth * 0.1,
        rotation: -10,
      };
      break;
    default:
      target = {
        x: 0,
        y: shellHeight * 0.56 + cardWidth * 0.55 + gap * 0.4,
        rotation: 4,
      };
      break;
  }

  const offset = scatterLayouts?.[slot];
  if (!offset) {
    return target;
  }

  return {
    x: target.x + (offset.x || 0),
    y: target.y + (offset.y || 0),
    rotation: target.rotation + (offset.rotation || 0),
  };
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PastItem({ performance, onOpen }: PastItemProps) {
  const rootRef = useRef<HTMLElement>(null);
  const isMobileLayout = useVisualViewportMobile(MAINTENANCE_MOBILE_MAX_WIDTH);
  const imageSourcesToWarm = useMemo(
    () => [performance.posterImageSource, ...performance.galleryImageSources],
    [performance.galleryImageSources, performance.posterImageSource],
  );

  useEffect(() => {
    if (performance.id !== 1) {
      return;
    }

    warmPastImageSources(imageSourcesToWarm);
  }, [imageSourcesToWarm, performance.id]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const reduceMotion = prefersReducedMotion();
      const frames = gsap.utils.toArray<HTMLElement>(".js-past-frame", root);
      const button = root.querySelector<HTMLButtonElement>(".js-past-item-button");
      const content = root.querySelector<HTMLElement>(".js-past-content");
      const mainShell = root.querySelector<HTMLElement>(".js-past-item-main-shell");
      const scatterCards = gsap.utils.toArray<HTMLElement>(".js-past-scatter-card", root);

      if (frames.length === 0 || !button || !content || !mainShell) {
        return;
      }

      const setScatterRestState = () => {
        if (scatterCards.length === 0) {
          return;
        }

        gsap.set(scatterCards, {
          autoAlpha: 0,
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.72,
          transformOrigin: "center center",
        });
      };

      const layoutScatter = (animated: boolean) => {
        if (scatterCards.length === 0) {
          return;
        }

        const shellRect = mainShell.getBoundingClientRect();

        scatterCards.forEach((card, index) => {
          const cardWidth = card.getBoundingClientRect().width || 120;
          const target = getScatterTarget({
            slot: index,
            cardWidth,
            shellWidth: shellRect.width,
            shellHeight: shellRect.height,
            scatterLayouts: isMobileLayout ? performance.mobileScatterLayouts : performance.scatterOffsets,
          });

          if (!animated || reduceMotion) {
            gsap.set(card, {
              autoAlpha: 1,
              xPercent: -50,
              yPercent: -50,
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: 1,
              transformOrigin: "center center",
            });
            return;
          }

          gsap.to(card, {
            autoAlpha: 1,
            xPercent: -50,
            yPercent: -50,
            x: target.x,
            y: target.y,
            rotation: target.rotation,
            scale: 1,
            duration: 0.42,
            delay: index * 0.03,
            ease: "back.out(1.5)",
            transformOrigin: "center center",
            overwrite: true,
          });
        });
      };

      const showScatter = () => {
        if (!button.classList.contains("is-poster-ready") || scatterCards.length === 0) {
          return;
        }

        layoutScatter(true);
      };

      const hideScatter = () => {
        if (scatterCards.length === 0) {
          return;
        }

        if (reduceMotion) {
          setScatterRestState();
          return;
        }

        gsap.to(scatterCards, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.72,
          duration: 0.24,
          stagger: 0.02,
          ease: "power2.inOut",
          overwrite: true,
        });
      };

      button.classList.remove("is-poster-ready");
      hideFlipbookFrames(frames);
      gsap.set(content, { autoAlpha: 0, y: 18 });
      setScatterRestState();

      const handlePointerEnter = () => {
        showScatter();
      };

      const handlePointerLeave = () => {
        hideScatter();
      };

      const handleFocus = () => {
        showScatter();
      };

      const handleBlur = () => {
        hideScatter();
      };

      if (!isMobileLayout) {
        button.addEventListener("mouseenter", handlePointerEnter);
        button.addEventListener("mouseleave", handlePointerLeave);
        button.addEventListener("focus", handleFocus);
        button.addEventListener("blur", handleBlur);
      }

      if (reduceMotion) {
        warmPastImageSources(imageSourcesToWarm);
        showLastFlipbookFrame(frames);
        gsap.set(content, { autoAlpha: 1, y: 0 });
        button.classList.add("is-poster-ready");
        if (isMobileLayout) {
          showScatter();
        }
        return () => {
          if (!isMobileLayout) {
            button.removeEventListener("mouseenter", handlePointerEnter);
            button.removeEventListener("mouseleave", handlePointerLeave);
            button.removeEventListener("focus", handleFocus);
            button.removeEventListener("blur", handleBlur);
          }
        };
      }

      const flipbookStart = 0.04;
      const flipbookStagger = 0.14;
      const flipbookDuration = 0.02;
      const flipbookEnd =
        flipbookStart + flipbookStagger * Math.max(0, frames.length - 1) + flipbookDuration;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      timeline.call(() => {
        warmPastImageSources(imageSourcesToWarm);
      });

      appendFlipbookFrames(timeline, frames, {
        startAt: flipbookStart,
        staggerDelay: flipbookStagger,
        frameDuration: flipbookDuration,
      });

      if (isMobileLayout) {
        timeline.call(
          () => {
            button.classList.add("is-poster-ready");
            showScatter();
          },
          undefined,
          flipbookEnd + 0.02,
        );

        timeline.to(
          content,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power2.out",
          },
          flipbookEnd + 0.08,
        );
      } else {
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

        timeline.call(() => {
          button.classList.add("is-poster-ready");
          if (button.matches(":hover") || document.activeElement === button) {
            showScatter();
          }
        });
      }

      return () => {
        if (!isMobileLayout) {
          button.removeEventListener("mouseenter", handlePointerEnter);
          button.removeEventListener("mouseleave", handlePointerLeave);
          button.removeEventListener("focus", handleFocus);
          button.removeEventListener("blur", handleBlur);
        }
      };
    },
    { scope: rootRef, dependencies: [isMobileLayout, performance.id], revertOnUpdate: true },
  );

  return (
    <article ref={rootRef} className={`wf-past-item${isMobileLayout ? " wf-past-item--mobile" : ""}`}>
      <div className="wf-past-item-stage">
        <div className="wf-past-item-scatter-layer" aria-hidden>
          <PastGalleryScatter
            imageSources={performance.galleryImageSources}
            isMobileLayout={isMobileLayout}
            mobileLayouts={performance.mobileScatterLayouts}
            showDebugIds={SHOW_PAST_SCATTER_DEBUG_IDS}
            debugPrefix={performance.key}
          />
        </div>

        <button type="button" className="js-past-item-button wf-past-item-button" onClick={onOpen}>
          <div className="js-past-item-main-shell wf-past-item-main-shell">
            <div className="wf-past-item-main-stage">
              <div className="wf-past-item-main-frames" aria-hidden>
                <PastFrameStack
                  performanceId={performance.id}
                  sizes="(max-width: 720px) 72vw, 420px"
                  className="js-past-frame wf-past-item-main-image"
                />
                <Image
                  src={withBasePath(performance.posterImageSource)}
                  alt=""
                  fill
                  loading="eager"
                  quality={100}
                  unoptimized
                  sizes="(max-width: 700px) 58vw, (max-width: 1100px) 42vw, 560px"
                  className="wf-past-item-poster-image"
                />
              </div>

              <div className="js-past-content wf-past-item-main-content">
                <h2 className="wf-past-item-title wf-maki-title">{performance.title}</h2>
              </div>
            </div>
          </div>
        </button>
      </div>
    </article>
  );
}
