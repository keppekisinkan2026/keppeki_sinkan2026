"use client";

import { useVisualViewportMobile } from "@/lib/useVisualViewportMobile";
import { type DepartmentConfig } from "@/app/maintenance/departments/content";
import { pastCardFrameSources } from "@/components/maintenance/past/pastShared";
import { NotebookModal } from "@/components/shared/NotebookModal";

type DepartmentModalProps = {
  department: DepartmentConfig | null;
  onClose: () => void;
};

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  const isMobileLayout = useVisualViewportMobile();

  if (!department) {
    return null;
  }

  return (
    <NotebookModal
      modalKey={department.name}
      title={department.name}
      body={department.description}
      titleId="wf-dept-modal-title"
      onClose={onClose}
      frameSources={pastCardFrameSources}
      rootClassName={isMobileLayout ? "wf-dept-modal-root wf-dept-modal-root--mobile" : "wf-dept-modal-root"}
    />
  );
}
