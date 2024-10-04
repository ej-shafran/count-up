import clsx from "clsx";
import * as game from "@/game";
import { Hand } from "./Hand";
import {
  useCanSplit,
  useCurrentPlayer,
  useIsClickable,
  useLoser,
} from "@/game/store";

export interface PlayerProps {
  playerIndex: game.PlayerIndex;
}

export function Player({ playerIndex }: PlayerProps) {
  const currentPlayer = useCurrentPlayer();
  const canSplit = useCanSplit(playerIndex);
  const isClickable = useIsClickable(playerIndex);
  const otherIsClickable = useIsClickable(playerIndex === 0 ? 1 : 0);
  const loser = useLoser();

  return (
    <div
      className={clsx(
        "flex h-1/2 grow gap-3",
        playerIndex === 0 ? "flex-col-reverse" : "flex-col",
      )}
    >
      <h2 className="arvo-regular text-xl">
        {(loser !== null || currentPlayer !== playerIndex) && (
          <>Player {playerIndex === 1 ? "Two" : "One"}</>
        )}

        {loser === null && currentPlayer === playerIndex && (
          <>
            {isClickable && (
              <>Select a hand to use{canSplit && " (or SPLIT)"}</>
            )}

            {otherIsClickable && (
              <>Select a hand to target{canSplit && " (or SPLIT)"}</>
            )}
          </>
        )}
      </h2>

      <div className="flex grow gap-3">
        <Hand playerIndex={playerIndex} handIndex={0} />
        <Hand playerIndex={playerIndex} handIndex={1} />
      </div>
    </div>
  );
}
