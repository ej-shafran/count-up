import { CircleHelp } from "lucide-react";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { IconButton } from "./ui/icon-button";
import { Button } from "./ui/button";

export function RulesButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton
          className="lg:fixed lg:start-3 lg:top-3"
          variant="outline"
          tooltipText="Rules"
        >
          <CircleHelp />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="arvo-bold text-3xl">Count Up Rules</DialogTitle>

        <DialogDescription asChild className="arvo-regular">
          <ol className="flex flex-col gap-3">
            <li>
              <b>Hands and fingers</b>
              <br />
              Each player has two &quot;hands&quot; with one to four
              &quot;fingers&quot;. Players start with one finger on each hand.
            </li>
            <li>
              <b>Making moves</b>
              <br />
              Each turn, the current player adds the fingers from one of their
              hands to one of the other player&apos;s hands.
            </li>
            <li>
              <b>Rolling over</b>
              <br />
              If a hand would have more than five fingers, the fingers
              &quot;roll over&quot;. E.g. if a hand with four fingers has two
              fingers added onto it, it now has one finger.
            </li>
            <li>
              <b>Dead hands</b>
              <br />
              If a hand would have exactly five fingers, it &quot;dies&quot; and
              can no longer be used or targeted.
            </li>
            <li>
              <b>Splitting</b>
              <br />
              If a player has one dead hand and their other hand has an even
              number of fingers, they can split the living hand and create two
              living hands with half the amount of fingers.
            </li>
            <li>
              <b>Game over</b>
              <br />
              If a player has no living hands, they lose.
            </li>
          </ol>
        </DialogDescription>
        <DialogFooter className="arvo-regular">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
