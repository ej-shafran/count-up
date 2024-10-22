import * as game from "@/game";
import { it } from "@fast-check/vitest";
import { gameArb } from "../arbitraries/game.arbitrary";

export const gameProperty = it.prop([gameArb()], {
  examples: [[game.initial], [game.fromHash(0)]],
});

export const notOverGameProperty = it.prop([gameArb({ isOver: false })], {
  examples: [[game.initial]],
});

export const overGameProperty = it.prop([gameArb({ isOver: true })], {
  examples: [[game.fromHash(0)]],
});

export const canSplitGameProperty = it.prop([gameArb({ canSplit: true })], {
  examples: [],
});
