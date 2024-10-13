import { restartGame, useLoser } from "@/game/store";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function GameOverPopup() {
  const loser = useLoser();

  return (
    <Dialog
      open={loser !== null}
      modal
      onOpenChange={() => {
        restartGame();
      }}
    >
      <DialogContent className="h-1/3">
        <DialogHeader>
          <DialogTitle className="arvo-bold text-3xl">GAME OVER</DialogTitle>

          <DialogDescription className="arvo-regular text-lg">
            Player {loser === 1 ? "One" : "Two"} Wins!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button asChild>
            <DialogClose className="arvo-regular">Restart Game</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
