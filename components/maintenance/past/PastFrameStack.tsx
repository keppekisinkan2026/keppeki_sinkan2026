import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";
import { pastFrameSources } from "./pastShared";

type PastFrameStackProps = {
  performanceId: number;
  sizes: string;
  className: string;
};

export function PastFrameStack({ performanceId, sizes, className }: PastFrameStackProps) {
  return (
    <>
      {pastFrameSources.map((frameSrc) => (
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
