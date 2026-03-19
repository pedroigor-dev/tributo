interface CurtainPanelProps {
  side: "left" | "right";
  isOpen: boolean;
}

export function CurtainPanel({ side, isOpen }: CurtainPanelProps) {
  const translateClass = isOpen
    ? side === "left"
      ? "-translate-x-full"
      : "translate-x-full"
    : "translate-x-0";

  return (
    <div
      aria-hidden="true"
      className={[
        "absolute inset-y-0 w-1/2 z-20 bg-black",
        "transition-transform ease-in-out",
        side === "left"
          ? "left-0 duration-1700"
          : "right-0 duration-1700 delay-[40ms]",
        translateClass,
      ].join(" ")}
    />
  );
}
