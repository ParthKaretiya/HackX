import { ScanResultData } from '@/types/scan';
import SafetyBadge from './SafetyBadge';
import { Link2, MessageSquareText, Newspaper, Globe, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const typeIcons: Record<string, React.ElementType> = {
  link: Globe,
  message: MessageSquareText,
  news: Newspaper,
  text: FileText,
};

function timeAgo(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface HistoryListProps {
  scans: ScanResultData[];
  onSelect?: (scan: ScanResultData) => void;
  compact?: boolean;
}

const HistoryList = ({ scans, onSelect, compact = false }: HistoryListProps) => {
  if (scans.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-muted-foreground text-sm font-medium">No scans yet.</div>
        <div className="text-muted-foreground/50 text-xs mt-1">Try scanning a link or message above!</div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/[0.04]">
      {scans.map((scan, i) => {
        const TypeIcon = typeIcons[scan.type] || Link2;
        const isClickable = !!onSelect;
        return (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect?.(scan)}
            className={`flex items-center gap-4 py-3 px-2 transition-colors rounded-xl ${isClickable ? 'cursor-pointer hover:bg-white/[0.03]' : ''}`}
          >
            {/* Type icon */}
            <div className="shrink-0 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
              <TypeIcon className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Input */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {scan.input.length > 55 ? scan.input.slice(0, 55) + '…' : scan.input}
              </p>
              {!compact && (
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{scan.topic || scan.type}</p>
              )}
            </div>

            {/* Safety badge */}
            <SafetyBadge category={scan.safetyCategory} size="sm" />

            {/* Time */}
            <div className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground/60 min-w-[56px] justify-end">
              <Clock className="h-3 w-3" />
              {timeAgo(scan.timestamp)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HistoryList;
