"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TraceWaterfall.module.css";

const BEFORE = 96;
const AFTER = 2;
const WIDTH = 960;

// Request counts are the real ones; the time axis is illustrative, and the
// caption says so. Each request gets its own row, the way a network
// waterfall draws it, so 96 sequential calls read as the staircase they were.
const STEP = WIDTH / BEFORE;
const ROW = 2.5;
const BAR = ROW;
const BEFORE_HEIGHT = BEFORE * ROW;
const BATCH_WIDTH = STEP * 3;

type Phase = "static" | "armed" | "play";

/** Time-axis gridlines, drawn in the chart itself so they scale with it. */
function Grid({ height }: { height: number }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: 7 }, (_, k) => (
        <line
          key={k}
          className={styles.gridline}
          x1={(k + 1) * (WIDTH / 8)}
          x2={(k + 1) * (WIDTH / 8)}
          y1={0}
          y2={height}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
  );
}

export default function TraceWaterfall() {
  const ref = useRef<HTMLElement>(null);
  // "static" is the server render and the no-JS/reduced-motion state: fully
  // drawn. Only when JS runs, motion is allowed, and the figure is still off
  // screen do we hide it ("armed") so it can draw itself once on arrival.
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    setPhase("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPhase("play");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure id="trace" ref={ref} className={styles.figure} data-phase={phase}>
      <figcaption className={styles.caption}>
        <span className={styles.captionTitle}>96-sample analysis page, network waterfall</span>
        <span className={styles.captionNote}>Request counts are real. The time axis is illustrative.</span>
      </figcaption>

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.label}>Before</span>
          <span className={`mono ${styles.value}`}>
            <span className={styles.big}>{BEFORE}</span> sequential API calls
          </span>
        </div>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${WIDTH} ${BEFORE_HEIGHT}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="96 requests drawn one after another as a long staircase"
        >
          <Grid height={BEFORE_HEIGHT} />
          {Array.from({ length: BEFORE }, (_, i) => (
            <rect
              key={i}
              className={styles.span}
              x={i * STEP}
              y={i * ROW}
              width={STEP * 0.92}
              height={BAR}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </svg>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.label}>After</span>
          <span className={`mono ${styles.value} ${styles.valuePass}`}>
            <span className={styles.big}>{AFTER}</span> batched queries
          </span>
        </div>
        <svg
          className={`${styles.chart} ${styles.chartAfter}`}
          viewBox={`0 0 ${WIDTH} 16`}
          preserveAspectRatio="none"
          role="img"
          aria-label="2 batched queries in place of the 96 requests"
        >
          <Grid height={16} />
          {Array.from({ length: AFTER }, (_, i) => (
            <rect
              key={i}
              className={`${styles.span} ${styles.spanAfter}`}
              x={i * BATCH_WIDTH}
              y={2 + i * 7}
              width={BATCH_WIDTH * 0.96}
              height={5}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </svg>
        <div className={styles.axis} aria-hidden="true">
          <span>0</span>
          <span>time</span>
        </div>
      </div>
    </figure>
  );
}
