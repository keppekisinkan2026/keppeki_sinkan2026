"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type RoughCrayonButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  paddingX?: number;
  paddingY?: number;
  minWidth?: number;
  waveAmplitude?: number;
  waveLength?: number;
};

type ButtonSize = {
  blockWidth: number;
  blockHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  margin: number;
};

type Point = [number, number];

const BLOCK_COLOR = "#1B4332";
const DEFAULT_FONT_FAMILY = [
  '"Hiragino Maru Gothic ProN"',
  '"Hiragino Sans"',
  '"Yu Gothic UI"',
  '"YuGothic"',
  '"Meiryo"',
  "sans-serif",
].join(", ");

const CRAYON_OPTIONS = {
  fill: BLOCK_COLOR,
  stroke: BLOCK_COLOR,
  fillStyle: "solid" as const,
  strokeWidth: 5,
  roughness: 2.5,
  bowing: 3,
};

const DEFAULT_SIZE: ButtonSize = {
  blockWidth: 1,
  blockHeight: 1,
  canvasWidth: 1,
  canvasHeight: 1,
  margin: 0,
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function measureButtonSize({
  text,
  fontSize,
  fontWeight,
  fontFamily,
  paddingX,
  paddingY,
  minWidth,
  waveAmplitude,
}: {
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  paddingX: number;
  paddingY: number;
  minWidth: number;
  waveAmplitude: number;
}): ButtonSize {
  const measurementCanvas = document.createElement("canvas");
  const context = measurementCanvas.getContext("2d");

  if (!context) {
    return DEFAULT_SIZE;
  }

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  const metrics = context.measureText(text);
  const letterSpacingPx = fontSize * 0.03;
  const textWidth = metrics.width + Math.max(0, text.length - 1) * letterSpacingPx;
  const textHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || Math.ceil(fontSize * 1.14);

  const blockWidth = Math.max(minWidth, Math.ceil(textWidth + paddingX * 2));
  const blockHeight = Math.max(Math.ceil(textHeight + paddingY * 2), Math.ceil(fontSize * 1.8));
  const margin = Math.ceil(CRAYON_OPTIONS.strokeWidth + waveAmplitude + 8);

  return {
    blockWidth,
    blockHeight,
    canvasWidth: blockWidth + margin * 2,
    canvasHeight: blockHeight + margin * 2,
    margin,
  };
}

function buildWavyRectanglePoints({
  x,
  y,
  width,
  height,
  waveAmplitude,
  waveLength,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  waveAmplitude: number;
  waveLength: number;
}): Point[] {
  const points: Point[] = [];
  const topStep = Math.max(16, waveLength * 0.9);
  const sideStep = Math.max(12, waveLength * 0.56);
  const topWaveAmplitude = Math.max(1.5, waveAmplitude * 0.28);

  for (let currentX = x; currentX <= x + width; currentX += topStep) {
    const ratio = (currentX - x) / waveLength;
    const currentY = y + Math.sin(ratio * Math.PI * 2) * topWaveAmplitude;
    points.push([currentX, currentY]);
  }
  points.push([x + width, y]);

  for (let currentY = y; currentY <= y + height; currentY += sideStep) {
    const ratio = (currentY - y) / waveLength;
    const currentX = x + width + Math.sin(ratio * Math.PI * 2 + Math.PI * 1.12) * waveAmplitude;
    points.push([currentX, currentY]);
  }
  points.push([x + width, y + height]);

  for (let currentX = x + width; currentX >= x; currentX -= topStep) {
    const ratio = (currentX - x) / waveLength;
    const currentY = y + height + Math.sin(ratio * Math.PI * 2 + Math.PI * 0.38) * topWaveAmplitude;
    points.push([currentX, currentY]);
  }
  points.push([x, y + height]);

  for (let currentY = y + height; currentY >= y; currentY -= sideStep) {
    const ratio = (currentY - y) / waveLength;
    const currentX = x + Math.sin(ratio * Math.PI * 2 + Math.PI * 0.52) * waveAmplitude;
    points.push([currentX, currentY]);
  }
  points.push([x, y]);

  return points;
}

export function RoughCrayonButton({
  text,
  onClick,
  className,
  textClassName,
  disabled = false,
  type = "button",
  fontSize = 28,
  fontWeight = 700,
  fontFamily = DEFAULT_FONT_FAMILY,
  paddingX = 34,
  paddingY = 20,
  minWidth = 240,
  waveAmplitude = 8,
  waveLength = 36,
}: RoughCrayonButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [buttonSize, setButtonSize] = useState<ButtonSize>(DEFAULT_SIZE);

  const fontKey = useMemo(
    () => `${fontWeight}|${fontSize}|${fontFamily}|${paddingX}|${paddingY}|${text}`,
    [fontFamily, fontSize, fontWeight, paddingX, paddingY, text],
  );

  useEffect(() => {
    const resize = () => {
      setButtonSize(
        measureButtonSize({
          text,
          fontSize,
          fontWeight,
          fontFamily,
          paddingX,
          paddingY,
          minWidth,
          waveAmplitude,
        }),
      );
    };

    resize();

    if (typeof document !== "undefined" && "fonts" in document) {
      void document.fonts.ready.then(() => {
        resize();
      });
    }
  }, [fontFamily, fontKey, fontSize, fontWeight, minWidth, paddingX, paddingY, text, waveAmplitude]);

  useEffect(() => {
    let disposed = false;

    const draw = async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(buttonSize.canvasWidth * dpr);
      canvas.height = Math.floor(buttonSize.canvasHeight * dpr);
      canvas.style.width = `${buttonSize.canvasWidth}px`;
      canvas.style.height = `${buttonSize.canvasHeight}px`;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, buttonSize.canvasWidth, buttonSize.canvasHeight);

      const { default: rough } = await import("roughjs");
      if (disposed) {
        return;
      }

      const roughCanvas = rough.canvas(canvas);
      const points = buildWavyRectanglePoints({
        x: buttonSize.margin,
        y: buttonSize.margin,
        width: buttonSize.blockWidth,
        height: buttonSize.blockHeight,
        waveAmplitude,
        waveLength,
      });

      roughCanvas.polygon(points, CRAYON_OPTIONS);
    };

    void draw();

    return () => {
      disposed = true;
    };
  }, [buttonSize, waveAmplitude, waveLength]);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: `${buttonSize.canvasWidth}px`,
        height: `${buttonSize.canvasHeight}px`,
        padding: 0,
        border: 0,
        background: "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      <span
        className={joinClassNames(textClassName)}
        style={{
          position: "absolute",
          left: `${buttonSize.margin}px`,
          top: `${buttonSize.margin}px`,
          width: `${buttonSize.blockWidth}px`,
          height: `${buttonSize.blockHeight}px`,
          display: "grid",
          placeItems: "center",
          color: "#f5f7ef",
          fontSize: `${fontSize}px`,
          fontWeight,
          fontFamily,
          letterSpacing: "0.03em",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {text}
      </span>
    </button>
  );
}
