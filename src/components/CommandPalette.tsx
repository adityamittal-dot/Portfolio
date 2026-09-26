"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CommandPalette.module.css";
import { EMAIL, GITHUB_API_URL, GITHUB_URL, LINKEDIN_URL, PHONE_DISPLAY } from "@/lib/profile";
import { runResults } from "@/lib/content";

/** Dispatched on window by any on-page control that should open the console. */
export const OPEN_CONSOLE_EVENT = "open-console";

interface Section {
  id: string;
  blurb: string;
}

const CAT_ART = ["    /\\_/\\", "   ( o.o )", "    > ^ <", "   /|   |\\", "  (_|   |_)"].join("\n");
// Module scope, not component state — survives React 19 StrictMode's
// dev-only double-mount, so the greeting below prints exactly once.
let hasLoggedCat = false;

const SECTIONS: Section[] = [
  { id: "work", blurb: "Work: MedVault, Canopy, NexDev, and this site." },
  { id: "stack", blurb: "Stack: what the work runs on, and where it's proven." },
  { id: "lab", blurb: "Lab: small tools and experiments." },
  { id: "experience", blurb: "Experience: Basepair and Spelll Production." },
  { id: "about", blurb: "About." },
  { id: "contact", blurb: `Contact: ${EMAIL}` },
];

function renderRun(): ReactNode {
  const run = runResults();
  return (
    <>
      {run.suites.map((suite) => (
        <div key={suite.name}>
          <div className={styles.dirName}>{suite.name}.ts</div>
          {suite.cases.map((c) => (
            <div key={c.name}>
              {"  "}
              <span className={c.status === "passed" ? styles.pass : styles.skip}>
                {c.status === "passed" ? "✓" : "-"}
              </span>{" "}
              {c.name}
              {c.status === "skipped" ? " (skipped)" : ""}
            </div>
          ))}
        </div>
      ))}
      <div className={styles.summaryLine}>
        <span className={styles.pass}>{run.passed} passed</span>, <span className={styles.skip}>{run.skipped} skipped</span>
        {` (${run.total} tests, ${run.suites.length} suites)`}
      </div>
    </>
  );
}

interface CommandResult {
  output?: ReactNode;
  navigate?: string;
  close?: boolean;
  clear?: boolean;
}

interface Command {
  name: string;
  aliases?: string[];
  hint: string;
  run: (args: string[]) => CommandResult | Promise<CommandResult>;
}

interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

async function fetchGithubProfile(): Promise<CommandResult> {
  let response: Response;
  try {
    response = await fetch(GITHUB_API_URL);
  } catch {
    return { output: "github: request failed. Check your connection and try again." };
  }

  if (response.status === 403 || response.status === 429) {
    return { output: `github: rate limited by the GitHub API. Try again shortly, or visit ${GITHUB_URL}` };
  }
  if (!response.ok) {
    return { output: `github: profile fetch failed (${response.status}).` };
  }

  const profile: GithubProfile = await response.json();
  const lines = [
    profile.name ? `${profile.login} (${profile.name})` : profile.login,
    profile.bio,
    `${profile.public_repos} public repos · ${profile.followers} followers · ${profile.following} following`,
    profile.html_url,
  ].filter(Boolean);

  return { output: lines.join("\n") };
}

function renderHelp(): ReactNode {
  const rows = COMMANDS.filter((c) => c.hint);
  const width = Math.max(...rows.map((c) => c.name.length)) + 2;
  return (
    <>
      {rows.map((c) => (
        <div key={c.name}>
          <span className={styles.dirName}>{c.name.padEnd(width)}</span>
          {c.hint}
        </div>
      ))}
    </>
  );
}

const COMMANDS: Command[] = [
  ...SECTIONS.map<Command>((s) => ({
    name: s.id,
    hint: `jump to ${s.id}`,
    run: () => ({ output: `→ ${s.blurb}`, navigate: s.id }),
  })),
  {
    name: "cd",
    hint: "cd <section>: jump to a section",
    run: (args) => {
      const target = args[0];
      if (!target) return { output: "cd: missing operand" };
      const section = SECTIONS.find((s) => s.id === stripSlash(target).toLowerCase());
      if (!section) return { output: `cd: no such directory: ${target}` };
      return { output: `→ ${section.blurb}`, navigate: section.id };
    },
  },
  {
    name: "ls",
    hint: "list sections",
    run: () => ({
      output: (
        <span className={styles.dirName}>{SECTIONS.map((s) => `${s.id}/`).join("  ")}</span>
      ),
    }),
  },
  {
    name: "whoami",
    hint: "who's behind this site",
    run: () => ({
      output:
        "Aditya Mittal, full-stack engineer who makes AI features hold up.\nB.Tech CSE at Jaypee University, Noida, India. Open to internships.",
    }),
  },
  {
    name: "skills",
    hint: "list core skills",
    run: () => ({ output: "Python · TypeScript · React · Next.js · Django · AWS · Playwright" }),
  },
  {
    name: "test",
    aliases: ["npm test", "run"],
    hint: "run the portfolio's test suites",
    run: () => ({ output: renderRun() }),
  },
  {
    name: "resume",
    aliases: ["cv"],
    hint: "download the resume (PDF)",
    run: () => {
      const link = document.createElement("a");
      link.href = "/aditya-mittal-resume.pdf";
      link.download = "Aditya Mittal - Resume.pdf";
      link.click();
      return { output: "Downloading aditya-mittal-resume.pdf" };
    },
  },
  {
    name: "github",
    aliases: ["gh"],
    hint: "live stats from the GitHub profile",
    run: fetchGithubProfile,
  },
  {
    name: "socials",
    aliases: ["linkedin"],
    hint: "where else to find me",
    run: () => ({
      output: `${GITHUB_URL}\n${LINKEDIN_URL}\nOr reach me directly: ${EMAIL} · ${PHONE_DISPLAY}\nRun 'github' for live profile stats.`,
    }),
  },
  {
    name: "sudo",
    hint: "",
    run: () => ({
      output: "Nice try. You're not in the sudoers file. This incident has been reported (to nobody).",
    }),
  },
  {
    name: "clear",
    hint: "clear the transcript",
    run: () => ({ clear: true }),
  },
  {
    name: "exit",
    aliases: ["close", "q"],
    hint: "close this palette",
    run: () => ({ close: true }),
  },
  {
    name: "help",
    hint: "list every command",
    run: () => ({ output: renderHelp() }),
  },
];

// `ls` prints entries as "about/ contact/ …" like a real directory listing,
// so people naturally type the trailing slash back — tolerate it everywhere,
// the way a real shell's `cd` does.
function stripSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function findCommand(name: string): Command | undefined {
  const lower = stripSlash(name.toLowerCase());
  return COMMANDS.find((c) => c.name === lower || c.aliases?.includes(lower));
}

interface TranscriptEntry {
  id: number;
  command: string;
  output?: ReactNode;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const nextEntryId = useRef(0);

  const close = useCallback(() => setIsOpen(false), []);

  // A greeting for anyone who actually opens devtools — most people who do
  // that on a portfolio are exactly the audience this site is for. Guarded
  // at module scope (not a ref) since React 19's StrictMode double-invokes
  // effects in dev, which would otherwise print this twice per page load.
  useEffect(() => {
    if (hasLoggedCat) return;
    hasLoggedCat = true;
    console.log(`%c${CAT_ART}`, "color:#2f9e57;font-family:monospace;font-size:12px;line-height:1.3;");
    console.log(
      "%cLooking under the hood?",
      "color:#2f9e57;font-family:monospace;font-size:14px;font-weight:600;",
    );
    console.log(
      "%cPress / anywhere on this page for the command console. Try 'npm test'.",
      "color:#8f948d;font-family:monospace;font-size:12px;",
    );
  }, []);

  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isEditable =
        !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";

      if (isCmdK) {
        e.preventDefault();
        setIsOpen((open) => !open);
        return;
      }
      if (e.key === "/" && !isEditable) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
      if (e.key === "Escape" && isOpen) {
        close();
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(OPEN_CONSOLE_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSOLE_EVENT, open);
  }, []);

  // Return focus to whatever opened the console when it closes.
  const openerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else if (openerRef.current) {
      openerRef.current.focus?.();
      openerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight });
  }, [transcript]);

  function navigateToSection(id: string) {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }, 220);
  }

  function pushEntry(command: string, output?: ReactNode): number {
    const id = nextEntryId.current++;
    setTranscript((t) => [...t, { id, command, output }]);
    return id;
  }

  function updateEntry(id: number, output: ReactNode) {
    setTranscript((t) => t.map((entry) => (entry.id === id ? { ...entry, output } : entry)));
  }

  function applyResult(entryId: number, result: CommandResult) {
    if (result.clear) {
      setTranscript([]);
      return;
    }
    updateEntry(entryId, result.output);
    if (result.navigate) navigateToSection(result.navigate);
    if (result.close) close();
  }

  function submit(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory((h) => [...h, trimmed]);
    setHistoryIndex(null);
    setInputValue("");

    const [name, ...args] = trimmed.split(/\s+/);
    const command = findCommand(trimmed) ?? findCommand(name);

    if (!command) {
      pushEntry(trimmed, `command not found: ${name}. Type 'help' for a list.`);
      return;
    }

    const result = command.run(args);

    if (result instanceof Promise) {
      const entryId = pushEntry(trimmed, "fetching…");
      result
        .then((resolved) => applyResult(entryId, resolved))
        .catch(() => updateEntry(entryId, `${name}: request failed. Try again in a moment.`));
      return;
    }

    applyResult(pushEntry(trimmed, result.output), result);
  }

  function autocomplete() {
    const [name, ...rest] = inputValue.split(/\s+/);
    if (rest.length > 0 || !name) return;

    const matches = COMMANDS.map((c) => c.name).filter((n) => n.startsWith(name.toLowerCase()));
    if (matches.length === 1) {
      setInputValue(matches[0]);
    } else if (matches.length > 1) {
      pushEntry(inputValue, matches.join("  "));
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      autocomplete();
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Command palette">
            <div className={styles.inputRow}>
              <span className={styles.prompt}>$</span>
              <input
                ref={inputRef}
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command, or try 'npm test'"
                aria-label="Command"
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {transcript.length > 0 && (
              <div className={styles.transcript} ref={transcriptRef} aria-live="polite">
                {transcript.map((entry) => (
                  <div className={styles.entry} key={entry.id}>
                    <div className={styles.entryCommand}>
                      <span className={styles.entryPrompt}>$</span> {entry.command}
                    </div>
                    {entry.output && <div className={styles.entryOutput}>{entry.output}</div>}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.footer}>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> history <kbd>Tab</kbd> complete <kbd>Esc</kbd> close
              </span>
              <span>help lists every command</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
