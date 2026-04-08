import type { Metadata } from "next";
import { EventsWireframePageClient } from "./EventsWireframePageClient";

export const metadata: Metadata = {
  title: "新歓イベント",
  description:
    "劇団ケッペキ2026年度新歓イベント一覧。役者体験会、上映会、部署イベント、新歓公演などの情報を掲載しています。",
};

export default function EventsWireframePage() {
  return <EventsWireframePageClient />;
}
