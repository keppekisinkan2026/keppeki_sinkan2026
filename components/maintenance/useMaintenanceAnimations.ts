"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function useMaintenanceAnimations(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.from(".js-enter", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.to(".js-wave-char", {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".js-social-bubble", {
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );
}
