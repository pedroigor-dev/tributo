"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useCurtainReveal, CURTAIN_CLOSE_MS } from "@/hooks/useCurtainReveal";
import { useLyrics } from "@/hooks/useLyrics";
import { CurtainPanel } from "./CurtainPanel";
import { PlayButton } from "./PlayButton";
import { FlowerBurst } from "./FlowerBurst";

const OUTRO_TIME = 214.0;
const OUTRO_CLOSE_DELAY_MS = 3800;

export function TributeStage() {
  const { state, trigger, close } = useCurtainReveal();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioTime, setAudioTime] = useState(0);
  const [outroStarted, setOutroStarted] = useState(false);
  const currentLyric = useLyrics(audioTime);

  const closeRef = useRef(close);
  closeRef.current = close;

  const outroTriggeredRef = useRef(false);

  const isOpen = state === "opening" || state === "revealed";
  const isClosing = state === "closing";
  const isRevealed = state === "revealed" || state === "closing";
  const isOutro = state === "revealed" && audioTime >= OUTRO_TIME;

  useEffect(() => {
    if (state === "idle") {
      outroTriggeredRef.current = false;
      setOutroStarted(false);
    }
  }, [state]);

  useEffect(() => {
    if (state === "opening") {
      audioRef.current?.play().catch(() => {});
    }
  }, [state]);

  useEffect(() => {
    if (!isOutro || outroTriggeredRef.current) return;
    outroTriggeredRef.current = true;
    setOutroStarted(true);

    const closeTimer = setTimeout(() => closeRef.current(), OUTRO_CLOSE_DELAY_MS);

    const audioTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setAudioTime(0);
    }, OUTRO_CLOSE_DELAY_MS + CURTAIN_CLOSE_MS + 300);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(audioTimer);
    };
  }, [isOutro]);

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
          {isRevealed && !outroStarted && currentLyric?.side === "left" && (
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
              "transition-all ease-in-out",
              outroStarted
                ? "duration-4000 scale-[1.18] opacity-100"
                : isRevealed
                ? "duration-1200 scale-100 opacity-100"
                : "duration-1200 delay-[600ms] scale-100 opacity-0",
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

            <div
              className={[
                "absolute inset-0 pointer-events-none transition-opacity duration-2000",
                outroStarted ? "opacity-100 bg-black/45" : "opacity-0",
              ].join(" ")}
            />

            {outroStarted && (
              <div className="absolute inset-0 flex items-center justify-center z-10 lyric-appear">
                <p className="font-serif italic text-white text-2xl sm:text-3xl text-center px-6 leading-snug drop-shadow-[0_2px_40px_rgba(0,0,0,1)]">
                  I&apos;ll stand by you
                </p>
              </div>
            )}
          </div>

          <div
            className={[
              "mt-8 text-center transition-all",
              outroStarted
                ? "duration-2000 opacity-0"
                : isRevealed
                ? "duration-1400 opacity-100 translate-y-0"
                : "duration-1400 delay-[1100ms] opacity-0 translate-y-5",
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
          {isRevealed && !outroStarted && currentLyric?.side === "right" && (
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

      <CurtainPanel side="left" isOpen={isOpen} isClosing={isClosing} />
      <CurtainPanel side="right" isOpen={isOpen} isClosing={isClosing} />

      <FlowerBurst />

      <div
        className={[
          "absolute inset-0 z-30 flex items-center justify-center",
          "transition-opacity duration-700",
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
