import type { Metadata } from "next";
import { PastWireframePageClient } from "./PastWireframePageClient";

export const metadata: Metadata = {
  title: "過去公演",
  description:
    "劇団ケッペキの過去公演を紹介します。これまでの上演作品や公演の雰囲気を掲載しています。",
};

export default function PastWireframePage() {
  return <PastWireframePageClient />;
}
