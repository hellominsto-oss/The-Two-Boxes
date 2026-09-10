import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Users, MessageCircle, ChevronRight, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { PrimaryButton, ScreenShell, Pill, CoinAmount, PlayerName } from '@/components/ui';
import { useI18n } from '@/i18n';
import { GameState, Player, RoundOutcome, MAX_ROUNDS } from '@/game/engine';

export function PrivateStatementScreen({
  state,
  player,
  outcome,
  onDone,
}: {
  state: GameState;
  player: Player;
  outcome: RoundOutcome;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(false);

  return (
    <ScreenShell>
      <div className="mb-5 flex items-center justify-between">
        <Pill tone="neutral">{t.roundResults(state.round)}</Pill>
        {!revealed ? <Pill tone="warn">{t.hidden}</Pill> : <Pill tone="good">{t.yourEyesOnly}</Pill>}
      </div>

      <h1 className="font-display text-2xl font-bold text-white">
        <PlayerName name={player.name} joinedMidGame={player.joinedMidGame} />
      </h1>
      <p className="mt-1 text-sm text-slate-400">{t.privateStatementNote}</p>

      {!revealed ? (
        <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-ink-900 ring-1 ring-ink-700 shadow-panel">
            <EyeOff className="h-9 w-9 text-slate-500" />
          </div>
          <p className="max-w-xs text-sm text-slate-400">{t.privateStatementNote}</p>
          <div className="mt-6 w-full">
            <PrimaryButton onClick={() => setRevealed(true)} className="flex items-center justify-center gap-2">
              <Eye className="h-5 w-5" /> {t.revealStatement}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 space-y-3">
            <Row label={t.startingBalance} value={outcome.startingBalance} />
            <Row label={t.savingsContribution} value={outcome.savings} tone="emerald" />
            <Row label={t.safetyContribution} value={outcome.safety} tone="sky" />
            <Row label={t.savingsShare} value={outcome.savingsShare} tone="emerald" />
            <div className="my-2 h-px w-full bg-ink-700" />
            <div className="flex items-center justify-between rounded-xl bg-ink-900 px-4 py-4 ring-1 ring-ink-700 shadow-panel">
              <span className="text-sm font-semibold text-white">{t.newBalance}</span>
              <CoinAmount amount={outcome.resultingBalance} className="text-2xl" />
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              {outcome.compliant ? (
                <Pill tone="good">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> {t.youMetMinimum}
                </Pill>
              ) : (
                <Pill tone="bad">
                  <AlertTriangle className="mr-1 h-3.5 w-3.5" /> {t.youDidNotMeet}
                </Pill>
              )}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <PrimaryButton onClick={onDone} className="flex items-center justify-center gap-2">
              {t.hideAndPass} <ArrowRight className="h-5 w-5" />
            </PrimaryButton>
            <p className="mt-2 text-center text-xs text-slate-500">{t.statementWillDisappear}</p>
          </div>
        </>
      )}
    </ScreenShell>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'emerald' | 'sky';
}) {
  const color = tone === 'emerald' ? 'text-success' : tone === 'sky' ? 'text-gold-light' : 'text-slate-200';
  return (
    <div className="flex items-center justify-between rounded-lg bg-ink-900/50 px-4 py-3 ring-1 ring-ink-700">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`font-mono text-lg font-semibold tabular-nums ${color}`}>{value}</span>
    </div>
  );
}

export function PublicAnnouncementScreen({
  state,
  onContinue,
}: {
  state: GameState;
  onContinue: () => void;
}) {
  const { t } = useI18n();
  const met = state.publicMinMet;
  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <Pill tone="neutral">{t.roundOf(state.round, MAX_ROUNDS)} — {t.publicResult}</Pill>
      </div>

      <div
        className={`rounded-2xl p-7 text-center ring-1 shadow-panel ${
          met ? 'bg-success/10 ring-success/30' : 'bg-danger/10 ring-danger/30'
        }`}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-ink-950/50 ring-1 ring-ink-700">
          {met ? <CheckCircle2 className="h-8 w-8 text-success" /> : <AlertTriangle className="h-8 w-8 text-danger" />}
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{met ? t.minWasReached : t.minWasNotReached}</h1>
        <p className="mt-3 text-sm text-slate-400">{met ? t.minReachedExplain : t.minNotReachedExplain}</p>
      </div>

      <div className="mt-5 rounded-xl bg-ink-900 p-4 text-xs leading-relaxed text-slate-400 ring-1 ring-ink-700 shadow-panel">
        <div className="mb-1 flex items-center gap-2 font-semibold text-slate-300">
          <Users className="h-4 w-4" /> {t.activePlayers}
        </div>
        <div className="flex flex-wrap gap-2">
          {state.players
            .filter((p) => p.active)
            .map((p) => (
              <span
                key={p.id}
                className="rounded-md bg-ink-800 px-3 py-1 text-xs font-medium text-slate-200"
              >
                <PlayerName name={p.name} joinedMidGame={p.joinedMidGame} />
              </span>
            ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue} className="flex items-center justify-center gap-2">
          {t.moveToDiscussion} <ChevronRight className="h-5 w-5" />
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}

export function DiscussionScreen({ onContinue }: { onContinue: () => void }) {
  const { t } = useI18n();
  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30">
          <MessageCircle className="h-8 w-8 text-gold-light" />
        </div>
        <Pill tone="neutral">{t.discussionPhase}</Pill>
        <h1 className="font-display mt-4 text-3xl font-bold text-white">{t.talkItOut}</h1>
      </div>

      <div className="space-y-3 rounded-2xl bg-ink-900 p-5 text-sm leading-relaxed text-slate-300 ring-1 ring-ink-700 shadow-panel">
        <p>{t.putDeviceDown}</p>
        <ul className="list-disc space-y-1 pl-5 text-slate-400">
          <li>{t.discussClaim}</li>
          <li>{t.makeAgreements}</li>
          <li>{t.appNoRecord}</li>
        </ul>
        <p className="text-slate-400">{t.whenReadyContinue}</p>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>{t.continueToAccusations}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}
