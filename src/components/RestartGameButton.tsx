import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { restartGame } from "@/game/store";

export function RestartGameButton(props: Omit<ButtonProps, "onClick">) {
  return (
    <Button
      variant="ghost"
      {...props}
      className={cn("arvo-regular w-1/2 self-center rounded", props.className)}
      onClick={restartGame}
    >
      Restart Game
    </Button>
  );
}
