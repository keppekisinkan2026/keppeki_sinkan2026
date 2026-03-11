"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { socialLinks } from "@/components/maintenance/socialLinkData";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { withBasePath } from "@/lib/withBasePath";

const openingFrameSources = [
  "/images/title1.png",
  "/images/title2.png",
  "/images/title3.png",
  "/images/title4.png",
  "/images/title5.png",
] as const;

const titleNavigationLinks = [
  { label: "劇団紹介", href: "#about" },
  { label: "過去公演", href: "/maintenance/past" },
  { label: "部署紹介", href: "/maintenance/departments" },
  { label: "新歓イベント", href: "/maintenance/events" },
  { label: "企画の流れ", href: "/maintenance/flow" },
  { label: "Q&A", href: "/maintenance/qa" },
  { label: "リンク", href: "#sns" },
] as const;

const aboutSectionRows = [0, 1, 2, 3];

gsap.registerPlugin(useGSAP);

export default function TitleWireframePage() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const heroHeaderRef = useRef<HTMLDivElement>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

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

  useGSAP(
    () => {
      const header = headerRef.current;
      const heroHeader = heroHeaderRef.current;

      if (!header || !heroHeader) {
        return;
      }

      const paperFrames = gsap.utils.toArray<HTMLElement>(".js-opening-frame", header);
      const logo = header.querySelector<HTMLElement>(".js-opening-logo");
      const line = header.querySelector<HTMLElement>(".js-opening-line");
      const menuItems = gsap.utils.toArray<HTMLElement>(".js-opening-menu-item", header);
      const curtain = header.querySelector<HTMLElement>(".js-opening-curtain");

      if (!logo || !line || !curtain || paperFrames.length === 0) {
        return;
      }

      const lastFrame = paperFrames[paperFrames.length - 1];
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(heroHeader, { clearProps: "transform" });
      gsap.set(paperFrames, { autoAlpha: 0 });
      gsap.set(paperFrames[0], { autoAlpha: 1 });
      gsap.set(logo, {
        autoAlpha: 0,
        y: 18,
        scale: 0.94,
        transformOrigin: "50% 50%",
      });
      gsap.set(line, {
        autoAlpha: 1,
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(menuItems, {
        autoAlpha: 0,
        y: 18,
        filter: "blur(8px)",
        clipPath: "inset(0 100% 0 0 round 999px)",
      });

      if (reduceMotion) {
        gsap.set(lastFrame, { autoAlpha: 1 });
        gsap.set(logo, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(line, { scaleX: 1 });
        gsap.set(menuItems, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0 0 round 999px)",
        });
        gsap.set(curtain, { autoAlpha: 0 });
        setIsIntroComplete(true);
        return;
      }

      const introTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
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
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.04",
      );
      introTimeline.to(line, {
        scaleX: 1,
        duration: 0.42,
        ease: "power2.out",
      });
      introTimeline.to(
        menuItems,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0 0 round 999px)",
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.04",
      );
      introTimeline.to(
        curtain,
        {
          autoAlpha: 0,
          duration: 0.42,
        },
        "+=0.08",
      );
      introTimeline.add(() => {
        setIsIntroComplete(true);
      });
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      screenClassName="wf-screen--title"
      frameClassName="wf-frame--title"
      innerClassName="wf-frame-inner--title"
    >
      <div className="relative w-full">
        <header ref={headerRef} className="wf-title-sticky-header" aria-label="タイトルオープニング">
          <div className="js-opening-curtain wf-title-opening-curtain" aria-hidden />

          <div className="wf-title-sticky-stage">
            <div ref={heroHeaderRef} className="wf-title-opening-header">
              <div className="wf-title-opening-paper-layer" aria-hidden>
                <div className="wf-title-opening-paper-stage">
                  {openingFrameSources.map((frameSrc, index) => (
                    <Image
                      key={frameSrc}
                      src={withBasePath(frameSrc)}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 1320px"
                      className="js-opening-frame wf-title-opening-frame"
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    />
                  ))}
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
                      sizes="(max-width: 640px) 58vw, (max-width: 1024px) 44vw, 560px"
                      className="js-opening-logo wf-title-opening-logo"
                      style={{ opacity: 0 }}
                    />
                  </div>

                  <div className="js-opening-line wf-title-opening-line" aria-hidden />

                  <nav
                    className={`wf-title-opening-menu ${isIntroComplete ? "pointer-events-auto" : "pointer-events-none"}`}
                    aria-label="ページリンク"
                  >
                    {titleNavigationLinks.map((item) =>
                      item.href.startsWith("#") ? (
                        <a key={item.label} href={item.href} className="js-opening-menu-item wf-title-opening-menu-link">
                          <span className="wf-title-opening-menu-text">{item.label}</span>
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="js-opening-menu-item wf-title-opening-menu-link"
                        >
                          <span className="wf-title-opening-menu-text">{item.label}</span>
                        </Link>
                      ),
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main
          className={`wf-title-main transition-opacity duration-300 ${isIntroComplete ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!isIntroComplete}
        >
          <section id="sns" className="wf-crayon-panel wf-cut-b wf-title-section wf-title-sns-section">
            <h2 className="wf-maki-title wf-title-section-title">SNS</h2>
            <ul className="wf-title-sns-list">
              {socialLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="wf-title-sns-link"
                    aria-label={item.label}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="wf-title-sns-bubble">
                      <Image
                        src={withBasePath(item.iconPath)}
                        alt=""
                        width={40}
                        height={40}
                        className={`wf-title-social-icon wf-title-social-icon--${item.id}`}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <a
            href="https://keppeki.github.io/"
            className="wf-crayon-panel wf-cut-c wf-title-hp-button wf-maki-title"
            target="_blank"
            rel="noreferrer noopener"
          >
            新歓公演のHPはこちら
          </a>

          <section id="about" className="wf-crayon-panel wf-cut-d wf-title-section wf-title-about-section">
            <h2 className="wf-maki-title wf-title-section-title">劇団ケッペキとは</h2>
            <div className="wf-title-about-list">
              {aboutSectionRows.map((row) => (
                <article
                  key={row}
                  className={`wf-title-about-row ${row % 2 === 0 ? "wf-title-about-row--image-right" : "wf-title-about-row--image-left"}`}
                >
                  <div className="wf-title-about-copy" aria-hidden>
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="wf-title-about-image">画像</div>
                </article>
              ))}
            </div>
          </section>

          <section className="wf-crayon-panel wf-cut-e wf-title-section wf-title-join-section">
            <h2 className="wf-maki-title wf-title-section-title">入団希望の方へ</h2>
            <div className="wf-title-join-lines" aria-hidden>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>
        </main>
      </div>
    </WireframeShell>
  );
}
