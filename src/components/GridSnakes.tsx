"use client";

import { useEffect, useRef } from "react";
import styles from "./GridSnakes.module.css";

// Matches --dot-grid-size in nocturne.css — trails ride the same grid the
// dotted background paints, so they read as dots lighting up in place.
const GRID = 24;
const SNAKE_COUNT = 3;
const SNAKE_LENGTH = 8;
const TICK_MS = 180;
const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * Small trails of dots that crawl across the hero's dot grid, wrapping at
 * the edges and turning at random. Ported from santifer.io's hero canvas —
 * the one piece of the reference that's genuinely animated rather than a
 * static gradient.
 */
export default function GridSnakes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = el;

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = () => Math.floor(canvas.width / GRID);
    const rows = () => Math.floor(canvas.height / GRID);

    type Snake = { trail: [number, number][]; dir: [number, number] };
    const snakes: Snake[] = Array.from({ length: SNAKE_COUNT }, () => {
      const x = Math.floor(Math.random() * cols());
      const y = Math.floor(Math.random() * rows());
      return { trail: [[x, y]], dir: DIRS[Math.floor(Math.random() * 4)] };
    });

    const trailColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-cyan")
      .trim() || "#52e0c4";

    function hexToRgb(hex: string): [number, number, number] {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [82, 224, 196];
    }
    const [r, g, b] = hexToRgb(trailColor);

    function tick() {
      const c = cols();
      const rws = rows();

      for (const snake of snakes) {
        if (Math.random() < 0.3) {
          snake.dir = DIRS[Math.floor(Math.random() * 4)];
        }
        const [hx, hy] = snake.trail[snake.trail.length - 1];
        let nx = hx + snake.dir[0];
        let ny = hy + snake.dir[1];

        if (nx < 0) nx = c - 1;
        if (nx >= c) nx = 0;
        if (ny < 0) ny = rws - 1;
        if (ny >= rws) ny = 0;

        snake.trail.push([nx, ny]);
        if (snake.trail.length > SNAKE_LENGTH) snake.trail.shift();
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const snake of snakes) {
        for (let i = 0; i < snake.trail.length; i++) {
          const [gx, gy] = snake.trail[i];
          const alpha = ((i + 1) / snake.trail.length) * 0.5;
          ctx.beginPath();
          ctx.arc(gx * GRID + GRID / 2, gy * GRID + GRID / 2, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        }
      }
    }

    let interval: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (!interval) interval = setInterval(tick, TICK_MS);
    };
    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => (entries[0].isIntersecting && document.visibilityState === "visible" ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () =>
      document.visibilityState === "visible" && canvas.getBoundingClientRect().top < window.innerHeight
        ? start()
        : stop();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
