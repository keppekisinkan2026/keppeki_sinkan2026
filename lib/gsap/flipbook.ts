import gsap from "gsap";

type FlipbookOptions = {
  startAt?: number;
  staggerDelay?: number;
  frameDuration?: number;
};

export function hideFlipbookFrames(frames: gsap.TweenTarget) {
  gsap.set(frames, { autoAlpha: 0 });
}

export function showLastFlipbookFrame(frames: HTMLElement[]) {
  if (frames.length === 0) {
    return;
  }

  hideFlipbookFrames(frames);
  gsap.set(frames[frames.length - 1], { autoAlpha: 1 });
}

export function appendFlipbookFrames(
  timeline: gsap.core.Timeline,
  frames: HTMLElement[],
  { startAt = 0, staggerDelay = 0.15, frameDuration = 0.01 }: FlipbookOptions = {},
) {
  if (frames.length === 0) {
    return;
  }

  frames.forEach((frame, index) => {
    const position = startAt + staggerDelay * index;
    timeline.set(frames, { autoAlpha: 0 }, position);
    timeline.to(
      frame,
      {
        autoAlpha: 1,
        duration: frameDuration,
      },
      position,
    );
  });
}
