import * as game from "@/game";
import fc from "fast-check";

export function playerArb(): fc.Arbitrary<game.Player> {
  return fc.constantFrom(0, 1);
}

export function fingersArb(): fc.Arbitrary<game.Fingers> {
  return fc.constantFrom(0, 1, 2, 3, 4);
}

export function playerDataArb(): fc.Arbitrary<game.PlayerData> {
  return fc.record({
    hands: fc.tuple(fingersArb(), fingersArb()),
  });
}

export function gameArb(
  options: { isOver?: boolean; canSplit?: boolean } = {},
): fc.Arbitrary<game.Game> {
  let baseArb = fc.record({
    currentPlayer: playerArb(),
    players: fc.tuple(playerDataArb(), playerDataArb()),
  });

  if (options.isOver !== undefined) {
    baseArb = baseArb.filter((g) => game.isOver(g) === options.isOver);
  }

  if (options.canSplit !== undefined) {
    baseArb = baseArb.filter((g) => game.canSplit(g) === options.canSplit);
  }

  return baseArb;
}
