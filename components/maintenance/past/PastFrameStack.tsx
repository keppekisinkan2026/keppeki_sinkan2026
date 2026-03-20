import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";
import { pastCardFrameSources } from "./pastShared";

type PastFrameStackProps = {
  performanceId: number;
  sizes: string;
  className: string;
  frameSources?: readonly string[];
};

export function PastFrameStack({ performanceId, sizes, className, frameSources = pastCardFrameSources }: PastFrameStackProps) {
  return (
    <>
      {frameSources.map((frameSrc) => (
        <Image
          key={`${performanceId}-${frameSrc}`}
          src={withBasePath(frameSrc)}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes={sizes}
          className={className}
        />
      ))}
    </>
  );
}
