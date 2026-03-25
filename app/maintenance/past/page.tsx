"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { pastPerformances } from "./content";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { PastItem } from "@/components/maintenance/past/PastItem";
import { PastModal } from "@/components/maintenance/past/PastModal";
import { getPastPerformanceScatterKey } from "@/components/maintenance/past/pastShared";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(useGSAP);

export default function PastWireframePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
    { scope: sectionRef },
  );

  return (
    <WireframeShell frameClassName="wf-frame--past" innerClassName="wf-frame-inner--past">
      <section ref={sectionRef} className="wf-past-page">
        <div className="wf-past-board-wrapper">
          <div className="js-past-board-bg-layer wf-past-board-bg-layer" aria-hidden>
            <Image
              src={withBasePath("/images/block_large.PNG")}
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
