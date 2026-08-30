import { useState } from 'react';
import {
  GameState,
  Player,
  Contribution,
  Accusation,
  createInitialState,
  randInt,
  activePlayers,
  resolveRound,
  applyOutcomes,
  resolveAccusations,
  buildStandings,
  MAX_ROUNDS,
  STARTING_COINS,
  ACCUSATION_COST_MIN,
  ACCUSATION_COST_MAX,
  coinSupplyIsConserved,
  totalCoins,
  MAX_PLAYERS,
} from '@/game/engine';
import { useI18n } from '@/i18n';
import { SetupScreen } from '@/screens/SetupScreen';
import { RoundIntroScreen, HandoffScreen } from '@/screens/RoundScreens';
import { PrivateTurnScreen } from '@/screens/PrivateTurnScreen';
import {
  PrivateStatementScreen,
  PublicAnnouncementScreen,
  DiscussionScreen,
} from '@/screens/StatementScreens';
import { AccusationScreen } from '@/screens/AccusationScreen';
import {
  AccusationResultScreen,
  GameOverScreen,
  RoundEndDecisionScreen,
  TwoPlayerDecisionScreen,
  AddPlayerScreen,
} from '@/screens/EndScreens';

export default function App() {
  const { t } = useI18n();
  const [state, setState] = useState<GameState>(createInitialState());

  const assertSupply = (players: Player[], expectedSupply: number) => {
    if (!coinSupplyIsConserved(players, expectedSupply) || totalCoins(players) !== expectedSupply) {
      throw new Error(`Coin supply invariant failed: expected ${expectedSupply}, got ${totalCoins(players)}`);
    }
  };

  const startGame = (players: Player[]) => {
    const maxId = Math.max(...players.map((p) => p.id));
    const coinSupply = players.length * STARTING_COINS;
    assertSupply(players, coinSupply);
    setState({
      ...createInitialState(),
      players,
      round: 1,
      minimum: randInt(10, 100),
      accusationCost: randInt(ACCUSATION_COST_MIN, ACCUSATION_COST_MAX),
      phase: 'roundIntro',
      nextPlayerId: maxId + 1,
      coinSupply,
    });
  };

  const beginPrivateTurns = () => {
    const ids = activePlayers(state.players).map((p) => p.id);
    const firstId = ids[0];
    setState((s) => ({
      ...s,
      phase: 'handoff',
      queue: ids,
      queueIndex: 0,
      handoff: { playerId: firstId, next: 'privateTurn' },
      contributions: {},
    }));
  };

  const submitContribution = (c: Contribution) => {
    const cur = state.handoff!.playerId;
    const contributions = { ...state.contributions, [cur]: c };
    const nextIndex = state.queueIndex + 1;
    if (nextIndex < state.queue.length) {
      const nextId = state.queue[nextIndex];
      setState((s) => ({
        ...s,
        contributions,
        queueIndex: nextIndex,
        handoff: { playerId: nextId, next: 'privateTurn' },
        phase: 'handoff',
      }));
    } else {
      const { outcomes, minMet } = resolveRound(state.players, state.minimum, contributions);
      const updatedPlayers = applyOutcomes(state.players, outcomes);
      const ids = activePlayers(updatedPlayers).map((p) => p.id);
      setState((s) => ({
        ...s,
        contributions,
        outcomes,
        publicMinMet: minMet,
        players: updatedPlayers,
        queue: ids,
        queueIndex: 0,
        handoff: ids.length ? { playerId: ids[0], next: 'privateStatement' } : null,
        phase: ids.length ? 'handoff' : 'publicAnnouncement',
      }));
    }
  };

  const advanceStatement = () => {
    const nextIndex = state.queueIndex + 1;
    if (nextIndex < state.queue.length) {
      const nextId = state.queue[nextIndex];
      setState((s) => ({
        ...s,
        queueIndex: nextIndex,
        handoff: { playerId: nextId, next: 'privateStatement' },
        phase: 'handoff',
      }));
    } else {
      setState((s) => ({ ...s, handoff: null, phase: 'publicAnnouncement' }));
    }
  };

  const toDiscussion = () => setState((s) => ({ ...s, phase: 'discussion' }));

  const beginAccusations = () => {
    const ids = activePlayers(state.players).map((p) => p.id);
    if (ids.length === 0) {
      finishRound();
      return;
    }
    setState((s) => ({
      ...s,
      phase: 'handoff',
      queue: ids,
      queueIndex: 0,
      accusations: {},
      accusationVerdicts: [],
      handoff: { playerId: ids[0], next: 'accusationTurn' },
    }));
  };

  const submitAccusation = (a: Accusation) => {
    const cur = state.handoff!.playerId;
    const accusations = { ...state.accusations, [cur]: a };
    const nextIndex = state.queueIndex + 1;
    if (nextIndex < state.queue.length) {
      const nextId = state.queue[nextIndex];
      setState((s) => ({
        ...s,
        accusations,
        queueIndex: nextIndex,
        handoff: { playerId: nextId, next: 'accusationTurn' },
        phase: 'handoff',
      }));
    } else {
      const compliantById: Record<number, boolean> = {};
      Object.entries(state.outcomes).forEach(([id, o]) => {
        compliantById[Number(id)] = o.compliant;
      });
      const { players: newPlayers, eliminatedIds, verdicts } = resolveAccusations(
        state.players,
        accusations,
        compliantById,
        state.accusationCost
      );
      const newlyEliminatedNames = eliminatedIds
        .map((id) => state.players.find((p) => p.id === id)?.name ?? '')
        .filter(Boolean);
      setState((s) => ({
        ...s,
        accusations,
        players: newPlayers,
        accusationVerdicts: verdicts,
        eliminatedThisRound: eliminatedIds,
        eliminatedNames: [...s.eliminatedNames, ...newlyEliminatedNames],
        handoff: null,
        phase: 'accusationResult',
      }));
    }
  };

  const finishRound = () => {
    const remaining = activePlayers(state.players);
    if (remaining.length <= 1 || state.round >= MAX_ROUNDS) {
      const standings = buildStandings(state.players, state.round);
      setState((s) => ({ ...s, phase: 'gameOver', standings }));
      return;
    }
    if (remaining.length === 2) {
      setState((s) => ({ ...s, phase: 'twoPlayerDecision' }));
      return;
    }
    setState((s) => ({ ...s, phase: 'roundEndDecision' }));
  };

  const startNextRound = () => {
    setState((s) => ({
      ...s,
      round: s.round + 1,
      minimum: randInt(10, 100),
      accusationCost: randInt(ACCUSATION_COST_MIN, ACCUSATION_COST_MAX),
      contributions: {},
      outcomes: {},
      accusations: {},
      accusationVerdicts: [],
      eliminatedThisRound: [],
      phase: 'roundIntro',
    }));
  };

  const endGame = () => {
    const standings = buildStandings(state.players, state.round);
    setState((s) => ({ ...s, phase: 'gameOver', standings }));
  };

  const goToAddPlayer = () => setState((s) => ({ ...s, phase: 'addPlayer' }));

  const addPlayer = (name: string) => {
    if (activePlayers(state.players).length >= MAX_PLAYERS) return;
    const newId = state.nextPlayerId;
    const newPlayer: Player = {
      id: newId,
      name,
      balance: STARTING_COINS,
      active: true,
      joinedMidGame: true,
    };
    const updatedPlayers = [...state.players, newPlayer];
    const updatedSupply = state.coinSupply + STARTING_COINS;
    assertSupply(updatedPlayers, updatedSupply);
    setState((s) => ({
      ...s,
      players: updatedPlayers,
      nextPlayerId: newId + 1,
      coinSupply: updatedSupply,
      round: s.round + 1,
      minimum: randInt(10, 100),
      accusationCost: randInt(ACCUSATION_COST_MIN, ACCUSATION_COST_MAX),
      contributions: {},
      outcomes: {},
      accusations: {},
      accusationVerdicts: [],
      eliminatedThisRound: [],
      phase: 'roundIntro',
    }));
  };

  const cancelAddPlayer = () =>
    setState((s) => ({
      ...s,
      phase: s.phase === 'addPlayer' && activePlayers(s.players).length === 2 ? 'twoPlayerDecision' : 'roundEndDecision',
    }));

  const restart = () => setState(createInitialState());

  if (state.phase === 'setup') {
    return <SetupScreen onStart={startGame} />;
  }

  if (state.phase === 'roundIntro') {
    return <RoundIntroScreen state={state} onBegin={beginPrivateTurns} />;
  }

  if (state.phase === 'handoff' && state.handoff) {
    const player = state.players.find((p) => p.id === state.handoff!.playerId)!;
    const next = state.handoff.next;
    const prompt =
      next === 'privateTurn'
        ? t.handoffPrivateTurn
        : next === 'privateStatement'
        ? t.handoffStatement
        : t.handoffAccusation;
    const onReady = () =>
      setState((s) => ({ ...s, phase: next }));
    return <HandoffScreen player={player} prompt={prompt} onReady={onReady} />;
  }

  if (state.phase === 'privateTurn') {
    const player = state.players.find((p) => p.id === state.handoff!.playerId)!;
    return <PrivateTurnScreen state={state} player={player} onSubmit={submitContribution} />;
  }

  if (state.phase === 'privateStatement') {
    const player = state.players.find((p) => p.id === state.handoff!.playerId)!;
    const outcome = state.outcomes[player.id];
    return <PrivateStatementScreen state={state} player={player} outcome={outcome} onDone={advanceStatement} />;
  }

  if (state.phase === 'publicAnnouncement') {
    return <PublicAnnouncementScreen state={state} onContinue={toDiscussion} />;
  }

  if (state.phase === 'discussion') {
    return <DiscussionScreen onContinue={beginAccusations} />;
  }

  if (state.phase === 'accusationTurn') {
    const player = state.players.find((p) => p.id === state.handoff!.playerId)!;
    return <AccusationScreen state={state} player={player} onSubmit={submitAccusation} />;
  }

  if (state.phase === 'accusationResult') {
    return <AccusationResultScreen state={state} onContinue={finishRound} />;
  }

  if (state.phase === 'roundEndDecision') {
    return (
      <RoundEndDecisionScreen
        state={state}
        onAddPlayer={goToAddPlayer}
        onContinue={startNextRound}
        onEndGame={endGame}
      />
    );
  }

  if (state.phase === 'twoPlayerDecision') {
    return <TwoPlayerDecisionScreen state={state} onAddPlayer={goToAddPlayer} onEndGame={endGame} />;
  }

  if (state.phase === 'addPlayer') {
    return <AddPlayerScreen state={state} onAdd={addPlayer} onCancel={cancelAddPlayer} />;
  }

  if (state.phase === 'gameOver') {
    return <GameOverScreen state={state} onRestart={restart} />;
  }

  return null;
}
