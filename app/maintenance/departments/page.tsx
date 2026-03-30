"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { departmentsData, type DepartmentConfig } from "./content";
import { renderDepartmentVine } from "./renderVine";
import { DepartmentModal } from "@/components/departments/DepartmentModal";
import { DepartmentRow } from "@/components/departments/DepartmentRow";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DepartmentsWireframePage() {
  const rootRef = useRef<HTMLElement>(null);
  const vineSvgRef = useRef<SVGSVGElement>(null);
  const vinePathGroupRef = useRef<SVGGElement>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentConfig | null>(null);
  const isMobileLayout = useVisualViewportMobile();

  useEffect(() => {
    const vineSvg = vineSvgRef.current;
    const vinePathGroup = vinePathGroupRef.current;

    if (!vineSvg || !vinePathGroup) {
      return;
    }

    const renderVine = () => renderDepartmentVine(vineSvg, vinePathGroup);

    renderVine();
    window.addEventListener("resize", renderVine);

    return () => {
      window.removeEventListener("resize", renderVine);
      vinePathGroup.innerHTML = "";
    };
  }, []);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();
      const rows = gsap.utils.toArray<HTMLElement>(".js-dept-row", rootRef.current);
      const animationStart = isMobileLayout ? "top 82%" : "top 65%";

      rows.forEach((row) => {
        const leafFrames = gsap.utils.toArray<HTMLElement>(".js-leaf-frame", row);
        const leafLabel = row.querySelector<HTMLElement>(".js-leaf-label");
        const clickSign = row.querySelector<HTMLElement>(".js-dept-click-sign");
        const photoCards = gsap.utils.toArray<HTMLElement>(".js-dept-photo-reveal", row);

        if (leafFrames.length === 0 || !leafLabel || !clickSign) {
          return;
        }

        hideFlipbookFrames(leafFrames);
        gsap.set(leafLabel, { autoAlpha: 0, y: isMobileLayout ? 4 : 8 });
        gsap.set(clickSign, { autoAlpha: 0, y: isMobileLayout ? 4 : 6, scale: isMobileLayout ? 0.98 : 0.94 });
        if (photoCards.length > 0) {
          gsap.set(photoCards, {
            autoAlpha: 0,
            rotationX: isMobileLayout ? 0 : -72,
            y: isMobileLayout ? 10 : -14,
            scale: isMobileLayout ? 0.98 : 0.94,
            transformOrigin: "top center",
          });
        }

        if (reduceMotion) {
          gsap.set(leafFrames, { autoAlpha: 0 });
          gsap.set(leafFrames[leafFrames.length - 1], { autoAlpha: 1 });
          gsap.set(leafLabel, { autoAlpha: 1, y: 0 });
          gsap.set(clickSign, { autoAlpha: 1, y: 0, scale: 1 });
          if (photoCards.length > 0) {
            gsap.set(photoCards, { autoAlpha: 1, rotationX: 0, y: 0, scale: 1 });
          }
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: animationStart,
            toggleActions: "play none none none",
          },
        });

        appendFlipbookFrames(timeline, leafFrames);

        timeline.to(
          leafLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: isMobileLayout ? 0.28 : 0.35,
            ease: "power2.out",
          },
          "+=0.08",
        );

        timeline.to(
          clickSign,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: isMobileLayout ? 0.28 : 0.36,
            ease: "power2.out",
          },
          "<+=0.12",
        );

        if (photoCards.length > 0) {
          timeline.to(
            photoCards,
            {
              autoAlpha: 1,
              rotationX: 0,
              y: 0,
              scale: 1,
              duration: isMobileLayout ? 0.38 : 0.58,
              stagger: isMobileLayout ? 0.08 : 0.16,
              ease: "power2.out",
              clearProps: "transform",
            },
            ">+=0.08",
          );
        }
      });
    },
    { scope: rootRef, dependencies: [isMobileLayout], revertOnUpdate: true },
  );

  return (
    <WireframeShell frameClassName="wf-frame--departments" innerClassName="wf-frame-inner--departments">
      <section
        ref={rootRef}
        className={`wf-departments-stage${isMobileLayout ? " wf-departments-stage--mobile" : ""}`}
      >
        <div className="wf-department-tree">
          <svg ref={vineSvgRef} className="wf-department-vine-svg" aria-hidden preserveAspectRatio="none">
            <defs>
              <pattern id="vineTexture" patternUnits="userSpaceOnUse" width="200" height="200">
                <image
                  href={withBasePath("/images/tuta.png")}
                  x="0"
                  y="0"
                  width="200"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <g ref={vinePathGroupRef} />
          </svg>
          <ul className="wf-department-list">
            {departmentsData.map((department) => (
              <DepartmentRow
                key={department.name}
                department={department}
                isMobileLayout={isMobileLayout}
                onOpen={(nextDepartment, trigger) => {
                  gsap.killTweensOf(trigger);
                  gsap.timeline()
                    .set(trigger, {
                      transformOrigin: nextDepartment.isLeftLeaf ? "right center" : "left center",
                    })
                    .to(trigger, {
                      rotation: nextDepartment.isLeftLeaf
                        ? isMobileLayout
                          ? 9
                          : 14
                        : isMobileLayout
                          ? -9
                          : -14,
                      duration: isMobileLayout ? 0.09 : 0.11,
                      ease: "power1.out",
                    })
                    .to(trigger, {
                      rotation: nextDepartment.isLeftLeaf
                        ? isMobileLayout
                          ? -6
                          : -10
                        : isMobileLayout
                          ? 6
                          : 10,
                      duration: isMobileLayout ? 0.08 : 0.1,
                      ease: "power1.inOut",
                    })
                    .to(trigger, {
                      rotation: nextDepartment.isLeftLeaf
                        ? isMobileLayout
                          ? 3
                          : 5
                        : isMobileLayout
                          ? -3
                          : -5,
                      duration: isMobileLayout ? 0.07 : 0.09,
                      ease: "power1.inOut",
                    })
                    .to(trigger, {
                      rotation: 0,
                      duration: isMobileLayout ? 0.12 : 0.14,
                      ease: "power2.out",
                    });

                  setSelectedDepartment(nextDepartment);
                }}
              />
            ))}
          </ul>
        </div>
      </section>

      <DepartmentModal department={selectedDepartment} onClose={() => setSelectedDepartment(null)} />
    </WireframeShell>
  );
}
