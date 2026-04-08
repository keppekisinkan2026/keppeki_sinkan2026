import type { Metadata } from "next";
import { TitleWireframePageClient } from "./TitleWireframePageClient";

export const metadata: Metadata = {
  title: "2026年度新歓特設サイト",
  description:
    "劇団ケッペキ2026年度新歓特設サイト。劇団紹介、部署紹介、新歓イベント、公演ができるまで、過去公演、Q&Aを掲載しています。",
};

export default function TitleWireframePage() {
  return <TitleWireframePageClient />;
}
