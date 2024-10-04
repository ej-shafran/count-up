import * as game from ".";

import { create } from "zustand";

interface GameStore {
  game: game.Game;
  originHand: game.Hand | null;
}

export function splitHand() {
  const store = useGameStore.getState();

  const newGame = game.split(store.game);
  if (!newGame) return;

  useGameStore.setState({
    game: newGame,
    originHand: null,
  });
}

export function deselectHand() {
  useGameStore.setState({ originHand: null });
}

export function selectHand(hand: game.Hand) {
  const store = useGameStore.getState();
  if (store.originHand === null) {
    useGameStore.setState({ originHand: hand });
    return;
  }

  const newGame = game.makeMove(store.game, store.originHand, hand);
  if (!newGame) return;

  useGameStore.setState({
    game: newGame,
    originHand: null,
  });
}

export function restartGame() {
  useGameStore.setState({ game: game.initial, originHand: null });
}

export const useGameStore = create<GameStore>()(() => ({
  game: game.initial,
  originHand: null,
}));

export const useCurrentPlayer = () =>
  useGameStore((store) => store.game.currentPlayer);

export const useCanSplit = (player: game.Player) =>
  useGameStore((store) => {
    if (store.game.currentPlayer !== player) return false;

    const emptyHand = game.getHandByFingers(store.game, player, 0);
    if (emptyHand === -1) return false;

    const otherHandFingers =
      store.game.players[player].hands[game.getOtherHand(emptyHand)];
    return otherHandFingers !== 0 && otherHandFingers % 2 === 0;
  });

export const useIsClickable = (player: game.Player) =>
  useGameStore(
    (store) =>
      (store.game.currentPlayer === player) === (store.originHand === null),
  );

export const useLoser = () =>
  useGameStore((store) => {
    const losingPlayerIndex = store.game.players.findIndex((player) =>
      player.hands.every((fingers) => fingers === 0),
    );

    if (losingPlayerIndex === -1) return null;
    return losingPlayerIndex as game.Player;
  });
