import Image from "next/image";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { QaAccordion } from "@/components/qa/QaAccordion";
import { withBasePath } from "@/lib/withBasePath";
import { qaItems } from "./content";

export default function QaWireframePage() {
  return (
    <WireframeShell frameClassName="wf-frame--qa" innerClassName="wf-frame-inner--qa">
      <section className="wf-qa-page">
        <section className="wf-qa-card" aria-labelledby="wf-qa-title">
          <h1 id="wf-qa-title" className="wf-card-title wf-qa-title wf-maki-title">
            Q&amp;A
          </h1>
          <QaAccordion items={qaItems} />
        </section>

        <section className="wf-qa-illustration-strip" aria-hidden>
          <Image
            src={withBasePath("/images/chara_2.PNG")}
            alt=""
            width={595}
            height={842}
            quality={100}
            unoptimized
            sizes="(max-width: 640px) 20vw, (max-width: 1100px) 16vw, 180px"
            className="wf-qa-character wf-qa-character--left"
          />

          <div className="wf-qa-plant-wrap">
            <Image
              src={withBasePath("/images/futaba.PNG")}
              alt=""
              width={2048}
              height={2048}
              quality={100}
              unoptimized
              sizes="(max-width: 640px) 34vw, (max-width: 1100px) 28vw, 360px"
              className="wf-qa-futaba"
            />
          </div>

          <Image
            src={withBasePath("/images/chara_1.PNG")}
            alt=""
            width={595}
            height={842}
            quality={100}
            unoptimized
            sizes="(max-width: 640px) 20vw, (max-width: 1100px) 16vw, 180px"
            className="wf-qa-character wf-qa-character--right"
          />
        </section>
      </section>
    </WireframeShell>
  );
}
