import type { WelcomeEvent } from "./content";

export const BURST_SECTORS = [
  "n",
  "nne",
  "ene",
  "e",
  "ese",
  "sse",
  "s",
  "ssw",
  "wsw",
  "w",
  "wnw",
  "nnw",
] as const;

export type BurstSector = (typeof BURST_SECTORS)[number];
export type TodayBurstVariant = "default" | "capsule-group";

type EventRect = {
  centerX: number;
  centerY: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

export type TodayEventHighlightState = {
  isToday: boolean;
  hiddenSectors: BurstSector[];
  renderBurst: boolean;
  burstVariant: TodayBurstVariant;
  groupOffsetXPercent?: string;
  groupOffsetYPercent?: string;
  groupScaleX?: string;
  groupScaleY?: string;
};

function parsePercent(value: string) {
  return Number.parseFloat(value);
}

function getEventRect(event: WelcomeEvent): EventRect {
  const width = parsePercent(event.position.width);
  const height = event.shape === "capsule" ? parsePercent(event.position.height) : width;
  const centerX = parsePercent(event.position.left);
  const centerY = parsePercent(event.position.top);

  return {
    centerX,
    centerY,
    left: centerX - width / 2,
    right: centerX + width / 2,
    top: centerY - height / 2,
    bottom: centerY + height / 2,
    width,
    height,
  };
}

function isOverlapping(a: EventRect, b: EventRect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function isWideHorizontalCapsule(rect: EventRect) {
  return rect.width / rect.height >= 2.4;
}

function formatPercent(value: number) {
  return `${value.toFixed(3)}%`;
}

function formatScale(value: number) {
  return value.toFixed(4);
}

function getBurstSectorsToward(source: EventRect, target: EventRect): BurstSector[] {
  const angleFromTopClockwise =
    (Math.atan2(target.centerY - source.centerY, target.centerX - source.centerX) * 180) / Math.PI + 90;
  const normalizedAngle = (angleFromTopClockwise + 360) % 360;
  const centerIndex = Math.round(normalizedAngle / 30) % BURST_SECTORS.length;

  return [
    BURST_SECTORS[(centerIndex + BURST_SECTORS.length - 1) % BURST_SECTORS.length],
    BURST_SECTORS[centerIndex],
    BURST_SECTORS[(centerIndex + 1) % BURST_SECTORS.length],
  ];
}

export function getTokyoTodayIso(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return `${year}-${month}-${day}`;
}

export function getTodayEventHighlightStates(events: readonly WelcomeEvent[], todayIso: string) {
  const eventRects = new Map(events.map((event) => [event.id, getEventRect(event)]));
  const hiddenSectorsByEvent = new Map<string, Set<BurstSector>>();
  const todayEvents = events.filter((event) => event.dates.includes(todayIso));
  const todayEventIds = new Set(todayEvents.map((event) => event.id));

  todayEvents.forEach((event) => {
    hiddenSectorsByEvent.set(event.id, new Set<BurstSector>());
  });

  for (let index = 0; index < todayEvents.length; index += 1) {
    const currentEvent = todayEvents[index];
    const currentRect = eventRects.get(currentEvent.id);

    if (!currentRect) {
      continue;
    }

    for (let compareIndex = index + 1; compareIndex < todayEvents.length; compareIndex += 1) {
      const nextEvent = todayEvents[compareIndex];
      const nextRect = eventRects.get(nextEvent.id);

      if (!nextRect || !isOverlapping(currentRect, nextRect)) {
        continue;
      }

      getBurstSectorsToward(currentRect, nextRect).forEach((sector) => {
        hiddenSectorsByEvent.get(currentEvent.id)?.add(sector);
      });
      getBurstSectorsToward(nextRect, currentRect).forEach((sector) => {
        hiddenSectorsByEvent.get(nextEvent.id)?.add(sector);
      });
    }
  }

  const highlightStates = new Map<string, TodayEventHighlightState>(
    events.map((event) => [
      event.id,
      {
        isToday: todayEventIds.has(event.id),
        hiddenSectors: Array.from(hiddenSectorsByEvent.get(event.id) ?? []),
        renderBurst: todayEventIds.has(event.id),
        burstVariant: "default",
      },
    ]),
  );

  const todayCapsuleEvents = todayEvents.filter((event) => {
    if (event.shape !== "capsule") {
      return false;
    }

    const rect = eventRects.get(event.id);
      return rect ? isWideHorizontalCapsule(rect) : false;
  });
  const todayCapsuleEventsById = new Map(todayCapsuleEvents.map((event) => [event.id, event]));
  const processedCapsuleEvents = new Set<string>();

  for (const event of todayCapsuleEvents) {
    if (processedCapsuleEvents.has(event.id)) {
      continue;
    }

    const cluster: WelcomeEvent[] = [];
    const pendingIds = [event.id];

    while (pendingIds.length > 0) {
      const currentId = pendingIds.pop();

      if (!currentId || processedCapsuleEvents.has(currentId)) {
        continue;
      }

      const currentEvent = todayCapsuleEventsById.get(currentId);
      const currentRect = currentEvent ? eventRects.get(currentId) : null;

      if (!currentEvent || !currentRect) {
        processedCapsuleEvents.add(currentId);
        continue;
      }

      processedCapsuleEvents.add(currentId);
      cluster.push(currentEvent);

      for (const candidate of todayCapsuleEvents) {
        if (processedCapsuleEvents.has(candidate.id) || candidate.id === currentId) {
          continue;
        }

        const candidateRect = eventRects.get(candidate.id);

        if (candidateRect && isOverlapping(currentRect, candidateRect)) {
          pendingIds.push(candidate.id);
        }
      }
    }

    if (cluster.length < 2) {
      continue;
    }

    const clusterRects = cluster
      .map((clusterEvent) => ({ event: clusterEvent, rect: eventRects.get(clusterEvent.id) }))
      .filter((entry): entry is { event: WelcomeEvent; rect: EventRect } => Boolean(entry.rect));

    if (clusterRects.length < 2) {
      continue;
    }

    const anchorEntry = clusterRects
      .slice()
      .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left)[0];

    const unionRect = clusterRects.reduce(
      (accumulator, entry) => ({
        left: Math.min(accumulator.left, entry.rect.left),
        right: Math.max(accumulator.right, entry.rect.right),
        top: Math.min(accumulator.top, entry.rect.top),
        bottom: Math.max(accumulator.bottom, entry.rect.bottom),
      }),
      {
        left: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
        top: Number.POSITIVE_INFINITY,
        bottom: Number.NEGATIVE_INFINITY,
      },
    );

    const anchorRect = anchorEntry.rect;
    const unionCenterX = (unionRect.left + unionRect.right) / 2;
    const unionCenterY = (unionRect.top + unionRect.bottom) / 2;
    const unionWidth = unionRect.right - unionRect.left;
    const unionHeight = unionRect.bottom - unionRect.top;
    const anchorWidth = anchorRect.right - anchorRect.left;
    const anchorHeight = anchorRect.bottom - anchorRect.top;

    highlightStates.set(anchorEntry.event.id, {
      isToday: true,
      hiddenSectors: [],
      renderBurst: true,
      burstVariant: "capsule-group",
      groupOffsetXPercent: formatPercent(((unionCenterX - anchorRect.centerX) / anchorWidth) * 100),
      groupOffsetYPercent: formatPercent(((unionCenterY - anchorRect.centerY) / anchorHeight) * 100),
      groupScaleX: formatScale(unionWidth / anchorWidth),
      groupScaleY: formatScale(unionHeight / anchorHeight),
    });

    for (const clusterEntry of clusterRects) {
      if (clusterEntry.event.id === anchorEntry.event.id) {
        continue;
      }

      highlightStates.set(clusterEntry.event.id, {
        isToday: true,
        hiddenSectors: [],
        renderBurst: false,
        burstVariant: "default",
      });
    }
  }

  return highlightStates;
}
