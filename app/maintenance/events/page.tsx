"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EventCardItem } from "@/components/events/EventCardItem";
import { eventsData } from "./content";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function EventsWireframePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();
      const items = gsap.utils.toArray<HTMLElement>(
        ".js-event-item",
        rootRef.current,
      );

      items.forEach((item) => {
        const frames = gsap.utils.toArray<HTMLElement>(
          ".js-hakusi-frame",
          item,
        );
        const content = item.querySelector<HTMLElement>(".js-event-content");

        if (frames.length === 0 || !content) return;

        hideFlipbookFrames(frames);
        gsap.set(content, { autoAlpha: 0, y: 14 });

        if (reduceMotion) {
          showLastFlipbookFrame(frames);
          gsap.set(content, { autoAlpha: 1, y: 0 });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        appendFlipbookFrames(timeline, frames, {
          startAt: 0,
          staggerDelay: 0.15,
          frameDuration: 0.02,
        });

        timeline.to(
          content,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power2.out",
          },
          ">",
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell frameClassName="wf-frame--events" innerClassName="wf-frame-inner--events">
      {/*
       * wf-event-page-container がページ全体の横幅の器。
       * スケジュール表は中央の固定幅、イベントボードは画面幅いっぱいに伸びる。
       */}
      <div ref={rootRef} className="wf-event-page-container">
        {/* ── スケジュール ───────────────────────────────── */}
        <section className="wf-event-schedule-section">
          <div className="wf-event-schedule-placeholder">スケジュール表</div>
        </section>

        {/* ── イベント一覧 ───────────────────────────────── */}
        {/*
         * position: relative を持つ wf-event-board-section が
         * fill 画像（block_large.PNG）の基準矩形になる。
         * 背景画像は CSS 側で画面幅いっぱいまで引き伸ばす。
         */}
        <section className="wf-event-board-section">

          <div className="wf-event-board-bg-container" aria-hidden>
            <div className="wf-event-board-bg-sticky" />
          </div>
          
          <h2 className="wf-event-board-title wf-maki-title">新歓イベント</h2>

          <div className="wf-event-grid">
            {eventsData.map((event) => (
              <EventCardItem key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </WireframeShell>
  );
}
