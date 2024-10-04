import * as game from ".";

import { create } from "zustand";

interface GameStore {
  game: game.Game;
  originHand: game.Hand | null;
}

export function splitHand() {
  const store = useGameStore.getState();

  useGameStore.setState({
    game: game.split(store.game),
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

  useGameStore.setState({
    game: game.makeMove(store.game, store.originHand, hand),
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

    const emptyHand = store.game.players[player].hands.indexOf(0);
    if (emptyHand === -1) return false;

    const otherHandFingers =
      store.game.players[player].hands[emptyHand === 0 ? 1 : 0];
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
