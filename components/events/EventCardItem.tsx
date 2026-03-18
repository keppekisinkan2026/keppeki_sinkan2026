import Image from "next/image";
import { EVENT_FRAME_IMAGE_SIZES, hakusiFrames, type EventCard } from "@/app/maintenance/events/content";
import { withBasePath } from "@/lib/withBasePath";

type EventCardItemProps = {
  event: EventCard;
};

export function EventCardItem({ event }: EventCardItemProps) {
  return (
    <article className="js-event-item wf-event-item">
      <div className="wf-event-item-bg" aria-hidden>
        {hakusiFrames.map((frameSrc) => (
          <Image
            key={`${event.id}-${frameSrc}`}
            src={withBasePath(frameSrc)}
            alt=""
            fill
            unoptimized
            sizes={EVENT_FRAME_IMAGE_SIZES}
            className="js-hakusi-frame wf-event-hakusi-img"
          />
        ))}
      </div>

      <div className="js-event-content wf-event-item-content">
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
