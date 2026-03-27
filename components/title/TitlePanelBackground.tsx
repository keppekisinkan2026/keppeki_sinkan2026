import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";
import { joinClassNames } from "@/lib/joinClassNames";

type TitlePanelBackgroundProps = {
  src: string;
  sizes: string;
  containerClassName: string;
  imageClassName: string;
};

export function TitlePanelBackground({
  src,
  sizes,
  containerClassName,
  imageClassName,
}: TitlePanelBackgroundProps) {
  return (
    <div className={containerClassName} aria-hidden>
      <Image src={withBasePath(src)} alt="" fill sizes={sizes} className={joinClassNames(imageClassName)} />
    </div>
  );
}
