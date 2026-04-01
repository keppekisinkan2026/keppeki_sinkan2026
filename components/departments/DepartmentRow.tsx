import type { CSSProperties } from "react";
import Image from "next/image";
import {
  getDepartmentPhoneLayout,
  leafFrameSources,
  type DepartmentConfig,
  type DepartmentPhoneLayout,
  type DepartmentPhoneTransform,
} from "@/app/departments/content";
import { withBasePath } from "@/lib/withBasePath";

type DepartmentLeafStageStyle = CSSProperties & {
  "--wf-dept-leaf-manual-x"?: string;
  "--wf-dept-leaf-manual-y"?: string;
  "--wf-dept-leaf-manual-rotate"?: string;
  "--wf-dept-leaf-manual-scale"?: string;
};

type DepartmentPhotoStageStyle = CSSProperties & {
  "--wf-dept-photo-stage-manual-x"?: string;
  "--wf-dept-photo-stage-manual-y"?: string;
  "--wf-dept-photo-stage-manual-rotate"?: string;
  "--wf-dept-photo-stage-manual-scale"?: string;
};

type DepartmentPhotoCardStyle = CSSProperties & {
  "--wf-dept-photo-offset-x": string;
  "--wf-dept-photo-offset-y": string;
  "--wf-dept-photo-rotate-adjust": string;
  "--wf-dept-photo-manual-x"?: string;
  "--wf-dept-photo-manual-y"?: string;
  "--wf-dept-photo-manual-rotate"?: string;
  "--wf-dept-photo-manual-scale"?: string;
};

type DepartmentLeafProps = {
  name: string;
};

type DepartmentLeafStageProps = {
  department: DepartmentConfig;
  isMobileLayout: boolean;
  clickSignStyle?: CSSProperties;
  leafStageStyle?: DepartmentLeafStageStyle;
  onOpen: (department: DepartmentConfig, trigger: HTMLButtonElement) => void;
};

type DepartmentPhotoFieldProps = {
  department: DepartmentConfig;
  isPhoneLayout: boolean;
  phoneLayout?: DepartmentPhoneLayout;
};

function toPx(value?: number) {
  return value === undefined ? undefined : `${value}px`;
}

function toDeg(value?: number) {
  return value === undefined ? undefined : `${value}deg`;
}

function toScale(value?: number) {
  return value === undefined ? undefined : `${value}`;
}

function getLeafStageStyle(transform?: DepartmentPhoneTransform): DepartmentLeafStageStyle | undefined {
  if (!transform) {
    return undefined;
  }

  return {
    "--wf-dept-leaf-manual-x": toPx(transform.x),
    "--wf-dept-leaf-manual-y": toPx(transform.y),
    "--wf-dept-leaf-manual-rotate": toDeg(transform.rotate),
    "--wf-dept-leaf-manual-scale": toScale(transform.scale),
  };
}

function getPhotoStageStyle(transform?: DepartmentPhoneTransform): DepartmentPhotoStageStyle | undefined {
  if (!transform) {
    return undefined;
  }

  return {
    "--wf-dept-photo-stage-manual-x": toPx(transform.x),
    "--wf-dept-photo-stage-manual-y": toPx(transform.y),
    "--wf-dept-photo-stage-manual-rotate": toDeg(transform.rotate),
    "--wf-dept-photo-stage-manual-scale": toScale(transform.scale),
  };
}

function getPhotoCardManualStyle(transform?: DepartmentPhoneTransform) {
  if (!transform) {
    return {};
  }

  return {
    "--wf-dept-photo-manual-x": toPx(transform.x),
    "--wf-dept-photo-manual-y": toPx(transform.y),
    "--wf-dept-photo-manual-rotate": toDeg(transform.rotate),
    "--wf-dept-photo-manual-scale": toScale(transform.scale),
  };
}

function getClickSignStyle(isLeftLeaf: boolean, transform?: DepartmentPhoneLayout["tap"]): CSSProperties | undefined {
  if (!transform) {
    return undefined;
  }

  const style: CSSProperties = {
    top: toPx(transform.y),
    transform: `rotate(${transform.rotate ?? 0}deg)`,
  };

  if (isLeftLeaf) {
    style.left = toPx(transform.x);
  } else {
    style.right = toPx(transform.x);
  }

  return style;
}

function DepartmentLeaf({ name }: DepartmentLeafProps) {
  return (
    <div className="js-dept-leaf-wrapper wf-dept-leaf-wrapper">
      {leafFrameSources.map((frameSrc) => (
        <Image
          key={`${name}-${frameSrc}`}
          src={withBasePath(frameSrc)}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 300px"
          className="js-leaf-frame"
        />
      ))}
      <span className="js-leaf-label wf-dept-leaf-text wf-maki-title">{name}</span>
    </div>
  );
}

function DepartmentLeafStage({
  department,
  isMobileLayout,
  clickSignStyle,
  leafStageStyle,
  onOpen,
}: DepartmentLeafStageProps) {
  const clickSignLabel = isMobileLayout ? "tap!" : "\\click!/";

  return (
    <div className="wf-dept-leaf-stage" style={leafStageStyle}>
      <button
        type="button"
        className={`js-dept-leaf-button wf-dept-leaf-button ${department.isLeftLeaf ? "wf-dept-leaf-button--left" : "wf-dept-leaf-button--right"}`}
        onClick={(event) => {
          onOpen(department, event.currentTarget);
        }}
        aria-haspopup="dialog"
        aria-label={`${department.name}の説明を開く`}
      >
        <span
          className={`js-dept-click-sign wf-dept-click-sign wf-maki-title ${department.isLeftLeaf ? "wf-dept-click-sign--left" : "wf-dept-click-sign--right"}`}
          aria-hidden
          style={clickSignStyle}
        >
          {clickSignLabel}
        </span>
        <DepartmentLeaf name={department.name} />
      </button>
    </div>
  );
}

function DepartmentPhotoField({ department, isPhoneLayout, phoneLayout }: DepartmentPhotoFieldProps) {
  if (!department.sidePhotos || department.sidePhotos.length === 0) {
    return null;
  }

  const stageSideClass = department.isLeftLeaf ? "wf-dept-photo-stage--right" : "wf-dept-photo-stage--left";
  const photoStageStyle = isPhoneLayout ? getPhotoStageStyle(phoneLayout?.photoStage) : undefined;

  return (
    <div className={`wf-dept-photo-stage ${stageSideClass}`} aria-hidden style={photoStageStyle}>
      <div className="wf-dept-photo-cluster">
        {department.sidePhotos.map((photo, index) => {
          const photoStyle: DepartmentPhotoCardStyle = {
            "--wf-dept-photo-offset-x": `${photo.offsetX ?? 0}px`,
            "--wf-dept-photo-offset-y": `${photo.offsetY ?? 0}px`,
            "--wf-dept-photo-rotate-adjust": `${photo.rotation ?? 0}deg`,
            ...(isPhoneLayout ? getPhotoCardManualStyle(phoneLayout?.photoCards?.[index]) : {}),
          };

          return (
            <div
              key={`${department.name}-${photo.id}`}
              className={`wf-dept-photo-card wf-dept-photo-card--${index + 1}`}
              style={photoStyle}
            >
              <div className="js-dept-photo-reveal wf-dept-photo-reveal">
                <div className={`wf-dept-photo-paper${photo.src ? "" : " wf-dept-photo-paper--placeholder"}`}>
                  {photo.src ? (
                    <Image
                      src={withBasePath(photo.src)}
                      alt=""
                      width={photo.width}
                      height={photo.height}
                      quality={100}
                      unoptimized
                      sizes="(max-width: 640px) 28vw, (max-width: 1024px) 18vw, 260px"
                      className="wf-dept-photo-image"
                    />
                  ) : (
                    <div className="wf-dept-photo-placeholder">
                      <span className="wf-dept-photo-placeholder-tag">placeholder</span>
                      <span className="wf-dept-photo-placeholder-name">{photo.label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type DepartmentRowProps = {
  department: DepartmentConfig;
  isMobileLayout: boolean;
  isPhoneLayout: boolean;
  onOpen: (department: DepartmentConfig, trigger: HTMLButtonElement) => void;
};

export function DepartmentRow({ department, isMobileLayout, isPhoneLayout, onOpen }: DepartmentRowProps) {
  const phoneLayout = isPhoneLayout ? getDepartmentPhoneLayout(department.id) : undefined;
  const leafStageStyle = isPhoneLayout ? getLeafStageStyle(phoneLayout?.leaf) : undefined;
  const clickSignStyle = isPhoneLayout ? getClickSignStyle(department.isLeftLeaf, phoneLayout?.tap) : undefined;

  const leafStage = (
    <DepartmentLeafStage
      department={department}
      isMobileLayout={isMobileLayout}
      clickSignStyle={clickSignStyle}
      leafStageStyle={leafStageStyle}
      onOpen={onOpen}
    />
  );
  const photoField = <DepartmentPhotoField department={department} isPhoneLayout={isPhoneLayout} phoneLayout={phoneLayout} />;
  const hasPhotos = Boolean(department.sidePhotos && department.sidePhotos.length > 0);

  if (!hasPhotos) {
    return (
      <li className={`js-dept-row wf-dept-row wf-dept-row--solo ${department.isLeftLeaf ? "wf-dept-row--left" : "wf-dept-row--right"}`}>
        <div className="wf-dept-cell-solo">{leafStage}</div>
      </li>
    );
  }

  return (
    <li className={`js-dept-row wf-dept-row ${department.isLeftLeaf ? "wf-dept-row--left" : "wf-dept-row--right"}`}>
      <div className="wf-dept-cell-left">{department.isLeftLeaf ? leafStage : photoField}</div>
      <div className="wf-dept-cell-right">{department.isLeftLeaf ? photoField : leafStage}</div>
    </li>
  );
}
