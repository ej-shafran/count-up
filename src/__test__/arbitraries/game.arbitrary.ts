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

export function gameArb(): fc.Arbitrary<game.Game> {
  return fc.record({
    currentPlayer: playerArb(),
    players: fc.tuple(playerDataArb(), playerDataArb()),
  });
}
