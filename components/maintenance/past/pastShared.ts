export type PastPerformance = {
  id: number;
  title: string;
  subtitle: string;
  summaryLines: string[];
  synopsis: string;
};

export const pastFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

export const hiddenPastCardFrameSource = "/images/hakusi5.PNG";
