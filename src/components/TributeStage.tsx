"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useCurtainReveal } from "@/hooks/useCurtainReveal";
import { useLyrics } from "@/hooks/useLyrics";
import { CurtainPanel } from "./CurtainPanel";
import { PlayButton } from "./PlayButton";

export function TributeStage() {
  const { state, trigger } = useCurtainReveal();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioTime, setAudioTime] = useState(0);
  const currentLyric = useLyrics(audioTime);

  const isOpen = state !== "idle";
  const isRevealed = state === "revealed";

  useEffect(() => {
    if (state === "opening") {
      audioRef.current?.play().catch(() => {});
    }
  }, [state]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">

      <audio
        ref={audioRef}
        src="/standbyyou.mp3"
        preload="auto"
        onTimeUpdate={() => setAudioTime(audioRef.current?.currentTime ?? 0)}
      />

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="flex-1 items-center justify-end pr-6 lg:pr-14 min-w-0 hidden md:flex">
          {isRevealed && currentLyric?.side === "left" && (
            <div key={currentLyric.time} className="lyric-appear text-right max-w-47.5 lg:max-w-60">
              <p className="font-serif italic text-white/55 text-sm lg:text-[15px] leading-relaxed">
                {currentLyric.text}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center shrink-0">
          <div
            className={[
              "relative w-64 sm:w-70 aspect-3/4",
              "shadow-[0_0_80px_rgba(255,255,255,0.04)]",
              "transition-opacity duration-1200 delay-[600ms]",
              isRevealed ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <Image
              src="/vozinha.png"
              alt="Minha vovo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
          </div>

          <div
            className={[
              "mt-8 text-center transition-all duration-1400 delay-[1100ms]",
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            ].join(" ")}
          >
            <p className="font-serif italic text-white/85 text-xl sm:text-2xl tracking-wide leading-relaxed">
              &ldquo;Sempre no meu cora&ccedil;&atilde;o&rdquo;
            </p>
            <p className="mt-3 text-white/30 text-[11px] tracking-[0.35em] uppercase font-light">
              Com amor eterno
            </p>
          </div>
        </div>

        <div className="flex-1 items-center justify-start pl-6 lg:pl-14 min-w-0 hidden md:flex">
          {isRevealed && currentLyric?.side === "right" && (
            <div key={currentLyric.time} className="lyric-appear text-left max-w-47.5 lg:max-w-60">
              <p className="font-serif italic text-white/55 text-sm lg:text-[15px] leading-relaxed">
                {currentLyric.text}
              </p>
            </div>
          )}
        </div>

      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.035] grain-overlay"
      />

      <CurtainPanel side="left" isOpen={isOpen} />
      <CurtainPanel side="right" isOpen={isOpen} />

      <div
        className={[
          "absolute inset-0 z-30 flex items-center justify-center",
          "transition-opacity duration-500",
          state === "idle"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <PlayButton onClick={trigger} />
      </div>

    </div>
  );
}
