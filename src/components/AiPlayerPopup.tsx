import * as game from "@/game";
import { selectOnePlayer, selectTwoPlayer, useGameStore } from "@/game/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

export function AiPlayerPopup() {
  const aiPlayer = useGameStore((store) => store.aiPlayer);
  const [isOnePlayer, setIsOnePlayer] = useState(false);

  function handleClick(player: game.Player) {
    return function () {
      if (isOnePlayer) {
        selectOnePlayer(player);
        // Reset to default
        setIsOnePlayer(false);
        return;
      }

      if (player === 0) {
        setIsOnePlayer(true);
      } else {
        selectTwoPlayer();
      }
    };
  }

  return (
    <Dialog open={aiPlayer === undefined} modal>
      <DialogContent className="h-1/3">
        <DialogHeader>
          <DialogTitle className="arvo-bold text-3xl">
            {isOnePlayer ? "SELECT PLAYER" : "SELECT GAME MODE"}
          </DialogTitle>

          <DialogDescription className="arvo-regular text-lg"></DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleClick(0)}>
            {isOnePlayer ? "Play as Player One" : "One Player"}
          </Button>
          <Button variant="secondary" onClick={handleClick(1)}>
            {isOnePlayer ? "Play as Player Two" : "Two Player"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
