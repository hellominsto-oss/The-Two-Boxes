import { useState } from 'react';
import { Trophy, Skull, Crown, RotateCcw, Gavel, ShieldCheck, TriangleAlert as AlertTriangle, UserPlus, Users, ChevronRight } from 'lucide-react';
import { PrimaryButton, GhostButton, ScreenShell, Pill, CoinAmount, PlayerName } from '@/components/ui';
import { useI18n } from '@/i18n';
import { GameState, AccusationVerdict, MAX_ROUNDS, MAX_PLAYERS } from '@/game/engine';

export function AccusationResultScreen({
  state,
  onContinue,
}: {
  state: GameState;
  onContinue: () => void;
}) {
  const { t } = useI18n();
  const verdicts = state.accusationVerdicts;
  const hasVerdicts = verdicts.length > 0;
  const anyEliminated = verdicts.some((v) => v.eliminated);
  const zeroBalanceEliminated = state.eliminatedThisRound.filter(
    (id) => !verdicts.some((v) => v.targetId === id)
  );

  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <Pill tone="neutral">{t.roundOf(state.round, MAX_ROUNDS)} — {t.accusationsResolved}</Pill>
      </div>

      {!hasVerdicts && zeroBalanceEliminated.length === 0 ? (
        <div className="rounded-2xl bg-ink-900 p-7 text-center ring-1 ring-ink-700 shadow-panel">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-ink-800">
            <Gavel className="h-8 w-8 text-slate-500" />
          </div>
          <h1 className="font-display text-xl font-bold text-white">{t.noOneAccused}</h1>
          <p className="mt-2 text-sm text-slate-400">{t.noOneAccusedExplain}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {verdicts.map((v) => {
            const p = state.players.find((pp) => pp.id === v.targetId);
            return <VerdictCard key={v.targetId} verdict={v} name={p?.name ?? `Player ${v.targetId}`} cost={state.accusationCost} />;
          })}

          {zeroBalanceEliminated.map((id) => {
            const p = state.players.find((pp) => pp.id === id);
            return (
              <div
                key={id}
                className="rounded-2xl bg-ink-900 p-5 text-center ring-1 ring-ink-700 shadow-panel"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-ink-800">
                  <Skull className="h-6 w-6 text-slate-500" />
                </div>
                <h2 className="text-base font-bold text-white">
                  <PlayerName name={p?.name ?? `Player ${id}`} joinedMidGame={p?.joinedMidGame} />
                </h2>
                <p className="mt-1 text-xs text-slate-400">{t.ranOutEliminated}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-5 rounded-xl bg-ink-900 p-4 text-xs leading-relaxed text-slate-400 ring-1 ring-ink-700 shadow-panel">
        <div className="mb-2 font-semibold text-slate-300">
          {anyEliminated ? t.activePlayersRemaining : t.activePlayers}
        </div>
        <div className="flex flex-wrap gap-2">
          {state.players
            .filter((p) => p.active)
            .map((p) => (
              <span key={p.id} className="rounded-md bg-ink-800 px-3 py-1 text-xs font-medium text-slate-200">
                <PlayerName name={p.name} joinedMidGame={p.joinedMidGame} />
              </span>
            ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>{t.continue}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

function VerdictCard({ verdict, name, cost }: { verdict: AccusationVerdict; name: string; cost: number }) {
  const { t } = useI18n();
  if (verdict.correct) {
    const fullReward = cost * 2;
    const wasCapped = verdict.rewardPerAccuser < fullReward;
    const explain = wasCapped
      ? t.violationExplainCapped(name, verdict.rewardPerAccuser)
      : t.violationExplain(name, verdict.rewardPerAccuser);
    return (
      <div className="rounded-2xl bg-danger/10 p-5 ring-1 ring-danger/30 shadow-panel">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-danger/15 ring-1 ring-danger/40">
            <AlertTriangle className="h-6 w-6 text-danger" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-danger">{t.violationConfirmed}</div>
            <h2 className="font-display text-lg font-bold leading-tight text-white">{name}</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{explain}</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-success/10 p-5 ring-1 ring-success/30 shadow-panel">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-success/15 ring-1 ring-success/40">
          <ShieldCheck className="h-6 w-6 text-success" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-success">{t.wrongAccusation}</div>
          <h2 className="font-display text-lg font-bold leading-tight text-white">{name}</h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{t.wrongAccusationExplain(name, verdict.rewardPerAccuser)}</p>
    </div>
  );
}

export function RoundEndDecisionScreen({
  state,
  onAddPlayer,
  onContinue,
  onEndGame,
}: {
  state: GameState;
  onAddPlayer: () => void;
  onContinue: () => void;
  onEndGame: () => void;
}) {
  const { t } = useI18n();
  const activeCount = state.players.filter((p) => p.active).length;
  const canAdd = activeCount < MAX_PLAYERS;

  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30">
          <Users className="h-8 w-8 text-gold-light" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{t.roundEndTitle}</h1>
        <p className="mt-2 text-sm text-slate-400">{t.roundEndExplain}</p>
      </div>

      <div className="mt-5 rounded-xl bg-ink-900 p-4 text-xs leading-relaxed text-slate-400 ring-1 ring-ink-700 shadow-panel">
        <div className="mb-2 font-semibold text-slate-300">{t.activePlayersRemaining}</div>
        <div className="flex flex-wrap gap-2">
          {state.players
            .filter((p) => p.active)
            .map((p) => (
              <span key={p.id} className="rounded-md bg-ink-800 px-3 py-1 text-xs font-medium text-slate-200">
                <PlayerName name={p.name} joinedMidGame={p.joinedMidGame} />
              </span>
            ))}
        </div>
      </div>

      {!canAdd && (
        <p className="mt-4 text-center text-xs text-warning">{t.cannotAddMaxPlayers}</p>
      )}

      <div className="mt-auto space-y-3 pt-6">
        {canAdd && (
          <PrimaryButton onClick={onAddPlayer} className="flex items-center justify-center gap-2">
            <UserPlus className="h-5 w-5" /> {t.addPlayer}
          </PrimaryButton>
        )}
        <GhostButton onClick={onContinue} className="flex items-center justify-center gap-2">
          {t.continueToNextRound} <ChevronRight className="h-5 w-5" />
        </GhostButton>
        <GhostButton onClick={onEndGame}>{t.endGame}</GhostButton>
      </div>
    </ScreenShell>
  );
}

export function TwoPlayerDecisionScreen({
  state,
  onAddPlayer,
  onEndGame,
}: {
  state: GameState;
  onAddPlayer: () => void;
  onEndGame: () => void;
}) {
  const { t } = useI18n();
  const activeCount = state.players.filter((p) => p.active).length;
  const canAdd = activeCount < MAX_PLAYERS;

  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30">
          <Users className="h-8 w-8 text-gold-light" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{t.twoPlayersRemain}</h1>
        <p className="mt-2 text-sm text-slate-400">{t.twoPlayersExplain}</p>
      </div>

      <div className="mt-5 rounded-xl bg-ink-900 p-4 text-xs leading-relaxed text-slate-400 ring-1 ring-ink-700 shadow-panel">
        <div className="mb-2 font-semibold text-slate-300">{t.activePlayersRemaining}</div>
        <div className="flex flex-wrap gap-2">
          {state.players
            .filter((p) => p.active)
            .map((p) => (
              <span key={p.id} className="rounded-md bg-ink-800 px-3 py-1 text-xs font-medium text-slate-200">
                <PlayerName name={p.name} joinedMidGame={p.joinedMidGame} />
              </span>
            ))}
        </div>
      </div>

      {!canAdd && (
        <p className="mt-4 text-center text-xs text-warning">{t.cannotAddMaxPlayers}</p>
      )}

      <div className="mt-auto space-y-3 pt-6">
        {canAdd && (
          <PrimaryButton onClick={onAddPlayer} className="flex items-center justify-center gap-2">
            <UserPlus className="h-5 w-5" /> {t.addPlayer}
          </PrimaryButton>
        )}
        <GhostButton onClick={onEndGame}>{t.endGame}</GhostButton>
      </div>
    </ScreenShell>
  );
}

export function AddPlayerScreen({
  state,
  onAdd,
  onCancel,
}: {
  state: GameState;
  onAdd: (name: string) => void;
  onCancel: () => void;
}) {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const usedNames = state.players.map((p) => p.name.toLowerCase().trim());
  const eliminatedNames = state.eliminatedNames.map((n) => n.toLowerCase().trim());

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(t.enterName);
      return;
    }
    if (eliminatedNames.includes(trimmed.toLowerCase())) {
      setError(t.nameTaken);
      return;
    }
    if (usedNames.includes(trimmed.toLowerCase())) {
      setError(t.nameTaken);
      return;
    }
    onAdd(trimmed);
  };

  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-success/15 ring-1 ring-success/40">
          <UserPlus className="h-8 w-8 text-success" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{t.addPlayerTitle}</h1>
        <p className="mt-2 text-sm text-slate-400">{t.addPlayerExplain}</p>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">{t.playerName}</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            maxLength={14}
            placeholder={t.playerNamePlaceholder(state.nextPlayerId)}
            className="w-full rounded-lg border border-ink-700 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-gold focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <PrimaryButton onClick={submit} className="flex items-center justify-center gap-2">
          <UserPlus className="h-5 w-5" /> {t.addAndContinue}
        </PrimaryButton>
        <GhostButton onClick={onCancel}>{t.cancel}</GhostButton>
      </div>
    </ScreenShell>
  );
}

export function GameOverScreen({
  state,
  onRestart,
}: {
  state: GameState;
  onRestart: () => void;
}) {
  const { t } = useI18n();
  const standings = state.standings ?? [];
  const winner = standings[0];
  const survivors = standings.filter((s) => s.active);

  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/40 shadow-panel-gold">
          <Trophy className="h-8 w-8 text-gold-light" />
        </div>
        <Pill tone="warn">{t.gameOver}</Pill>
        <h1 className="font-display mt-3 text-3xl font-bold text-white">{t.finalResults}</h1>
      </div>

      {winner && (
        <div className="mb-5 rounded-2xl bg-gradient-to-b from-gold/15 to-ink-900/40 p-5 text-center ring-1 ring-gold/30 shadow-panel-gold">
          <div className="flex items-center justify-center gap-2 text-gold-light">
            <Crown className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wide">{t.winner}</span>
          </div>
          <div className="font-display mt-1 text-2xl font-bold text-white">
            <PlayerName name={winner.name} joinedMidGame={state.players.find((p) => p.id === winner.id)?.joinedMidGame} />
          </div>
          <CoinAmount amount={winner.balance} className="text-xl" />
        </div>
      )}

      <div className="space-y-2">
        {standings.map((s, i) => {
          const player = state.players.find((p) => p.id === s.id);
          return (
            <div
              key={s.id}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ring-1 shadow-panel ${
                s.active ? 'bg-ink-900 ring-ink-700' : 'bg-ink-950/40 ring-ink-800'
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i === 0 ? 'bg-gold/15 text-gold-light ring-1 ring-gold/40' : 'bg-ink-800 text-slate-400'
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">
                  <PlayerName name={s.name} joinedMidGame={player?.joinedMidGame} />
                </div>
                <div className="text-[11px] text-slate-500">
                  {s.active ? t.survived : t.eliminatedInRound(s.eliminatedRound ?? 0)}
                </div>
              </div>
              <CoinAmount amount={s.balance} className="text-base" />
            </div>
          );
        })}
      </div>

      {survivors.length === 1 && (
        <p className="mt-4 text-center text-xs text-slate-500">{t.onlyOneRemained}</p>
      )}

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onRestart} className="flex items-center justify-center gap-2">
          <RotateCcw className="h-5 w-5" /> {t.playAgain}
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}
