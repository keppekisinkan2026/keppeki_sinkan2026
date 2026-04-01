import Image from "next/image";
import type { CSSProperties } from "react";
import { withBasePath } from "@/lib/withBasePath";

type TitleFrameSequenceProps = {
  frameSources: readonly string[];
  sizes: string;
  className: string;
  priority?: boolean;
  priorityFrameCount?: number;
  eagerFrameCount?: number;
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
  priorityFrameCount,
  eagerFrameCount,
  quality = 100,
  unoptimized = true,
  getClassName,
  getStyle,
}: TitleFrameSequenceProps) {
  const resolvedPriorityFrameCount = priority ? (priorityFrameCount ?? 1) : 0;
  const resolvedEagerFrameCount =
    eagerFrameCount ?? (priority ? Math.max(2, resolvedPriorityFrameCount) : 0);

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
            priority={index < resolvedPriorityFrameCount}
            loading={index < resolvedEagerFrameCount ? "eager" : "lazy"}
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
