"use client";

import { useRef } from "react";
import { MaintenanceLogo } from "./MaintenanceLogo";
import { SocialLinks } from "./SocialLinks";
import { socialLinks } from "./socialLinkData";
import { TextureLayer } from "./TextureLayer";
import { useMaintenanceAnimations } from "./useMaintenanceAnimations";

export function MaintenanceScreen() {
  const containerRef = useRef<HTMLElement>(null);
  const maintenanceText = "メンテナンス中・・・";
  const maintenanceCharacters = Array.from(maintenanceText);

  useMaintenanceAnimations(containerRef);

  return (
    <main ref={containerRef} className="maintenance-screen">
      <TextureLayer />
      <div className="maintenance-inner">
        <MaintenanceLogo />

        <h1 className="maintenance-text js-enter" aria-label={maintenanceText}>
          {maintenanceCharacters.map((character, index) => (
            <span key={`${character}-${index}`} className="maintenance-char js-wave-char" aria-hidden>
              {character}
            </span>
          ))}
        </h1>

        <SocialLinks links={socialLinks} />
      </div>
    </main>
  );
}
