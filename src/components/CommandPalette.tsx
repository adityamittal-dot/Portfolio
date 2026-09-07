"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CommandPalette.module.css";

interface Section {
  id: string;
  blurb: string;
}

const SECTIONS: Section[] = [
  { id: "work", blurb: "Selected work — MedVault and NexDev." },
  { id: "stack", blurb: "How the stack fits together." },
  { id: "lab", blurb: "The lab — small experiments and tools." },
  { id: "about", blurb: "About and experience." },
  { id: "contact", blurb: "Reach out: adityamittal529@gmail.com" },
];

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
  run: (args: string[]) => CommandResult;
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
    hint: "cd <section> — jump to a section",
    run: (args) => {
      const target = args[0];
      if (!target) return { output: "cd: missing operand" };
      const section = SECTIONS.find((s) => s.id === target.toLowerCase());
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
        "Aditya Mittal — full stack engineer who makes AI features hold up.\nB.Tech CSE @ Jaypee University · Noida, India.",
    }),
  },
  {
    name: "skills",
    hint: "list core skills",
    run: () => ({ output: "Python · TypeScript · React · Next.js · Django · AWS · Playwright" }),
  },
  {
    name: "resume",
    hint: "open the resume",
    run: () => ({ output: "Resume isn't linked yet — email adityamittal529@gmail.com for a copy." }),
  },
  {
    name: "socials",
    aliases: ["github", "linkedin"],
    hint: "github / linkedin",
    run: () => ({
      output:
        "GitHub and LinkedIn links are coming soon — reach adityamittal529@gmail.com or +91 78368 50977 in the meantime.",
    }),
  },
  {
    name: "sudo",
    hint: "",
    run: () => ({
      output: "Nice try — you're not in the sudoers file. This incident has been reported (to nobody).",
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

function findCommand(name: string): Command | undefined {
  const lower = name.toLowerCase();
  return COMMANDS.find((c) => c.name === lower || c.aliases?.includes(lower));
}

interface TranscriptEntry {
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

  const close = useCallback(() => setIsOpen(false), []);

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
    if (isOpen) inputRef.current?.focus();
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

  function submit(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory((h) => [...h, trimmed]);
    setHistoryIndex(null);

    const [name, ...args] = trimmed.split(/\s+/);
    const command = findCommand(name);

    if (!command) {
      setTranscript((t) => [
        ...t,
        { command: trimmed, output: `command not found: ${name} — type 'help' for a list.` },
      ]);
      setInputValue("");
      return;
    }

    const result = command.run(args);

    if (result.clear) {
      setTranscript([]);
      setInputValue("");
      return;
    }

    setTranscript((t) => [...t, { command: trimmed, output: result.output }]);
    setInputValue("");

    if (result.navigate) navigateToSection(result.navigate);
    if (result.close) close();
  }

  function autocomplete() {
    const [name, ...rest] = inputValue.split(/\s+/);
    if (rest.length > 0 || !name) return;

    const matches = COMMANDS.map((c) => c.name).filter((n) => n.startsWith(name.toLowerCase()));
    if (matches.length === 1) {
      setInputValue(matches[0]);
    } else if (matches.length > 1) {
      setTranscript((t) => [...t, { command: inputValue, output: matches.join("  ") }]);
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
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette"
      >
        <span>
          type <span className={styles.triggerKey}>/</span> to explore
        </span>
        <span className={styles.triggerCursor} aria-hidden="true">
          ▌
        </span>
      </button>

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
                placeholder="type a command… try 'help'"
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {transcript.length > 0 && (
              <div className={styles.transcript} ref={transcriptRef} aria-live="polite">
                {transcript.map((entry, i) => (
                  <div className={styles.entry} key={i}>
                    <div className={styles.entryCommand}>
                      <span className={styles.entryPrompt}>$</span> {entry.command}
                    </div>
                    {entry.output && <div className={styles.entryOutput}>{entry.output}</div>}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.footer}>
              <span>↑↓ history · Tab autocomplete · Esc close</span>
              <span>try &apos;help&apos;</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
