import clsx from "clsx";
import * as game from "../game";
import { useState } from "react";

const FINGER_SIZE = 50;

export interface FingerProps {
  playerIndex: game.PlayerIndex;
}

export function Finger({ playerIndex }: FingerProps) {
  const [offset] = useState(() => [Math.random(), Math.random()]);

  return (
    <div
      style={{
        width: `${String(FINGER_SIZE)}%`,
        inset: offset
          .map((n) => `${(n * (100 - FINGER_SIZE)).toFixed(0)}%`)
          .join(" "),
      }}
      className={clsx(
        "relative aspect-square animate-jump rounded-[50%]",
        playerIndex === 1 ? "bg-playerTwo-400" : "bg-playerOne-400",
      )}
    ></div>
  );
}
