import { assert } from "@/lib/assert";
import * as game from ".";

import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";
import { produce } from "immer";

interface GameStore {
  game: game.Game;
  originHand: game.Hand | null;
  aiPlayer: game.Player | null | undefined;
  animations: [[boolean, boolean], [boolean, boolean]];
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

function makeAiMove(store: GameStore | undefined) {
  if (
    !store ||
    store.aiPlayer !== store.game.currentPlayer ||
    game.isOver(store.game)
  )
    return;

  const otherPlayer = game.getOtherPlayer(store.aiPlayer);
  setTimeout(() => {
    const newGame = game.makeAiMove(store.game);
    assert(!!newGame);

    const changedHand = newGame.players[otherPlayer].hands.findIndex(
      (fingers, i) => store.game.players[otherPlayer].hands[i] !== fingers,
    ) as game.Hand | -1;
    if (changedHand !== -1) triggerHandAnimation(otherPlayer, changedHand);

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
}

export function selectTwoPlayer() {
  useGameStore.setState({ aiPlayer: null });
}

export function selectOnePlayer(player: game.Player) {
  const aiPlayer = game.getOtherPlayer(player);
  useGameStore.setState({ aiPlayer });
}

const ANIMATION_TIMEOUT = 500;

const toggleAnimation = (
  isAnimated: boolean,
  player: game.Player,
  hand: game.Hand,
) =>
  produce<GameStore>((draft) => {
    draft.animations[player][hand] = isAnimated;
  });

export function triggerHandAnimation(player: game.Player, hand: game.Hand) {
  useGameStore.setState(toggleAnimation(true, player, hand));
  setTimeout(() => {
    useGameStore.setState(toggleAnimation(false, player, hand));
  }, ANIMATION_TIMEOUT);
}

const initialStore: GameStore = {
  game: game.initial,
  originHand: null,
  aiPlayer: undefined,
  animations: [
    [false, false],
    [false, false],
  ],
};

export function restartGame() {
  useGameStore.setState(initialStore);
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector(
    persist(() => initialStore, {
      name: "game",
      storage: createJSONStorage(() => sessionStorage),
      // Make an AI move (if applicable) whenever the state is rehydrated
      onRehydrateStorage: () => makeAiMove,
    }),
  ),
);
// Make an AI move (if applicable) whenever the current player (or the selected AI player) are changed
useGameStore.subscribe((store) => store, makeAiMove, {
  equalityFn: (a, b) =>
    a.game.currentPlayer === b.game.currentPlayer && a.aiPlayer === b.aiPlayer,
});

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
