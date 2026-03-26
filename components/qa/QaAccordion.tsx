"use client";

import { useState } from "react";
import Image from "next/image";
import type { QaItem } from "@/app/maintenance/qa/content";
import { withBasePath } from "@/lib/withBasePath";

type QaAccordionProps = {
  items: readonly QaItem[];
};

export function QaAccordion({ items }: QaAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="wf-qa-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `wf-qa-panel-${index}`;

        return (
          <article key={item.question} className={`wf-qa-item${isOpen ? " is-open" : ""}`}>
            <h2 className="wf-qa-item-title">
              <button
                type="button"
                className="wf-qa-item-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenIndex(isOpen ? null : index);
                }}
              >
                <span className="wf-qa-item-mark" aria-hidden>
                  Q.
                </span>
                <span className="wf-qa-item-question">{item.question}</span>
                <span className="wf-qa-item-toggle-shell" aria-hidden>
                  <span className="wf-qa-item-toggle-bubble">
                    <span className="wf-qa-item-toggle-symbol">{isOpen ? "−" : "+"}</span>
                  </span>
                </span>
              </button>
            </h2>

            <div id={panelId} className={`wf-qa-answer-shell${isOpen ? " is-open" : ""}`}>
              <div className="wf-qa-answer-panel">
                <span className="wf-qa-item-mark wf-qa-item-mark--answer" aria-hidden>
                  A.
                </span>
                <div className="wf-qa-answer-copy">
                  {item.answerLines.map((line, lineIndex) => (
                    <p
                      key={`${item.question}-${lineIndex}`}
                      className={`wf-qa-answer-line${lineIndex === item.answerLines.length - 1 ? " wf-qa-answer-line--last" : ""}`}
                    >
                      {line}
                    </p>
                  ))}

                  {item.qrCodeSrc ? (
                    <div className="wf-qa-answer-qr-shell">
                      <Image
                        src={withBasePath(item.qrCodeSrc)}
                        alt="入団申し込み用 公式LINE QRコード"
                        width={357}
                        height={357}
                        quality={100}
                        unoptimized
                        sizes="(max-width: 480px) 42vw, (max-width: 840px) 220px, 260px"
                        className="wf-qa-answer-qr"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
