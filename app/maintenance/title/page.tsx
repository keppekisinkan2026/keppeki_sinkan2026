"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "@/components/maintenance/socialLinkData";
import { WireframeShell } from "@/components/wireframe/WireframeShell";

const titleNavigationLinks = [
  { label: "劇団紹介", href: "#about" },
  { label: "部署紹介", href: "/maintenance/departments" },
  { label: "新歓イベント", href: "/maintenance/events" },
  { label: "企画の流れ", href: "/maintenance/flow" },
  { label: "Q&A", href: "/maintenance/qa" },
  { label: "リンク", href: "#sns" },
];

const aboutSectionRows = [0, 1, 2, 3];

function TitleLogoDraw() {
  return (
    <div className="wf-title-logo-stage">
      <Image
        src="/images/logo.PNG"
        alt="劇団ケッペキ 2026年度新歓特設サイト ロゴ"
        width={3163}
        height={936}
        className="wf-title-logo js-logo-image"
        priority
      />
    </div>
  );
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TitleWireframePage() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const heroPanel = root.querySelector<HTMLElement>(".js-hero-panel");
      const heroDivider = root.querySelector<HTMLElement>(".js-hero-divider");
      const heroNav = root.querySelector<HTMLElement>(".js-hero-nav");
      const logoImage = root.querySelector<HTMLElement>(".js-logo-image");
      const paperBlocks = gsap.utils.toArray<HTMLElement>(".js-paper-reveal", root);

      if (!heroPanel || !heroDivider || !heroNav || !logoImage) {
        return;
      }

      gsap.set(heroDivider, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(heroNav, { autoAlpha: 0, y: 18 });
      gsap.set(logoImage, { autoAlpha: 0, y: 10 });
      gsap.set(heroPanel, {
        transformOrigin: "50% 50%",
        scaleX: 0.68,
        scaleY: 0.1,
        yPercent: 18,
        rotation: -1.5,
        filter: "blur(3px)",
      });

      const introTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      introTimeline.to(heroPanel, {
        duration: 0.82,
        scaleX: 1.02,
        scaleY: 1.05,
        yPercent: 2,
        rotation: 0.4,
        filter: "blur(0px)",
        ease: "power3.out",
      });
      introTimeline.to(heroPanel, {
        duration: 0.68,
        scaleX: 1,
        scaleY: 1,
        yPercent: 0,
        rotation: 0,
        ease: "elastic.out(1, 0.6)",
      });
      introTimeline.to(
        logoImage,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.46,
          ease: "power1.out",
        },
        "-=0.52",
      );
      introTimeline.to(
        heroDivider,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.44,
          ease: "power2.out",
        },
        "-=0.08",
      );
      introTimeline.to(
        heroNav,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: "power2.out",
        },
        "-=0.2",
      );
      introTimeline.eventCallback("onComplete", () => ScrollTrigger.refresh());

      paperBlocks.forEach((block) => {
        const panelTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 86%",
            once: true,
          },
        });

        panelTimeline.fromTo(
          block,
          {
            autoAlpha: 0,
            y: 72,
            scaleX: 0.94,
            scaleY: 0.13,
            rotation: gsap.utils.random(-1.2, 1.2),
            filter: "blur(2px)",
            transformOrigin: "50% 0%",
          },
          {
            autoAlpha: 1,
            y: 0,
            scaleX: 1.02,
            scaleY: 1.03,
            rotation: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
        );
        panelTimeline.to(block, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.58)",
        });

        if (block.matches(".js-sns-panel")) {
          const bubbles = gsap.utils.toArray<HTMLElement>(".js-sns-bubble", block);
          panelTimeline.fromTo(
            bubbles,
            {
              autoAlpha: 0,
              y: -90,
              scale: 0.22,
              rotation: () => gsap.utils.random(-16, 16),
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: () => gsap.utils.random(-4, 4),
              duration: 0.62,
              stagger: 0.08,
              ease: "bounce.out",
            },
            "-=0.42",
          );
        }
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
      <section className="wf-title-hero-stage js-hero-stage" aria-label="タイトルアニメーション">
        <header className="wf-crayon-panel wf-cut-a wf-title-header wf-title-hero-panel js-hero-panel">
          <div className="wf-title-logo-wrap">
            <TitleLogoDraw />
          </div>
          <div className="wf-title-divider js-hero-divider" aria-hidden />
          <nav className="wf-title-nav js-hero-nav" aria-label="ページリンク">
            {titleNavigationLinks.map((item) => (
              item.href.startsWith("#") ? (
                <a key={item.label} href={item.href} className="wf-title-nav-link">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="wf-title-nav-link">
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </header>
      </section>

      <section
        id="sns"
        className="wf-crayon-panel wf-cut-b wf-title-section wf-title-sns-section js-paper-reveal js-sns-panel"
      >
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
                <span className="wf-title-sns-bubble js-sns-bubble">
                  <Image
                    src={item.iconPath}
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
        className="wf-crayon-panel wf-cut-c wf-title-hp-button wf-maki-title js-paper-reveal"
        target="_blank"
        rel="noreferrer noopener"
      >
        新歓公演のHPはこちら
      </a>

      <section
        id="about"
        className="wf-crayon-panel wf-cut-d wf-title-section wf-title-about-section js-paper-reveal"
      >
        <h2 className="wf-maki-title wf-title-section-title">劇団ケッペキとは</h2>
        <div className="wf-title-about-list">
          {aboutSectionRows.map((row) => (
            <article
              key={row}
              className={`wf-title-about-row js-about-row ${row % 2 === 0 ? "wf-title-about-row--image-right" : "wf-title-about-row--image-left"}`}
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

      <section className="wf-crayon-panel wf-cut-e wf-title-section wf-title-join-section js-paper-reveal">
        <h2 className="wf-maki-title wf-title-section-title">入団希望の方へ</h2>
        <div className="wf-title-join-lines" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </WireframeShell>
  );
}
