import { cn } from "@/lib/utils";
import * as game from "@/game";
import { useEffect, useState } from "react";

const FINGER_SIZE = 50;
const ANIMATION_TIMEOUT = 500;

export interface FingerProps {
  isFilled: boolean;
  player: game.Player;
}

export function Finger({ player, isFilled: isFilledBase }: FingerProps) {
  const [offset] = useState(() => [Math.random(), Math.random()]);

  const [isFilled, setIsFilled] = useState(isFilledBase);

  useEffect(() => {
    // If the finger got filled up,
    // we want to show it with no delay
    if (isFilledBase) {
      setIsFilled(true);
      return;
    }

    // If it got removed, we want to show a jump-out animation
    const timer = setTimeout(() => {
      setIsFilled(isFilledBase);
    }, ANIMATION_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [isFilledBase]);

  if (!isFilled) return null;

  return (
    <div
      style={{
        width: `${String(FINGER_SIZE)}%`,
        inset: offset
          .map((n) => `${(n * (100 - FINGER_SIZE)).toFixed(0)}%`)
          .join(" "),
      }}
      className={cn(
        "relative aspect-square rounded-[50%]",
        isFilledBase ? "animate-jump" : "animate-jump-out",
        player === 1 ? "bg-playerTwo-400" : "bg-playerOne-400",
      )}
    />
  );
}
