"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TitleAboutSection } from "@/components/title/TitleAboutSection";
import { TitleHpSection } from "@/components/title/TitleHpSection";
import { TitleJoinSection } from "@/components/title/TitleJoinSection";
import { TitleOpeningHeader } from "@/components/title/TitleOpeningHeader";
import { TitleSnsSection } from "@/components/title/TitleSnsSection";
import { setupTitleContentAnimations, setupTitleIntroAnimation } from "./animations";
import { WireframeShell } from "@/components/wireframe/WireframeShell";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TitleWireframePage() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lineSvgRef = useRef<SVGSVGElement>(null);
  const aboutStageRef = useRef<HTMLElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const resetScroll = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(resetScroll);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    if (!isIntroComplete) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isIntroComplete]);

  useEffect(() => {
    const refreshScrollTriggers = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScrollTriggers);

    return () => {
      window.removeEventListener("load", refreshScrollTriggers);
    };
  }, []);

  useGSAP(
    () =>
      setupTitleIntroAnimation({
        header: headerRef.current,
        lineSvg: lineSvgRef.current,
        setIsIntroComplete,
      }),
    { scope: rootRef },
  );

  useGSAP(
    () =>
      setupTitleContentAnimations({
        root: rootRef.current,
        aboutStage: aboutStageRef.current,
        aboutPanel: aboutPanelRef.current,
        isIntroComplete,
      }),
    {
      scope: rootRef,
      dependencies: [isIntroComplete],
      revertOnUpdate: true,
    },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      screenClassName="wf-screen--title"
      frameClassName="wf-frame--title"
      innerClassName="wf-frame-inner--title"
    >
      <div className="relative w-full">
        <TitleOpeningHeader headerRef={headerRef} lineSvgRef={lineSvgRef} isIntroComplete={isIntroComplete} />

        <main
          className={`wf-title-main transition-opacity duration-500 ${isIntroComplete ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!isIntroComplete}
        >
          <TitleSnsSection />
          <TitleHpSection />
          <TitleAboutSection aboutStageRef={aboutStageRef} aboutPanelRef={aboutPanelRef} />
          <TitleJoinSection />
        </main>
      </div>
    </WireframeShell>
  );
}
