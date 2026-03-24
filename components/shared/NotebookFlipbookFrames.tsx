import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

export const NOTEBOOK_CARD_IMAGE_SIZES =
  "(max-width: 700px) 74vw, (max-width: 1100px) 38vw, 420px";

type NotebookFlipbookFramesProps = {
  frameSources: readonly string[];
  frameKeyPrefix: string;
  frameLayerClassName: string;
  frameClassName: string;
  sizes?: string;
};

export function NotebookFlipbookFrames({
  frameSources,
  frameKeyPrefix,
  frameLayerClassName,
  frameClassName,
  sizes = NOTEBOOK_CARD_IMAGE_SIZES,
}: NotebookFlipbookFramesProps) {
  return (
    <div className={frameLayerClassName} aria-hidden>
      {frameSources.map((frameSrc) => (
        <Image
          key={`${frameKeyPrefix}-${frameSrc}`}
          src={withBasePath(frameSrc)}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes={sizes}
          className={frameClassName}
        />
      ))}
    </div>
  );
}
