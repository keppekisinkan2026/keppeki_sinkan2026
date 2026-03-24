"use client";

import { type DepartmentConfig } from "@/app/maintenance/departments/content";
import { pastCardFrameSources } from "@/components/maintenance/past/pastShared";
import { NotebookModal } from "@/components/shared/NotebookModal";

type DepartmentModalProps = {
  department: DepartmentConfig | null;
  onClose: () => void;
};

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
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
    />
  );
}
