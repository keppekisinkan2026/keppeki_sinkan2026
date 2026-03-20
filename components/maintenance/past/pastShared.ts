import type { ReactNode } from "react";

export const pastCardFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

export const pastModalFrameSources = pastCardFrameSources.slice(0, -1);

export const pastPosterImageSources = {
  sinkan: "/images/history/sinkan_b.PNG",
  midhi: "/images/history/midhi_b.PNG",
  natu: "/images/history/natu_b.PNG",
  nf: "/images/history/nf_b.PNG",
  huyu: "/images/history/huyu_b.PNG",
  sinzin: "/images/history/sinzin_b.PNG",
  sotu: "/images/history/sotu_b.PNG",
} as const;

export const pastModalPosterImageSources = {
  sinkan: "/images/history/modal/sinkan_b.PNG",
  midhi: "/images/history/modal/midhi_b.PNG",
  natu: "/images/history/modal/natu_b.PNG",
  nf: "/images/history/modal/nf_b.PNG",
  huyu: "/images/history/modal/huyu_b.PNG",
  sinzin: "/images/history/modal/sinzin_b.PNG",
  sotu: "/images/history/modal/sotu_b.PNG",
} as const satisfies Record<keyof typeof pastPosterImageSources, string>;

export type PastPerformanceKey = keyof typeof pastPosterImageSources;

const pastGalleryImageCounts = {
  sinkan: 6,
  midhi: 8,
  natu: 4,
  nf: 4,
  huyu: 4,
  sinzin: 4,
  sotu: 4,
} as const satisfies Record<PastPerformanceKey, number>;

function createGalleryImageSources(key: PastPerformanceKey) {
  return Array.from(
    { length: pastGalleryImageCounts[key] },
    (_, index) => `/images/history/${key}/${key}_${index + 1}.PNG`,
  );
}

export const pastGalleryImageSources = {
  sinkan: createGalleryImageSources("sinkan"),
  midhi: createGalleryImageSources("midhi"),
  natu: createGalleryImageSources("natu"),
  nf: createGalleryImageSources("nf"),
  huyu: createGalleryImageSources("huyu"),
  sinzin: createGalleryImageSources("sinzin"),
  sotu: createGalleryImageSources("sotu"),
} as const satisfies Record<PastPerformanceKey, string[]>;

export type PastPerformance = {
  id: number;
  key: PastPerformanceKey;
  title: ReactNode;
  synopsis: ReactNode;
  galleryImageSources: string[];
  posterImageSource: string;
};
