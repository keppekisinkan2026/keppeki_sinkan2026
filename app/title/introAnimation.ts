import type { Dispatch, SetStateAction } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoughSVG } from "roughjs/bin/svg";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

type TitleIntroAnimationOptions = {
  header: HTMLElement | null;
  lineSvg: SVGSVGElement | null;
  setIsIntroComplete: Dispatch<SetStateAction<boolean>>;
};

type RoughLineDefinition = {
  from: [number, number];
  to: [number, number];
  strokeWidth: number;
  roughness: number;
  bowing: number;
  seed: number;
};

const openingLineDefinitions: RoughLineDefinition[] = [
  {
    from: [12, 18],
    to: [988, 18],
    strokeWidth: 8,
    roughness: 2.4,
    bowing: 0.8,
    seed: 2026,
  },
  {
    from: [18, 27],
    to: [982, 29],
    strokeWidth: 6,
    roughness: 2.8,
    bowing: 0.6,
    seed: 2027,
  },
  {
    from: [14, 36],
    to: [986, 34],
    strokeWidth: 5,
    roughness: 3,
    bowing: 0.75,
    seed: 2028,
  },
];

function refreshScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function buildOpeningLinePaths(lineSvg: SVGSVGElement) {
  lineSvg.innerHTML = "";
  lineSvg.setAttribute("viewBox", "0 0 1000 56");

  const roughFactory = new RoughSVG(lineSvg);

  openingLineDefinitions.forEach(({ from, to, strokeWidth, roughness, bowing, seed }) => {
    const line = roughFactory.line(from[0], from[1], to[0], to[1], {
      stroke: "#ffffff",
      strokeWidth,
      roughness,
      bowing,
      seed,
    });

    lineSvg.appendChild(line);
  });

  return Array.from(lineSvg.querySelectorAll<SVGPathElement>("path"));
}

function prepareOpeningLinePaths(linePaths: SVGPathElement[]) {
  linePaths.forEach((path) => {
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linejoin", "round");

    const totalLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
      opacity: 0,
    });
  });
}

function applyReducedMotionState(
  paperFrames: HTMLElement[],
  logo: HTMLElement,
  linePaths: SVGPathElement[],
  menuItems: HTMLElement[],
  setIsIntroComplete: Dispatch<SetStateAction<boolean>>,
) {
  gsap.set(paperFrames[paperFrames.length - 1], { autoAlpha: 1 });
  gsap.set(logo, { autoAlpha: 1, y: 0, scale: 1 });
  gsap.set(linePaths, { strokeDashoffset: 0 });
  gsap.set(menuItems, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0 0)",
  });

  setIsIntroComplete(true);
  refreshScrollTriggers();
}

function buildIntroTimeline(
  paperFrames: HTMLElement[],
  logo: HTMLElement,
  linePaths: SVGPathElement[],
  menuItems: HTMLElement[],
  setIsIntroComplete: Dispatch<SetStateAction<boolean>>,
) {
  const introTimeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: () => {
      setIsIntroComplete(true);
      refreshScrollTriggers();
    },
  });

  paperFrames.slice(1).forEach((frame) => {
    introTimeline.set(paperFrames, { autoAlpha: 0 }, "+=0.15");
    introTimeline.set(frame, { autoAlpha: 1 });
  });

  introTimeline.to(
    logo,
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.48,
      ease: "power3.out",
    },
    "-=0.04",
  );

  introTimeline
    .to(
      linePaths,
      {
        opacity: (index) => (index % 2 === 0 ? 0.96 : 0.82),
        duration: 0.01,
        stagger: 0.04,
      },
      "-=0.08",
    )
    .to(
      linePaths,
      {
        strokeDashoffset: 0,
        duration: 0.72,
        stagger: 0.04,
        ease: "power1.out",
      },
      "<",
    );

  introTimeline.to(
    menuItems,
    {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0 0)",
      duration: 0.56,
      stagger: 0.07,
      ease: "power3.out",
    },
    "-=0.18",
  );
}

export function setupTitleIntroAnimation({
  header,
  lineSvg,
  setIsIntroComplete,
}: TitleIntroAnimationOptions) {
  if (!header || !lineSvg) {
    return;
  }

  const paperFrames = gsap.utils.toArray<HTMLElement>(".js-opening-frame", header);
  const logo = header.querySelector<HTMLElement>(".js-opening-logo");
  const menuItems = gsap.utils.toArray<HTMLElement>(".js-opening-menu-item", header);

  if (!logo || paperFrames.length === 0) {
    return;
  }

  const linePaths = buildOpeningLinePaths(lineSvg);
  const reduceMotion = prefersReducedMotion();

  prepareOpeningLinePaths(linePaths);

  gsap.set(paperFrames, { autoAlpha: 0 });
  gsap.set(paperFrames[0], { autoAlpha: 1 });
  gsap.set(logo, {
    autoAlpha: 0,
    y: 18,
    scale: 0.94,
    transformOrigin: "50% 50%",
  });
  gsap.set(menuItems, {
    autoAlpha: 0,
    y: 18,
    filter: "blur(8px)",
    clipPath: "inset(0 100% 0 0)",
  });
  gsap.set(lineSvg, { autoAlpha: 1 });

  if (reduceMotion) {
    applyReducedMotionState(paperFrames, logo, linePaths, menuItems, setIsIntroComplete);
    return;
  }

  buildIntroTimeline(paperFrames, logo, linePaths, menuItems, setIsIntroComplete);
}
