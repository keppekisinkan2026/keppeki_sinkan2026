"use client";

import { Fragment, type ReactNode } from "react";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { type DepartmentConfig } from "@/app/departments/content";
import { pastCardFrameSources } from "@/components/past/pastShared";
import { NotebookModal } from "@/components/shared/NotebookModal";
import { wrapTextForMobile } from "@/lib/mobileTextWrap";
import { MAINTENANCE_MOBILE_MAX_WIDTH } from "@/lib/referenceMobile";

type DepartmentModalProps = {
  department: DepartmentConfig | null;
  onClose: () => void;
};

const MOBILE_DEPARTMENT_LEAF_WOBBLE_DURATION = 0.36;
const MOBILE_DEPARTMENT_OVERLAY_FADE_DURATION = 0.18;

function renderDepartmentBody(
  description: ReactNode,
  isMobileLayout: boolean,
  mobileDescriptionLines?: readonly string[],
) {
  if (!isMobileLayout) {
    return description;
  }

  const paragraphs =
    mobileDescriptionLines && mobileDescriptionLines.length > 0
      ? [mobileDescriptionLines]
      : typeof description === "string"
        ? wrapTextForMobile(description, 18, 5, true)
        : [];

  if (paragraphs.length === 0) {
    return description;
  }

  return (
    <div className="wf-dept-modal-mobile-body">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`${paragraphIndex}-${paragraph[0] ?? "paragraph"}`} className="wf-dept-modal-mobile-paragraph">
          {paragraph.map((line, lineIndex) => (
            <Fragment key={`${paragraphIndex}-${lineIndex}`}>
              <span className="wf-dept-modal-mobile-line">{line}</span>
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  const isMobileLayout = useVisualViewportMobile(MAINTENANCE_MOBILE_MAX_WIDTH);

  if (!department) {
    return null;
  }

  return (
    <NotebookModal
      modalKey={department.name}
      title={department.name}
      body={renderDepartmentBody(
        department.description,
        isMobileLayout,
        department.mobileDescriptionLines,
      )}
      titleId="wf-dept-modal-title"
      onClose={onClose}
      frameSources={pastCardFrameSources}
      rootClassName={isMobileLayout ? "wf-dept-modal-root--mobile" : undefined}
      hideFrames={isMobileLayout}
      overlayRevealDelay={isMobileLayout ? MOBILE_DEPARTMENT_LEAF_WOBBLE_DURATION : undefined}
      contentRevealDelay={
        isMobileLayout
          ? MOBILE_DEPARTMENT_LEAF_WOBBLE_DURATION + MOBILE_DEPARTMENT_OVERLAY_FADE_DURATION
          : undefined
      }
    />
  );
}
