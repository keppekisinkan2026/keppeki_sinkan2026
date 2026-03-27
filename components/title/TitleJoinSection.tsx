import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";
import { TitlePanelBackground } from "./TitlePanelBackground";

export function TitleJoinSection() {
  return (
    <section className="wf-title-scroll-block">
      <div className="js-title-reveal wf-title-section wf-title-join-section wf-analog-join-panel">
        <TitlePanelBackground
          src="/images/nyudan.PNG"
          sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1000px"
          containerClassName="wf-analog-join-background"
          imageClassName="wf-analog-join-background-image"
        />

        <div className="wf-join-tape-text wf-maki-title">入団希望の方へ</div>
        <div className="wf-join-content">
          <p className="wf-join-message wf-maki-title">
            以下の公式LINEから入団を
            受け付けています！5/10(日)まで！
          </p>

          <div className="wf-join-qr-placeholder" aria-label="公式LINE QRコード">
            <Image
              src={withBasePath("/images/qr.png")}
              alt="公式LINE QRコード"
              width={357}
              height={357}
              quality={100}
              unoptimized
              sizes="(max-width: 700px) 34vw, 280px"
              className="wf-join-qr-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
