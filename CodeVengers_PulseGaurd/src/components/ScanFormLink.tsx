import { useState } from 'react';
import { Link2, Loader2, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanFormLinkProps {
  onScan: (url: string) => void;
  loading: boolean;
}

const ScanFormLink = ({ onScan, loading }: ScanFormLinkProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onScan(url.trim());
  };

  return (
    <div className="glass-panel rounded-[2rem] p-8 h-full border border-white/10 shadow-xl relative overflow-hidden group hover:shadow-primary/20 hover:border-primary/20 transition-all">
      <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <Link2 className="w-48 h-48 text-[#3b82f6]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner">
            <Link2 className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-black text-foreground tracking-tight">Inspect URL</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Analyze any website link for stealth threats.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-end">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <GlobeIcon className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://suspicious-website.com"
              className="h-16 pl-12 rounded-2xl bg-secondary/80 text-lg border-white/5 focus-visible:ring-primary shadow-inner font-medium transition-all"
              required
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full h-16 gap-3 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-[#3b82f6] border-0 text-white transition-all overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" /> Deep Scanning Protocol...
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex items-center gap-2">
                    <Zap className="h-6 w-6" /> Execute Scan
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}


export default ScanFormLink;
