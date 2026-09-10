import { useState } from 'react';
import { Users, Plus, Minus, ChevronRight, CircleHelp as HelpCircle } from 'lucide-react';
import { PrimaryButton, GhostButton, ScreenShell, Coin } from '@/components/ui';
import { useI18n } from '@/i18n';
import { STARTING_COINS, Player } from '@/game/engine';
import { HowToPlayScreen } from '@/screens/HowToPlayScreen';

const DEFAULT_NAMES = [
  'Player 1',
  'Player 2',
  'Player 3',
  'Player 4',
  'Player 5',
  'Player 6',
  'Player 7',
  'Player 8',
];

const DEFAULT_NAMES_AR = [
  'لاعب ١',
  'لاعب ٢',
  'لاعب ٣',
  'لاعب ٤',
  'لاعب ٥',
  'لاعب ٦',
  'لاعب ٧',
  'لاعب ٨',
];

export function SetupScreen({
  onStart,
}: {
  onStart: (players: Player[]) => void;
}) {
  const { t, lang } = useI18n();
  const defaults = lang === 'ar' ? DEFAULT_NAMES_AR : DEFAULT_NAMES;
  const [count, setCount] = useState(3);
  const [names, setNames] = useState<string[]>(DEFAULT_NAMES);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const setName = (i: number, v: string) =>
    setNames((prev) => prev.map((n, idx) => (idx === i ? v : n)));

  if (showHowToPlay) {
    return <HowToPlayScreen onBack={() => setShowHowToPlay(false)} />;
  }

  const start = () => {
    const players: Player[] = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: names[i].trim() || defaults[i],
      balance: STARTING_COINS,
      active: true,
      joinedMidGame: false,
    }));
    onStart(players);
  };

  return (
    <ScreenShell>
      <div className="mb-6 mt-2 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-ink-900 ring-1 ring-gold/20 shadow-panel-gold">
          <Coin face="wealth" className="h-16 w-16" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-gold-light">{t.appName}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.appTagline}</p>
      </div>

      <section className="rounded-2xl bg-ink-900 p-5 ring-1 ring-ink-700 shadow-panel">
        <div className="mb-4 flex items-center gap-2 text-slate-300">
          <Users className="h-5 w-5 text-gold" />
          <span className="text-sm font-semibold">{t.players}</span>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-xl bg-ink-950/60 p-2 ring-1 ring-ink-700">
          <button
            onClick={() => setCount((c) => Math.max(3, c - 1))}
            disabled={count <= 3}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-800 text-slate-200 transition enabled:hover:bg-ink-700 disabled:opacity-40"
            aria-label={t.fewerPlayers}
          >
            <Minus className="h-5 w-5" />
          </button>
          <div className="text-center">
            <div className="font-display text-4xl font-bold tabular-nums text-white">{count}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">{t.players}</div>
          </div>
          <button
            onClick={() => setCount((c) => Math.min(8, c + 1))}
            disabled={count >= 8}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-800 text-slate-200 transition enabled:hover:bg-ink-700 disabled:opacity-40"
            aria-label={t.morePlayers}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2">
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold-light ring-1 ring-gold/30">
                {i + 1}
              </span>
              <input
                value={names[i]}
                onChange={(e) => setName(i, e.target.value)}
                maxLength={14}
                placeholder={defaults[i]}
                className="w-full rounded-lg border border-ink-700 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-gold focus:outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-4 rounded-xl bg-ink-900/40 p-4 text-xs leading-relaxed text-slate-400 ring-1 ring-ink-700">
        {t.setupBlurb(STARTING_COINS)}
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <PrimaryButton onClick={start} className="flex items-center justify-center gap-2">
          {t.startGame}
          <ChevronRight className="h-5 w-5" />
        </PrimaryButton>
        <GhostButton onClick={() => setShowHowToPlay(true)} className="flex items-center justify-center gap-2">
          <HelpCircle className="h-5 w-5" /> {t.howToPlay}
        </GhostButton>
      </div>
    </ScreenShell>
  );
}
