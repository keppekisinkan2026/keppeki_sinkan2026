import type { ReactNode, RefObject } from "react";
import { FooterLine } from "@/app/components/FooterLine";
import { joinClassNames } from "@/lib/joinClassNames";
import { ReferenceMobileCanvas } from "./ReferenceMobileCanvas";
import { WireframeTextureLayer } from "./WireframeTextureLayer";

type WireframeShellProps = {
  children: ReactNode;
  screenClassName?: string;
  frameClassName?: string;
  innerClassName?: string;
  rootRef?: RefObject<HTMLElement | null>;
  mobileReferenceWidth?: number;
};

export function WireframeShell({
  children,
  screenClassName,
  frameClassName,
  innerClassName,
  rootRef,
  mobileReferenceWidth,
}: WireframeShellProps) {
  const frame = (
    <div className={joinClassNames("wf-frame", frameClassName)}>
      <div className={joinClassNames("wf-frame-inner", innerClassName)}>
        {children}
        <FooterLine />
      </div>
    </div>
  );

  return (
    <main ref={rootRef} className={joinClassNames("wf-screen", screenClassName)}>
      <WireframeTextureLayer />
      {mobileReferenceWidth ? (
        <ReferenceMobileCanvas referenceWidth={mobileReferenceWidth}>{frame}</ReferenceMobileCanvas>
      ) : (
        frame
      )}
    </main>
  );
}
