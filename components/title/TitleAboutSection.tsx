import Image from "next/image";
import type { RefObject } from "react";
import {
  aboutCommonAnimFrameSources,
  aboutCampusText,
  aboutImg1FrameSources,
  aboutImg2FrameSources,
  aboutImg3FrameSources,
  aboutImg4FrameSources,
  aboutImg5FrameSources,
  aboutImgFuneFrameSources,
  aboutImgPichiFrameSources,
  aboutImgSinzinFrameSources,
  aboutProduceText,
  aboutRowParagraphs,
  aboutSectionRows,
  aboutYearRoundText,
} from "@/app/title/content";
import { TitleFrameSequence } from "./TitleFrameSequence";

type TitleAboutSectionProps = {
  aboutStageRef: RefObject<HTMLElement | null>;
  aboutPanelRef: RefObject<HTMLDivElement | null>;
};

export function TitleAboutSection({ aboutStageRef, aboutPanelRef }: TitleAboutSectionProps) {
  return (
    <section ref={aboutStageRef} className="wf-title-scroll-block wf-title-about-stage">
      <div
        ref={aboutPanelRef}
        id="about"
        className="wf-analog-about-panel wf-title-section wf-title-about-section"
      >
        <h2 className="js-about-title wf-maki-title wf-title-section-title">劇団ケッペキとは</h2>

        <div className="wf-title-about-list">
          {aboutSectionRows.map((row, rowIndex) => (
            <article
              key={row.key}
              className={`wf-title-about-row js-about-row ${row.imageLeft ? "wf-title-about-row--image-left" : "wf-title-about-row--image-right"} ${rowIndex === 2 ? "wf-title-about-row--produce" : ""}`}
            >
              {rowIndex === 1 ? (
                <>
                  <div className="js-about-images-left wf-about-images-left wf-about-images-left--year-round" aria-hidden>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImg2FrameSources}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                        className="js-about-img2-frame"
                      />
                    </div>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImg3FrameSources}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                        className="js-about-img3-frame"
                      />
                    </div>
                  </div>

                  <div className="js-about-copy wf-title-about-copy">{aboutCampusText}</div>
                </>
              ) : rowIndex === 2 ? (
                <>
                  <div className="js-about-copy wf-title-about-copy">{aboutProduceText}</div>

                  <div className="js-about-images-right wf-about-images-right" aria-hidden>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImgSinzinFrameSources}
                        sizes="(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px"
                        className="js-about-img-sinzin-frame"
                        getClassName={(index) =>
                          index < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : undefined
                        }
                      />
                    </div>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImgFuneFrameSources}
                        sizes="(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px"
                        className="js-about-img-fune-frame"
                        getClassName={(index) =>
                          index < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : undefined
                        }
                      />
                    </div>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImgPichiFrameSources}
                        sizes="(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px"
                        className="js-about-img-pichi-frame"
                        getClassName={(index) =>
                          index < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : undefined
                        }
                      />
                    </div>
                  </div>
                </>
              ) : rowIndex === 3 ? (
                <>
                  <div className="js-about-images-left wf-about-images-left" aria-hidden>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImg4FrameSources}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                        className="js-about-img4-frame"
                      />
                    </div>
                    <div className="wf-about-anim-container">
                      <TitleFrameSequence
                        frameSources={aboutImg5FrameSources}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                        className="js-about-img5-frame"
                      />
                    </div>
                  </div>

                  <div className="js-about-copy wf-title-about-copy">{aboutYearRoundText}</div>
                </>
              ) : (
                <>
                  <div className="js-about-copy wf-title-about-copy">
                    <>
                      {rowIndex === 0 ? (
                        <p className="wf-about-kicker wf-maki-title">京都大学公認演劇サークル</p>
                      ) : null}
                      {aboutRowParagraphs[rowIndex].map((paragraph, index) => (
                        <p key={`${row.key}-${index}`} className="js-about-text wf-about-text">
                          {paragraph}
                        </p>
                      ))}
                    </>
                  </div>

                  {rowIndex === 0 ? (
                    <div className="js-about-image-container wf-about-anim-container" aria-hidden>
                      <TitleFrameSequence
                        frameSources={aboutImg1FrameSources}
                        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 420px"
                        className="js-about-img1-frame"
                      />
                    </div>
                  ) : (
                    <div className="js-about-image wf-title-about-image">画像</div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
