"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export type RevealState = "idle" | "opening" | "revealed";

const CURTAIN_DURATION_MS = 1700;

export function useCurtainReveal() {
  const [state, setState] = useState<RevealState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    if (state !== "idle") return;
    setState("opening");
    timerRef.current = setTimeout(() => setState("revealed"), CURTAIN_DURATION_MS);
  }, [state]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { state, trigger };
}
