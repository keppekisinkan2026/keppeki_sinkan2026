import { RoughSVG } from "roughjs/bin/svg";

export function renderDepartmentVine(vineSvg: SVGSVGElement, vinePathGroup: SVGGElement) {
  const treeHeight = Math.max(720, Math.round(vineSvg.getBoundingClientRect().height || 720));
  const overscan = Math.max(96, Math.round(treeHeight * 0.06));
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
}
