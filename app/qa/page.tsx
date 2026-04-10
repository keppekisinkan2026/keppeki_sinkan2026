import type { Metadata } from "next";
import Image from "next/image";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { QaAccordion } from "@/components/qa/QaAccordion";
import { MAINTENANCE_MOBILE_MAX_WIDTH, REFERENCE_PHONE_WIDTH } from "@/lib/referenceMobile";
import { createPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/withBasePath";
import { qaItems } from "./content";

export const metadata: Metadata = createPageMetadata({
  title: "Q&A",
  description:
    "劇団ケッペキの新歓に関するよくある質問をまとめています。活動頻度、兼サー、経験の有無などを確認できます。",
  path: "/qa",
});

export default function QaWireframePage() {
  return (
    <WireframeShell
      screenClassName="wf-screen--qa"
      frameClassName="wf-frame--qa"
      innerClassName="wf-frame-inner--qa"
      mobileReferenceWidth={REFERENCE_PHONE_WIDTH}
      mobileMaxWidth={MAINTENANCE_MOBILE_MAX_WIDTH}
    >
      <section className="wf-qa-page">
        <section className="wf-qa-card" aria-labelledby="wf-qa-title">
          <h1 id="wf-qa-title" className="wf-card-title wf-qa-title wf-maki-title">
            Q&amp;A
          </h1>
          <QaAccordion items={qaItems} />
        </section>

        <section className="wf-qa-illustration-strip" aria-hidden>
          <div className="wf-qa-plant-wrap">
            <Image
              src={withBasePath("/images/futaba.PNG")}
              alt=""
              width={1678}
              height={920}
              quality={100}
              unoptimized
              sizes="(max-width: 480px) 72vw, (max-width: 720px) 76vw, (max-width: 1100px) 68vw, 980px"
              className="wf-qa-futaba"
            />
          </div>
        </section>
      </section>
    </WireframeShell>
  );
}
