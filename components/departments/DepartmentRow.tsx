import Image from "next/image";
import { leafFrameSources, tapeAssetMap, type DepartmentConfig } from "@/app/maintenance/departments/content";
import { withBasePath } from "@/lib/withBasePath";

type DepartmentLeafProps = {
  name: string;
};

function DepartmentLeaf({ name }: DepartmentLeafProps) {
  return (
    <div className="wf-dept-leaf-wrapper">
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

type DepartmentPhotoClusterProps = {
  department: DepartmentConfig;
};

function DepartmentPhotoCluster({ department }: DepartmentPhotoClusterProps) {
  if (!department.sidePhotos || department.sidePhotos.length === 0) {
    return null;
  }

  return (
    <div
      className={`wf-dept-photo-cluster ${department.isLeftLeaf ? "wf-dept-photo-cluster--left" : "wf-dept-photo-cluster--right"}`}
      aria-hidden
    >
      {department.sidePhotos.map((photo, index) => (
        <div key={`${department.name}-${photo.id}`} className={`wf-dept-photo-card wf-dept-photo-card--${index + 1}`}>
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
                  sizes="(max-width: 640px) 18vw, (max-width: 1024px) 12vw, 176px"
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
      ))}
    </div>
  );
}

function DepartmentLeafStage({ department }: DepartmentPhotoClusterProps) {
  return (
    <div className={`wf-dept-leaf-stage ${department.isLeftLeaf ? "wf-dept-leaf-stage--left" : "wf-dept-leaf-stage--right"}`}>
      <DepartmentPhotoCluster department={department} />
      <DepartmentLeaf name={department.name} />
    </div>
  );
}

type DepartmentTextBlockProps = {
  department: DepartmentConfig;
};

function DepartmentTextBlock({ department }: DepartmentTextBlockProps) {
  return (
    <div className={`js-dept-text-block wf-dept-text-wrapper${department.isLongText ? " wf-dept-text-wrapper--long" : ""}`}>
      <Image
        src={withBasePath("/images/nyudan.PNG")}
        alt=""
        width={2048}
        height={2048}
        quality={100}
        unoptimized
        sizes="(max-width: 640px) 64vw, (max-width: 1024px) 42vw, 480px"
        className="wf-dept-text-bg"
      />
      {department.tapes.map((tape, index) => (
        <Image
          key={`${department.name}-${tape.src}-${tape.pos}-${index}`}
          src={withBasePath(tapeAssetMap[tape.src])}
          alt=""
          width={140}
          height={60}
          quality={100}
          unoptimized
          className={`wf-dept-tape wf-dept-tape--${tape.pos}`}
        />
      ))}
      <div className="wf-dept-desc-text">{department.description}</div>
    </div>
  );
}

type DepartmentRowProps = {
  department: DepartmentConfig;
};

export function DepartmentRow({ department }: DepartmentRowProps) {
  const leaf = <DepartmentLeafStage department={department} />;
  const textBlock = <DepartmentTextBlock department={department} />;

  return (
    <li
      className={`js-dept-row wf-dept-row ${department.isLeftLeaf ? "wf-dept-row--left" : "wf-dept-row--right"}`}
    >
      <div className="wf-dept-cell-left">{department.isLeftLeaf ? leaf : textBlock}</div>
      <div className="wf-dept-cell-right">{department.isLeftLeaf ? textBlock : leaf}</div>
    </li>
  );
}
