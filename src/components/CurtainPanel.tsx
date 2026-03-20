interface CurtainPanelProps {
  side: "left" | "right";
  isOpen: boolean;
  isClosing?: boolean;
}

export function CurtainPanel({ side, isOpen, isClosing = false }: CurtainPanelProps) {
  const translateClass = isOpen
    ? side === "left"
      ? "-translate-x-full"
      : "translate-x-full"
    : "translate-x-0";

  const durationClass = isClosing ? "duration-2500" : "duration-1700";
  const delayClass = !isClosing && side === "right" ? "delay-[40ms]" : "";

  return (
    <div
      aria-hidden="true"
      className={[
        "absolute inset-y-0 w-1/2 z-20 bg-black",
        "transition-transform ease-in-out",
        side === "left" ? "left-0" : "right-0",
        durationClass,
        delayClass,
        translateClass,
      ].join(" ")}
    />
  );
}
