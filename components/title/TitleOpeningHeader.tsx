import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { openingFrameSources } from "@/app/title/content";
import { titleNavigationLinks } from "@/lib/siteNavigation";
import { withBasePath } from "@/lib/withBasePath";
import { TitleFrameSequence } from "./TitleFrameSequence";

type TitleOpeningHeaderProps = {
  headerRef: RefObject<HTMLElement | null>;
  lineSvgRef: RefObject<SVGSVGElement | null>;
  isIntroComplete: boolean;
};

const openingMenuItemInitialStyle = {
  opacity: 0,
  transform: "translateY(18px)",
  filter: "blur(8px)",
  clipPath: "inset(0 100% 0 0)",
} as const;

function renderOpeningMenuLink(item: (typeof titleNavigationLinks)[number]) {
  const linkBody = <span className="wf-title-opening-menu-text">{item.label}</span>;

  if (item.href.startsWith("#")) {
    return (
      <a
        key={item.label}
        href={item.href}
        className="js-opening-menu-item wf-title-opening-menu-link"
        style={openingMenuItemInitialStyle}
      >
        {linkBody}
      </a>
    );
  }

  return (
    <Link
      key={item.label}
      href={item.href}
      className="js-opening-menu-item wf-title-opening-menu-link"
      style={openingMenuItemInitialStyle}
    >
      {linkBody}
    </Link>
  );
}

export function TitleOpeningHeader({ headerRef, lineSvgRef, isIntroComplete }: TitleOpeningHeaderProps) {
  return (
    <header ref={headerRef} className="wf-title-sticky-header" aria-label="タイトルオープニング">
      <div className="wf-title-sticky-stage">
        <div className="wf-title-opening-header">
          <div className="wf-title-opening-paper-layer" aria-hidden>
            <div className="wf-title-opening-paper-stage">
              <TitleFrameSequence
                frameSources={openingFrameSources}
                sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1360px"
                className="js-opening-frame wf-title-opening-frame"
                priority
                getStyle={(index) => ({ opacity: index === 0 ? 1 : 0 })}
              />
            </div>
          </div>

          <div className="wf-title-opening-foreground">
            <div className="wf-title-opening-stack">
              <div className="wf-title-opening-logo-stage">
                <Image
                  src={withBasePath("/images/logo.PNG")}
                  alt="劇団ケッペキ 2026年度新歓特設サイト ロゴ"
                  fill
                  priority
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 780px"
                  className="js-opening-logo wf-title-opening-logo"
                  style={{ opacity: 0 }}
                />
              </div>

              <svg ref={lineSvgRef} className="js-opening-line wf-title-opening-line" aria-hidden />

              <nav
                className={`wf-title-opening-menu ${isIntroComplete ? "pointer-events-auto" : "pointer-events-none"}`}
                aria-label="ページリンク"
              >
                {titleNavigationLinks.map(renderOpeningMenuLink)}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
