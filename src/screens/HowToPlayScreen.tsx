import {
  Trophy,
  Coins,
  PiggyBank,
  Shield,
  Lock,
  Gavel,
  ShieldCheck,
  ShieldX,
  Scale,
  UserX,
  UserPlus,
  Users,
  Crown,
  ArrowLeft,
} from 'lucide-react';
import { GhostButton, ScreenShell, Pill } from '@/components/ui';
import { useI18n } from '@/i18n';

export function HowToPlayScreen({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();

  return (
    <ScreenShell>
      <div className="mb-5 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 ring-1 ring-sky-600/40">
          <Trophy className="h-8 w-8 text-sky-400" />
        </div>
        <Pill tone="neutral">{t.howToPlayTitle}</Pill>
      </div>

      <div className="space-y-3">
        <Section icon={<Trophy className="h-5 w-5" />} tone="amber" title={t.howToPlayGoal}>
          <p>{t.howToPlayGoalText}</p>
        </Section>

        <Section icon={<Coins className="h-5 w-5" />} tone="amber" title={t.howToPlayStarting}>
          <p>{t.howToPlayStartingText}</p>
        </Section>

        <Section icon={<PiggyBank className="h-5 w-5" />} tone="emerald" title={t.howToPlayTwoBoxes}>
          <p>{t.howToPlayDistributeText}</p>
          <div className="mt-3 space-y-2">
            <SubItem icon={<PiggyBank className="h-4 w-4" />} tone="emerald" label={t.howToPlaySavingsLabel}>
              {t.howToPlaySavingsText}
            </SubItem>
            <SubItem icon={<Shield className="h-4 w-4" />} tone="sky" label={t.howToPlaySafetyLabel}>
              {t.howToPlaySafetyText}
            </SubItem>
          </div>
        </Section>

        <Section icon={<Coins className="h-5 w-5" />} tone="amber" title={t.howToPlayMinDeposit}>
          <p>{t.howToPlayMinDepositText}</p>
        </Section>

        <Section icon={<Lock className="h-5 w-5" />} tone="slate" title={t.howToPlayPrivateInfo}>
          <p>{t.howToPlayPrivateInfoText}</p>
        </Section>

        <Section icon={<Gavel className="h-5 w-5" />} tone="rose" title={t.howToPlayAccusations}>
          <p>{t.howToPlayAccusationsText}</p>
        </Section>

        <Section icon={<ShieldCheck className="h-5 w-5" />} tone="rose" title={t.howToPlayCorrectAccusation}>
          <p>{t.howToPlayCorrectAccusationText}</p>
        </Section>

        <Section icon={<ShieldX className="h-5 w-5" />} tone="emerald" title={t.howToPlayWrongAccusation}>
          <p>{t.howToPlayWrongAccusationText}</p>
        </Section>

        <Section icon={<Scale className="h-5 w-5" />} tone="amber" title={t.howToPlayCoinEconomy}>
          <p>{t.howToPlayCoinEconomyText}</p>
          <p className="mt-2">{t.howToPlayCoinEconomyNewPlayer}</p>
        </Section>

        <Section icon={<UserX className="h-5 w-5" />} tone="rose" title={t.howToPlayElimination}>
          <p>{t.howToPlayEliminationText}</p>
        </Section>

        <Section icon={<UserPlus className="h-5 w-5" />} tone="emerald" title={t.howToPlayAddingPlayers}>
          <p>{t.howToPlayAddingPlayersText}</p>
        </Section>

        <Section icon={<Users className="h-5 w-5" />} tone="sky" title={t.howToPlayTwoPlayersRemain}>
          <p>{t.howToPlayTwoPlayersRemainText}</p>
        </Section>

        <Section icon={<Crown className="h-5 w-5" />} tone="amber" title={t.howToPlayWinning}>
          <p>{t.howToPlayWinningText}</p>
        </Section>
      </div>

      <div className="mt-auto pt-6">
        <GhostButton onClick={onBack} className="flex items-center justify-center gap-2">
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" /> {t.howToPlayBack}
        </GhostButton>
      </div>
    </ScreenShell>
  );
}

function Section({
  icon,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone: 'amber' | 'emerald' | 'sky' | 'rose' | 'slate';
  children: React.ReactNode;
}) {
  const tones = {
    amber: 'bg-amber-500/10 ring-amber-700/30 text-amber-400',
    emerald: 'bg-emerald-500/10 ring-emerald-700/30 text-emerald-400',
    sky: 'bg-sky-500/10 ring-sky-700/30 text-sky-400',
    rose: 'bg-rose-500/10 ring-rose-700/30 text-rose-400',
    slate: 'bg-slate-500/10 ring-slate-700/30 text-slate-400',
  };
  return (
    <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-slate-800">
      <div className="mb-2 flex items-center gap-2.5">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}>
          {icon}
        </span>
        <h2 className="text-sm font-bold text-white">{title}</h2>
      </div>
      <div className="text-xs leading-relaxed text-slate-300">{children}</div>
    </div>
  );
}

function SubItem({
  icon,
  label,
  tone,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tone: 'emerald' | 'sky';
  children: React.ReactNode;
}) {
  const tones = {
    emerald: 'text-emerald-400',
    sky: 'text-sky-400',
  };
  return (
    <div className="flex items-start gap-2 rounded-xl bg-slate-950/40 px-3 py-2.5 ring-1 ring-slate-800">
      <span className={`mt-0.5 shrink-0 ${tones[tone]}`}>{icon}</span>
      <div className="text-xs leading-relaxed text-slate-300">
        <span className="font-semibold text-white">{label}: </span>
        {children}
      </div>
    </div>
  );
}
