import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { FlowWireframePageClient } from "./FlowWireframePageClient";

export const metadata: Metadata = createPageMetadata({
  title: "公演ができるまで",
  description:
    "劇団ケッペキで公演ができるまでの流れを紹介します。企画案から本番、バラシまでの過程をまとめています。",
  path: "/flow",
});

export default function FlowWireframePage() {
  return <FlowWireframePageClient />;
}
