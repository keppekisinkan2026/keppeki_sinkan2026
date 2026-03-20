"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { withBasePath } from "@/lib/withBasePath";
import { type PastPerformance } from "./pastShared";
import { PastGalleryScatter } from "./PastGalleryScatter";
import { PastFrameStack } from "./PastFrameStack";

type PastItemProps = {
  performance: PastPerformance;
  onOpen: () => void;
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PastItem({ performance, onOpen }: PastItemProps) {
  const rootRef = useRef<HTMLElement>(null);

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

      const getScatterTarget = (slot: number, cardWidth: number, shellWidth: number, shellHeight: number) => {
        const gap = Math.max(38, shellWidth * 0.08);

        switch (slot) {
          case 0:
            return {
              x: -(shellWidth * 0.5 + cardWidth * 0.42 + gap),
              y: -(shellHeight * 0.3 + cardWidth * 0.1),
              rotation: -13,
            };
          case 1:
            return {
              x: shellWidth * 0.5 + cardWidth * 0.44 + gap,
              y: -(shellHeight * 0.26 + cardWidth * 0.08),
              rotation: 10,
            };
          case 2:
            return {
              x: shellWidth * 0.52 + cardWidth * 0.46 + gap,
              y: shellHeight * 0.22 + cardWidth * 0.08,
              rotation: 15,
            };
          case 3:
            return {
              x: -(shellWidth * 0.5 + cardWidth * 0.42 + gap),
              y: shellHeight * 0.28 + cardWidth * 0.1,
              rotation: -10,
            };
          default:
            return {
              x: 0,
              y: shellHeight * 0.56 + cardWidth * 0.55 + gap * 0.4,
              rotation: 4,
            };
        }
      };

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

      const showScatter = () => {
        if (!button.classList.contains("is-poster-ready") || scatterCards.length === 0) {
          return;
        }

        const shellRect = mainShell.getBoundingClientRect();

        scatterCards.forEach((card, index) => {
          const cardWidth = card.getBoundingClientRect().width || 120;
          const target = getScatterTarget(index, cardWidth, shellRect.width, shellRect.height);

          if (reduceMotion) {
            gsap.set(card, {
              autoAlpha: 1,
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: 1,
            });
            return;
          }

          gsap.to(card, {
            autoAlpha: 1,
            x: target.x,
            y: target.y,
            rotation: target.rotation,
            scale: 1,
            duration: 0.42,
            delay: index * 0.03,
            ease: "back.out(1.5)",
            overwrite: true,
          });
        });
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

      button.addEventListener("mouseenter", handlePointerEnter);
      button.addEventListener("mouseleave", handlePointerLeave);
      button.addEventListener("focus", handleFocus);
      button.addEventListener("blur", handleBlur);

      if (reduceMotion) {
        showLastFlipbookFrame(frames);
        gsap.set(content, { autoAlpha: 1, y: 0 });
        button.classList.add("is-poster-ready");
        return () => {
          button.removeEventListener("mouseenter", handlePointerEnter);
          button.removeEventListener("mouseleave", handlePointerLeave);
          button.removeEventListener("focus", handleFocus);
          button.removeEventListener("blur", handleBlur);
        };
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      appendFlipbookFrames(timeline, frames, {
        startAt: 0.04,
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

      timeline.call(() => {
        button.classList.add("is-poster-ready");
        if (button.matches(":hover") || document.activeElement === button) {
          showScatter();
        }
      });

      return () => {
        button.removeEventListener("mouseenter", handlePointerEnter);
        button.removeEventListener("mouseleave", handlePointerLeave);
        button.removeEventListener("focus", handleFocus);
        button.removeEventListener("blur", handleBlur);
      };
    },
    { scope: rootRef },
  );

  return (
    <article ref={rootRef} className="wf-past-item">
      <div className="wf-past-item-stage">
        <div className="wf-past-item-scatter-layer" aria-hidden>
          <PastGalleryScatter imageSources={performance.galleryImageSources} />
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
