import { ReactNode } from 'react';
import { Languages } from 'lucide-react';
import { useI18n } from '@/i18n';

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-900/30 transition active:scale-[0.98] enabled:hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl border border-slate-700 px-6 py-4 text-base font-medium text-slate-300 transition active:scale-[0.98] enabled:hover:border-slate-500 enabled:hover:text-white disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600 ${className}`}
    >
      {children}
    </button>
  );
}

export function CoinAmount({ amount, className = '' }: { amount: number; className?: string }) {
  const { t } = useI18n();
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-semibold tabular-nums text-amber-300 ${className}`}>
      <span className="text-amber-400">{amount}</span>
      <span className="text-amber-500/70 text-[0.85em]">{t.coins}</span>
    </span>
  );
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'good' | 'bad' | 'warn';
}) {
  const tones = {
    neutral: 'bg-slate-700/60 text-slate-300 ring-slate-600',
    good: 'bg-emerald-500/15 text-emerald-300 ring-emerald-600/40',
    bad: 'bg-rose-500/15 text-rose-300 ring-rose-600/40',
    warn: 'bg-amber-500/15 text-amber-300 ring-amber-600/40',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function NewBadge() {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-300 ring-1 ring-sky-600/40">
      {t.newLabel}
    </span>
  );
}

export function PlayerName({ name, joinedMidGame }: { name: string; joinedMidGame?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {name}
      {joinedMidGame && <NewBadge />}
    </span>
  );
}

export function LanguageToggle() {
  const { toggleLang, t } = useI18n();
  return (
    <button
      onClick={toggleLang}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
      aria-label={t.langToggle}
    >
      <Languages className="h-3.5 w-3.5" />
      {t.langToggle}
    </button>
  );
}

export function ScreenShell({ children }: { children: ReactNode }) {
  const { dir } = useI18n();
  return (
    <div dir={dir} className="flex min-h-[100dvh] flex-col bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-7">
        <div className="mb-2 flex justify-end">
          <LanguageToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
