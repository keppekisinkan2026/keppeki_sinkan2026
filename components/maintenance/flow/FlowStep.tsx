import Image from "next/image";
import { Fragment } from "react";
import type { CSSProperties } from "react";
import rough from "roughjs/bin/rough";
import { getFlowStepLayout, type FlowStepData } from "./flowData";
import { withBasePath } from "@/lib/withBasePath";

type FlowStepProps = {
  step: FlowStepData;
  index: number;
  isLast: boolean;
  isMobileLayout: boolean;
  frameSources: readonly string[];
};

const FLOW_STEP_FRAME_SIZES =
  "(max-width: 700px) 74vw, (max-width: 1100px) 38vw, 420px";

const roughGenerator = rough.generator();

function buildRoughArrowPaths(pathData: string, seed: number) {
  const drawable = roughGenerator.path(pathData, {
    stroke: "rgba(118, 145, 177, 0.88)",
    strokeWidth: 16,
    roughness: 1.95,
    bowing: 1.4,
    fill: "none",
    seed,
  });

  return drawable.sets
    .filter((set) => set.type === "path")
    .map((set) => roughGenerator.opsToPath(set));
}

function getArrowPathData(isLeft: boolean, isMobileLayout: boolean) {
  if (isMobileLayout) {
    return {
      shaft: "M 60 16 C 58 74, 60 128, 60 188 C 60 208, 60 222, 60 232",
      headTop: "M 60 232 C 48 212, 36 194, 22 176",
      headBottom: "M 60 232 C 72 212, 84 194, 98 176",
      viewBox: "0 0 120 240",
    };
  }

  if (isLeft) {
    return {
      shaft: "M 28 26 C 112 32, 182 68, 244 126 C 286 164, 314 194, 336 212",
      headTop: "M 336 212 C 306 204, 276 186, 244 154",
      headBottom: "M 336 212 C 318 176, 298 144, 274 114",
      viewBox: "0 0 360 236",
    };
  }

  return {
    shaft: "M 332 26 C 248 32, 178 68, 116 126 C 74 164, 46 194, 24 212",
    headTop: "M 24 212 C 54 204, 84 186, 116 154",
    headBottom: "M 24 212 C 42 176, 62 144, 86 114",
    viewBox: "0 0 360 236",
  };
}

type FlowStepStyle = CSSProperties & Record<`--${string}`, string>;

function renderFlowStepCopy(step: FlowStepData, isMobileLayout: boolean) {
  if (!isMobileLayout || !step.mobileDescriptionLines || step.mobileDescriptionLines.length === 0) {
    return step.description;
  }

  return step.mobileDescriptionLines.map((line, index) => (
    <Fragment key={`${step.id}-${index}`}>
      <span className="wf-flow-step-mobile-line">{line}</span>
    </Fragment>
  ));
}

function renderFlowStepTitle(step: FlowStepData, isMobileLayout: boolean) {
  if (!isMobileLayout || !step.mobileTitleLines || step.mobileTitleLines.length === 0) {
    return step.title;
  }

  return step.mobileTitleLines.map((line, index) => (
    <Fragment key={`title-${step.id}-${index}`}>
      <span className="wf-flow-step-title-line">{line}</span>
    </Fragment>
  ));
}

function buildFlowStepStyle(step: FlowStepData, isMobileLayout: boolean): FlowStepStyle {
  const layout = getFlowStepLayout(step, isMobileLayout);
  const style: FlowStepStyle = {
    "--wf-flow-step-overlap": layout.overlap ?? "0px",
    "--wf-flow-step-content-margin-top": layout.contentMarginTop ?? "0px",
    "--wf-flow-step-content-margin-left": layout.contentMarginLeft ?? "0px",
    "--wf-flow-step-phone-content-inset-top": layout.contentInsetTop ?? "0px",
    "--wf-flow-step-phone-content-inset-right": layout.contentInsetRight ?? "0px",
    "--wf-flow-step-phone-content-inset-bottom": layout.contentInsetBottom ?? "0px",
    "--wf-flow-step-phone-content-inset-left": layout.contentInsetLeft ?? "0px",
    "--wf-flow-arrow-shift-x": layout.arrowShiftX ?? "0px",
    "--wf-flow-arrow-shift-y": layout.arrowShiftY ?? "0px",
  };

  if (layout.minHeight) {
    style["--wf-flow-step-phone-min-height"] = layout.minHeight;
  }

  if (layout.paddingTop) {
    style["--wf-flow-step-phone-padding-top"] = layout.paddingTop;
  }

  if (layout.paddingBottom) {
    style["--wf-flow-step-phone-padding-bottom"] = layout.paddingBottom;
  }

  if (layout.cardWidth) {
    style["--wf-flow-step-phone-card-width"] = layout.cardWidth;
  }

  if (layout.longCardWidth) {
    style["--wf-flow-step-phone-long-card-width"] = layout.longCardWidth;
  }

  if (layout.longCardMaxWidth) {
    style["--wf-flow-step-phone-long-card-max-width"] = layout.longCardMaxWidth;
  }

  if (layout.arrowTop) {
    style["--wf-flow-step-phone-arrow-top"] = layout.arrowTop;
  }

  if (layout.arrowLeft) {
    style["--wf-flow-step-phone-arrow-left"] = layout.arrowLeft;
  }

  if (layout.arrowWidth) {
    style["--wf-flow-step-phone-arrow-width"] = layout.arrowWidth;
  }

  if (layout.arrowHeight) {
    style["--wf-flow-step-phone-arrow-height"] = layout.arrowHeight;
  }

  if (layout.arrowOffsetX) {
    style["--wf-flow-step-phone-arrow-offset-x"] = layout.arrowOffsetX;
  }

  if (layout.arrowOffsetY) {
    style["--wf-flow-step-phone-arrow-offset-y"] = layout.arrowOffsetY;
  }

  return style;
}

export function FlowStep({ step, index, isLast, isMobileLayout, frameSources }: FlowStepProps) {
  const isLeft = index % 2 === 0;
  const arrowPathData = getArrowPathData(isLeft, isMobileLayout);
  const roughArrowPaths = {
    shaft: buildRoughArrowPaths(arrowPathData.shaft, step.id * 10 + 1),
    headTop: buildRoughArrowPaths(arrowPathData.headTop, step.id * 10 + 2),
    headBottom: buildRoughArrowPaths(arrowPathData.headBottom, step.id * 10 + 3),
  };
  const stepStyle = buildFlowStepStyle(step, isMobileLayout);

  return (
    <article
      className={`js-flow-step wf-flow-step wf-flow-step--step-${step.id} ${isLeft ? "wf-flow-step--left" : "wf-flow-step--right"} ${!isLast ? "wf-flow-step--with-arrow" : ""}`}
      data-flow-step-id={step.id}
      style={stepStyle}
    >
      <div
        className={`js-flow-step-visual wf-flow-step-card-shell${step.isLongDescription ? " wf-flow-step-card-shell--long" : ""}`}
      >
        <div className="wf-flow-step-card">
          <div className="wf-flow-step-frame-layer" aria-hidden>
            {frameSources.map((frameSrc) => (
              <Image
                key={`${step.id}-${frameSrc}`}
                src={withBasePath(frameSrc)}
                alt=""
                fill
                loading={index === 0 ? "eager" : undefined}
                quality={100}
                unoptimized
                sizes={FLOW_STEP_FRAME_SIZES}
                className="js-flow-frame wf-flow-step-frame"
                style={{ opacity: frameSrc === frameSources[0] ? 1 : 0 }}
              />
            ))}
          </div>

          <div
            className={`js-flow-step-content wf-flow-step-content${step.isLongDescription ? " wf-flow-step-content--long" : ""}`}
          >
            <h2 className="wf-flow-step-title wf-maki-title">{renderFlowStepTitle(step, isMobileLayout)}</h2>
            <div className="wf-flow-step-copy">{renderFlowStepCopy(step, isMobileLayout)}</div>
          </div>
        </div>
      </div>

      {!isLast ? (
        <svg
          className={`js-flow-arrow wf-flow-step-arrow ${isMobileLayout ? "wf-flow-step-arrow--mobile" : isLeft ? "wf-flow-step-arrow--to-right" : "wf-flow-step-arrow--to-left"}`}
          viewBox={arrowPathData.viewBox}
          aria-hidden
        >
          {roughArrowPaths.shaft.map((path) => (
            <path key={`${step.id}-shaft-${path}`} className="js-flow-arrow-path wf-flow-step-arrow-path" d={path} />
          ))}
          {roughArrowPaths.headTop.map((path) => (
            <path
              key={`${step.id}-head-top-${path}`}
              className="js-flow-arrow-path wf-flow-step-arrow-path"
              d={path}
            />
          ))}
          {roughArrowPaths.headBottom.map((path) => (
            <path
              key={`${step.id}-head-bottom-${path}`}
              className="js-flow-arrow-path wf-flow-step-arrow-path"
              d={path}
            />
          ))}
        </svg>
      ) : null}
    </article>
  );
}
