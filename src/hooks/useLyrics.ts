import { useMemo } from "react";
import { LYRICS, type LyricLine } from "@/data/lyrics";

export function useLyrics(currentTime: number): LyricLine | null {
  return useMemo(() => {
    let current: LyricLine | null = null;
    for (const line of LYRICS) {
      if (line.time <= currentTime) {
        current = line;
      } else {
        break;
      }
    }
    if (!current || !current.text) return null;
    return current;
  }, [currentTime]);
}
