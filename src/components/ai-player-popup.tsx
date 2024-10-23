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
      <DialogContent className="h-1/3" noClose>
        <DialogHeader>
          <DialogTitle className="arvo-bold text-3xl">
            {isOnePlayer ? "Select Player" : "Select Game Mode"}
          </DialogTitle>

          <DialogDescription className="arvo-regular text-lg">
            {isOnePlayer
              ? "Choose which player to play as."
              : "Choose whether to play the computer or another player."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="arvo-regular">
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
