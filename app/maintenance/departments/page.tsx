"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { departmentsData } from "./content";
import { renderDepartmentVine } from "./renderVine";
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
        const textBlock = row.querySelector<HTMLElement>(".js-dept-text-block");

        if (leafFrames.length === 0 || !textBlock || !leafLabel) {
          return;
        }

        hideFlipbookFrames(leafFrames);
        gsap.set(leafLabel, { autoAlpha: 0, y: 8 });
        gsap.set(textBlock, { autoAlpha: 0, y: 20 });

        if (reduceMotion) {
          gsap.set(leafFrames, { autoAlpha: 0 });
          gsap.set(leafFrames[leafFrames.length - 1], { autoAlpha: 1 });
          gsap.set(leafLabel, { autoAlpha: 1, y: 0 });
          gsap.set(textBlock, { autoAlpha: 1, y: 0 });
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
          textBlock,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "<+=0.12",
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell>
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
              <DepartmentRow key={department.name} department={department} />
            ))}
          </ul>
        </div>
      </section>
    </WireframeShell>
  );
}
