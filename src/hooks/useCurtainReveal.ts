"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export type RevealState = "idle" | "opening" | "revealed" | "closing";

const CURTAIN_OPEN_MS = 1700;
export const CURTAIN_CLOSE_MS = 2500;

export function useCurtainReveal() {
  const [state, setState] = useState<RevealState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const trigger = useCallback(() => {
    if (state !== "idle") return;
    setState("opening");
    timerRef.current = setTimeout(() => setState("revealed"), CURTAIN_OPEN_MS);
  }, [state]);

  const close = useCallback(() => {
    if (state !== "revealed") return;
    clearTimer();
    setState("closing");
    timerRef.current = setTimeout(() => setState("idle"), CURTAIN_CLOSE_MS);
  }, [state]);

  useEffect(() => {
    return clearTimer;
  }, []);

  return { state, trigger, close };
}
