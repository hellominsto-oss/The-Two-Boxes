import { HandCoins, Lock, ShieldCheck } from 'lucide-react';
import { PrimaryButton, ScreenShell, Pill, PlayerName, Coin } from '@/components/ui';
import { useI18n } from '@/i18n';
import { GameState, Player } from '@/game/engine';
import { MAX_ROUNDS } from '@/game/engine';

export function RoundIntroScreen({
  state,
  onBegin,
}: {
  state: GameState;
  onBegin: () => void;
}) {
  const { t } = useI18n();
  const activeCount = state.players.filter((p) => p.active).length;
  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <Pill tone="neutral">{t.roundOf(state.round, MAX_ROUNDS)}</Pill>
        <h1 className="font-display mt-4 text-3xl font-bold text-white">{t.newRoundBegins}</h1>
        <p className="mt-2 text-sm text-slate-400">{t.playersRemaining(activeCount)}</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-b from-gold/10 to-ink-900/40 p-6 text-center ring-1 ring-gold/20 shadow-panel-gold">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30">
          <Coin face="wealth" className="h-12 w-12" />
        </div>
        <div className="text-[11px] uppercase tracking-wide text-gold/80">{t.requiredMinSavings}</div>
        <div className="font-display mt-1 text-5xl font-bold tabular-nums text-gold-light">{state.minimum}</div>
        <div className="mt-1 text-xs text-slate-400">{t.minSavingsExplain}</div>
      </div>

      <div className="mt-5 space-y-3 rounded-2xl bg-ink-900 p-5 ring-1 ring-ink-700 shadow-panel">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-success">
            <HandCoins className="h-5 w-5" />
          </span>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-success">{t.savingsBox}</span> — {t.splitAllCoins}{' '}
            <span className="font-semibold text-gold-light">{t.safetyBox}</span>.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-gold-light">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <p className="text-sm text-slate-300">{t.savingsPooled}</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-danger">
            <Lock className="h-5 w-5" />
          </span>
          <p className="text-sm text-slate-300">{t.balancePrivate}</p>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onBegin}>{t.beginPrivateTurns}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

export function HandoffScreen({
  player,
  prompt,
  onReady,
}: {
  player: Player;
  prompt: string;
  onReady: () => void;
}) {
  const { t } = useI18n();
  return (
    <ScreenShell>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-ink-900 ring-1 ring-ink-700 shadow-panel">
          <Lock className="h-9 w-9 text-slate-500" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{t.passDevice}</div>
        <h1 className="font-display mt-3 text-3xl font-bold text-white">
          <PlayerName name={player.name} joinedMidGame={player.joinedMidGame} />
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">{prompt}</p>
        <div className="mt-2 text-xs text-slate-600">{t.noOneWatching}</div>
      </div>
      <div className="pt-6">
        <PrimaryButton onClick={onReady}>{t.imReady(player.name)}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}
