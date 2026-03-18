import Image from "next/image";
import type { CSSProperties } from "react";
import { withBasePath } from "@/lib/withBasePath";

type TitleFrameSequenceProps = {
  frameSources: readonly string[];
  sizes: string;
  className: string;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  getClassName?: (index: number) => string | undefined;
  getStyle?: (index: number) => CSSProperties | undefined;
};

export function TitleFrameSequence({
  frameSources,
  sizes,
  className,
  priority = false,
  quality = 100,
  unoptimized = true,
  getClassName,
  getStyle,
}: TitleFrameSequenceProps) {
  return (
    <>
      {frameSources.map((frameSrc, index) => {
        const extraClassName = getClassName?.(index);
        const imageClassName = extraClassName ? `${className} ${extraClassName}` : className;

        return (
          <Image
            key={frameSrc}
            src={withBasePath(frameSrc)}
            alt=""
            fill
            priority={priority}
            quality={quality}
            unoptimized={unoptimized}
            sizes={sizes}
            className={imageClassName}
            style={getStyle?.(index)}
          />
        );
      })}
    </>
  );
}
