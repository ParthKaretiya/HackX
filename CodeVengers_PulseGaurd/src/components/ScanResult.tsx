import { ScanResultData } from '@/types/scan';
import SafetyBadge from './SafetyBadge';
import TruthBadge from './TruthBadge';
import { AlertCircle, Globe, Clock, Tag, FileType, ExternalLink, ShieldCheck, ShieldAlert, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface ScanResultProps {
  result: ScanResultData;
  mode?: 'normal' | 'child';
}

const topicLabels: Record<string, string> = {
  health: 'Health',
  finance: 'Finance',
  general: 'General',
  other: 'Other',
};

const typeLabels: Record<string, string> = {
  link: 'URL',
  message: 'Message',
  text: 'Text',
  news: 'Media',
};

const ScanResult = ({ result, mode = 'normal' }: ScanResultProps) => {
  const isSafe = result.safetyCategory === 'SAFE';
  const isDangerous = result.safetyCategory === 'DANGEROUS';
  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: '#0d1117' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`PulseGuard_Report_${Date.now()}.pdf`);
  };

  const statusColor = isSafe ? 'text-emerald-400' : isDangerous ? 'text-red-400' : 'text-amber-400';

  return (
    <div ref={reportRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.08 }}
        className="space-y-5"
      >
        {/* Badges row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex flex-wrap gap-3">
            <SafetyBadge category={result.safetyCategory} size="lg" />
            <TruthBadge category={result.truthCategory} size="lg" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <Tag className="h-3.5 w-3.5 text-primary" />
              {topicLabels[result.topic] || result.topic}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <FileType className="h-3.5 w-3.5 text-primary" />
              {typeLabels[result.type] || result.type}
            </span>
          </div>
        </motion.div>

        {/* Input preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/5"
        >
          <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-sm font-mono text-muted-foreground truncate">{result.input}</p>
        </motion.div>

        {/* Analysis reasons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Analysis Findings
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {result.reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/5"
              >
                {isSafe ? (
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <ShieldAlert className={`mt-0.5 h-5 w-5 shrink-0 ${isDangerous ? 'text-red-400' : 'text-amber-400'}`} />
                )}
                <span className="text-sm font-medium text-foreground/90 leading-snug">{reason}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl border p-5 ${
            isDangerous ? 'border-red-500/20 bg-red-500/8' :
            result.safetyCategory === 'SUSPICIOUS' ? 'border-amber-500/20 bg-amber-500/8' :
            'border-emerald-500/20 bg-emerald-500/8'
          }`}
        >
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <AlertCircle className={`h-3.5 w-3.5 ${statusColor}`} />
            Recommendation
          </h4>
          <p className="text-sm font-medium text-foreground/90 leading-relaxed">{result.recommendation}</p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5"
        >
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={downloadPDF}
              variant="outline"
              size="sm"
              className="rounded-xl font-bold gap-2 border-white/10 hover:border-primary/40 hover:bg-primary/5"
            >
              <Download className="h-4 w-4" />
              PDF Report
            </Button>

            {isSafe && result.type === 'link' && result.input.startsWith('http') && (
              <a
                href={result.input}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                Visit Site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {result.timestamp && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {result.timestamp instanceof Date ? result.timestamp.toLocaleString() : new Date(result.timestamp).toLocaleString()}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScanResult;
