"use client";

import { useState } from "react";
import Image from "next/image";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { WelcomeEventModal } from "@/components/events/WelcomeEventModal";
import { EVENT_CALENDAR_IMAGE, type WelcomeEvent, welcomeEvents } from "./content";
import { withBasePath } from "@/lib/withBasePath";

export default function EventsWireframePage() {
  const [selectedEvent, setSelectedEvent] = useState<WelcomeEvent | null>(null);

  const openModal = (event: WelcomeEvent) => {
    setSelectedEvent(event);
  };

  return (
    <WireframeShell frameClassName="wf-frame--events" innerClassName="wf-frame-inner--events">
      <div className="wf-event-page-container">
        <div className="wf-event-map-shell">
          <Image
            src={withBasePath(EVENT_CALENDAR_IMAGE.src)}
            alt="新歓カレンダー"
            width={EVENT_CALENDAR_IMAGE.width}
            height={EVENT_CALENDAR_IMAGE.height}
            priority
            unoptimized
            sizes="(max-width: 1280px) 96vw, 1200px"
            className="wf-event-map-image"
          />

          <div className="wf-event-character wf-event-character--left" aria-hidden="true">
            <Image
              src={withBasePath("/images/chara_2.PNG")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 120px, (max-width: 1280px) 18vw, 220px"
              className="wf-event-character-image"
            />
          </div>

          <div className="wf-event-speech-bubble wf-event-speech-bubble--left" aria-hidden="true">
            <span className="wf-event-speech-text wf-maki-title">
              気になるイベントを
              <br />
              クリック！タップ！
            </span>
          </div>

          <div className="wf-event-character wf-event-character--right" aria-hidden="true">
            <Image
              src={withBasePath("/images/chara_1.PNG")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 110px, (max-width: 1280px) 16vw, 200px"
              className="wf-event-character-image"
            />
          </div>

          {welcomeEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              className="event-map-button"
              style={{
                position: "absolute",
                top: event.position.top,
                left: event.position.left,
                width: event.position.width,
                height: event.shape === "capsule" ? event.position.height : undefined,
                aspectRatio: event.shape === "capsule" ? undefined : "1 / 1",
                borderRadius: event.shape === "capsule" ? "999px" : "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                border: "none",
                padding: 0,
                zIndex: 3,
              }}
              onClick={() => openModal(event)}
              aria-label={`${event.date} ${event.title} の詳細を開く`}
            >
              <span className="sr-only">{`${event.date} ${event.title}`}</span>
            </button>
          ))}
        </div>
      </div>

      <WelcomeEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </WireframeShell>
  );
}
