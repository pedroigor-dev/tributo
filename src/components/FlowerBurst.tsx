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
    const angle = Math.random() * 2 * Math.PI;
    const speed = 18 + Math.random() * 26; 
    return {
      id: nextId++,
      x: (originX / window.innerWidth) * 100,
      y: (originY / window.innerHeight) * 100,
      dx: Math.cos(angle) * speed,
      dy: -(Math.abs(Math.sin(angle)) * speed * 0.8 + 8),
      rotate: Math.random() * 360,
      rotateEnd: (Math.random() - 0.5) * 720,
      rotateX: (Math.random() - 0.5) * 180,
      scale: 0.7 + Math.random() * 0.9,
      duration: 1200 + Math.random() * 800,
      delay: Math.random() * 150,
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

      <button
        ref={buttonRef}
        onClick={handleClick}
        aria-label="Jogar flores"
        className="
          fixed bottom-6 right-6 z-40
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
    </>
  );
}
