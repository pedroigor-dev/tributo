"use client";

import { useCallback, useRef, useState } from "react";

const FLOWERS = ["🌸", "🌺", "🌹", "💐", "🌼", "🪷"];

interface Petal {
  id: number;
  x: number;      
  y: number;      
  dx: number;     
  dy: number;     
  rotate: number; 
  rotateEnd: number;
  scale: number;
  rotateX: number; 
  duration: number; 
  delay: number;   
  emoji: string;
}

let nextId = 0;

function spawnPetals(originX: number, originY: number): Petal[] {
  const count = 10 + Math.floor(Math.random() * 6);
  return Array.from({ length: count }, () => {
    // Spread angle: mostly upward (between 200° and 340° in CSS coords where 270° = straight up)
    const angle = ((200 + Math.random() * 140) * Math.PI) / 180;
    const speed = 22 + Math.random() * 32;
    return {
      id: nextId++,
      x: (originX / window.innerWidth) * 100,
      y: (originY / window.innerHeight) * 100,
      dx: Math.cos(angle) * speed * 0.55,   // horizontal spread (vw)
      dy: Math.sin(angle) * speed * 0.75,   // negative = up in CSS
      rotate: Math.random() * 360,
      rotateEnd: (Math.random() - 0.5) * 900,
      rotateX: (Math.random() - 0.5) * 220,
      scale: 0.8 + Math.random() * 1.1,
      duration: 1400 + Math.random() * 900,
      delay: Math.random() * 180,
      emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    };
  });
}

export function FlowerBurst() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const newPetals = spawnPetals(cx, cy);
    setPetals((prev) => [...prev, ...newPetals]);
    setTimeout(
      () => setPetals((prev) => prev.filter((p) => !newPetals.find((n) => n.id === p.id))),
      2500
    );
  }, []);

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-50"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            fontSize: `${p.scale * 1.6}rem`,
            animation: `petal-fly ${p.duration}ms ${p.delay}ms cubic-bezier(.2,.8,.4,1) forwards`,
            ["--dx" as string]: `${p.dx}vw`,
            ["--dy" as string]: `${p.dy}vh`,
            ["--rotate-start" as string]: `${p.rotate}deg`,
            ["--rotate-end" as string]: `${p.rotateEnd}deg`,
            ["--rotate-x" as string]: `${p.rotateX}deg`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Tooltip */}
        <p className="
          text-white/35 text-[10px] tracking-[0.22em] uppercase font-light
          text-right leading-relaxed select-none
          transition-opacity duration-500
        ">
          dedique flores<br />à minha vózinha
        </p>

        <button
          ref={buttonRef}
          onClick={handleClick}
          aria-label="Jogar flores"
          className="
            text-2xl
            rounded-full w-12 h-12
            flex items-center justify-center
            border border-white/15 bg-white/5
            hover:bg-white/12 hover:border-white/35
            hover:scale-110 active:scale-95
            transition-all duration-300 ease-out
            backdrop-blur-sm cursor-pointer
            shadow-[0_0_20px_rgba(255,255,255,0.04)]
          "
        >
          🌸
        </button>
      </div>
    </>
  );
}
