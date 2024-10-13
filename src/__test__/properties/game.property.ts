import * as game from "@/game";
import { it } from "@fast-check/vitest";
import { gameArb } from "../arbitraries/game.arbitrary";

export const gameProperty = it.prop([gameArb()], {
  examples: [[game.initial], [game.fromHash(0)]],
});
