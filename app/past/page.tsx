"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { pastPerformances } from "./content";
import { PastItem } from "@/components/past/PastItem";
import { PastModal } from "@/components/past/PastModal";
import { getPastPerformanceScatterKey } from "@/components/past/pastShared";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { MAINTENANCE_MOBILE_MAX_WIDTH, REFERENCE_PHONE_WIDTH } from "@/lib/referenceMobile";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(useGSAP);

export default function PastWireframePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobileLayout = useVisualViewportMobile(MAINTENANCE_MOBILE_MAX_WIDTH);

  const selectedPerformance = useMemo(
    () => pastPerformances.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const bgLayer = section.querySelector<HTMLElement>(".js-past-board-bg-layer");
      if (!bgLayer) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(bgLayer, { autoAlpha: 1, y: 0 });
        return;
      }

      if (isMobileLayout) {
        gsap.set(bgLayer, { autoAlpha: 0, y: 36 });

        const timeline = gsap.timeline();
        timeline.to(bgLayer, {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          ease: "power2.out",
        });
        timeline.set(bgLayer, { clearProps: "y" });
        return;
      }

      const fromY = Math.max(window.innerHeight * 0.72, 460);

      gsap.set(bgLayer, { autoAlpha: 1, y: fromY });

      const timeline = gsap.timeline();
      timeline.to(bgLayer, {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      });
      timeline.set(bgLayer, { clearProps: "y" });
    },
    { scope: sectionRef, dependencies: [isMobileLayout], revertOnUpdate: true },
  );

  return (
    <WireframeShell
      frameClassName="wf-frame--past"
      innerClassName="wf-frame-inner--past"
      mobileReferenceWidth={REFERENCE_PHONE_WIDTH}
      mobileMaxWidth={MAINTENANCE_MOBILE_MAX_WIDTH}
    >
      <section ref={sectionRef} className="wf-past-page">
        <div className="wf-past-board-wrapper">
          <div className="js-past-board-bg-layer wf-past-board-bg-layer" aria-hidden>
            <Image
              src={withBasePath("/images/block_large.png")}
              alt=""
              fill
              quality={100}
              unoptimized
              sizes="(max-width: 1240px) 100vw, 1200px"
              className="wf-past-board-bg"
            />
          </div>

          <div className="wf-past-board-content">
            <header className="wf-past-board-header">
              <h1 className="wf-past-board-title wf-maki-title">過去公演</h1>
            </header>

            <div className="wf-past-list">
              {pastPerformances.map((performance) => (
                <PastItem
                  key={getPastPerformanceScatterKey(performance)}
                  performance={performance}
                  onOpen={() => setSelectedId(performance.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <PastModal performance={selectedPerformance} onClose={() => setSelectedId(null)} />
    </WireframeShell>
  );
}
