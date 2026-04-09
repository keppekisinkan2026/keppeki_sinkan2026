import type { CSSProperties } from "react";
import type { BurstSector, TodayBurstVariant } from "./todayHighlight";

const burstRays: ReadonlyArray<{ id: BurstSector; d: string }> = [
  { id: "n", d: "M80 20 L80 42" },
  { id: "nne", d: "M97.5 22.3 L92 43.6" },
  { id: "ene", d: "M127.6 39.7 L108.5 50.7" },
  { id: "e", d: "M140 80 L118 80" },
  { id: "ese", d: "M127.6 120.3 L108.5 109.3" },
  { id: "sse", d: "M97.5 137.7 L92 116.4" },
  { id: "s", d: "M80 140 L80 118" },
  { id: "ssw", d: "M62.5 137.7 L68 116.4" },
  { id: "wsw", d: "M32.4 120.3 L51.5 109.3" },
  { id: "w", d: "M20 80 L42 80" },
  { id: "wnw", d: "M32.4 39.7 L51.5 50.7" },
  { id: "nnw", d: "M62.5 22.3 L68 43.6" },
];

const TODAY_LABEL_HIDDEN_SECTORS = new Set<BurstSector>(["nnw", "n", "nne"]);
const capsuleGroupRayAngles = [120, 145, 170, 195, 220, 340, 5, 30, 55, 80] as const;

function toEllipseRayPath(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  innerOffset: number,
  outerOffset: number,
  angleDegrees: number,
) {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);
  const startX = centerX + cos * (radiusX + innerOffset);
  const startY = centerY + sin * (radiusY + innerOffset);
  const endX = centerX + cos * (radiusX + outerOffset);
  const endY = centerY + sin * (radiusY + outerOffset);

  return `M${startX.toFixed(1)} ${startY.toFixed(1)} L${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

const capsuleGroupRays = capsuleGroupRayAngles.map((angleDegrees) => ({
  id: `capsule-group-${angleDegrees}`,
  d: toEllipseRayPath(130, 80, 102, 54, 10, 34, angleDegrees),
}));

type EventTodayBurstProps = {
  hiddenSectors: readonly BurstSector[];
  shape?: "circle" | "capsule";
  variant?: TodayBurstVariant;
  style?: CSSProperties;
};

export function EventTodayBurst({
  hiddenSectors,
  shape = "circle",
  variant = "default",
  style,
}: EventTodayBurstProps) {
  const hiddenSectorSet = new Set([...hiddenSectors, ...TODAY_LABEL_HIDDEN_SECTORS]);
  const isCapsuleGroup = variant === "capsule-group";
  const rays = isCapsuleGroup ? capsuleGroupRays : burstRays;
  const viewBox = isCapsuleGroup ? "0 0 260 160" : "0 0 160 160";

  return (
    <span
      className={`wf-event-today-burst${shape === "capsule" ? " wf-event-today-burst--capsule" : ""}${
        isCapsuleGroup ? " wf-event-today-burst--capsule-group" : ""
      }`}
      aria-hidden="true"
      style={style}
    >
      <span className="wf-event-today-burst-label-shell">
        <span className="wf-event-today-burst-label wf-maki-title">TODAY!</span>
      </span>
      <svg viewBox={viewBox} className="wf-event-today-burst-svg" focusable="false" aria-hidden="true">
        {rays.map((ray) =>
          !isCapsuleGroup && hiddenSectorSet.has(ray.id as BurstSector) ? null : (
            <path
              key={ray.id}
              d={ray.d}
              className={`wf-event-today-burst-ray wf-event-today-burst-ray--${ray.id}`}
            />
          ),
        )}
      </svg>
    </span>
  );
}
