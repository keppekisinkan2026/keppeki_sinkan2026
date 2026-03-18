"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { pastPerformances } from "./content";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { PastItem } from "@/components/maintenance/past/PastItem";
import { PastModal } from "@/components/maintenance/past/PastModal";
import { withBasePath } from "@/lib/withBasePath";

export default function PastWireframePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedPerformance = useMemo(
    () => pastPerformances.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <WireframeShell frameClassName="wf-frame--past" innerClassName="wf-frame-inner--past">
      <section className="wf-past-page">
        <div className="wf-past-board-wrapper">
          <div className="wf-past-board-bg-layer" aria-hidden>
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
                  key={performance.id}
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
