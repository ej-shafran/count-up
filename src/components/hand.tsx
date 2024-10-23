import {
  deselectHand,
  splitHand,
  selectHand,
  useGameStore,
  useLoser,
  useCurrentPlayer,
  useCanSplit,
  useIsClickable,
  triggerHandAnimation,
} from "@/game/store";
import * as game from "@/game";
import { Finger } from "./finger";
import { cn } from "@/lib/utils";

export interface HandProps {
  player: game.Player;
  hand: game.Hand;
}

export function Hand({ hand, player }: HandProps) {
  const fingers = useGameStore(
    (store) => store.game.players[player].hands[hand],
  );
  const isSelected = useGameStore(
    (store) => store.game.currentPlayer === player && store.originHand === hand,
  );

  const isAnimating = useGameStore((store) => store.animations[player][hand]);
  const currentPlayer = useCurrentPlayer();
  const loser = useLoser();

  const canSplit = useCanSplit(player);
  const isClickable = useIsClickable(player);

  const border =
    loser !== 1 && (currentPlayer === 1 || loser !== null)
      ? "border-playerTwo-300"
      : "border-playerOne-300";

  const background =
    player === 1
      ? isSelected
        ? "bg-playerTwo-200"
        : "bg-playerTwo-100"
      : isSelected
        ? "bg-playerOne-200"
        : "bg-playerOne-100";

  const baseClassName = "grid w-1/2 grow grid-cols-2 grid-rows-2 rounded p-8";

  if (fingers === 0) {
    if (isAnimating) {
      return (
        <button
          disabled
          className={cn(
            "animate-jump-out border-2 transition-colors animate-ease-in",
            baseClassName,
            background,
            border,
            isClickable && "border-dashed",
          )}
        />
      );
    }

    return (
      <button
        disabled={loser !== null || !canSplit}
        className={cn(
          baseClassName,
          canSplit && ["rounded border-2 border-dashed bg-gray-100", border],
        )}
        onClick={() => {
          if (!canSplit) return;

          splitHand();
        }}
      />
    );
  }

  return (
    <button
      disabled={loser !== null || (!isClickable && !isSelected)}
      className={cn(
        baseClassName,
        "border-2 transition-colors",
        background,
        border,
        isClickable && "border-dashed",
      )}
      onClick={() => {
        if (isSelected) {
          deselectHand();
          return;
        }

        if (!isClickable) return;

        triggerHandAnimation(player, hand);
        selectHand(hand);
      }}
    >
      {Array.from({ length: game.MAX_FINGERS }, (_, i) => (
        <Finger key={i} player={player} isFilled={fingers > i} />
      ))}
    </button>
  );
}
