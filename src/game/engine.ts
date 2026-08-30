export type Phase =
  | 'setup'
  | 'roundIntro'
  | 'handoff'
  | 'privateTurn'
  | 'privateStatement'
  | 'publicAnnouncement'
  | 'discussion'
  | 'accusationTurn'
  | 'accusationResult'
  | 'roundEndDecision'
  | 'twoPlayerDecision'
  | 'addPlayer'
  | 'gameOver';

export interface Player {
  id: number;
  name: string;
  balance: number;
  active: boolean;
  joinedMidGame: boolean;
}

export interface Contribution {
  savings: number;
  safety: number;
}

export interface RoundOutcome {
  startingBalance: number;
  savings: number;
  safety: number;
  savingsShare: number;
  resultingBalance: number;
  compliant: boolean;
}

export interface Accusation {
  targetId: number | null;
}

export interface AccusationVerdict {
  targetId: number;
  correct: boolean;
  eliminated: boolean;
  accuserIds: number[];
  rewardPerAccuser: number;
}

export type HandoffNext = 'privateTurn' | 'privateStatement' | 'accusationTurn';

export interface Handoff {
  playerId: number;
  next: HandoffNext;
}

export interface Standing {
  id: number;
  name: string;
  balance: number;
  active: boolean;
  eliminatedRound: number | null;
}

export interface GameState {
  phase: Phase;
  players: Player[];
  round: number;
  minimum: number;
  accusationCost: number;
  contributions: Record<number, Contribution>;
  outcomes: Record<number, RoundOutcome>;
  publicMinMet: boolean;
  accusations: Record<number, Accusation>;
  accusationVerdicts: AccusationVerdict[];
  eliminatedThisRound: number[];
  eliminatedNames: string[];
  nextPlayerId: number;
  queue: number[];
  queueIndex: number;
  handoff: Handoff | null;
  standings: Standing[] | null;
  /** Total coin supply introduced into this match. Increases only when a new player joins. */
  coinSupply: number;
}

export const STARTING_COINS = 100;
export const MAX_ROUNDS = 10;
export const ACCUSATION_COST_MIN = 10;
export const ACCUSATION_COST_MAX = 30;
export const ACCUSATION_REWARD_MULTIPLIER = 2;
export const MAX_PLAYERS = 8;

export function createInitialState(): GameState {
  return {
    phase: 'setup',
    players: [],
    round: 0,
    minimum: 0,
    accusationCost: 0,
    contributions: {},
    outcomes: {},
    publicMinMet: false,
    accusations: {},
    accusationVerdicts: [],
    eliminatedThisRound: [],
    eliminatedNames: [],
    nextPlayerId: 1,
    queue: [],
    queueIndex: 0,
    handoff: null,
    standings: null,
    coinSupply: 0,
  };
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function activePlayers(players: Player[]): Player[] {
  return players.filter((p) => p.active);
}

export function totalCoins(players: Player[]): number {
  return players.reduce((s, p) => s + p.balance, 0);
}

/**
 * Development/runtime invariant: all coins introduced into a match must remain
 * in player balances. The only intentional increase to the supply happens when
 * a new player joins, and GameState.coinSupply records that amount.
 */
export function coinSupplyIsConserved(players: Player[], expectedTotal: number): boolean {
  return totalCoins(players) === expectedTotal && players.every((p) => Number.isInteger(p.balance) && p.balance >= 0);
}

export function resolveRound(
  players: Player[],
  minimum: number,
  contributions: Record<number, Contribution>
): { outcomes: Record<number, RoundOutcome>; minMet: boolean } {
  const active = activePlayers(players);
  const totalSavings = active.reduce((s, p) => s + (contributions[p.id]?.savings ?? 0), 0);
  const n = active.length;
  const baseShare = n > 0 ? Math.floor(totalSavings / n) : 0;
  const remainder = n > 0 ? totalSavings - baseShare * n : 0;
  const outcomes: Record<number, RoundOutcome> = {};
  active.forEach((p, idx) => {
    const c = contributions[p.id] ?? { savings: 0, safety: 0 };
    const extra = idx < remainder ? 1 : 0;
    const share = baseShare + extra;
    outcomes[p.id] = {
      startingBalance: p.balance,
      savings: c.savings,
      safety: c.safety,
      savingsShare: share,
      resultingBalance: c.safety + share,
      compliant: c.savings >= minimum,
    };
  });
  const minMet = n > 0 && totalSavings >= minimum * n;

  const expectedTotal = totalCoins(active);
  const resultingTotal = Object.values(outcomes).reduce((sum, o) => sum + o.resultingBalance, 0);
  if (resultingTotal !== expectedTotal) {
    throw new Error(`Coin conservation violated while resolving round: expected ${expectedTotal}, got ${resultingTotal}`);
  }

  return { outcomes, minMet };
}

export function applyOutcomes(
  players: Player[],
  outcomes: Record<number, RoundOutcome>
): Player[] {
  return players.map((p) =>
    p.id in outcomes ? { ...p, balance: outcomes[p.id].resultingBalance } : p
  );
}

/**
 * Resolve accusations with strict coin conservation.
 *
 * - Wrong accusation: accuser pays accusationCost → accused receives it.
 * - Correct accusation: accused pays reward (cost × multiplier) to each accuser
 *   from their existing balance. If the accused cannot cover every full reward,
 *   the available balance is distributed proportionally so no coins are created
 *   and no balance becomes negative.
 *   After rewards, accused's remaining balance is split among all remaining
 *   active players (including accusers).
 */
export function resolveAccusations(
  players: Player[],
  accusations: Record<number, Accusation>,
  compliantById: Record<number, boolean>,
  accusationCost: number
): { players: Player[]; eliminatedIds: number[]; verdicts: AccusationVerdict[] } {
  const bal: Record<number, number> = {};
  const active: Record<number, boolean> = {};
  players.forEach((p) => {
    bal[p.id] = p.balance;
    active[p.id] = p.active;
  });
  const eliminated = new Set<number>();
  const verdicts: AccusationVerdict[] = [];

  const accusedIds = Array.from(
    new Set(
      Object.values(accusations)
        .filter((a) => a.targetId !== null)
        .map((a) => a.targetId as number)
    )
  ).sort((a, b) => a - b);

  for (const tId of accusedIds) {
    if (!active[tId]) continue;
    const accusers = Object.keys(accusations)
      .map((id) => ({ accuserId: Number(id), a: accusations[Number(id)] }))
      .filter(({ accuserId, a }) => a.targetId === tId && active[accuserId]);
    if (accusers.length === 0) continue;

    if (!compliantById[tId]) {
      // Correct accusation
      active[tId] = false;
      eliminated.add(tId);

      const rewardPerAccuser = accusationCost * ACCUSATION_REWARD_MULTIPLIER;
      const totalRewardNeeded = rewardPerAccuser * accusers.length;

      // Pay rewards from accused's balance. If insufficient, pay proportionally.
      const accusedBalance = bal[tId];
      let actualRewardPerAccuser = rewardPerAccuser;
      if (totalRewardNeeded > accusedBalance) {
        // Cap: distribute accusedBalance proportionally among accusers
        const baseUnit = Math.floor(accusedBalance / accusers.length);
        const remainder = accusedBalance - baseUnit * accusers.length;
        // Pay each accuser; accused pays from balance
        bal[tId] = 0;
        accusers.forEach(({ accuserId }, idx) => {
          bal[accuserId] += baseUnit + (idx < remainder ? 1 : 0);
        });
        actualRewardPerAccuser = baseUnit; // actual amount received
      } else {
        // Full rewards
        bal[tId] -= totalRewardNeeded;
        accusers.forEach(({ accuserId }) => {
          bal[accuserId] += rewardPerAccuser;
        });
      }

      // Distribute accused's remaining balance among all remaining active players
      const remaining = players.map((p) => p.id).filter((id) => active[id]);
      const pool = bal[tId];
      bal[tId] = 0;
      if (remaining.length > 0 && pool > 0) {
        const base = Math.floor(pool / remaining.length);
        const rem = pool - base * remaining.length;
        remaining.forEach((id, idx) => {
          bal[id] += base + (idx < rem ? 1 : 0);
        });
      }

      verdicts.push({
        targetId: tId,
        correct: true,
        eliminated: true,
        accuserIds: accusers.map((a) => a.accuserId),
        rewardPerAccuser: actualRewardPerAccuser,
      });
    } else {
      // Wrong accusation: accuser pays accusationCost to accused
      for (const { accuserId } of accusers) {
        bal[accuserId] -= accusationCost;
        bal[tId] += accusationCost;
      }
      verdicts.push({
        targetId: tId,
        correct: false,
        eliminated: false,
        accuserIds: accusers.map((a) => a.accuserId),
        rewardPerAccuser: accusationCost,
      });
    }
  }

  // Eliminate players who ran out of coins
  players.forEach((p) => {
    if (active[p.id] && bal[p.id] <= 0) {
      active[p.id] = false;
      bal[p.id] = 0;
      eliminated.add(p.id);
    }
  });

  const newPlayers = players.map((p) => ({
    ...p,
    balance: bal[p.id],
    active: active[p.id],
  }));

  const before = totalCoins(players);
  const after = totalCoins(newPlayers);
  if (before !== after || !coinSupplyIsConserved(newPlayers, before)) {
    throw new Error(`Coin conservation violated while resolving accusations: expected ${before}, got ${after}`);
  }

  return { players: newPlayers, eliminatedIds: Array.from(eliminated), verdicts };
}

export function buildStandings(players: Player[], round: number): Standing[] {
  return [...players]
    .map((p) => ({
      id: p.id,
      name: p.name,
      balance: p.balance,
      active: p.active,
      eliminatedRound: p.active ? null : round,
    }))
    .sort((a, b) => b.balance - a.balance);
}
