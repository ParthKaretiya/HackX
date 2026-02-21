import { SafetyCategory } from '@/types/scan';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

const config: Record<SafetyCategory, { label: string; className: string; Icon: typeof ShieldCheck }> = {
  SAFE: {
    label: 'SAFE',
    className: 'bg-safe text-safe-foreground',
    Icon: ShieldCheck,
  },
  SUSPICIOUS: {
    label: 'SUSPICIOUS',
    className: 'bg-suspicious text-suspicious-foreground',
    Icon: ShieldAlert,
  },
  DANGEROUS: {
    label: 'DANGEROUS',
    className: 'bg-dangerous text-dangerous-foreground',
    Icon: ShieldX,
  },
};

interface SafetyBadgeProps {
  category: SafetyCategory;
  size?: 'sm' | 'lg';
}

const SafetyBadge = ({ category, size = 'sm' }: SafetyBadgeProps) => {
  const { label, className, Icon } = config[category];
  const isLarge = size === 'lg';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${className} ${
        isLarge ? 'px-5 py-2.5 text-base' : 'px-3 py-1 text-xs'
      }`}
    >
      <Icon className={isLarge ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
      {label}
    </span>
  );
};

export default SafetyBadge;
