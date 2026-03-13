"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames } from "@/lib/gsap/flipbook";
import { withBasePath } from "@/lib/withBasePath";

// ---------------------------------------------------------------------------
// 型・定数
// ---------------------------------------------------------------------------

type EventCard = {
  id: number;
  title: string;
  lines: string[];
};

const EVENT_FRAME_IMAGE_SIZES = "(max-width: 640px) 74vw, (max-width: 1024px) 40vw, 320px";

const EVENT_TEXT_LINES = ["テキストが入ります", "テキストが入ります", "テキストが入ります"] as const;

const eventsData: EventCard[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "イベント詳細",
  lines: [...EVENT_TEXT_LINES],
}));

const hakusiFrames = [
  "/images/hakusi1.PNG",
  "/images/hakusi2.PNG",
  "/images/hakusi3.PNG",
  "/images/hakusi4.PNG",
  "/images/hakusi5.PNG",
] as const;

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ---------------------------------------------------------------------------
// サブコンポーネント
// ---------------------------------------------------------------------------

function EventCardItem({ event }: { event: EventCard }) {
  return (
    <article className="js-event-item wf-event-item">
      <div className="wf-event-item-bg" aria-hidden>
        {hakusiFrames.map((frameSrc) => (
          <Image
            key={`${event.id}-${frameSrc}`}
            src={withBasePath(frameSrc)}
            alt=""
            fill
            quality={100}
            unoptimized
            sizes={EVENT_FRAME_IMAGE_SIZES}
            className="js-hakusi-frame wf-event-hakusi-img"
          />
        ))}
      </div>

      <div className="wf-event-item-content">
        <h3 className="wf-event-item-title wf-maki-title">{event.title}</h3>
        <p className="wf-event-item-text">
          {event.lines.map((line, index) => (
            <span key={`${event.id}-${index}`} className="wf-event-item-line">
              {line}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// ページ本体
// ---------------------------------------------------------------------------

export default function EventsWireframePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(
        ".js-event-item",
        rootRef.current,
      );

      items.forEach((item) => {
        const frames = gsap.utils.toArray<HTMLElement>(
          ".js-hakusi-frame",
          item,
        );

        if (frames.length === 0) return;

        hideFlipbookFrames(frames);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        appendFlipbookFrames(timeline, frames);
      });
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell frameClassName="wf-frame--events" innerClassName="wf-frame-inner--events">
      {/*
       * wf-event-page-container が両セクションの横幅の基準となる共通の親。
       * CSS で max-width / width を定義し、両セクションに width: 100% を当てることで
       * block_large.PNG（wf-event-board-section）の横幅がスケジュールと揃う。
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
         * 横幅は親（wf-event-page-container）から width: 100% で継承するため、
         * スケジュールセクションと自動的に揃う。
         */}
        <section className="wf-event-board-section">
          <Image
            src={withBasePath("/images/block_large.PNG")}
            alt=""
            fill
            quality={100}
            unoptimized
            sizes="(max-width: 980px) 90vw, 980px"
            className="wf-event-board-bg"
            aria-hidden
          />

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
