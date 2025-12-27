"use client";
import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

export function CobeGlobe({
  markers = [],
  markerColor = [0.024, 0.714, 0.831],
  glowColor = [1, 1, 1],
  baseColor = [0.4, 0.6, 1.0],
  className = ""
}) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef(null);

  const onPointerDown = useCallback((e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  const onMouseMove = useCallback((e) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      markers: markers,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current / 200;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [markers, markerColor, glowColor, baseColor]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onMouseMove={onMouseMove}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        contain: "layout paint size",
        maxWidth: "100%",
      }}
    />
  );
}
