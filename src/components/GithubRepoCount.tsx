"use client";

import { useEffect, useState } from "react";
import { GITHUB_API_URL } from "@/lib/profile";

/** Live public-repo count from the GitHub API; renders nothing until it lands. */
export default function GithubRepoCount({ prefix = "", suffix = " public repos" }: { prefix?: string; suffix?: string }) {
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

  if (repos == null) return null;
  return (
    <>
      {prefix}
      <span className="tabular">{repos}</span>
      {suffix}
    </>
  );
}
