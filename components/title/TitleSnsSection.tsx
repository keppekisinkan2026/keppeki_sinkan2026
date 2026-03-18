import Image from "next/image";
import { snsBlockLinks, snsFrameSources } from "@/app/title/content";
import { withBasePath } from "@/lib/withBasePath";
import { TitleFrameSequence } from "./TitleFrameSequence";

export function TitleSnsSection() {
  return (
    <section id="sns" className="wf-title-scroll-block wf-title-sns-stage wf-title-sns-section">
      <div className="js-title-reveal wf-title-sns-panel">
        <div className="wf-title-sns-frame-layer" aria-hidden>
          <TitleFrameSequence
            frameSources={snsFrameSources}
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1320px"
            className="js-sns-frame wf-title-sns-frame"
            getStyle={(index) => ({ opacity: index === 0 ? 1 : 0 })}
          />
        </div>

        <div className="wf-title-sns-content">
          <h2 className="js-sns-title wf-maki-title wf-title-section-title">SNS</h2>

          <ul className="wf-title-sns-list">
            {snsBlockLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="js-sns-icon wf-title-sns-link"
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="wf-title-sns-bubble">
                    <Image
                      src={withBasePath(item.iconPath)}
                      alt=""
                      width={60}
                      height={60}
                      className={`wf-title-social-icon wf-title-social-icon--${item.id}`}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
