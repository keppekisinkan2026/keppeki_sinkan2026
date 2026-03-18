export type EventCard = {
  id: number;
  title: string;
  lines: string[];
};

export const EVENT_FRAME_IMAGE_SIZES = "(max-width: 640px) 74vw, (max-width: 1024px) 40vw, 320px";

const eventTextLines = ["テキストが入ります", "テキストが入ります", "テキストが入ります"] as const;

export const eventsData: EventCard[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: "イベント詳細",
  lines: [...eventTextLines],
}));

export const hakusiFrames = [
  "/images/hakusi1.PNG",
  "/images/hakusi2.PNG",
  "/images/hakusi3.PNG",
  "/images/hakusi4.PNG",
  "/images/hakusi5.PNG",
] as const;
