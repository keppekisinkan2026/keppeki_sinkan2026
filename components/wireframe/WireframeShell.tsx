import type { ReactNode, RefObject } from "react";
import { FooterLine } from "@/app/components/FooterLine";
import { joinClassNames } from "@/lib/joinClassNames";
import { WireframeTextureLayer } from "./WireframeTextureLayer";

type WireframeShellProps = {
  children: ReactNode;
  screenClassName?: string;
  frameClassName?: string;
  innerClassName?: string;
  rootRef?: RefObject<HTMLElement | null>;
};

export function WireframeShell({
  children,
  screenClassName,
  frameClassName,
  innerClassName,
  rootRef,
}: WireframeShellProps) {
  return (
    <main ref={rootRef} className={joinClassNames("wf-screen", screenClassName)}>
      <WireframeTextureLayer />
      <div className={joinClassNames("wf-frame", frameClassName)}>
        <div className={joinClassNames("wf-frame-inner", innerClassName)}>
          {children}
          <FooterLine />
        </div>
      </div>
    </main>
  );
}
