import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

type TitleContentAnimationOptions = {
  root: HTMLElement | null;
  aboutStage: HTMLElement | null;
  aboutPanel: HTMLDivElement | null;
  isIntroComplete: boolean;
};

type FlipbookSequence = {
  frames: HTMLElement[];
  startAt: number;
  staggerDelay: number;
};

type AboutFrameGroups = {
  img1: HTMLElement[];
  img2: HTMLElement[];
  img3: HTMLElement[];
  img4: HTMLElement[];
  img5: HTMLElement[];
  sinzin: HTMLElement[];
  fune: HTMLElement[];
  pichi: HTMLElement[];
};

const aboutFrameSelectors = {
  img1: ".js-about-img1-frame",
  img2: ".js-about-img2-frame",
  img3: ".js-about-img3-frame",
  img4: ".js-about-img4-frame",
  img5: ".js-about-img5-frame",
  sinzin: ".js-about-img-sinzin-frame",
  fune: ".js-about-img-fune-frame",
  pichi: ".js-about-img-pichi-frame",
} as const;

const TITLE_MOBILE_MEDIA_QUERY = "(max-width: 700px)";

function refreshScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function isTitleMobileLayout() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(TITLE_MOBILE_MEDIA_QUERY).matches;
}

function collectFrames(scope: ParentNode, selector: string) {
  return gsap.utils.toArray<HTMLElement>(selector, scope);
}

function collectAboutFrameGroups(scope: ParentNode): AboutFrameGroups {
  return {
    img1: collectFrames(scope, aboutFrameSelectors.img1),
    img2: collectFrames(scope, aboutFrameSelectors.img2),
    img3: collectFrames(scope, aboutFrameSelectors.img3),
    img4: collectFrames(scope, aboutFrameSelectors.img4),
    img5: collectFrames(scope, aboutFrameSelectors.img5),
    sinzin: collectFrames(scope, aboutFrameSelectors.sinzin),
    fune: collectFrames(scope, aboutFrameSelectors.fune),
    pichi: collectFrames(scope, aboutFrameSelectors.pichi),
  };
}

function hideFrameGroups(frameGroups: HTMLElement[][]) {
  frameGroups.forEach((frames) => hideFlipbookFrames(frames));
}

function showLastFrameGroups(frameGroups: HTMLElement[][]) {
  frameGroups.forEach((frames) => showLastFlipbookFrame(frames));
}

function applyReducedMotionState(
  snsFrames: HTMLElement[],
  snsTitle: HTMLElement | null,
  snsIcons: HTMLElement[],
  revealBlocks: HTMLElement[],
  aboutPanel: HTMLDivElement | null,
) {
  if (snsFrames.length > 0) {
    gsap.set(snsFrames, { autoAlpha: 0 });
    gsap.set(snsFrames[snsFrames.length - 1], { autoAlpha: 1 });
  }

  if (snsTitle) {
    gsap.set(snsTitle, { autoAlpha: 1, y: 0 });
  }

  if (snsIcons.length > 0) {
    gsap.set(snsIcons, { autoAlpha: 1, rotationX: 0, y: 0 });
  }

  revealBlocks.forEach((block) => {
    gsap.set(block, { clearProps: "all", autoAlpha: 1, y: 0 });
  });

  if (!aboutPanel) {
    return;
  }

  const aboutFrameGroups = collectAboutFrameGroups(aboutPanel);

  gsap.set(aboutPanel, { clearProps: "all", autoAlpha: 1, y: 0 });
  gsap.set(".js-about-title", { autoAlpha: 1, y: 0 });
  gsap.set(".js-about-text", { autoAlpha: 1, y: 0 });
  gsap.set(".js-about-image", { autoAlpha: 1, y: 0 });
  showLastFrameGroups(Object.values(aboutFrameGroups));
}

function setupSnsAnimation(
  snsSection: HTMLElement | null,
  snsFrames: HTMLElement[],
  snsTitle: HTMLElement | null,
  snsIcons: HTMLElement[],
) {
  if (!snsSection || snsFrames.length === 0) {
    return;
  }

  hideFlipbookFrames(snsFrames);
  gsap.set(snsTitle, { autoAlpha: 0, y: 10 });
  gsap.set(snsIcons, {
    autoAlpha: 0,
    rotationX: -70,
    y: -10,
    transformOrigin: "top center",
  });

  const snsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: snsSection,
      start: "top 75%",
      invalidateOnRefresh: true,
      toggleActions: "play none none none",
    },
  });

  appendFlipbookFrames(snsTimeline, snsFrames);

  if (snsTitle) {
    snsTimeline.to(
      snsTitle,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "+=0.04",
    );
  }

  snsTimeline.to(
    snsIcons,
    {
      autoAlpha: 1,
      rotationX: 0,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    },
    "<+=0.02",
  );
}

function setupHpPin(
  hpSection: HTMLElement | null,
  aboutStage: HTMLElement | null,
  aboutPanel: HTMLDivElement | null,
  isMobile: boolean,
) {
  const hpButton = hpSection?.querySelector<HTMLElement>(".js-title-hp-button") ?? null;

  if (!hpSection || !hpButton || !aboutPanel || isMobile) {
    return;
  }

  ScrollTrigger.create({
    trigger: hpButton,
    start: "center center",
    endTrigger: aboutStage ?? aboutPanel,
    end: "top top",
    pin: true,
    pinSpacing: false,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });
}

function setupRevealBlocks(revealBlocks: HTMLElement[], isMobile: boolean) {
  const revealY = isMobile ? 40 : 100;
  const revealStart = isMobile ? "top 92%" : "top 86%";

  revealBlocks.forEach((block) => {
    gsap.fromTo(
      block,
      {
        y: revealY,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: revealStart,
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });
}

function createFrameSequencePlayer(sequences: FlipbookSequence[]) {
  let hasPlayed = false;

  return () => {
    if (hasPlayed || sequences.every(({ frames }) => frames.length === 0)) {
      return;
    }

    hasPlayed = true;

    const timeline = gsap.timeline({ defaults: { ease: "none" } });

    sequences.forEach(({ frames, startAt, staggerDelay }) => {
      appendFlipbookFrames(timeline, frames, { startAt, staggerDelay });
    });
  };
}

function setupAboutAnimation(
  aboutStage: HTMLElement | null,
  aboutPanel: HTMLDivElement | null,
  isMobile: boolean,
) {
  if (!aboutStage || !aboutPanel) {
    return;
  }

  const aboutTitle = aboutPanel.querySelector<HTMLElement>(".js-about-title");
  const aboutRows = gsap.utils.toArray<HTMLElement>(".js-about-row", aboutPanel);
  const aboutFrames = collectAboutFrameGroups(aboutPanel);

  const playAboutImg1Frames = createFrameSequencePlayer([{ frames: aboutFrames.img1, startAt: 0, staggerDelay: 0.2 }]);
  const playAboutImg2And3Frames = createFrameSequencePlayer([
    { frames: aboutFrames.img2, startAt: 0, staggerDelay: 0.2 },
    { frames: aboutFrames.img3, startAt: 0.7, staggerDelay: 0.2 },
  ]);
  const playAboutProduceFrames = createFrameSequencePlayer([
    { frames: aboutFrames.sinzin, startAt: 0, staggerDelay: 0.15 },
    { frames: aboutFrames.fune, startAt: 0.7, staggerDelay: 0.15 },
    { frames: aboutFrames.pichi, startAt: 1.2, staggerDelay: 0.15 },
  ]);
  const playAboutImg4And5Frames = createFrameSequencePlayer([
    { frames: aboutFrames.img4, startAt: 0, staggerDelay: 0.2 },
    { frames: aboutFrames.img5, startAt: 0.7, staggerDelay: 0.2 },
  ]);

  if (aboutTitle) {
    gsap.set(aboutTitle, { autoAlpha: 0, y: 30 });
  }

  gsap.set(aboutRows, { autoAlpha: 0, y: 28 });
  hideFrameGroups(Object.values(aboutFrames));

  if (isMobile) {
    if (aboutTitle) {
      gsap.to(aboutTitle, {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutPanel,
          start: "top 82%",
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          once: true,
        },
      });
    }

    const aboutRowPlayers = [
      playAboutImg1Frames,
      playAboutImg2And3Frames,
      playAboutProduceFrames,
      playAboutImg4And5Frames,
    ] as const;

    aboutRows.forEach((row, index) => {
      gsap.to(row, {
        autoAlpha: 1,
        y: 0,
        duration: 0.48,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 88%",
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          once: true,
          onEnter: aboutRowPlayers[index],
        },
      });
    });

    return;
  }

  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: aboutStage,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * 9, 4800)}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
  });

  if (aboutTitle) {
    aboutTimeline.to(
      aboutTitle,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      "+=0.2",
    );
  }

  const aboutRowPlayers = [
    playAboutImg1Frames,
    playAboutImg2And3Frames,
    playAboutProduceFrames,
    playAboutImg4And5Frames,
  ] as const;

  aboutRows.forEach((row, index) => {
    aboutTimeline.to(
      row,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.34,
        ease: "power2.out",
        onStart: aboutRowPlayers[index],
      },
      "+=0.55",
    );

    aboutTimeline.to({}, { duration: 0.5 });

    if (index < aboutRows.length - 1) {
      aboutTimeline.to(
        row,
        {
          autoAlpha: 0,
          y: -20,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "+=0.2",
      );
    }
  });
}

export function setupTitleContentAnimations({
  root,
  aboutStage,
  aboutPanel,
  isIntroComplete,
}: TitleContentAnimationOptions) {
  if (!isIntroComplete || !root) {
    return;
  }

  const reduceMotion = prefersReducedMotion();
  const isMobile = isTitleMobileLayout();
  const snsSection = root.querySelector<HTMLElement>("#sns");
  const hpSection = root.querySelector<HTMLElement>(".js-title-hp-stack");
  const snsFrames = snsSection ? gsap.utils.toArray<HTMLElement>(".js-sns-frame", snsSection) : [];
  const snsTitle = snsSection?.querySelector<HTMLElement>(".js-sns-title") ?? null;
  const snsIcons = snsSection ? gsap.utils.toArray<HTMLElement>(".js-sns-icon", snsSection) : [];
  const revealBlocks = gsap.utils.toArray<HTMLElement>(".js-title-reveal", root);

  if (reduceMotion) {
    applyReducedMotionState(snsFrames, snsTitle, snsIcons, revealBlocks, aboutPanel);
    refreshScrollTriggers();
    return;
  }

  setupSnsAnimation(snsSection, snsFrames, snsTitle, snsIcons);
  setupHpPin(hpSection, aboutStage, aboutPanel, isMobile);
  setupRevealBlocks(revealBlocks, isMobile);
  setupAboutAnimation(aboutStage, aboutPanel, isMobile);
  refreshScrollTriggers();
}
