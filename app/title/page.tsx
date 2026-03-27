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
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
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
  const isMobileLayout = useVisualViewportMobile();
  const shouldSkipIntro = typeof window !== "undefined" && window.location.hash === "#about";
  const shouldLockIntroScroll = !shouldSkipIntro && !isIntroComplete;

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    if (shouldSkipIntro) {
      return () => {
        window.history.scrollRestoration = previousScrollRestoration;
      };
    }

    window.scrollTo(0, 0);

    const resetScroll = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(resetScroll);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [shouldSkipIntro]);

  useEffect(() => {
    if (!isIntroComplete || window.location.hash !== "#about") {
      return;
    }

    const scrollToAbout = window.requestAnimationFrame(() => {
      aboutPanelRef.current?.scrollIntoView({ block: "start" });
    });

    return () => {
      window.cancelAnimationFrame(scrollToAbout);
    };
  }, [isIntroComplete]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    if (shouldLockIntroScroll) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [shouldLockIntroScroll]);

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
        skipIntro: shouldSkipIntro,
      }),
    {
      scope: rootRef,
      dependencies: [shouldSkipIntro],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () =>
      setupTitleContentAnimations({
        root: rootRef.current,
        aboutStage: aboutStageRef.current,
        aboutPanel: aboutPanelRef.current,
        isIntroComplete,
        isMobileLayout,
      }),
    {
      scope: rootRef,
      dependencies: [isIntroComplete, isMobileLayout],
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

        {isIntroComplete ? (
          <main className="wf-title-main">
            <TitleSnsSection />
            <TitleHpSection />
            <TitleAboutSection
              aboutStageRef={aboutStageRef}
              aboutPanelRef={aboutPanelRef}
              isMobileLayout={isMobileLayout}
            />
            <TitleJoinSection />
          </main>
        ) : null}
      </div>
    </WireframeShell>
  );
}
