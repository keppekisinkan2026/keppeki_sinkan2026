import type { ReactNode, RefObject } from "react";
import { WireframeTextureLayer } from "./WireframeTextureLayer";

type WireframeShellProps = {
  children: ReactNode;
  screenClassName?: string;
  frameClassName?: string;
  innerClassName?: string;
  rootRef?: RefObject<HTMLElement | null>;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

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
        <div className={joinClassNames("wf-frame-inner", innerClassName)}>{children}</div>
      </div>
    </main>
  );
}
