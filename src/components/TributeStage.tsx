"use client";

import Image from "next/image";
import { useCurtainReveal } from "@/hooks/useCurtainReveal";
import { CurtainPanel } from "./CurtainPanel";
import { PlayButton } from "./PlayButton";

export function TributeStage() {
  const { state, trigger } = useCurtainReveal();

  const isOpen = state !== "idle";
  const isRevealed = state === "revealed";

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">

      {/* ── CONTEÚDO REVELADO (fica atrás das cortinas) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-0">

        {/* Foto */}
        <div
          className={[
            "relative w-full max-w-70 sm:max-w-xs aspect-3/4",
            "shadow-[0_0_80px_rgba(255,255,255,0.04)]",
            "transition-opacity duration-1200 delay-[600ms]",
            isRevealed ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src="/vozinha.png"
            alt="Minha vovó"
            fill
            className="object-cover"
            priority
          />
          {/* Vinheta cinematográfica */}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Texto tributo */}
        <div
          className={[
            "mt-8 text-center transition-all duration-1400 delay-[1100ms]",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          <p className="font-serif italic text-white/85 text-xl sm:text-2xl tracking-wide leading-relaxed">
            &ldquo;Sempre no meu coração&rdquo;
          </p>
          <p className="mt-3 text-white/30 text-[11px] tracking-[0.35em] uppercase font-light">
            Com amor eterno
          </p>
        </div>

      </div>

      {/* ── GRAIN OVERLAY (textura de filme) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.035] grain-overlay"
      />

      {/* ── CORTINAS ── */}
      <CurtainPanel side="left" isOpen={isOpen} />
      <CurtainPanel side="right" isOpen={isOpen} />

      {/* ── BOTÃO PLAY (visível apenas no estado idle) ── */}
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
