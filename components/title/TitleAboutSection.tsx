import type { CSSProperties, ReactNode, RefObject } from "react";
import {
  aboutCommonAnimFrameSources,
  aboutCampusText,
  aboutHistoryParagraphs,
  aboutImg1FrameSources,
  aboutImg2FrameSources,
  aboutImg3FrameSources,
  aboutImg4FrameSources,
  aboutImg5FrameSources,
  aboutImgFuneFrameSources,
  aboutImgPichiFrameSources,
  aboutImgSinzinFrameSources,
  aboutProduceText,
  aboutYearRoundText,
} from "@/app/title/content";
import { joinClassNames } from "@/lib/joinClassNames";
import { TitlePanelBackground } from "./TitlePanelBackground";
import { TitleFrameSequence } from "./TitleFrameSequence";

type TitleAboutSectionProps = {
  aboutStageRef: RefObject<HTMLElement | null>;
  aboutPanelRef: RefObject<HTMLDivElement | null>;
  isMobileLayout: boolean;
};

type AboutFrameConfig = {
  className: string;
  frameSources: readonly string[];
  sizes?: string;
  rotated?: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
};

type AboutRowProps = {
  className: string;
  children: ReactNode;
};

const MOBILE_STANDARD_FRAME_SIZES = "(max-width: 640px) 36vw, (max-width: 1024px) 28vw, 300px";
const MOBILE_FAN_FRAME_SIZES = "(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 220px";
const MOBILE_HISTORY_FRAME_SIZES = "(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 300px";
const DESKTOP_STANDARD_FRAME_SIZES = "(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px";
const DESKTOP_PRODUCE_FRAME_SIZES = "(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px";
const DESKTOP_HISTORY_FRAME_SIZES = "(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 420px";

const mobileProduceTopFrames: readonly AboutFrameConfig[] = [
  { className: "js-about-img2-frame", frameSources: aboutImg2FrameSources },
  { className: "js-about-img3-frame", frameSources: aboutImg3FrameSources },
];

const mobileProduceFanFrames: readonly AboutFrameConfig[] = [
  {
    className: "js-about-img-sinzin-frame",
    frameSources: aboutImgSinzinFrameSources,
    rotated: true,
    containerClassName: "wf-about-mobile-fan-card wf-about-mobile-fan-card--sinzin",
    containerStyle: {
      top: "5px",
      left: "-10%",
      transform: "rotate(-18deg)",
      zIndex: 3,
    },
  },
  {
    className: "js-about-img-fune-frame",
    frameSources: aboutImgFuneFrameSources,
    rotated: true,
    containerClassName: "wf-about-mobile-fan-card wf-about-mobile-fan-card--fune",
    containerStyle: {
      top: "-50px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 0,
    },
  },
  {
    className: "js-about-img-pichi-frame",
    frameSources: aboutImgPichiFrameSources,
    rotated: true,
    containerClassName: "wf-about-mobile-fan-card wf-about-mobile-fan-card--pichi",
    containerStyle: {
      top: "0px",
      right: "-10%",
      transform: "rotate(18deg)",
      zIndex: 2,
    },
  },
];

const mobileYearRoundFrames: readonly AboutFrameConfig[] = [
  { className: "js-about-img4-frame", frameSources: aboutImg4FrameSources },
  { className: "js-about-img5-frame", frameSources: aboutImg5FrameSources },
];

function getRotatedFrameClassName(index: number) {
  return index < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : undefined;
}

function AboutFrame({
  className,
  frameSources,
  sizes,
  rotated = false,
  containerClassName,
  containerStyle,
}: AboutFrameConfig & { sizes: string }) {
  return (
    <div className={joinClassNames("wf-about-anim-container", containerClassName)} style={containerStyle}>
      <TitleFrameSequence
        frameSources={frameSources}
        sizes={sizes}
        className={className}
        getClassName={rotated ? getRotatedFrameClassName : undefined}
      />
    </div>
  );
}

function AboutFrameGroup({
  className,
  frameConfigs,
  sizes,
}: {
  className: string;
  frameConfigs: readonly AboutFrameConfig[];
  sizes: string;
}) {
  return (
    <div className={joinClassNames(className)} aria-hidden>
      {frameConfigs.map((frameConfig) => (
        <AboutFrame key={frameConfig.className} {...frameConfig} sizes={frameConfig.sizes ?? sizes} />
      ))}
    </div>
  );
}

function renderHistoryCopy() {
  return (
    <div className="js-about-copy wf-title-about-copy">
      <>
        <p className="wf-about-kicker wf-maki-title">
          <span className="wf-about-mobile-line">京都大学公認</span>
          <span className="wf-about-mobile-line">演劇サークル</span>
        </p>
        {aboutHistoryParagraphs.map((paragraph, index) => (
          <p key={`about-1-${index}`} className="js-about-text wf-about-text">
            {paragraph}
          </p>
        ))}
      </>
    </div>
  );
}

function AboutRow({ className, children }: AboutRowProps) {
  return <article className={joinClassNames("wf-title-about-row js-about-row", className)}>{children}</article>;
}

function renderMobileHistoryRow() {
  return (
    <AboutRow className="wf-title-about-row--history">
      {renderHistoryCopy()}

      <AboutFrameGroup
        className="wf-about-mobile-history-image"
        frameConfigs={[{ className: "js-about-img1-frame", frameSources: aboutImg1FrameSources }]}
        sizes={MOBILE_HISTORY_FRAME_SIZES}
      />
    </AboutRow>
  );
}

function renderMobileCampusRow() {
  return (
    <AboutRow className="wf-title-about-row--campus">
      <div className="js-about-copy wf-title-about-copy">{aboutCampusText}</div>
    </AboutRow>
  );
}

function renderMobileProduceRow() {
  return (
    <AboutRow className="wf-title-about-row--produce">
      <AboutFrameGroup
        className="wf-about-mobile-double wf-about-mobile-double--produce-top"
        frameConfigs={mobileProduceTopFrames}
        sizes={MOBILE_STANDARD_FRAME_SIZES}
      />

      <div className="js-about-copy wf-title-about-copy">{aboutProduceText}</div>

      <AboutFrameGroup
        className="js-about-images-right wf-about-images-right wf-about-images-right--mobile-fan"
        frameConfigs={mobileProduceFanFrames}
        sizes={MOBILE_FAN_FRAME_SIZES}
      />
    </AboutRow>
  );
}

function renderMobileYearRoundRow() {
  return (
    <AboutRow className="wf-title-about-row--year-round">
      <div className="js-about-copy wf-title-about-copy">{aboutYearRoundText}</div>

      <AboutFrameGroup
        className="wf-about-mobile-double wf-about-mobile-double--year-round"
        frameConfigs={mobileYearRoundFrames}
        sizes={MOBILE_STANDARD_FRAME_SIZES}
      />
    </AboutRow>
  );
}

export function TitleAboutSection({ aboutStageRef, aboutPanelRef, isMobileLayout }: TitleAboutSectionProps) {
  return (
    <section ref={aboutStageRef} className="wf-title-scroll-block wf-title-about-stage">
      <div
        ref={aboutPanelRef}
        id="about"
        className="wf-analog-about-panel wf-title-section wf-title-about-section"
      >
        <TitlePanelBackground
          src="/images/block_large.png"
          sizes="(max-width: 640px) 112vw, (max-width: 1024px) 122vw, 1800px"
          containerClassName="wf-analog-about-background"
          imageClassName="wf-analog-about-background-image"
        />

        <h2 className="js-about-title wf-maki-title wf-title-section-title">劇団ケッペキとは</h2>

        <div className="wf-title-about-list">
          {isMobileLayout ? (
            <>
              {renderMobileHistoryRow()}
              {renderMobileCampusRow()}
              {renderMobileProduceRow()}
              {renderMobileYearRoundRow()}
            </>
          ) : (
            <>
              <article className="wf-title-about-row js-about-row wf-title-about-row--image-right">
                {renderHistoryCopy()}

                <div className="js-about-image-container wf-about-anim-container" aria-hidden>
                  <TitleFrameSequence
                    frameSources={aboutImg1FrameSources}
                    sizes={DESKTOP_HISTORY_FRAME_SIZES}
                    className="js-about-img1-frame"
                  />
                </div>
              </article>

              <article className="wf-title-about-row js-about-row wf-title-about-row--image-left">
                <div className="js-about-images-left wf-about-images-left wf-about-images-left--year-round" aria-hidden>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImg2FrameSources}
                      sizes={DESKTOP_STANDARD_FRAME_SIZES}
                      className="js-about-img2-frame"
                    />
                  </div>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImg3FrameSources}
                      sizes={DESKTOP_STANDARD_FRAME_SIZES}
                      className="js-about-img3-frame"
                    />
                  </div>
                </div>

                <div className="js-about-copy wf-title-about-copy">{aboutCampusText}</div>
              </article>

              <article className="wf-title-about-row js-about-row wf-title-about-row--image-right wf-title-about-row--produce">
                <div className="js-about-copy wf-title-about-copy">{aboutProduceText}</div>

                <div className="js-about-images-right wf-about-images-right" aria-hidden>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImgSinzinFrameSources}
                      sizes={DESKTOP_PRODUCE_FRAME_SIZES}
                      className="js-about-img-sinzin-frame"
                      getClassName={getRotatedFrameClassName}
                    />
                  </div>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImgFuneFrameSources}
                      sizes={DESKTOP_PRODUCE_FRAME_SIZES}
                      className="js-about-img-fune-frame"
                      getClassName={getRotatedFrameClassName}
                    />
                  </div>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImgPichiFrameSources}
                      sizes={DESKTOP_PRODUCE_FRAME_SIZES}
                      className="js-about-img-pichi-frame"
                      getClassName={getRotatedFrameClassName}
                    />
                  </div>
                </div>
              </article>

              <article className="wf-title-about-row js-about-row wf-title-about-row--image-left">
                <div className="js-about-images-left wf-about-images-left" aria-hidden>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImg4FrameSources}
                      sizes={DESKTOP_STANDARD_FRAME_SIZES}
                      className="js-about-img4-frame"
                    />
                  </div>
                  <div className="wf-about-anim-container">
                    <TitleFrameSequence
                      frameSources={aboutImg5FrameSources}
                      sizes={DESKTOP_STANDARD_FRAME_SIZES}
                      className="js-about-img5-frame"
                    />
                  </div>
                </div>

                <div className="js-about-copy wf-title-about-copy">{aboutYearRoundText}</div>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
