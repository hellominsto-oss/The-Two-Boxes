import { useState } from 'react';
import { Gavel, ShieldX, UserX, Check } from 'lucide-react';
import { PrimaryButton, ScreenShell, Pill, CoinAmount, PlayerName, Coin } from '@/components/ui';
import { useI18n } from '@/i18n';
import { GameState, Player, Accusation, MAX_ROUNDS } from '@/game/engine';

export function AccusationScreen({
  state,
  player,
  onSubmit,
}: {
  state: GameState;
  player: Player;
  onSubmit: (a: Accusation) => void;
}) {
  const { t } = useI18n();
  const [accusing, setAccusing] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const others = state.players.filter((p) => p.active && p.id !== player.id);
  const cost = state.accusationCost;
  const reward = cost * 2;
  const canAfford = player.balance >= cost;

  const canConfirmNoAccuse = true;
  const canConfirmAccuse = accusing && targetId !== null && canAfford;

  const submit = () => {
    if (accusing) {
      if (!canConfirmAccuse) return;
      onSubmit({ targetId });
    } else {
      onSubmit({ targetId: null });
    }
  };

  return (
    <ScreenShell>
      <div className="mb-5 flex items-center justify-between">
        <Pill tone="neutral">{t.roundOf(state.round, MAX_ROUNDS)} — {t.accusationPhase}</Pill>
        <CoinAmount amount={player.balance} className="text-base" />
      </div>

      <h1 className="text-2xl font-bold text-white">
        <PlayerName name={player.name} joinedMidGame={player.joinedMidGame} />
      </h1>
      <p className="mt-1 text-sm text-slate-400">{t.accuseQuestion}</p>

      <div className="mt-4 rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-700/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 ring-1 ring-amber-600/40">
            <Coin face="deception" className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300/80">{t.accusationCostLabel}</div>
            <div className="text-2xl font-bold tabular-nums text-amber-300">{cost}</div>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{t.accusationCostExplain}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            setAccusing(false);
            setTargetId(null);
          }}
          className={`rounded-2xl px-4 py-4 text-sm font-semibold ring-1 transition ${
            !accusing
              ? 'bg-emerald-600/20 text-emerald-200 ring-emerald-600/50'
              : 'bg-slate-900/50 text-slate-400 ring-slate-800'
          }`}
        >
          <ShieldX className="mx-auto mb-1 h-5 w-5" /> {t.noAccusation}
        </button>
        <button
          onClick={() => setAccusing(true)}
          disabled={others.length === 0 || !canAfford}
          className={`rounded-2xl px-4 py-4 text-sm font-semibold ring-1 transition disabled:opacity-40 ${
            accusing
              ? 'bg-rose-600/20 text-rose-200 ring-rose-600/50'
              : 'bg-slate-900/50 text-slate-400 ring-slate-800'
          }`}
        >
          <Gavel className="mx-auto mb-1 h-5 w-5" /> {t.accusePlayer}
        </button>
      </div>

      {accusing && !canAfford && (
        <p className="mt-3 text-center text-xs text-rose-400">{t.cannotAffordAccusation}</p>
      )}

      {accusing && canAfford && (
        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">{t.chooseTarget}</div>
            <div className="grid grid-cols-2 gap-2">
              {others.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setTargetId(p.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium ring-1 transition ${
                    targetId === p.id
                      ? 'bg-rose-600/20 text-rose-100 ring-rose-600/50'
                      : 'bg-slate-900/50 text-slate-300 ring-slate-800'
                  }`}
                >
                  <UserX className="h-4 w-4" />
                  <PlayerName name={p.name} joinedMidGame={p.joinedMidGame} />
                </button>
              ))}
            </div>
          </div>

          {targetId !== null && (
            <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-slate-800">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>{t.coinsToRisk}</span>
                <span className="font-semibold tabular-nums text-rose-300">{cost}</span>
              </div>
              <div className="mb-3 text-xs text-slate-500">
                {t.riskedAgainst(state.players.find((p) => p.id === targetId)?.name ?? '')}
              </div>
              <div className="rounded-lg bg-rose-500/10 px-3 py-2 text-[11px] leading-relaxed text-rose-300/90">
                {t.accusationRuleText(state.players.find((p) => p.id === targetId)?.name ?? '', cost, reward)}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto pt-6">
        <PrimaryButton
          onClick={submit}
          disabled={accusing ? !canConfirmAccuse : !canConfirmNoAccuse}
          className="flex items-center justify-center gap-2"
        >
          <Check className="h-5 w-5" />
          {accusing ? t.confirmAccusation : t.confirmNoAccusation}
        </PrimaryButton>
        {accusing && !canConfirmAccuse && canAfford && (
          <p className="mt-2 text-center text-xs text-slate-500">{t.pickTargetAndRisk}</p>
        )}
      </div>
    </ScreenShell>
  );
}
