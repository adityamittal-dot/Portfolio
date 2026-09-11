"use client";

import { useEffect, useState } from "react";
import shared from "@/styles/shared.module.css";
import styles from "./Hero.module.css";
import GridSnakes from "./GridSnakes";
import GithubIcon from "./GithubIcon";
import { useTypewriterRotation } from "@/lib/useTypewriterRotation";
import { GITHUB_API_URL, GITHUB_URL } from "@/lib/profile";

const ROLES = ["Full-stack Engineer", "AI Integration Builder", "SDET & Test Engineer", "Open-Source Contributor"];

const BADGES = ["Full-stack", "AI Builder", "SDET"];

const SKILLS = ["Python", "TypeScript", "React · Next.js", "Django", "AWS", "Playwright"];

const STATS = [
  "100+ BLOCKER/HIGH defects resolved",
  "23+ E2E specs across 7 repos",
  "96 REST calls → 2 batched queries",
  "open to internships",
  "100+ BLOCKER/HIGH defects resolved",
];

function useGithubRepoCount() {
  const [repos, setRepos] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(GITHUB_API_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { public_repos?: number } | null) => {
        if (!cancelled && data?.public_repos != null) setRepos(data.public_repos);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return repos;
}

export default function Hero() {
  const { displayText: roleText, roleIndex } = useTypewriterRotation(ROLES);
  const repoCount = useGithubRepoCount();

  return (
    <>
      <section className={styles.wrap}>
        <GridSnakes />
        <div className={styles.wash} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orbPrimary}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orbAccent}`} aria-hidden="true" />

        <div className={`${shared.container} ${styles.inner}`}>
          <div className={styles.introRow}>
            <div className={styles.avatar}>
              <div className={styles.avatarGlow} />
              <div className={styles.avatarFrame} />
              <div className={styles.avatarRing}>
                {/* TODO: once a real photo is supplied, swap this placeholder
                    for a next/image <Image> filling .avatarPhoto. */}
                <div
                  className={styles.avatarPhoto}
                  role="img"
                  aria-label="Aditya Mittal — portrait, shot on a dark background"
                >
                  <span className={styles.avatarPlaceholder}>Drop portrait here</span>
                </div>
              </div>
              <div className={styles.avatarBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>

            <div className={styles.copy}>
              <p className={styles.greeting}>
                Hi, I&apos;m <span className={styles.handle}>@aditya</span>,
              </p>
              <h1 className={styles.headline}>
                <span className={styles.headlineRole}>{roleText}</span>
                <span className={styles.cursor} aria-hidden="true">
                  ▌
                </span>
                <br />
                who makes AI features hold up
                <br />
                with{" "}
                <span className={styles.beamPill}>
                  <span className={styles.beamPillText}>
                    React <span className={styles.plus}>+</span> Django <span className={styles.plus}>+</span> AI
                  </span>
                </span>
              </h1>

              <div className={styles.badges}>
                {BADGES.map((label, i) => (
                  <span
                    key={label}
                    className={`${styles.badge} ${roleIndex === i ? styles.badgeActive : ""}`}
                  >
                    {label}
                  </span>
                ))}
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.badge} ${styles.badgeGithub} ${roleIndex === 3 ? styles.badgeActive : ""}`}
                >
                  <GithubIcon className={styles.badgeIcon} />
                  github{repoCount != null ? ` · ${repoCount} repos` : ""}
                </a>
              </div>
            </div>
          </div>

          <p className={styles.body}>
            B.Tech CSE at Jaypee University, based in Noida. I work across React and Django,
            integrate models into real products, and spend a lot of time on the parts that
            break under load: race conditions, batched queries, test coverage.
          </p>
          <div className={styles.actions}>
            <a href="#work" className="btn btn-primary">
              See the work
            </a>
            <a href="#lab" className="btn btn-ghost">
              Play in the lab
            </a>
          </div>
          <div className={styles.tags}>
            {SKILLS.map((skill) => (
              <span key={skill} className="tag tag-outline">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.tickerWrap}>
        <div className={`${shared.container} ${styles.ticker}`}>
          {STATS.map((stat, i) => (
            <span key={i}>
              {stat}
              {i < STATS.length - 1 && <span aria-hidden="true"> · </span>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
