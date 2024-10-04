import cn from "clsx";
import * as game from "@/game";
import { Hand } from "./Hand";
import {
  useCanSplit,
  useCurrentPlayer,
  useIsClickable,
  useLoser,
} from "@/game/store";

export interface PlayerProps {
  player: game.Player;
}

export function Player({ player }: PlayerProps) {
  const currentPlayer = useCurrentPlayer();
  const canSplit = useCanSplit(player);
  const isClickable = useIsClickable(player);
  const otherIsClickable = useIsClickable(player === 0 ? 1 : 0);
  const loser = useLoser();

  return (
    <div
      className={cn(
        "flex h-1/2 grow gap-3",
        player === 0 ? "flex-col-reverse" : "flex-col",
      )}
    >
      <h2 className="arvo-regular text-xl">
        {(loser !== null || currentPlayer !== player) && (
          <>Player {player === 1 ? "Two" : "One"}</>
        )}

        {loser === null && currentPlayer === player && (
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
        <Hand player={player} hand={0} />
        <Hand player={player} hand={1} />
      </div>
    </div>
  );
}
