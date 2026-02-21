import { TruthCategory } from '@/types/scan';
import { CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';

const config: Record<TruthCategory, { label: string; className: string; Icon: typeof CheckCircle2 }> = {
  LIKELY_SAFE: {
    label: 'Likely Safe',
    className: 'bg-info-safe text-info-safe-foreground',
    Icon: CheckCircle2,
  },
  UNVERIFIED: {
    label: 'Unverified',
    className: 'bg-info-unverified text-info-unverified-foreground',
    Icon: HelpCircle,
  },
  HIGH_RISK_CLAIM: {
    label: 'High-Risk Claim',
    className: 'bg-info-risk text-info-risk-foreground',
    Icon: AlertTriangle,
  },
};

interface TruthBadgeProps {
  category: TruthCategory;
  size?: 'sm' | 'lg';
}

const TruthBadge = ({ category, size = 'sm' }: TruthBadgeProps) => {
  const { label, className, Icon } = config[category];
  const isLarge = size === 'lg';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${className} ${
        isLarge ? 'px-5 py-2.5 text-base' : 'px-3 py-1 text-xs'
      }`}
    >
      <Icon className={isLarge ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
      {label}
    </span>
  );
};

export default TruthBadge;
