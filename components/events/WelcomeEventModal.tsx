"use client";

import { type CSSProperties } from "react";
import {
  getWelcomeEventPhoneModalLayout,
  type WelcomeEvent,
  welcomeEventFrameSources,
} from "@/app/maintenance/events/content";
import { NotebookModal } from "@/components/shared/NotebookModal";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";

type WelcomeEventModalProps = {
  event: WelcomeEvent | null;
  onClose: () => void;
};

type EventModalRootStyle = CSSProperties & Record<`--${string}`, string>;

export function WelcomeEventModal({ event, onClose }: WelcomeEventModalProps) {
  const isMobileLayout = useVisualViewportMobile();

  if (!event) {
    return null;
  }

  const rootClassName = `wf-events-modal-root${isMobileLayout ? " wf-events-modal-root--mobile" : ""} wf-events-modal-root--${event.id}`;
  const modalLayout = isMobileLayout ? getWelcomeEventPhoneModalLayout(event) : null;
  const rootStyle: EventModalRootStyle | undefined = modalLayout
    ? {
        "--wf-event-modal-mobile-paper-top": modalLayout.paperTop ?? "39.5%",
        "--wf-event-modal-mobile-paper-right": modalLayout.paperRight ?? "8.2%",
        "--wf-event-modal-mobile-paper-bottom": modalLayout.paperBottom ?? "23.5%",
        "--wf-event-modal-mobile-paper-left": modalLayout.paperLeft ?? "8.2%",
        "--wf-event-modal-mobile-content-padding": modalLayout.contentPadding ?? "16px 16px 14px",
        "--wf-event-modal-mobile-content-gap": modalLayout.contentGap ?? "10px",
        "--wf-event-modal-mobile-title-font-size": modalLayout.titleFontSize ?? "clamp(20px, 5.8vw, 30px)",
        "--wf-event-modal-mobile-title-line-height": modalLayout.titleLineHeight ?? "1.25",
        "--wf-event-modal-mobile-title-margin-bottom": modalLayout.titleMarginBottom ?? "0px",
        "--wf-event-modal-mobile-text-padding": modalLayout.textPadding ?? "2px 6px 2px 2px",
        "--wf-event-modal-mobile-text-font-size": modalLayout.textFontSize ?? "clamp(12px, 3.9vw, 16px)",
        "--wf-event-modal-mobile-text-line-height": modalLayout.textLineHeight ?? "1.82",
      }
    : undefined;

  return (
    <NotebookModal
      modalKey={event.id}
      title={event.title}
      body={event.description}
      titleId={`wf-events-modal-title-${event.id}`}
      onClose={onClose}
      frameSources={welcomeEventFrameSources}
      rootClassName={rootClassName}
      rootStyle={rootStyle}
    />
  );
}
