"use client";

import { type WelcomeEvent, welcomeEventFrameSources } from "@/app/maintenance/events/content";
import { NotebookModal } from "@/components/shared/NotebookModal";

type WelcomeEventModalProps = {
  event: WelcomeEvent | null;
  onClose: () => void;
};

export function WelcomeEventModal({ event, onClose }: WelcomeEventModalProps) {
  if (!event) {
    return null;
  }

  return (
    <NotebookModal
      modalKey={event.id}
      title={event.title}
      body={event.description}
      titleId={`wf-events-modal-title-${event.id}`}
      onClose={onClose}
      frameSources={welcomeEventFrameSources}
      rootClassName="wf-events-modal-root"
    />
  );
}
