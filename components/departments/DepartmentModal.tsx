"use client";

import { Fragment, type ReactNode } from "react";
import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { type DepartmentConfig, wrapDepartmentDescriptionForMobile } from "@/app/maintenance/departments/content";
import { pastCardFrameSources } from "@/components/maintenance/past/pastShared";
import { NotebookModal } from "@/components/shared/NotebookModal";

type DepartmentModalProps = {
  department: DepartmentConfig | null;
  onClose: () => void;
};

function renderDepartmentBody(departmentId: DepartmentConfig["id"], description: ReactNode, isMobileLayout: boolean) {
  if (!isMobileLayout || typeof description !== "string") {
    return description;
  }

  const paragraphs = wrapDepartmentDescriptionForMobile(description);

  return (
    <div className={`wf-dept-modal-mobile-body wf-dept-modal-mobile-body--${departmentId}`}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={`${paragraphIndex}-${paragraph[0] ?? "paragraph"}`}
          className={`wf-dept-modal-mobile-paragraph wf-dept-modal-mobile-paragraph--${departmentId}`}
        >
          {paragraph.map((line, lineIndex) => (
            <Fragment key={`${paragraphIndex}-${lineIndex}`}>
              {lineIndex > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  const isMobileLayout = useVisualViewportMobile();

  if (!department) {
    return null;
  }

  const rootClassName = [
    `wf-dept-modal-root--${department.id}`,
    isMobileLayout ? "wf-dept-modal-root--mobile" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NotebookModal
      modalKey={department.name}
      title={department.name}
      body={renderDepartmentBody(department.id, department.description, isMobileLayout)}
      titleId="wf-dept-modal-title"
      onClose={onClose}
      frameSources={pastCardFrameSources}
      rootClassName={rootClassName}
    />
  );
}
