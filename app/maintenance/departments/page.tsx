"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoughSVG } from "roughjs/bin/svg";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames } from "@/lib/gsap/flipbook";
import { withBasePath } from "@/lib/withBasePath";

const leafFrameSources = ["/images/leaf.PNG", "/images/leaf2.PNG", "/images/leaf3.PNG", "/images/leaf4.PNG"] as const;
const departmentsData = [
  { name: "企画責任", isLeftLeaf: true, tapes: [{ src: "red_tape.png", pos: "top-center" }] },
  { name: "舞台監督", isLeftLeaf: false, tapes: [{ src: "blue_tape.png", pos: "top-left" }, { src: "blue_tape.png", pos: "top-right" }] },
  { name: "演出", isLeftLeaf: true, tapes: [{ src: "y_tape.png", pos: "top-center" }] },
  { name: "稽古場", isLeftLeaf: false, tapes: [{ src: "red_tape.png", pos: "left-vertical" }] },
  { name: "舞台", isLeftLeaf: true, tapes: [{ src: "y_tape.png", pos: "top-left" }, { src: "y_tape.png", pos: "bottom-left" }] },
  { name: "音響", isLeftLeaf: false, tapes: [{ src: "red_tape.png", pos: "top-left" }] },
  { name: "照明", isLeftLeaf: true, tapes: [{ src: "blue_tape.png", pos: "top-center" }] },
  { name: "映像", isLeftLeaf: false, tapes: [{ src: "y_tape.png", pos: "top-left" }, { src: "y_tape.png", pos: "top-right" }] },
  {
    name: "衣装・小道具",
    isLeftLeaf: true,
    tapes: [{ src: "red_tape.png", pos: "top-left" }, { src: "red_tape.png", pos: "top-right" }],
  },
  { name: "制作", isLeftLeaf: false, tapes: [{ src: "blue_tape.png", pos: "bottom-right" }] },
  { name: "宣伝美術", isLeftLeaf: true, tapes: [{ src: "blue_tape.png", pos: "top-right" }] },
] as const;

const tapeAssetMap = {
  "red_tape.png": "/images/red_tape.png.png",
  "blue_tape.png": "/images/blue_tape.png.png",
  "y_tape.png": "/images/y_tape.png.png",
} as const;
const DEPARTMENT_TEXT_LINES = Array.from({ length: 4 }, () => "テキストが入ります");

type DepartmentConfig = (typeof departmentsData)[number];

function DepartmentLeaf({ name }: { name: string }) {
  return (
    <div className="wf-dept-leaf-wrapper">
      {leafFrameSources.map((frameSrc) => (
        <Image
          key={`${name}-${frameSrc}`}
          src={withBasePath(frameSrc)}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 300px"
          className="js-leaf-frame"
        />
      ))}
      <span className="js-leaf-label wf-dept-leaf-text wf-maki-title">{name}</span>
    </div>
  );
}

function DepartmentTextBlock({ department }: { department: DepartmentConfig }) {
  return (
    <div className="js-dept-text-block wf-dept-text-wrapper">
      <Image
        src={withBasePath("/images/nyudan.PNG")}
        alt=""
        width={2048}
        height={2048}
        quality={100}
        unoptimized
        sizes="(max-width: 640px) 64vw, (max-width: 1024px) 42vw, 480px"
        className="wf-dept-text-bg"
      />
      {department.tapes.map((tape, index) => (
        <Image
          key={`${department.name}-${tape.src}-${tape.pos}-${index}`}
          src={withBasePath(tapeAssetMap[tape.src])}
          alt=""
          width={140}
          height={60}
          quality={100}
          unoptimized
          className={`wf-dept-tape wf-dept-tape--${tape.pos}`}
        />
      ))}
      <div className="wf-dept-desc-text">
        {DEPARTMENT_TEXT_LINES.map((line, index) => (
          <span key={`${department.name}-${index}`} className="wf-dept-desc-line">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function DepartmentRow({ department }: { department: DepartmentConfig }) {
  const leaf = <DepartmentLeaf name={department.name} />;
  const textBlock = <DepartmentTextBlock department={department} />;

  return (
    <li
      className={`js-dept-row wf-dept-row ${department.isLeftLeaf ? "wf-dept-row--left" : "wf-dept-row--right"}`}
    >
      <div className="wf-dept-cell-left">{department.isLeftLeaf ? leaf : textBlock}</div>
      <div className="wf-dept-cell-right">{department.isLeftLeaf ? textBlock : leaf}</div>
    </li>
  );
}

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

    const renderVine = () => {
      const treeHeight = Math.max(1800, Math.round(vineSvg.getBoundingClientRect().height || 1800));
      const overscan = Math.max(180, Math.round(treeHeight * 0.1));
      const strokeWidth = Math.max(15, Math.min(30, window.innerWidth * 0.025));
      const pathTop = -overscan;
      const pathBottom = treeHeight + overscan;
      const y1 = Math.round(treeHeight * 0.12);
      const y2 = Math.round(treeHeight * 0.24);
      const y3 = Math.round(treeHeight * 0.36);
      const y4 = Math.round(treeHeight * 0.5);
      const y5 = Math.round(treeHeight * 0.64);
      const y6 = Math.round(treeHeight * 0.78);
      const y7 = Math.round(treeHeight * 0.9);

      vinePathGroup.innerHTML = "";
      vineSvg.setAttribute("viewBox", `-80 ${pathTop} 260 ${treeHeight + overscan * 2}`);

      const roughFactory = new RoughSVG(vineSvg);
      const vinePath = roughFactory.path(
        `M 50 ${pathTop} C 92 ${y1}, 12 ${y2}, 50 ${y3} S 88 ${y4}, 50 ${y5} S 18 ${y6}, 50 ${y7} S 84 ${Math.round(treeHeight * 0.96)}, 50 ${pathBottom}`,
        {
          stroke: "url(#vineTexture)",
          strokeWidth,
          roughness: 2.5,
          bowing: 2,
          fill: "none",
          seed: 2026,
        },
      );

      vinePathGroup.appendChild(vinePath);

      const paths = Array.from(vinePathGroup.querySelectorAll<SVGPathElement>("path"));
      paths.forEach((path) => {
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
      });
    };

    renderVine();
    window.addEventListener("resize", renderVine);

    return () => {
      window.removeEventListener("resize", renderVine);
      vinePathGroup.innerHTML = "";
    };
  }, []);

  useGSAP(
    () => {
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
