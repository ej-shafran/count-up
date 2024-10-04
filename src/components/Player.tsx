import clsx from "clsx";
import * as game from "../game";
import { Hand } from "./Hand";

export interface PlayerProps {
  playerIndex: game.PlayerIndex;
}

export function Player({ playerIndex }: PlayerProps) {
  return (
    <div
      className={clsx(
        "flex h-1/2 grow gap-3",
        playerIndex === 0 ? "flex-col-reverse" : "flex-col",
      )}
    >
      <h2 className="arvo-regular text-xl">
        Player {playerIndex === 1 ? "Two" : "One"}
      </h2>

      <div className="flex grow gap-3">
        <Hand playerIndex={playerIndex} handIndex={0} />
        <Hand playerIndex={playerIndex} handIndex={1} />
      </div>
    </div>
  );
}
