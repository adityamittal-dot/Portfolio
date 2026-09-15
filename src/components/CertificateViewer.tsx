"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CertificateViewer.module.css";

export default function CertificateViewer({ label = "View internship certificate" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || loadedRef.current) return;
    loadedRef.current = true;
    setStatus("loading");

    let cancelled = false;

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const res = await fetch("/api/certificate");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.arrayBuffer();
        if (cancelled) return;

        const pdf = await pdfjsLib.getDocument({ data }).promise;
        const container = containerRef.current;
        if (!container || cancelled) return;
        container.innerHTML = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = styles.page;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
          container.appendChild(canvas);
        }

        setStatus("idle");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(true)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {label}
      </button>

      {open && (
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Basepair internship certificate — view only"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.dialogHead}>
              <span className={styles.dialogTitle}>Basepair — Internship Certificate</span>
              <span className={styles.viewOnly}>view only · not available for download</span>
              <button
                type="button"
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className={styles.viewport}>
              {status === "loading" && <p className={styles.state}>Loading certificate…</p>}
              {status === "error" && (
                <p className={styles.state}>Couldn&apos;t load the certificate right now.</p>
              )}
              <div
                ref={containerRef}
                className={styles.pages}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
