import { restartGame, useLoser } from "@/game/store";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { RestartGameButton } from "./restart-game-button";

export function GameOverPopup() {
  const loser = useLoser();

  return (
    <Dialog open={loser !== null} modal onOpenChange={restartGame}>
      <DialogContent className="h-1/3">
        <DialogHeader>
          <DialogTitle className="arvo-bold text-3xl">Game Over</DialogTitle>

          <DialogDescription className="arvo-regular text-lg">
            Player {loser === 1 ? "One" : "Two"} Wins!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="arvo-regular">
          <RestartGameButton
            variant="default"
            className="w-1/2 self-center rounded"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
