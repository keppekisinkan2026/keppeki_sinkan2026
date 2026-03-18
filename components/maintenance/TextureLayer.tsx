"use client";

import { useEffect, useRef } from "react";
import { createCrayonSketch, drawPencilTexture } from "./textureUtils";

export function TextureLayer() {
  const crayonRootRef = useRef<HTMLDivElement>(null);
  const pencilCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let p5Instance: import("p5").default | null = null;
    let removeResizeListener: (() => void) | null = null;

    const initializeTexture = async () => {
      const [{ default: P5 }, { default: rough }] = await Promise.all([
        import("p5"),
        import("roughjs"),
      ]);

      if (disposed) {
        return;
      }

      const crayonRoot = crayonRootRef.current;
      const pencilCanvas = pencilCanvasRef.current;
      if (!crayonRoot || !pencilCanvas) {
        return;
      }

      const redrawPencilTexture = () => {
        drawPencilTexture(pencilCanvas, rough);
      };

      p5Instance = new P5(createCrayonSketch(crayonRoot, redrawPencilTexture), crayonRoot);
      redrawPencilTexture();

      const handleResize = () => {
        redrawPencilTexture();
      };

      window.addEventListener("resize", handleResize);
      removeResizeListener = () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    void initializeTexture();

    return () => {
      disposed = true;
      removeResizeListener?.();
      p5Instance?.remove();
    };
  }, []);

  return (
    <div className="texture-layer" aria-hidden>
      <div ref={crayonRootRef} className="texture-crayon" />
      <canvas ref={pencilCanvasRef} className="texture-pencil" />
    </div>
  );
}
