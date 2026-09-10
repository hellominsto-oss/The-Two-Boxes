import { useState } from 'react';
import { PiggyBank, Shield, Check } from 'lucide-react';
import { PrimaryButton, ScreenShell, Pill, CoinAmount, Coin } from '@/components/ui';
import { useI18n } from '@/i18n';
import { GameState, Player, Contribution } from '@/game/engine';
import { MAX_ROUNDS } from '@/game/engine';

export function PrivateTurnScreen({
  state,
  player,
  onSubmit,
}: {
  state: GameState;
  player: Player;
  onSubmit: (c: Contribution) => void;
}) {
  const { t } = useI18n();
  const total = player.balance;
  const [savings, setSavings] = useState<number>(0);
  const [safety, setSafety] = useState<number>(total);

  const distributed = savings + safety;
  const leftover = total - distributed;
  const canSubmit = leftover === 0 && savings >= 0 && safety >= 0 && savings <= total && safety <= total;

  const setSafeAmount = (v: number) => {
    const clamped = Math.max(0, Math.min(total, v || 0));
    setSavings(clamped);
    setSafety(total - clamped);
  };

  const presets = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(total * f));

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({ savings, safety });
  };

  return (
    <ScreenShell>
      <div className="mb-5 flex items-center justify-between">
        <Pill tone="neutral">{t.roundOf(state.round, MAX_ROUNDS)}</Pill>
        <Pill tone={savings >= state.minimum ? 'good' : 'bad'}>
          {savings >= state.minimum ? t.compliant : t.belowMinimum}
        </Pill>
      </div>

      <div className="mb-5 rounded-2xl bg-ink-900 p-4 ring-1 ring-ink-700 shadow-panel">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-slate-500">{t.yourBalance}</span>
          <CoinAmount amount={total} className="text-xl" />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-ink-700 pt-3">
          <span className="text-xs uppercase tracking-wide text-slate-500">{t.requiredMinSavingsShort}</span>
          <span className="font-mono font-semibold text-gold-light">{state.minimum}</span>
        </div>
      </div>

      <h2 className="mb-1 text-lg font-semibold text-white">{t.distributeCoins}</h2>
      <p className="mb-4 text-xs text-slate-400">{t.allCoinsPlaced}</p>

      <BoxCard
        label={t.savingsBox}
        sub={t.savingsBoxSub}
        icon={<PiggyBank className="h-6 w-6" />}
        tone="emerald"
        amount={savings}
        minimum={state.minimum}
      />

      <BoxCard
        label={t.safetyBox}
        sub={t.safetyBoxSub}
        icon={<Shield className="h-6 w-6" />}
        tone="sky"
        amount={safety}
      />

      <div className="mt-5 rounded-2xl bg-ink-900 p-4 ring-1 ring-ink-700 shadow-panel">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span>{t.zeroSavings}</span>
          <span>{t.maxSavings(total)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={total}
          value={savings}
          onChange={(e) => setSafeAmount(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((v, i) => (
            <button
              key={i}
              onClick={() => setSafeAmount(v)}
              className="rounded-lg bg-ink-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-ink-700"
            >
              {v}/{total - v}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={total}
            value={savings}
            onChange={(e) => setSafeAmount(Number(e.target.value))}
            className="w-24 rounded-lg border border-ink-700 bg-ink-950/60 px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
          />
          <span className="text-xs text-slate-500">{t.coinsIntoSavings}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-ink-950/60 px-4 py-3 ring-1 ring-ink-700">
        <span className="flex items-center gap-2 text-xs text-slate-400">
          <Coin face="wealth" className="h-4 w-4" /> {t.remainingToPlace}
        </span>
        <span
          className={`font-mono text-lg font-bold tabular-nums ${leftover === 0 ? 'text-success' : 'text-danger'}`}
        >
          {leftover}
        </span>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={submit} disabled={!canSubmit} className="flex items-center justify-center gap-2">
          <Check className="h-5 w-5" />
          {t.confirmDistribution}
        </PrimaryButton>
        {!canSubmit && (
          <p className="mt-2 text-center text-xs text-slate-500">
            {leftover > 0 ? t.placeRemaining(leftover) : t.invalidAmounts}
          </p>
        )}
      </div>
    </ScreenShell>
  );
}

function BoxCard({
  label,
  sub,
  icon,
  amount,
  tone,
  minimum,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  amount: number;
  tone: 'emerald' | 'sky';
  minimum?: number;
}) {
  const tones = {
    emerald: 'bg-success/10 ring-success/30 text-success',
    sky: 'bg-gold/10 ring-gold/30 text-gold-light',
  };
  const iconTones = {
    emerald: 'text-success',
    sky: 'text-gold-light',
  };
  return (
    <div className={`mt-3 rounded-xl p-4 ring-1 ${tones[tone]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={iconTones[tone]}>{icon}</span>
          <div>
            <div className="text-base font-semibold leading-tight text-white">{label}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400">{sub}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold tabular-nums text-white">{amount}</div>
          {minimum !== undefined && (
            <div className="text-[11px] text-slate-400">min {minimum}</div>
          )}
        </div>
      </div>
    </div>
  );
}
