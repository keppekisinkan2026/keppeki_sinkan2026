"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import {
  getWelcomeEventPhoneModalLayout,
  type WelcomeEvent,
  welcomeEventFrameSources,
} from "@/app/events/content";
import { NotebookModal } from "@/components/shared/NotebookModal";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { wrapTextForMobile } from "@/lib/mobileTextWrap";
import { MAINTENANCE_MOBILE_MAX_WIDTH } from "@/lib/referenceMobile";

type WelcomeEventModalProps = {
  event: WelcomeEvent | null;
  onClose: () => void;
};

type EventModalRootStyle = CSSProperties & Record<`--${string}`, string>;

function renderEventDescription(
  description: ReactNode,
  isMobileLayout: boolean,
  maxChars = 16,
  minChars = 5,
) {
  if (!isMobileLayout || typeof description !== "string") {
    return description;
  }

  const paragraphs = wrapTextForMobile(description, maxChars, minChars, true);

  return (
    <div className="wf-events-modal-mobile-body">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={`${paragraphIndex}-${paragraph[0] ?? "paragraph"}`}
          className="wf-events-modal-mobile-paragraph"
        >
          {paragraph.map((line, lineIndex) => (
            <Fragment key={`${paragraphIndex}-${lineIndex}`}>
              <span className="wf-events-modal-mobile-line">{line}</span>
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

export function WelcomeEventModal({ event, onClose }: WelcomeEventModalProps) {
  const isMobileLayout = useVisualViewportMobile(MAINTENANCE_MOBILE_MAX_WIDTH);

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
        "--wf-event-modal-mobile-title-margin-top": modalLayout.titleMarginTop ?? "0px",
        "--wf-event-modal-mobile-title-margin-left": modalLayout.titleMarginLeft ?? "0px",
        "--wf-event-modal-mobile-title-margin-bottom": modalLayout.titleMarginBottom ?? "0px",
        "--wf-event-modal-tablet-title-margin-top":
          modalLayout.tabletTitleMarginTop ?? modalLayout.titleMarginTop ?? "0px",
        "--wf-event-modal-tablet-title-margin-left":
          modalLayout.tabletTitleMarginLeft ?? modalLayout.titleMarginLeft ?? "0px",
        "--wf-event-modal-tablet-title-margin-bottom":
          modalLayout.tabletTitleMarginBottom ?? modalLayout.titleMarginBottom ?? "0px",
        "--wf-event-modal-mobile-text-padding": modalLayout.textPadding ?? "2px 6px 2px 2px",
        "--wf-event-modal-mobile-text-margin-top": modalLayout.textMarginTop ?? "0px",
        "--wf-event-modal-mobile-text-margin-left": modalLayout.textMarginLeft ?? "0px",
        "--wf-event-modal-tablet-text-margin-top":
          modalLayout.tabletTextMarginTop ?? modalLayout.textMarginTop ?? "0px",
        "--wf-event-modal-tablet-text-margin-left":
          modalLayout.tabletTextMarginLeft ?? modalLayout.textMarginLeft ?? "0px",
        "--wf-event-modal-mobile-text-font-size": modalLayout.textFontSize ?? "clamp(12px, 3.9vw, 16px)",
        "--wf-event-modal-mobile-text-line-height": modalLayout.textLineHeight ?? "1.82",
      }
    : undefined;

  return (
    <NotebookModal
      modalKey={event.id}
      title={event.title}
      body={renderEventDescription(
        event.description,
        isMobileLayout,
        modalLayout?.textMaxChars,
        modalLayout?.textMinChars,
      )}
      titleId={`wf-events-modal-title-${event.id}`}
      onClose={onClose}
      frameSources={welcomeEventFrameSources}
      rootClassName={rootClassName}
      rootStyle={rootStyle}
    />
  );
}
