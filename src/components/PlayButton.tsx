"use client";

interface PlayButtonProps {
  onClick: () => void;
}

export function PlayButton({ onClick }: PlayButtonProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={onClick}
        aria-label="Revelar tributo"
        className="
          group relative flex items-center justify-center
          w-28 h-28 rounded-full
          border border-white/25
          hover:border-white/60
          transition-all duration-700 hover:scale-105
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        "
      >
        <span className="absolute inset-0 rounded-full border border-white/10 animate-ping animation-duration-[2.5s]" />

        <span className="absolute inset-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-700" />

        <svg
          className="relative w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 6.5v11l9-5.5z" />
        </svg>
      </button>

      <p className="text-white/25 text-[10px] tracking-[0.5em] uppercase font-light select-none">
        play
      </p>
    </div>
  );
}
