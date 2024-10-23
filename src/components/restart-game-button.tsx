import { Button, ButtonProps } from "./ui/button";
import { restartGame } from "@/game/store";
import { IconButton } from "./ui/icon-button";
import { RotateCcw } from "lucide-react";

export interface RestartGameButtonProps extends Omit<ButtonProps, "onClick"> {
  asIcon?: boolean;
}

export function RestartGameButton({
  asIcon,
  ...props
}: RestartGameButtonProps) {
  const text = "Restart Game";

  if (asIcon) {
    return (
      <IconButton tooltipText={text} {...props} onClick={restartGame}>
        <RotateCcw />
      </IconButton>
    );
  }

  return (
    <Button {...props} onClick={restartGame}>
      {text}
    </Button>
  );
}
