import type { CSSProperties } from "react";
import { withBasePath } from "@/lib/withBasePath";
import { type PastScatterLayout } from "./pastShared";

type PastGalleryScatterProps = {
  imageSources: string[];
  isMobileLayout?: boolean;
  mobileLayouts?: PastScatterLayout[];
  showDebugIds?: boolean;
  debugPrefix?: string;
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

export function PastGalleryScatter({
  imageSources,
  isMobileLayout = false,
  mobileLayouts,
  showDebugIds = false,
  debugPrefix = "photo",
}: PastGalleryScatterProps) {
  return (
    <>
      {imageSources.map((imageSource, index) => {
        const card = scatterCards[index % scatterCards.length];
        const mobileLayout = isMobileLayout ? mobileLayouts?.[index] : undefined;
        const widthScale = mobileLayout?.widthScale ?? (isMobileLayout ? 0.7 : 1);
        const debugLabel = `${debugPrefix}-${index + 1}`;
        const style: ScatterCardStyle = {
          "--wf-scatter-width": isMobileLayout ? `calc(${card.width} * ${widthScale})` : card.width,
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
              fetchPriority="low"
            />
            {showDebugIds ? <span className="wf-past-hidden-card-debug-id">{debugLabel}</span> : null}
          </div>
        );
      })}
    </>
  );
}
