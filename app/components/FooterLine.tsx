import { joinClassNames } from "@/lib/joinClassNames";

type FooterLineProps = {
  className?: string;
};

export function FooterLine({ className }: FooterLineProps) {
  return <div aria-hidden className={joinClassNames("wf-global-footer-line", className)} />;
}
