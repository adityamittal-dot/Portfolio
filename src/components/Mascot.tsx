"use client";

import { useEffect, useRef } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import "blobatar/motion.css";
import "blobatar/gaze.css";
import GithubRepoCount from "./GithubRepoCount";
import { GITHUB_URL, GITHUB_USERNAME } from "@/lib/profile";
import styles from "./Mascot.module.css";

// How far the body is allowed to lean toward the pointer.
const MAX_SHIFT = 22; // px
const MAX_TILT = 7; // deg

// The follow is a real spring integrated against elapsed time, not a
// per-frame lerp, so it moves identically on a 60Hz and a 144Hz screen.
// Stiffness and damping sit just under critical: the body answers the
// pointer within a frame, arrives in about a third of a second, and settles
// with the faintest give instead of stopping dead.
const STIFFNESS = 210;
const DAMPING = 26;

/**
 * The page's one character: Aditya's blobatar, generated from his GitHub
 * handle and locked to the report's pass-green. The eyes track the pointer
 * through blobatar's own gaze layer; the body leans toward it on a damped
 * spring and settles back when it is still. Both stand down under reduced
 * motion and on touch-only devices, where there is no pointer to follow and
 * the blobatar's idle breathing and blinking carry it alone.
 */
export default function Mascot() {
  const { ref } = useGaze({ travel: 3.5, lookAt: "pointer", settle: 80 });
  const stageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const body = bodyRef.current;
    if (!stage || !body) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = 0;
    let pointer: { x: number; y: number } | null = null;
    // The stage's centre, cached. It only changes on scroll or resize, so the
    // frame loop never reads layout; it only writes a transform.
    let center = { x: 0, y: 0 };
    const measure = () => {
      const rect = stage.getBoundingClientRect();
      center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    measure();

    const pos = { x: 0, y: 0, r: 0 };
    const vel = { x: 0, y: 0, r: 0 };

    const targetFor = () => {
      if (!pointer) return { x: 0, y: 0, r: 0 };
      const dx = pointer.x - center.x;
      const dy = pointer.y - center.y;
      // Ease into the limit: close to the blobatar it leans in earnest, far
      // away it only turns its head.
      const reach = Math.max(window.innerWidth, window.innerHeight) * 0.6;
      const nx = Math.tanh(dx / reach);
      const ny = Math.tanh(dy / reach);
      return { x: nx * MAX_SHIFT, y: ny * MAX_SHIFT * 0.6, r: nx * MAX_TILT };
    };

    const tick = (now: number) => {
      // Clamp dt so a backgrounded tab doesn't come back with one huge step.
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      const target = targetFor();
      let moving = false;
      for (const k of ["x", "y", "r"] as const) {
        const force = (target[k] - pos[k]) * STIFFNESS - vel[k] * DAMPING;
        vel[k] += force * dt;
        pos[k] += vel[k] * dt;
        if (Math.abs(target[k] - pos[k]) > 0.02 || Math.abs(vel[k]) > 0.02) moving = true;
      }
      body.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0) rotate(${pos.r.toFixed(2)}deg)`;
      const lean = pos.x / MAX_SHIFT;
      stage.style.setProperty("--lean", lean.toFixed(3));
      stage.style.setProperty("--lean-abs", Math.abs(lean).toFixed(3));
      if (moving) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        last = 0;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    // Scrolling moves the blobatar under a still pointer, so it re-aims too.
    const onScroll = () => {
      measure();
      if (pointer) schedule();
    };

    let attached = false;
    const attach = () => {
      const want = fine.matches && !still.matches;
      if (want === attached) return;
      attached = want;
      if (want) {
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        measure();
      } else {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        pointer = null;
        schedule();
      }
    };
    attach();
    fine.addEventListener("change", attach);
    still.addEventListener("change", attach);

    return () => {
      fine.removeEventListener("change", attach);
      still.removeEventListener("change", attach);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure className={styles.figure}>
      <div ref={stageRef} className={styles.stage}>
        <div ref={bodyRef} className={styles.body}>
          <Blobatar
            ref={ref}
            name={GITHUB_USERNAME}
            hue={150}
            background={false}
            animate="always"
            className={styles.blob}
            aria-hidden="true"
          />
        </div>
        <span className={styles.shadow} aria-hidden="true" />
      </div>
      <figcaption className={styles.caption}>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="mono">
          @{GITHUB_USERNAME}
        </a>
        <span className={`mono ${styles.repos}`}>
          <GithubRepoCount suffix=" public repos" />
        </span>
      </figcaption>
    </figure>
  );
}
