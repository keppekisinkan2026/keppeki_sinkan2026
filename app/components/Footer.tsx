"use client";

import { usePathname } from "next/navigation";
import { footerHiddenPaths } from "@/lib/siteNavigation";
import { normalizePathname } from "@/lib/normalizePathname";

export function Footer() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  if (footerHiddenPaths.has(normalizedPathname)) {
    return null;
  }

  return (
    <footer className="wf-global-footer" aria-label="共通フッター">
      <div className="wf-global-footer-bg" aria-hidden />
      <p className="wf-global-footer-text wf-maki-title">劇団ケッペキ</p>
    </footer>
  );
}
