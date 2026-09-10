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
      className={`w-full rounded-xl bg-success px-6 py-4 text-base font-semibold text-white shadow-panel transition active:scale-[0.98] enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:bg-ink-800 disabled:text-ink-700/60 disabled:shadow-none ${className}`}
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
      className={`w-full rounded-xl border border-ink-700 bg-ink-900/60 px-6 py-4 text-base font-medium text-slate-300 transition active:scale-[0.98] enabled:hover:border-gold/40 enabled:hover:text-white disabled:cursor-not-allowed disabled:border-ink-800 disabled:text-ink-700/50 ${className}`}
    >
      {children}
    </button>
  );
}

export function Coin({
  face = 'wealth',
  className = '',
}: {
  face?: 'wealth' | 'deception';
  className?: string;
}) {
  const src = face === 'wealth' ? '/assets/coin/1.png' : '/assets/coin/2.png';
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none select-none object-contain ${className}`}
    />
  );
}

export function CoinAmount({ amount, className = '' }: { amount: number; className?: string }) {
  const { t } = useI18n();
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-semibold tabular-nums text-gold-light ${className}`}>
      <span className="text-gold-light">{amount}</span>
      <span className="text-gold/60 text-[0.85em]">{t.coins}</span>
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
    neutral: 'bg-ink-800/60 text-slate-400 ring-ink-700',
    good: 'bg-success/15 text-success ring-success/40',
    bad: 'bg-danger/15 text-danger ring-danger/40',
    warn: 'bg-warning/15 text-warning ring-warning/40',
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function NewBadge() {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center rounded-md bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-gold-light ring-1 ring-gold/40">
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
      className="inline-flex items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1 text-[11px] font-semibold text-slate-400 transition hover:border-gold/40 hover:text-gold-light"
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
    <div dir={dir} className="flex min-h-[100dvh] flex-col bg-ink-950 text-slate-200">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-7">
        <div className="mb-2 flex justify-end">
          <LanguageToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
