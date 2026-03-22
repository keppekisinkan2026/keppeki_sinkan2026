import type { CSSProperties } from "react";
import { withBasePath } from "@/lib/withBasePath";

type PastGalleryScatterProps = {
  imageSources: string[];
};

type ScatterCardStyle = CSSProperties & {
  "--wf-scatter-width": string;
};

const scatterCards = [
  {
    width: "clamp(176px, 18vw, 336px)",
  },
  {
    width: "clamp(184px, 19vw, 352px)",
  },
  {
    width: "clamp(168px, 17.6vw, 320px)",
  },
  {
    width: "clamp(180px, 18.6vw, 344px)",
  },
  {
    width: "clamp(164px, 16.8vw, 308px)",
  },
];

export function PastGalleryScatter({ imageSources }: PastGalleryScatterProps) {
  return (
    <>
      {imageSources.map((imageSource, index) => {
        const card = scatterCards[index % scatterCards.length];
        const style: ScatterCardStyle = {
          "--wf-scatter-width": card.width,
        };

        return (
          <div
            key={`${imageSource}-${index}`}
            className="js-past-scatter-card wf-past-hidden-card"
            data-scatter-slot={index}
            style={style}
          >
            <img
              src={withBasePath(imageSource)}
              alt=""
              className="wf-past-hidden-card-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </>
  );
}
