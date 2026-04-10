import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { DepartmentsWireframePageClient } from "./DepartmentsWireframePageClient";

export const metadata: Metadata = createPageMetadata({
  title: "部署紹介",
  description:
    "脚本、稽古場、舞台、音響、照明、映像、衣装小道具、制作、宣伝美術など、劇団ケッペキの各部署を紹介します。",
  path: "/departments",
});

export default function DepartmentsWireframePage() {
  return <DepartmentsWireframePageClient />;
}
