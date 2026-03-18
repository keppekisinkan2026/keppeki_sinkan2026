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
  const leaf = <DepartmentLeaf name={department.name} />;
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
