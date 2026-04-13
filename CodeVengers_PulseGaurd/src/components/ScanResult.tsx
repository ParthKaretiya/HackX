import { ScanResultData } from '@/types/scan';
import SafetyBadge from './SafetyBadge';
import TruthBadge from './TruthBadge';
import { AlertCircle, Globe, Clock, Tag, FileType, ExternalLink, ShieldCheck, ShieldAlert, Sparkles, Download, FileText } from 'lucide-react';
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
  health: 'Health Intelligence',
  finance: 'Financial Security',
  general: 'General Content',
  other: 'Uncategorized',
};

const typeLabels: Record<string, string> = {
  link: 'URL Entity',
  message: 'Text Object',
  news: 'Media Content',
};

const ScanResult = ({ result, mode = 'normal' }: ScanResultProps) => {
  const isSafe = result.safetyCategory === 'SAFE';
  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`PulseGuard_Report_${new Date().getTime()}.pdf`);
  };

  const recommendationBg =
    result.safetyCategory === 'DANGEROUS'
      ? 'border-dangerous/30 bg-dangerous/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
      : result.safetyCategory === 'SUSPICIOUS'
        ? 'border-warning/30 bg-warning/10 shadow-[0_0_20px_rgba(234,179,8,0.1)]'
        : 'border-safe/30 bg-safe/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div ref={reportRef} className="p-4 bg-transparent">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="glass-panel space-y-8 rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Decorative Background Glow based on status */}
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-20 ${result.safetyCategory === 'DANGEROUS' ? 'bg-dangerous' : result.safetyCategory === 'SUSPICIOUS' ? 'bg-warning' : 'bg-safe'
        }`} />

      {/* Header section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="flex flex-wrap items-center gap-4">
          <SafetyBadge category={result.safetyCategory} size="lg" />
          <TruthBadge category={result.truthCategory} size="lg" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 px-4 items-center gap-2 rounded-xl bg-secondary/80 border border-white/5 backdrop-blur-md shadow-inner text-xs font-black text-foreground uppercase tracking-widest">
            <Tag className="h-4 w-4 text-primary" /> {topicLabels[result.topic] || result.topic}
          </div>
          <div className="flex h-10 px-4 items-center gap-2 rounded-xl bg-secondary/80 border border-white/5 backdrop-blur-md shadow-inner text-xs font-black text-foreground uppercase tracking-widest">
            <FileType className="h-4 w-4 text-primary" /> {typeLabels[result.type] || result.type}
          </div>
        </div>
      </motion.div>

      {/* Key reasons */}
      <motion.div variants={itemVariants} className="relative z-10">
        <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Analysis Results
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {result.reasons.map((reason, i) => (
            <div key={i} className="flex items-start gap-4 rounded-2xl bg-secondary/40 p-5 border border-white/5">
              {isSafe ? (
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-safe drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
              ) : (
                <ShieldAlert className={`mt-0.5 h-6 w-6 shrink-0 ${result.safetyCategory === 'DANGEROUS' ? 'text-dangerous drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'text-warning drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]'}`} />
              )}
              <span className="text-[15px] font-bold text-foreground leading-snug">{reason}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div variants={itemVariants} className={`relative z-10 rounded-[1.5rem] border p-6 lg:p-8 ${recommendationBg}`}>
        <h4 className="mb-3 text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
          Action Required
        </h4>
        <p className="text-lg font-medium leading-relaxed text-foreground/90">{result.recommendation}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-border/50 pt-8 relative z-10">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={downloadPDF}
            variant="outline" 
            className="rounded-xl font-bold flex items-center gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Download className="h-4 w-4" /> Download PDF Report
          </Button>

          {isSafe && result.type === 'link' && result.input.startsWith('http') && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={result.input}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-2xl bg-safe px-8 text-lg font-black text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all hover:bg-safe"
            >
              Continue to Destination <ExternalLink className="h-5 w-5" />
            </motion.a>
          )}
        </div>

        {/* Metadata */}
        {(result.domainInfo || result.timestamp) && (
          <div className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
            {result.domainInfo && (
              <span className="flex items-center justify-end gap-2">
                <Globe className="h-4 w-4 text-primary" /> {result.domainInfo.domain} <span className="opacity-50">|</span> Age: {result.domainInfo.age}
              </span>
            )}
            <span className="flex items-center justify-end gap-2">
              <Clock className="h-4 w-4 text-primary" /> Analysed: {result.timestamp.toLocaleString()}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
    </div>
  );
};

export default ScanResult;
