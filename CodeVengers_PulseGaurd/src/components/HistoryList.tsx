import { ScanResultData } from '@/types/scan';
import SafetyBadge from './SafetyBadge';
import TruthBadge from './TruthBadge';
import { Link2, MessageSquareText, Newspaper, Clock } from 'lucide-react';

const typeIcons: Record<string, typeof Link2> = {
  link: Link2,
  message: MessageSquareText,
  news: Newspaper,
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
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
      <div className="py-12 text-center text-muted-foreground">
        No scans yet. Try scanning a link or message above!
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Input</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Safety</th>
              {!compact && (
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground md:table-cell">
                  Info Reliability
                </th>
              )}
              <th className="px-4 py-3 text-right font-semibold text-muted-foreground">
                <Clock className="ml-auto h-4 w-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => {
              const TypeIcon = typeIcons[scan.type] || Link2;
              return (
                <tr
                  key={scan.id}
                  onClick={() => onSelect?.(scan)}
                  className="cursor-pointer border-b border-border/50 transition-colors last:border-0 hover:bg-secondary/30"
                >
                  <td className="px-4 py-3">
                    <TypeIcon className="h-4 w-4 text-muted-foreground" />
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 font-medium text-foreground md:max-w-[300px]">
                    {scan.input.length > 50 ? scan.input.slice(0, 50) + '…' : scan.input}
                  </td>
                  <td className="px-4 py-3">
                    <SafetyBadge category={scan.safetyCategory} />
                  </td>
                  {!compact && (
                    <td className="hidden px-4 py-3 md:table-cell">
                      <TruthBadge category={scan.truthCategory} />
                    </td>
                  )}
                  <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-muted-foreground">
                    {timeAgo(scan.timestamp)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryList;
