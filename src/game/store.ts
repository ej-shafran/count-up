import { assert } from "@/lib/assert";
import * as game from ".";

import { create } from "zustand";

interface GameStore {
  game: game.Game;
  originHand: game.Hand | null;
  aiPlayer: game.Player | null | undefined;
}

export function splitHand() {
  const store = useGameStore.getState();

  const newGame = game.split(store.game);
  assert(!!newGame);

  useGameStore.setState({
    game: newGame,
    originHand: null,
  });
}

export function deselectHand() {
  useGameStore.setState({ originHand: null });
}

function makeAiMove(g: game.Game) {
  setTimeout(() => {
    const newGame = game.makeAiMove(g);
    assert(!!newGame);
    useGameStore.setState({ game: newGame });
  }, 500);
}

export function selectHand(hand: game.Hand) {
  const store = useGameStore.getState();
  if (store.originHand === null) {
    useGameStore.setState({ originHand: hand });
    return;
  }

  const newGame = game.makeMove(store.game, store.originHand, hand);
  assert(!!newGame);

  useGameStore.setState({
    game: newGame,
    originHand: null,
  });

  if (store.aiPlayer === newGame.currentPlayer) {
    makeAiMove(newGame);
  }
}

export function selectTwoPlayer() {
  useGameStore.setState({ aiPlayer: null });
}

export function selectOnePlayer(player: game.Player) {
  const aiPlayer = game.getOtherPlayer(player);
  useGameStore.setState({ aiPlayer });

  if (aiPlayer === 0) {
    makeAiMove(game.initial);
  }
}

const initialStore: GameStore = {
  game: game.initial,
  originHand: null,
  aiPlayer: undefined,
};

export function restartGame() {
  useGameStore.setState(initialStore);
}

export const useGameStore = create<GameStore>()(() => initialStore);

export const useCurrentPlayer = () =>
  useGameStore((store) => store.game.currentPlayer);

export const useCanSplit = (player: game.Player) =>
  useGameStore(
    (store) => store.game.currentPlayer === player && game.canSplit(store.game),
  );

export const useIsClickable = (player: game.Player) =>
  useGameStore((store) => {
    if (store.game.currentPlayer === store.aiPlayer) return false;

    const isCurrentPlayer = store.game.currentPlayer === player;
    const isSelectingOrigin = store.originHand === null;
    return isCurrentPlayer === isSelectingOrigin;
  });

export const useLoser = () =>
  useGameStore((store) => game.getLoser(store.game));
