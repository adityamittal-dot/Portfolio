"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

/**
 * Types each role out, pauses, deletes it a word at a time (like ctrl+backspace),
 * then moves to the next role and repeats. Ported from santifer.io's hero.
 */
export function useTypewriterRotation(
  roles: readonly string[],
  { typeSpeed = 80, deleteSpeed = 60, pauseAfterType = 2000, pauseAfterDelete = 300 }: TypewriterOptions = {},
) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentRole = roles[roleIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setIsDeleting(false);
      }, pauseAfterDelete);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        const words = displayText.trimEnd().split(" ");
        words.pop();
        setDisplayText(words.length > 0 ? words.join(" ") + " " : "");
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  return { displayText, roleIndex, isDeleting };
}
