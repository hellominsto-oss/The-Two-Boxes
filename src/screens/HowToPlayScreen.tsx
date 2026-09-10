import {
  Trophy,
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
import { GhostButton, ScreenShell, Pill, Coin } from '@/components/ui';
import { useI18n } from '@/i18n';

export function HowToPlayScreen({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();

  return (
    <ScreenShell>
      <div className="mb-5 mt-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30">
          <Trophy className="h-8 w-8 text-gold-light" />
        </div>
        <Pill tone="neutral">{t.howToPlayTitle}</Pill>
      </div>

      <div className="space-y-3">
        <Section icon={<Trophy className="h-5 w-5" />} tone="amber" title={t.howToPlayGoal}>
          <p>{t.howToPlayGoalText}</p>
        </Section>

        <Section icon={<Coin face="wealth" className="h-5 w-5" />} tone="amber" title={t.howToPlayStarting}>
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

        <Section icon={<Coin face="deception" className="h-5 w-5" />} tone="amber" title={t.howToPlayMinDeposit}>
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
    amber: 'bg-gold/10 ring-gold/30 text-gold-light',
    emerald: 'bg-success/10 ring-success/30 text-success',
    sky: 'bg-gold/10 ring-gold/30 text-gold-light',
    rose: 'bg-danger/10 ring-danger/30 text-danger',
    slate: 'bg-ink-700/40 ring-ink-700 text-slate-400',
  };
  return (
    <div className="rounded-xl bg-ink-900 p-4 ring-1 ring-ink-700 shadow-panel">
      <div className="mb-2 flex items-center gap-2.5">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${tones[tone]}`}>
          {icon}
        </span>
        <h2 className="font-display text-base font-bold text-white">{title}</h2>
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
    emerald: 'text-success',
    sky: 'text-gold-light',
  };
  return (
    <div className="flex items-start gap-2 rounded-lg bg-ink-950/40 px-3 py-2.5 ring-1 ring-ink-700">
      <span className={`mt-0.5 shrink-0 ${tones[tone]}`}>{icon}</span>
      <div className="text-xs leading-relaxed text-slate-300">
        <span className="font-semibold text-white">{label}: </span>
        {children}
      </div>
    </div>
  );
}
