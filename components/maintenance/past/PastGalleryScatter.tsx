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
    width: "clamp(264px, 27vw, 504px)",
  },
  {
    width: "clamp(276px, 28.5vw, 528px)",
  },
  {
    width: "clamp(252px, 26.4vw, 480px)",
  },
  {
    width: "clamp(270px, 27.9vw, 516px)",
  },
  {
    width: "clamp(246px, 25.2vw, 462px)",
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
