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
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DepartmentsWireframePage() {
  const rootRef = useRef<HTMLElement>(null);
  const vineSvgRef = useRef<SVGSVGElement>(null);
  const vinePathGroupRef = useRef<SVGGElement>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentConfig | null>(null);

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

      rows.forEach((row) => {
        const leafFrames = gsap.utils.toArray<HTMLElement>(".js-leaf-frame", row);
        const leafLabel = row.querySelector<HTMLElement>(".js-leaf-label");
        const clickSign = row.querySelector<HTMLElement>(".js-dept-click-sign");
        const photoCards = gsap.utils.toArray<HTMLElement>(".js-dept-photo-reveal", row);

        if (leafFrames.length === 0 || !leafLabel || !clickSign) {
          return;
        }

        hideFlipbookFrames(leafFrames);
        gsap.set(leafLabel, { autoAlpha: 0, y: 8 });
        gsap.set(clickSign, { autoAlpha: 0, y: 6, scale: 0.94 });
        gsap.set(photoCards, {
          autoAlpha: 0,
          rotationX: -72,
          y: -14,
          scale: 0.94,
          transformOrigin: "top center",
        });

        if (reduceMotion) {
          gsap.set(leafFrames, { autoAlpha: 0 });
          gsap.set(leafFrames[leafFrames.length - 1], { autoAlpha: 1 });
          gsap.set(leafLabel, { autoAlpha: 1, y: 0 });
          gsap.set(clickSign, { autoAlpha: 1, y: 0, scale: 1 });
          gsap.set(photoCards, { autoAlpha: 1, rotationX: 0, y: 0, scale: 1 });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });

        appendFlipbookFrames(timeline, leafFrames);

        timeline.to(
          leafLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
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
            duration: 0.36,
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
              duration: 0.58,
              stagger: 0.16,
              ease: "power2.out",
              clearProps: "transform",
            },
            ">+=0.08",
          );
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell frameClassName="wf-frame--departments" innerClassName="wf-frame-inner--departments">
      <section ref={rootRef} className="wf-departments-stage">
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
                onOpen={(nextDepartment, trigger) => {
                  gsap.killTweensOf(trigger);
                  gsap.timeline()
                    .set(trigger, {
                      transformOrigin: nextDepartment.isLeftLeaf ? "right center" : "left center",
                    })
                    .to(trigger, {
                      rotation: nextDepartment.isLeftLeaf ? 14 : -14,
                      duration: 0.11,
                      ease: "power1.out",
                    })
                    .to(trigger, {
                      rotation: nextDepartment.isLeftLeaf ? -10 : 10,
                      duration: 0.1,
                      ease: "power1.inOut",
                    })
                    .to(trigger, {
                      rotation: nextDepartment.isLeftLeaf ? 5 : -5,
                      duration: 0.09,
                      ease: "power1.inOut",
                    })
                    .to(trigger, {
                      rotation: 0,
                      duration: 0.14,
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
