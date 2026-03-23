import type { CSSProperties } from "react";
import Image from "next/image";
import { leafFrameSources, type DepartmentConfig } from "@/app/maintenance/departments/content";
import { withBasePath } from "@/lib/withBasePath";

type DepartmentPhotoCardStyle = CSSProperties & {
  "--wf-dept-photo-offset-x": string;
  "--wf-dept-photo-offset-y": string;
  "--wf-dept-photo-rotate-adjust": string;
};

type DepartmentLeafProps = {
  name: string;
};

type DepartmentLeafStageProps = {
  department: DepartmentConfig;
  onOpen: (department: DepartmentConfig, trigger: HTMLButtonElement) => void;
};

type DepartmentPhotoFieldProps = {
  department: DepartmentConfig;
};

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

function DepartmentLeafStage({ department, onOpen }: DepartmentLeafStageProps) {
  return (
    <div className="wf-dept-leaf-stage">
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
          className={`js-dept-click-sign wf-dept-click-sign ${department.isLeftLeaf ? "wf-dept-click-sign--left" : "wf-dept-click-sign--right"}`}
          aria-hidden
        >
          \click!/
        </span>
        <DepartmentLeaf name={department.name} />
      </button>
    </div>
  );
}

function DepartmentPhotoField({ department }: DepartmentPhotoFieldProps) {
  if (!department.sidePhotos || department.sidePhotos.length === 0) {
    return null;
  }

  const stageSideClass = department.isLeftLeaf ? "wf-dept-photo-stage--right" : "wf-dept-photo-stage--left";

  return (
    <div className={`wf-dept-photo-stage ${stageSideClass}`} aria-hidden>
      <div className="wf-dept-photo-cluster">
        {department.sidePhotos.map((photo, index) => {
          const photoStyle: DepartmentPhotoCardStyle = {
            "--wf-dept-photo-offset-x": `${photo.offsetX ?? 0}px`,
            "--wf-dept-photo-offset-y": `${photo.offsetY ?? 0}px`,
            "--wf-dept-photo-rotate-adjust": `${photo.rotation ?? 0}deg`,
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
  onOpen: (department: DepartmentConfig, trigger: HTMLButtonElement) => void;
};

export function DepartmentRow({ department, onOpen }: DepartmentRowProps) {
  const leafStage = <DepartmentLeafStage department={department} onOpen={onOpen} />;
  const photoField = <DepartmentPhotoField department={department} />;
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
